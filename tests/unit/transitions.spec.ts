import { describe, expect, it } from 'vitest';
import {
  CHECKPOINT_CADENCE_TARGET,
  applyApprovalDecision,
  createInitialState,
  markWaitingForApproval,
  recoverableWaitingPhase
} from '../../src/domain/transitions';

const now = '2026-03-31T00:00:00.000Z';

describe('transitions', () => {
  it('increments slices only on approved slice continuation', () => {
    const s0 = createInitialState('r1', 't1', now);
    const waiting = markWaitingForApproval(s0, 'artifacts/briefs/b1.md', 'fp1', now);
    const approved = applyApprovalDecision(waiting, 'Y', now);
    expect(approved.sliceCount).toBe(1);
    expect(approved.phase).toBe('waiting_for_codex');
  });

  it('tracks checkpoint cadence without auto-entering checkpoint mode', () => {
    let s = createInitialState('r1', 't1', now);
    s.sliceCount = CHECKPOINT_CADENCE_TARGET - 1;
    s = markWaitingForApproval(s, 'artifacts/briefs/b2.md', 'fp2', now);
    const out = applyApprovalDecision(s, 'Y', now);
    expect(out.loopMode).toBe('slice');
    expect(out.phase).toBe('waiting_for_codex');
    expect(out.sliceCount).toBe(CHECKPOINT_CADENCE_TARGET);
  });

  it('resets slice count after approved checkpoint', () => {
    let s = createInitialState('r1', 't1', now);
    s.loopMode = 'checkpoint';
    s.phase = 'waiting_for_approval';
    s.sliceCount = 3;
    s.pendingBriefPath = 'artifacts/briefs/b3.md';
    const out = applyApprovalDecision(s, 'Y', now);
    expect(out.loopMode).toBe('slice');
    expect(out.sliceCount).toBe(0);
    expect(out.phase).toBe('waiting_for_codex');
  });

  it('reports recoverable waiting phases', () => {
    const s = createInitialState('r1', 't1', now);
    expect(recoverableWaitingPhase({ ...s, phase: 'waiting_for_chatgpt' })).toBe(true);
    expect(recoverableWaitingPhase({ ...s, phase: 'idle' })).toBe(false);
  });
});
