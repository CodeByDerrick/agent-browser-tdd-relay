import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFile } from 'node:child_process';
import Database from 'better-sqlite3';
import { promisify } from 'node:util';
import { describe, expect, it } from 'vitest';

const execFileAsync = promisify(execFile);
const repoRoot = 'E:\\build\\agent-browser-tdd-relay';

describe('cli smoke loop', () => {
  it('fails when no starting brief can be found', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-smoke-missing-'));

    await expect(
      execFileAsync('npm', ['start'], {
        cwd: repoRoot,
        env: {
          ...process.env,
          RELAY_DB_PATH: join(dir, 'relay.sqlite'),
          RUN_CWD: dir
        },
        shell: true
      })
    ).rejects.toMatchObject({
      stderr: expect.stringContaining('No starting brief found')
    });
  });

  it('runs one fake CLI tick and writes artifacts plus sqlite state', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-smoke-run-'));
    await mkdir(join(dir, 'artifacts/briefs'), { recursive: true });
    await writeFile(join(dir, 'artifacts/briefs/00_smoke_start.md'), '# smoke\n', 'utf8');

    const result = await execFileAsync('npm', ['start', '--', 'artifacts/briefs/00_smoke_start.md'], {
      cwd: repoRoot,
      env: {
        ...process.env,
        RELAY_DB_PATH: join(dir, 'relay.sqlite'),
        ADAPTER_MODE: 'fake',
        FAKE_BROWSER_RESPONSE_PATH: join(repoRoot, 'tests', 'fixtures', 'structured-response.txt'),
        APPROVAL_INPUT: 'Y',
        RUN_ID: 'smoke-run',
        THREAD_ID: 'smoke-thread',
        RUN_CWD: dir
      },
      shell: true
    });

    expect(result.stdout).toContain('Starting Agent Bridge in fake mode');
    expect(result.stdout).toContain('Agent Bridge');

    const pendingBrief = await readFile(join(dir, 'artifacts/briefs/smoke-run-pending.md'), 'utf8');
    expect(pendingBrief).toContain('next');
    const sliceReport = await readFile(join(dir, 'artifacts/slice_reports/smoke-run-slice_report.md'), 'utf8');
    expect(sliceReport).toContain('Fake implementation completed');

    const db = new Database(join(dir, 'relay.sqlite'), { readonly: true });
    const state = db
      .prepare('SELECT slice_count, phase FROM relay_state LIMIT 1')
      .get() as { slice_count: number; phase: string };
    db.close();

    expect(state.slice_count).toBe(1);
    expect(state.phase).toBe('waiting_for_codex');
  });
});
