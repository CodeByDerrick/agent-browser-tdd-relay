import { RelayState } from '../../domain/types';

export interface RelayStateStore {
  load(): Promise<RelayState | null>;
  save(state: RelayState): Promise<void>;
}

export interface RelayAuditEvent {
  sourceActor: 'User' | 'Codex' | 'ChatGPT' | 'System';
  targetActor: 'User' | 'Codex' | 'ChatGPT' | 'System';
  timestamp: string;
  payload: Record<string, unknown>;
  dataCategory: string;
}

export interface RelayAuditLog {
  append(event: RelayAuditEvent): Promise<void>;
}
