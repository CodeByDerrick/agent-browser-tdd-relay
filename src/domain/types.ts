export type RelayPhase =
  | 'idle'
  | 'waiting_for_codex'
  | 'waiting_for_chatgpt'
  | 'waiting_for_approval'
  | 'running_checkpoint'
  | 'failed';

export type LoopMode = 'slice' | 'checkpoint';

export type ApprovalStatus = 'none' | 'pending' | 'approved' | 'rejected' | 'edit' | 'retry' | 'quit';

export interface RelayState {
  runId: string;
  threadId: string;
  phase: RelayPhase;
  loopMode: LoopMode;
  sliceCount: number;
  codexPid: number | null;
  currentBriefPath: string | null;
  pendingBriefPath: string | null;
  latestSliceReportPath: string | null;
  latestCheckpointPath: string | null;
  approvalStatus: ApprovalStatus;
  lastChatGptMessageFingerprint: string | null;
  lastSubmittedArtifactHash: string | null;
  updatedAt: string;
}

export interface ParsedChatGptResponse {
  recap: string;
  nextTaskBrief: string;
  architectureNotes?: string;
}

export type ApprovalInput = 'Y' | 'N' | 'E' | 'R' | 'Q';

export interface ApprovalViewModel {
  mode: LoopMode;
  sliceCount: number;
  recap: string;
  nextBriefSummary: string;
  artifactPaths: string[];
}
