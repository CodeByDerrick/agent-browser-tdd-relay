import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { RelayOrchestrator } from '../../src/application/orchestrator';
import { FakeChatGptBrowserAdapter } from '../../src/infra/chatgpt/fakeChatGptAdapter';
import { FakeCodexCliClient, DefaultCodexRunner } from '../../src/infra/codex/fakeCodex';
import { NdjsonEventLog } from '../../src/infra/logging/eventLog';
import { ArtifactStore } from '../../src/infra/persistence/artifactStore';
import { FileStateStore } from '../../src/infra/persistence/stateStore';

class Io {
  constructor(private readonly decisions: string[]) {}
  write(): void {}
  async readLine(): Promise<string> {
    return this.decisions.shift() ?? 'Q';
  }
}

describe('relay orchestrator integration flow', () => {
  it('handles fake slice -> response -> approval flow', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-flow-'));
    process.chdir(dir);

    const stateStore = new FileStateStore(join(dir, 'relay_state.json'));
    const eventLog = new NdjsonEventLog(join(dir, 'relay_events.ndjson'));
    const artifacts = new ArtifactStore();
    const codex = new DefaultCodexRunner(new FakeCodexCliClient('run1'));
    const browser = new FakeChatGptBrowserAdapter([
      `[RECAP]\nok\n[/RECAP]\n[NEXT_TASK_BRIEF]\nnext step\n[/NEXT_TASK_BRIEF]`
    ]);
    const io = new Io(['Y']);
    let tick = 0;
    const now = () => `2026-03-31T00:00:0${tick++}.000Z`;

    const orchestrator = new RelayOrchestrator({
      codex,
      browser,
      stateStore,
      eventLog,
      artifacts,
      gateIo: io,
      now,
      runId: 'run1',
      threadId: 'thread1',
      briefPath: 'artifacts/briefs/current.md'
    });

    const finalState = await orchestrator.runOnce();
    expect(finalState.phase).toBe('waiting_for_codex');
    expect(finalState.sliceCount).toBe(1);

    const eventLines = (await readFile(join(dir, 'relay_events.ndjson'), 'utf8')).trim().split('\n');
    expect(eventLines.length).toBeGreaterThan(2);
  });

  it('prevents duplicate response fingerprint replay', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-dup-'));
    process.chdir(dir);

    const stateStore = new FileStateStore(join(dir, 'relay_state.json'));
    const eventLog = new NdjsonEventLog(join(dir, 'relay_events.ndjson'));
    const artifacts = new ArtifactStore();
    const codex = new DefaultCodexRunner(new FakeCodexCliClient('run2'));
    const duplicated = `[RECAP]\na\n[/RECAP]\n[NEXT_TASK_BRIEF]\nb\n[/NEXT_TASK_BRIEF]`;
    const browser = new FakeChatGptBrowserAdapter([duplicated, duplicated]);
    const io = new Io(['Y']);
    let tick = 0;
    const now = () => `2026-03-31T00:01:0${tick++}.000Z`;

    const orchestrator = new RelayOrchestrator({
      codex,
      browser,
      stateStore,
      eventLog,
      artifacts,
      gateIo: io,
      now,
      runId: 'run2',
      threadId: 'thread2',
      briefPath: 'artifacts/briefs/current.md'
    });

    const first = await orchestrator.runOnce();
    expect(first.lastChatGptMessageFingerprint).toBeTruthy();

    const second = await orchestrator.runOnce();
    expect(second.lastChatGptMessageFingerprint).toBe(first.lastChatGptMessageFingerprint);
  });
});
