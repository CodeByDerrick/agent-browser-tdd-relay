import { RelayState, ApprovalInput } from './types';

export const CHECKPOINT_CADENCE_TARGET = 3;

export const createInitialState = (runId: string, threadId: string, now: string): RelayState => ({
  runId,
  threadId,
  phase: 'idle',
  loopMode: 'slice',
  sliceCount: 0,
  codexPid: null,
  currentBriefPath: null,
  pendingBriefPath: null,
  latestSliceReportPath: null,
  latestCheckpointPath: null,
  approvalStatus: 'none',
  lastChatGptMessageFingerprint: null,
  lastSubmittedArtifactHash: null,
  updatedAt: now
});

const withUpdatedAt = (state: RelayState, now: string): RelayState => ({ ...state, updatedAt: now });

export const markWaitingForCodex = (state: RelayState, codexPid: number | null, now: string): RelayState =>
  withUpdatedAt({ ...state, phase: 'waiting_for_codex', codexPid }, now);

export const markWaitingForChatGpt = (state: RelayState, artifactHash: string, now: string): RelayState =>
  withUpdatedAt({ ...state, phase: 'waiting_for_chatgpt', lastSubmittedArtifactHash: artifactHash }, now);

export const markWaitingForApproval = (
  state: RelayState,
  pendingBriefPath: string,
  messageFingerprint: string,
  now: string
): RelayState =>
  withUpdatedAt(
    {
      ...state,
      phase: 'waiting_for_approval',
      approvalStatus: 'pending',
      pendingBriefPath,
      lastChatGptMessageFingerprint: messageFingerprint
    },
    now
  );

export const applyApprovalDecision = (state: RelayState, input: ApprovalInput, now: string): RelayState => {
  if (state.phase !== 'waiting_for_approval') {
    return withUpdatedAt(state, now);
  }

  if (input === 'Q') {
    return withUpdatedAt({ ...state, approvalStatus: 'quit', phase: 'failed' }, now);
  }

  if (input === 'N') {
    return withUpdatedAt({ ...state, approvalStatus: 'rejected', phase: 'failed' }, now);
  }

  if (input === 'E') {
    return withUpdatedAt({ ...state, approvalStatus: 'edit', phase: 'waiting_for_codex' }, now);
  }

  if (input === 'R') {
    return withUpdatedAt({ ...state, approvalStatus: 'retry', phase: 'waiting_for_chatgpt' }, now);
  }

  const nextSliceCount = state.loopMode === 'slice' ? state.sliceCount + 1 : state.sliceCount;
  if (state.loopMode === 'checkpoint') {
    return withUpdatedAt(
      {
        ...state,
        approvalStatus: 'approved',
        phase: 'waiting_for_codex',
        loopMode: 'slice',
        sliceCount: 0,
        currentBriefPath: state.pendingBriefPath,
        pendingBriefPath: null
      },
      now
    );
  }

  return withUpdatedAt(
    {
      ...state,
      approvalStatus: 'approved',
      sliceCount: nextSliceCount,
      phase: 'waiting_for_codex',
      currentBriefPath: state.pendingBriefPath,
      pendingBriefPath: null
    },
    now
  );
};

export const recoverableWaitingPhase = (state: RelayState): boolean =>
  ['waiting_for_codex', 'waiting_for_chatgpt', 'waiting_for_approval', 'running_checkpoint'].includes(state.phase);
