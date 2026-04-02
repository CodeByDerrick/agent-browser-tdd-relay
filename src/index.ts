import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { pathToFileURL } from 'node:url';
import { RelayOrchestrator } from './application/orchestrator';
import { ApprovalGateIO } from './cli/approvalGate';
import { loadRuntimeConfig, LoadRuntimeConfigOptions, RuntimeConfig } from './config/runtimeConfig';
import { createBrowserAdapter } from './infra/browser/createBrowserAdapter';
import { DefaultCodexRunner, FakeCodexCliClient } from './infra/codex/fakeCodex';
import { ArtifactStore } from './infra/persistence/artifactStore';
import { SqliteStore } from './infra/persistence/sqliteStore';
import { RelayStateStore } from './infra/persistence/types';

export interface RuntimeIo extends ApprovalGateIO {}

export interface ProcessLike {
  argv: string[];
  cwd(): string;
  env: NodeJS.ProcessEnv;
  exitCode?: number | string | null;
  on(event: 'SIGINT', listener: () => void): this;
}

export interface CreateRuntimeOptions extends LoadRuntimeConfigOptions {
  io?: RuntimeIo;
  processRef?: ProcessLike;
}

export interface RuntimeApp {
  config: RuntimeConfig;
  orchestrator: RelayOrchestrator;
  run: () => Promise<void>;
}

export const installSignalHandlers = (
  processRef: ProcessLike,
  stateStore: RelayStateStore,
  now: () => string
): void => {
  processRef.on('SIGINT', () => {
    processRef.exitCode = 130;
    void stateStore.load().then(async (state) => {
      if (state) {
        await stateStore.save({ ...state, updatedAt: now() });
      }
    });
  });
};

class ConsoleIo implements RuntimeIo {
  private readonly rl = createInterface({ input, output });

  write(message: string): void {
    output.write(message);
  }

  async readLine(): Promise<string> {
    return this.rl.question('');
  }
}

export const createRuntime = (options: CreateRuntimeOptions = {}): RuntimeApp => {
  const processRef = options.processRef ?? process;
  const config = loadRuntimeConfig({
    cwd: options.cwd ?? processRef.cwd(),
    env: options.env ?? processRef.env,
    argv: options.argv ?? processRef.argv.slice(2),
    now: options.now
  });
  const io = options.io ?? new ConsoleIo();
  const store = new SqliteStore(config.relayDbPath);
  const browser = createBrowserAdapter({
    mode: config.adapterMode,
    transferDir: config.transferDir,
    pollIntervalMs: config.pollIntervalMs,
    timeoutMs: config.timeoutMs
  });
  const orchestrator = new RelayOrchestrator({
    codex: new DefaultCodexRunner(new FakeCodexCliClient(config.runId)),
    browser,
    stateStore: store,
    auditLog: store,
    artifacts: new ArtifactStore(),
    gateIo: io,
    now: () => new Date().toISOString(),
    runId: config.runId,
    threadId: config.threadId,
    briefPath: config.briefPath
  });

  const run = async (): Promise<void> => {
    io.write(
      `Starting ${config.projectName} in ${config.adapterMode} mode using ${config.relayDbPath} and brief ${config.briefPath}\n`
    );
    installSignalHandlers(processRef, store, () => new Date().toISOString());
    await orchestrator.runOnce();
  };

  return { config, orchestrator, run };
};

export const main = async (options: CreateRuntimeOptions = {}): Promise<void> => {
  const runtime = createRuntime(options);
  await runtime.run();
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  void main();
}

export { loadRuntimeConfig } from './config/runtimeConfig';
