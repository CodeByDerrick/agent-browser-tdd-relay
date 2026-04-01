import { requestApproval, ApprovalGateIO } from '../cli/approvalGate';
import {
  applyApprovalDecision,
  createInitialState,
  markWaitingForApproval,
  markWaitingForChatGpt,
  markWaitingForCodex,
  recoverableWaitingPhase
} from '../domain/transitions';
import { RelayState } from '../domain/types';
import { BrowserAdapter } from '../infra/browser/types';
import { CodexRunner } from '../infra/codex/types';
import { NdjsonEventLog } from '../infra/logging/eventLog';
import { ArtifactStore } from '../infra/persistence/artifactStore';
import { FileStateStore } from '../infra/persistence/stateStore';
import { parseStructuredResponse } from '../parsers/chatgptBlocks';
import { sha256 } from '../utils/hash';

interface OrchestratorDeps {
  codex: CodexRunner;
  browser: BrowserAdapter;
  stateStore: FileStateStore;
  eventLog: NdjsonEventLog;
  artifacts: ArtifactStore;
  gateIo: ApprovalGateIO;
  now: () => string;
  runId: string;
  threadId: string;
  briefPath: string;
}

export class RelayOrchestrator {
  constructor(private readonly deps: OrchestratorDeps) {}

  async runOnce(): Promise<RelayState> {
    let state =
      (await this.deps.stateStore.load()) ??
      createInitialState(this.deps.runId, this.deps.threadId, this.deps.now());

    if (state.phase === 'failed') {
      return state;
    }

    if (!recoverableWaitingPhase(state) || state.phase === 'idle') {
      state = markWaitingForCodex(state, null, this.deps.now());
      await this.persist(state, 'state_waiting_for_codex');
    }

    if (state.phase === 'waiting_for_codex' || state.phase === 'running_checkpoint') {
      const codexResult = await this.deps.codex.run(this.deps.briefPath);
      state = markWaitingForChatGpt(state, codexResult.artifactHash, this.deps.now());
      state.latestSliceReportPath = codexResult.artifactPath;
      state.codexPid = codexResult.pid;
      await this.persist(state, 'codex_completed', { artifactPath: codexResult.artifactPath });
    }

    if (state.phase === 'waiting_for_chatgpt') {
      await this.deps.browser.submitPrompt(`Review artifact at ${state.latestSliceReportPath}`);
      const rawResponse = await this.deps.browser.readLastAssistantMessage();
      const fingerprint = sha256(rawResponse);

      if (state.lastChatGptMessageFingerprint === fingerprint) {
        await this.persist(state, 'chatgpt_duplicate_skipped', { fingerprint });
        return state;
      }

      const parsed = parseStructuredResponse(rawResponse);
      const responsePath = await this.deps.artifacts.writeArtifact(
        'artifacts/chatgpt_responses',
        `${state.runId}-${Date.now()}.txt`,
        rawResponse
      );
      const pendingBriefPath = await this.deps.artifacts.writeArtifact(
        'artifacts/briefs',
        `${state.runId}-pending.md`,
        parsed.nextTaskBrief
      );

      state = markWaitingForApproval(state, pendingBriefPath, fingerprint, this.deps.now());
      await this.persist(state, 'chatgpt_response_ready', { responsePath, pendingBriefPath });

      const decision = await requestApproval(this.deps.gateIo, {
        mode: state.loopMode,
        sliceCount: state.sliceCount,
        recap: parsed.recap,
        nextBriefSummary: parsed.nextTaskBrief.slice(0, 160),
        artifactPaths: [responsePath, pendingBriefPath, state.latestSliceReportPath ?? '']
      });

      state = applyApprovalDecision(state, decision, this.deps.now());
      await this.persist(state, 'approval_decision', { decision, phase: state.phase });
    }

    return state;
  }

  private async persist(state: RelayState, eventType: string, payload: Record<string, unknown> = {}): Promise<void> {
    await this.deps.stateStore.save(state);
    await this.deps.eventLog.append({
      type: eventType,
      timestamp: this.deps.now(),
      payload
    });
  }
}
