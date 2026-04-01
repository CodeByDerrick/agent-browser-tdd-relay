import { sha256 } from '../../utils/hash';
import { CodexCliClient, CodexResult, CodexRunner, CodexRpcClient } from './types';

export class FakeCodexCliClient implements CodexCliClient {
  constructor(private readonly runId = 'fake-run') {}

  async runBrief(briefPath: string): Promise<CodexResult> {
    const summary = `Fake implementation completed for ${briefPath}`;
    return {
      artifactPath: `artifacts/slice_reports/${this.runId}-${Date.now()}.md`,
      summary,
      artifactHash: sha256(summary),
      pid: 1111
    };
  }
}

export class StubCodexRpcClient implements CodexRpcClient {
  async runBrief(): Promise<CodexResult> {
    throw new Error('CodexRpcClient is intentionally stubbed for first pass');
  }
}

export class DefaultCodexRunner implements CodexRunner {
  constructor(private readonly cliClient: CodexCliClient) {}

  run(briefPath: string): Promise<CodexResult> {
    return this.cliClient.runBrief(briefPath);
  }
}
