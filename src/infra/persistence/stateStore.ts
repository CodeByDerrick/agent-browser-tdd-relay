import { readFile, writeFile, rename } from 'node:fs/promises';
import { RelayState } from '../../domain/types';
import { RelayStateStore } from './types';

export class FileStateStore implements RelayStateStore {
  constructor(private readonly statePath: string) {}

  async load(): Promise<RelayState | null> {
    try {
      const raw = await readFile(this.statePath, 'utf8');
      return JSON.parse(raw) as RelayState;
    } catch {
      return null;
    }
  }

  async save(state: RelayState): Promise<void> {
    const tempPath = `${this.statePath}.tmp`;
    await writeFile(tempPath, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
    await rename(tempPath, this.statePath);
  }
}
