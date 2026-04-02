import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CheckpointRunner } from '../../src/infra/checkpoint/checkpointRunner';

describe('CheckpointRunner', () => {
  it('archives active brief markdown files after a successful checkpoint run', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-checkpoint-'));
    const activeDir = join(dir, 'automation/briefs/active');
    const archiveDir = join(dir, 'automation/briefs/archive');
    const checkpointPath = join(dir, 'artifacts/checkpoints/c1.md');
    await mkdir(activeDir, { recursive: true });
    await mkdir(archiveDir, { recursive: true });
    await mkdir(join(dir, 'artifacts/checkpoints'), { recursive: true });
    await writeFile(join(activeDir, '01_test_brief.md'), '# brief\n', 'utf8');
    await writeFile(join(activeDir, 'README.md'), '# active lane\n', 'utf8');
    await writeFile(checkpointPath, '# checkpoint\n', 'utf8');

    const runner = new CheckpointRunner();
    const result = await runner.run(checkpointPath);

    expect(result.movedBriefPaths).toEqual([join(archiveDir, '01_test_brief.md')]);
    expect(result.checkpointPath).toBe(checkpointPath);
  });
});
