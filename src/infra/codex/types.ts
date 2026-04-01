export interface CodexResult {
  artifactPath: string;
  summary: string;
  artifactHash: string;
  pid: number | null;
}

export interface CodexCliClient {
  runBrief(briefPath: string): Promise<CodexResult>;
}

export interface CodexRpcClient {
  runBrief(briefPath: string): Promise<CodexResult>;
}

export interface CodexRunner {
  run(briefPath: string): Promise<CodexResult>;
}
