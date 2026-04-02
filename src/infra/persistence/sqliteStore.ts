import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import Database from 'better-sqlite3';
import { RelayState } from '../../domain/types';
import { RelayAuditEvent, RelayAuditLog, RelayStateStore } from './types';

type RelayStateRow = {
  run_id: string;
  thread_id: string;
  phase: RelayState['phase'];
  loop_mode: RelayState['loopMode'];
  slice_count: number;
  codex_pid: number | null;
  current_brief_path: string | null;
  pending_brief_path: string | null;
  latest_slice_report_path: string | null;
  latest_checkpoint_path: string | null;
  approval_status: RelayState['approvalStatus'];
  last_chatgpt_message_fingerprint: string | null;
  last_submitted_artifact_hash: string | null;
  updated_at: string;
};

export class SqliteStore implements RelayStateStore, RelayAuditLog {
  private readonly db: Database.Database;

  constructor(private readonly dbPath: string) {
    mkdirSync(dirname(dbPath), { recursive: true });
    this.db = new Database(dbPath);
    this.initializeSchema();
  }

  async load(): Promise<RelayState | null> {
    const row = this.db.prepare('SELECT * FROM relay_state LIMIT 1').get() as RelayStateRow | undefined;
    if (!row) {
      return null;
    }

    return {
      runId: row.run_id,
      threadId: row.thread_id,
      phase: row.phase,
      loopMode: row.loop_mode,
      sliceCount: row.slice_count,
      codexPid: row.codex_pid,
      currentBriefPath: row.current_brief_path,
      pendingBriefPath: row.pending_brief_path,
      latestSliceReportPath: row.latest_slice_report_path,
      latestCheckpointPath: row.latest_checkpoint_path,
      approvalStatus: row.approval_status,
      lastChatGptMessageFingerprint: row.last_chatgpt_message_fingerprint,
      lastSubmittedArtifactHash: row.last_submitted_artifact_hash,
      updatedAt: row.updated_at
    };
  }

  async save(state: RelayState): Promise<void> {
    this.db
      .prepare(
        `INSERT INTO relay_state (
          run_id,
          thread_id,
          phase,
          loop_mode,
          slice_count,
          codex_pid,
          current_brief_path,
          pending_brief_path,
          latest_slice_report_path,
          latest_checkpoint_path,
          approval_status,
          last_chatgpt_message_fingerprint,
          last_submitted_artifact_hash,
          updated_at
        ) VALUES (
          @run_id,
          @thread_id,
          @phase,
          @loop_mode,
          @slice_count,
          @codex_pid,
          @current_brief_path,
          @pending_brief_path,
          @latest_slice_report_path,
          @latest_checkpoint_path,
          @approval_status,
          @last_chatgpt_message_fingerprint,
          @last_submitted_artifact_hash,
          @updated_at
        )
        ON CONFLICT(run_id) DO UPDATE SET
          thread_id = excluded.thread_id,
          phase = excluded.phase,
          loop_mode = excluded.loop_mode,
          slice_count = excluded.slice_count,
          codex_pid = excluded.codex_pid,
          current_brief_path = excluded.current_brief_path,
          pending_brief_path = excluded.pending_brief_path,
          latest_slice_report_path = excluded.latest_slice_report_path,
          latest_checkpoint_path = excluded.latest_checkpoint_path,
          approval_status = excluded.approval_status,
          last_chatgpt_message_fingerprint = excluded.last_chatgpt_message_fingerprint,
          last_submitted_artifact_hash = excluded.last_submitted_artifact_hash,
          updated_at = excluded.updated_at`
      )
      .run({
        run_id: state.runId,
        thread_id: state.threadId,
        phase: state.phase,
        loop_mode: state.loopMode,
        slice_count: state.sliceCount,
        codex_pid: state.codexPid,
        current_brief_path: state.currentBriefPath,
        pending_brief_path: state.pendingBriefPath,
        latest_slice_report_path: state.latestSliceReportPath,
        latest_checkpoint_path: state.latestCheckpointPath,
        approval_status: state.approvalStatus,
        last_chatgpt_message_fingerprint: state.lastChatGptMessageFingerprint,
        last_submitted_artifact_hash: state.lastSubmittedArtifactHash,
        updated_at: state.updatedAt
      });
  }

  async append(event: RelayAuditEvent): Promise<void> {
    this.db
      .prepare(
        `INSERT INTO audit_events (
          source_actor,
          target_actor,
          timestamp,
          payload,
          data_category
        ) VALUES (
          @source_actor,
          @target_actor,
          @timestamp,
          @payload,
          @data_category
        )`
      )
      .run({
        source_actor: event.sourceActor,
        target_actor: event.targetActor,
        timestamp: event.timestamp,
        payload: JSON.stringify(event.payload),
        data_category: event.dataCategory
      });
  }

  private initializeSchema(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS relay_state (
        run_id TEXT PRIMARY KEY,
        thread_id TEXT NOT NULL,
        phase TEXT NOT NULL,
        loop_mode TEXT NOT NULL,
        slice_count INTEGER NOT NULL,
        codex_pid INTEGER,
        current_brief_path TEXT,
        pending_brief_path TEXT,
        latest_slice_report_path TEXT,
        latest_checkpoint_path TEXT,
        approval_status TEXT NOT NULL,
        last_chatgpt_message_fingerprint TEXT,
        last_submitted_artifact_hash TEXT,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS audit_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source_actor TEXT NOT NULL,
        target_actor TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        payload TEXT NOT NULL,
        data_category TEXT NOT NULL
      );
    `);
  }
}
