import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { parseStructuredResponse } from '../../parsers/chatgptBlocks';
import { sha256 } from '../../utils/hash';
import { BrowserAdapter, SelectorCandidate, SelectorCache } from './types';

export class MemorySelectorCache implements SelectorCache {
  private readonly cache = new Map<string, string>();

  get(key: string): string | undefined {
    return this.cache.get(key);
  }

  set(key: string, selector: string): void {
    this.cache.set(key, selector);
  }
}

export const promptFieldStrategies = (): SelectorCandidate[] => [
  { selector: 'textarea[data-testid="prompt-textarea"]', confidence: 0.9 },
  { selector: 'textarea[placeholder*="message"]', confidence: 0.7 }
];

export const assistantMessageStrategies = (): SelectorCandidate[] => [
  { selector: '[data-message-author-role="assistant"]:last-of-type', confidence: 0.85 },
  { selector: 'article[data-role="assistant"]:last-of-type', confidence: 0.6 }
];

export interface LiveBrowserAdapterOptions {
  transferDir: string;
  pollIntervalMs?: number;
  timeoutMs?: number;
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export class LiveBrowserAdapter implements BrowserAdapter {
  private readonly promptsDir: string;
  private readonly responsesDir: string;
  private readonly pollIntervalMs: number;
  private readonly timeoutMs: number;
  private promptCounter = 0;
  private readonly consumedResponsePaths = new Set<string>();
  private lastFingerprint: string | null = null;

  constructor(private readonly options: LiveBrowserAdapterOptions) {
    this.promptsDir = join(options.transferDir, 'prompts');
    this.responsesDir = join(options.transferDir, 'responses');
    this.pollIntervalMs = options.pollIntervalMs ?? 50;
    this.timeoutMs = options.timeoutMs ?? 5000;
  }

  async submitPrompt(prompt: string): Promise<void> {
    try {
      await mkdir(this.promptsDir, { recursive: true });
      await mkdir(this.responsesDir, { recursive: true });
      const fileName = `prompt-${String(++this.promptCounter).padStart(3, '0')}.txt`;
      await writeFile(join(this.promptsDir, fileName), prompt, 'utf8');
    } catch (error) {
      throw new Error(`Unable to write prompt to transfer_dir: ${this.formatError(error)}`);
    }
  }

  async readLastAssistantMessage(): Promise<string> {
    await this.ensureTransferDirs();
    const startedAt = Date.now();

    while (Date.now() - startedAt < this.timeoutMs) {
      const nextResponsePath = await this.findUnreadResponsePath();
      if (nextResponsePath) {
        try {
          const message = await readFile(nextResponsePath, 'utf8');
          parseStructuredResponse(message);
          this.consumedResponsePaths.add(nextResponsePath);
          this.lastFingerprint = sha256(`${basename(nextResponsePath)}:${message}`);
          return message;
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code) {
            throw new Error(`Unable to read response from transfer_dir: ${this.formatError(error)}`);
          }

          throw error;
        }
      }

      await sleep(this.pollIntervalMs);
    }

    throw new Error('Timed out waiting for response file');
  }

  getMessageFingerprint(message: string): string {
    return this.lastFingerprint ?? sha256(message);
  }

  private async ensureTransferDirs(): Promise<void> {
    try {
      await mkdir(this.promptsDir, { recursive: true });
      await mkdir(this.responsesDir, { recursive: true });
    } catch (error) {
      throw new Error(`Unable to access transfer_dir: ${this.formatError(error)}`);
    }
  }

  private async findUnreadResponsePath(): Promise<string | null> {
    const entries = await readdir(this.responsesDir);
    const candidates = (
      await Promise.all(
        entries
          .filter((entry) => entry.endsWith('.txt'))
          .map(async (entry) => {
            const path = join(this.responsesDir, entry);
            const info = await stat(path);
            return { path, mtimeMs: info.mtimeMs };
          })
      )
    )
      .filter((entry) => !this.consumedResponsePaths.has(entry.path))
      .sort((left, right) => left.mtimeMs - right.mtimeMs);

    return candidates[0]?.path ?? null;
  }

  private formatError(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
}
