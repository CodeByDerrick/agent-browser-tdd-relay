import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import Database from 'better-sqlite3';
import { describe, expect, it } from 'vitest';
import { createInitialState } from '../../src/domain/transitions';
import { SqliteStore } from '../../src/infra/persistence/sqliteStore';

describe('SqliteStore', () => {
  it('saves relay state and appends audit rows', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-sqlite-store-'));
    const dbPath = join(dir, 'relay.sqlite');
    const store = new SqliteStore(dbPath);
    const state = createInitialState('r1', 't1', '2026-03-31T00:00:00.000Z');

    await store.save(state);
    await store.append({
      sourceActor: 'System',
      targetActor: 'Codex',
      timestamp: '2026-03-31T00:00:01.000Z',
      payload: { artifactPath: 'artifacts/slice_reports/s1.md' },
      dataCategory: 'state-transition'
    });

    const loaded = await store.load();
    expect(loaded?.runId).toBe('r1');

    const db = new Database(dbPath, { readonly: true });
    const row = db
      .prepare(
        'SELECT source_actor, target_actor, payload, data_category FROM audit_events ORDER BY id DESC LIMIT 1'
      )
      .get() as { source_actor: string; target_actor: string; payload: string; data_category: string };
    db.close();

    expect(row.source_actor).toBe('System');
    expect(row.target_actor).toBe('Codex');
    expect(JSON.parse(row.payload)).toEqual({ artifactPath: 'artifacts/slice_reports/s1.md' });
    expect(row.data_category).toBe('state-transition');
  });
});
