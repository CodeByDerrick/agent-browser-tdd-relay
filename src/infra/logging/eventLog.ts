import { appendFile } from 'node:fs/promises';

export interface RelayEvent {
  type: string;
  timestamp: string;
  payload: Record<string, unknown>;
}

export class NdjsonEventLog {
  constructor(private readonly filePath: string) {}

  async append(event: RelayEvent): Promise<void> {
    await appendFile(this.filePath, `${JSON.stringify(event)}\n`, 'utf8');
  }
}
