import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import Database from 'better-sqlite3';
import { describe, expect, it } from 'vitest';
import { createInitialState } from '../../src/domain/transitions';
import { RelayOrchestrator } from '../../src/application/orchestrator';
import { FakeChatGptBrowserAdapter } from '../../src/infra/chatgpt/fakeChatGptAdapter';
import { FakeCodexCliClient, DefaultCodexRunner } from '../../src/infra/codex/fakeCodex';
import { ArtifactStore } from '../../src/infra/persistence/artifactStore';
import { SqliteStore } from '../../src/infra/persistence/sqliteStore';

class Io {
  write(): void {}
  async readLine(): Promise<string> {
    return 'Y';
  }
}

describe('relay orchestrator sqlite recovery', () => {
  it('recovers from sqlite-backed state after restart and records audit events', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-orchestrator-sqlite-'));
    process.chdir(dir);

    const dbPath = join(dir, 'relay.sqlite');
    const store = new SqliteStore(dbPath);
    const base = createInitialState('r', 't', '2026-03-31T00:00:00.000Z');
    base.phase = 'waiting_for_chatgpt';
    base.latestSliceReportPath = 'artifacts/slice_reports/s1.md';
    await store.save(base);

    const browser = new FakeChatGptBrowserAdapter([
      `[RECAP]\nresumed\n[/RECAP]\n[NEXT_TASK_BRIEF]\ncontinue\n[/NEXT_TASK_BRIEF]`
    ]);
    const nowValues = ['2026-03-31T00:00:01.000Z', '2026-03-31T00:00:02.000Z'];
    const now = () => nowValues.shift() ?? '2026-03-31T00:00:03.000Z';

    const orchestrator = new RelayOrchestrator({
      codex: new DefaultCodexRunner(new FakeCodexCliClient('r')),
      browser,
      stateStore: store,
      auditLog: store,
      artifacts: new ArtifactStore(),
      gateIo: new Io(),
      now,
      runId: 'r',
      threadId: 't',
      briefPath: 'artifacts/briefs/current.md'
    });

    const out = await orchestrator.runOnce();
    expect(out.phase).toBe('waiting_for_codex');
    expect(out.sliceCount).toBe(1);

    const persisted = await new SqliteStore(dbPath).load();
    expect(persisted?.phase).toBe('waiting_for_codex');

    const pendingBrief = await readFile(join(dir, 'artifacts/briefs/r-pending.md'), 'utf8');
    expect(pendingBrief).toContain('continue');

    const db = new Database(dbPath, { readonly: true });
    const rows = db
      .prepare('SELECT source_actor, target_actor, data_category FROM audit_events ORDER BY id')
      .all() as Array<{ source_actor: string; target_actor: string; data_category: string }>;
    db.close();

    expect(rows).toEqual([
      { source_actor: 'ChatGPT', target_actor: 'User', data_category: 'task-brief' },
      { source_actor: 'User', target_actor: 'System', data_category: 'approval' }
    ]);
  });
});
