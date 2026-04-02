import { appendFile } from 'node:fs/promises';
import { RelayAuditEvent, RelayAuditLog } from '../persistence/types';

export interface RelayEvent {
  type: string;
  timestamp: string;
  payload: Record<string, unknown>;
}

export class NdjsonEventLog implements RelayAuditLog {
  constructor(private readonly filePath: string) {}

  async append(event: RelayAuditEvent | RelayEvent): Promise<void> {
    await appendFile(this.filePath, `${JSON.stringify(event)}\n`, 'utf8');
  }
}
