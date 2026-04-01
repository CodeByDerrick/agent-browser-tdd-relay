import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

export class ArtifactStore {
  async writeArtifact(dir: string, fileName: string, content: string): Promise<string> {
    const path = join(dir, fileName);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, content, 'utf8');
    return path;
  }
}
