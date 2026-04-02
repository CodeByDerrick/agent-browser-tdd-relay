import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

export interface RuntimeConfigEnv {
  [key: string]: string | undefined;
}

interface ProjectProfileFile {
  projectName?: string;
}

export interface RuntimeConfig {
  adapterMode: 'fake' | 'live';
  relayDbPath: string;
  transferDir?: string;
  projectName: string;
  briefPath: string;
  runId: string;
  threadId: string;
  pollIntervalMs: number;
  timeoutMs: number;
}

export interface LoadRuntimeConfigOptions {
  cwd?: string;
  env?: RuntimeConfigEnv;
  argv?: string[];
  now?: Date;
}

const DEFAULT_PROJECT_NAME = 'Agent Bridge';

export const loadRuntimeConfig = (options: LoadRuntimeConfigOptions = {}): RuntimeConfig => {
  const cwd = options.cwd ?? process.cwd();
  const env = options.env ?? process.env;
  const now = options.now ?? new Date();
  const configFile = readOptionalJson<ProjectProfileFile>(
    env.PROJECT_PROFILE_PATH ? resolve(cwd, env.PROJECT_PROFILE_PATH) : join(cwd, 'project_profile.json')
  );

  const relayDbPath = env.RELAY_DB_PATH;
  if (!relayDbPath) {
    throw new Error('RELAY_DB_PATH is required');
  }

  const adapterMode = normalizeMode(env.ADAPTER_MODE);
  const transferDir = env.TRANSFER_DIR ? resolve(cwd, env.TRANSFER_DIR) : undefined;
  if (adapterMode === 'live' && !transferDir) {
    throw new Error('TRANSFER_DIR is required when ADAPTER_MODE=live');
  }

  const briefPath = resolveBriefPath(cwd, options.argv ?? []);
  const projectName = env.PROJECT_NAME ?? configFile?.projectName ?? DEFAULT_PROJECT_NAME;
  const runId = env.RUN_ID ?? `run-${now.getTime()}`;
  const threadId = env.THREAD_ID ?? `${slugify(projectName)}-thread`;

  return {
    adapterMode,
    relayDbPath: resolve(cwd, relayDbPath),
    transferDir,
    projectName,
    briefPath,
    runId,
    threadId,
    pollIntervalMs: Number(env.POLL_INTERVAL_MS ?? '50'),
    timeoutMs: Number(env.BROWSER_TIMEOUT_MS ?? '5000')
  };
};

const normalizeMode = (value: string | undefined): 'fake' | 'live' => {
  if (!value) {
    return 'fake';
  }

  if (value !== 'fake' && value !== 'live') {
    throw new Error(`Unsupported ADAPTER_MODE: ${value}`);
  }

  return value;
};

const resolveBriefPath = (cwd: string, argv: string[]): string => {
  const firstArg = argv.find((value) => value && !value.startsWith('--'));
  if (firstArg) {
    return resolve(cwd, firstArg);
  }

  const activeDir = join(cwd, 'automation/briefs/active');
  if (!existsSync(activeDir)) {
    return resolve(cwd, 'artifacts/briefs/current.md');
  }

  const briefName = readdirSync(activeDir)
    .filter((entry) => entry.endsWith('.md') && entry !== 'README.md')
    .sort()[0];

  return resolve(cwd, briefName ? join('automation/briefs/active', briefName) : 'artifacts/briefs/current.md');
};

const readOptionalJson = <T>(path: string): T | null => {
  if (!existsSync(path)) {
    return null;
  }

  return JSON.parse(readFileSync(path, 'utf8')) as T;
};

const slugify = (value: string): string => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
