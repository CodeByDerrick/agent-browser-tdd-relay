import { mkdir, readdir, rename } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

export class CheckpointRunner {
  async run(checkpointPath: string): Promise<{ checkpointPath: string; movedBriefPaths: string[] }> {
    const rootDir = resolve(dirname(checkpointPath), '..', '..');
    const activeDir = join(rootDir, 'automation/briefs/active');
    const archiveDir = join(rootDir, 'automation/briefs/archive');
    await mkdir(archiveDir, { recursive: true });

    const entries = await readdir(activeDir, { withFileTypes: true });
    const briefNames = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'README.md')
      .map((entry) => entry.name)
      .sort();

    const movedBriefPaths: string[] = [];
    for (const briefName of briefNames) {
      const sourcePath = join(activeDir, briefName);
      const destinationPath = join(archiveDir, briefName);
      await rename(sourcePath, destinationPath);
      movedBriefPaths.push(destinationPath);
    }

    return { checkpointPath, movedBriefPaths };
  }
}
