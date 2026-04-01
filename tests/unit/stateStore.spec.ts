import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { createInitialState } from '../../src/domain/transitions';
import { FileStateStore } from '../../src/infra/persistence/stateStore';

describe('FileStateStore', () => {
  it('saves and loads relay state', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-state-'));
    const path = join(dir, 'relay_state.json');
    const store = new FileStateStore(path);
    const state = createInitialState('r1', 't1', '2026-03-31T00:00:00.000Z');

    await store.save(state);
    const loaded = await store.load();

    expect(loaded?.runId).toBe('r1');
  });
});
