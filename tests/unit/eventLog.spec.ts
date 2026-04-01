import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { NdjsonEventLog } from '../../src/infra/logging/eventLog';

describe('NdjsonEventLog', () => {
  it('appends JSON lines', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-events-'));
    const path = join(dir, 'relay_events.ndjson');
    const log = new NdjsonEventLog(path);

    await log.append({ type: 'one', timestamp: 't1', payload: { a: 1 } });
    await log.append({ type: 'two', timestamp: 't2', payload: { b: 2 } });

    const lines = (await readFile(path, 'utf8')).trim().split('\n');
    expect(lines).toHaveLength(2);
    expect(JSON.parse(lines[0]).type).toBe('one');
  });
});
