import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { createInitialState } from '../../src/domain/transitions';
import { RelayOrchestrator } from '../../src/application/orchestrator';
import { FakeChatGptBrowserAdapter } from '../../src/infra/chatgpt/fakeChatGptAdapter';
import { FakeCodexCliClient, DefaultCodexRunner } from '../../src/infra/codex/fakeCodex';
import { NdjsonEventLog } from '../../src/infra/logging/eventLog';
import { ArtifactStore } from '../../src/infra/persistence/artifactStore';
import { FileStateStore } from '../../src/infra/persistence/stateStore';

class Io {
  write(): void {}
  async readLine(): Promise<string> {
    return 'Y';
  }
}

describe('restart recovery', () => {
  it('recovers from waiting_for_chatgpt state and continues to approval gate', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-recover-'));
    process.chdir(dir);

    const stateStore = new FileStateStore(join(dir, 'relay_state.json'));
    const base = createInitialState('r', 't', '2026-03-31T00:00:00.000Z');
    base.phase = 'waiting_for_chatgpt';
    base.latestSliceReportPath = 'artifacts/slice_reports/s1.md';
    await stateStore.save(base);

    const orchestrator = new RelayOrchestrator({
      codex: new DefaultCodexRunner(new FakeCodexCliClient('r')),
      browser: new FakeChatGptBrowserAdapter([
        `[RECAP]\nresumed\n[/RECAP]\n[NEXT_TASK_BRIEF]\ncontinue\n[/NEXT_TASK_BRIEF]`
      ]),
      stateStore,
      auditLog: new NdjsonEventLog(join(dir, 'relay_events.ndjson')),
      artifacts: new ArtifactStore(),
      gateIo: new Io(),
      now: () => '2026-03-31T00:00:01.000Z',
      runId: 'r',
      threadId: 't',
      briefPath: 'artifacts/briefs/current.md'
    });

    const out = await orchestrator.runOnce();
    expect(out.phase).toBe('waiting_for_codex');
    expect(out.sliceCount).toBe(1);
  });
});
