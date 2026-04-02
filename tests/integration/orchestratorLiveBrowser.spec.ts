import { mkdtemp, readFile, readdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { RelayOrchestrator } from '../../src/application/orchestrator';
import { LiveBrowserAdapter } from '../../src/infra/browser/liveBrowserAdapter';
import { createBrowserAdapter } from '../../src/infra/browser/createBrowserAdapter';
import { FakeCodexCliClient, DefaultCodexRunner } from '../../src/infra/codex/fakeCodex';
import { ArtifactStore } from '../../src/infra/persistence/artifactStore';
import { SqliteStore } from '../../src/infra/persistence/sqliteStore';

class Io {
  write(): void {}
  async readLine(): Promise<string> {
    return 'Y';
  }
}

describe('relay orchestrator live browser flow', () => {
  it('stays in waiting_for_chatgpt when no live response arrives before timeout', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-live-browser-timeout-'));
    process.chdir(dir);

    const dbPath = join(dir, 'relay.sqlite');
    const store = new SqliteStore(dbPath);
    const browser = new LiveBrowserAdapter({
      transferDir: join(dir, 'transfer'),
      pollIntervalMs: 5,
      timeoutMs: 25
    });
    const nowValues = ['2026-04-02T00:00:00.000Z', '2026-04-02T00:00:01.000Z', '2026-04-02T00:00:02.000Z'];
    const now = () => nowValues.shift() ?? '2026-04-02T00:00:03.000Z';

    const orchestrator = new RelayOrchestrator({
      codex: new DefaultCodexRunner(new FakeCodexCliClient('live')),
      browser,
      stateStore: store,
      auditLog: store,
      artifacts: new ArtifactStore(),
      gateIo: new Io(),
      now,
      runId: 'live',
      threadId: 'thread-live',
      briefPath: 'automation/briefs/active/02_live_browser_adapter_seam.md'
    });

    await expect(orchestrator.runOnce()).rejects.toThrow('Timed out waiting for response file');

    const persisted = await store.load();
    expect(persisted?.phase).toBe('waiting_for_chatgpt');

    const promptFiles = await readdir(join(dir, 'transfer/prompts'));
    expect(promptFiles).toHaveLength(1);
    const promptText = await readFile(join(dir, 'transfer/prompts', promptFiles[0]), 'utf8');
    expect(promptText).toContain('Review artifact at');
  });

  it('completes a live file round trip into waiting_for_approval-ready output', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-live-browser-roundtrip-'));
    process.chdir(dir);

    const dbPath = join(dir, 'relay.sqlite');
    const store = new SqliteStore(dbPath);
    const browser = new LiveBrowserAdapter({
      transferDir: join(dir, 'transfer'),
      pollIntervalMs: 5,
      timeoutMs: 200
    });
    const nowValues = [
      '2026-04-02T00:01:00.000Z',
      '2026-04-02T00:01:01.000Z',
      '2026-04-02T00:01:02.000Z',
      '2026-04-02T00:01:03.000Z'
    ];
    const now = () => nowValues.shift() ?? '2026-04-02T00:01:04.000Z';

    const orchestrator = new RelayOrchestrator({
      codex: new DefaultCodexRunner(new FakeCodexCliClient('live-roundtrip')),
      browser,
      stateStore: store,
      auditLog: store,
      artifacts: new ArtifactStore(),
      gateIo: new Io(),
      now,
      runId: 'live-roundtrip',
      threadId: 'thread-live-roundtrip',
      briefPath: 'automation/briefs/active/02_live_browser_adapter_seam.md'
    });

    const runPromise = orchestrator.runOnce();
    await new Promise((resolve) => setTimeout(resolve, 20));
    await writeFile(
      join(dir, 'transfer/responses/response-001.txt'),
      `[RECAP]\nlive recap\n[/RECAP]\n[NEXT_TASK_BRIEF]\nlive next brief\n[/NEXT_TASK_BRIEF]`,
      'utf8'
    );

    const finalState = await runPromise;
    expect(finalState.phase).toBe('waiting_for_codex');
    expect(finalState.sliceCount).toBe(1);

    const pendingBrief = await readFile(join(dir, 'artifacts/briefs/live-roundtrip-pending.md'), 'utf8');
    expect(pendingBrief).toContain('live next brief');
  });

  it('selects the live adapter via environment-based factory configuration', () => {
    const adapter = createBrowserAdapter({
      mode: 'live',
      transferDir: 'transfer',
      pollIntervalMs: 10,
      timeoutMs: 50
    });

    expect(adapter).toBeInstanceOf(LiveBrowserAdapter);
  });
});
