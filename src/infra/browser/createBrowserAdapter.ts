import { FakeChatGptBrowserAdapter } from '../chatgpt/fakeChatGptAdapter';
import { BrowserAdapter } from './types';
import { LiveBrowserAdapter } from './liveBrowserAdapter';

export interface BrowserAdapterConfig {
  mode?: 'fake' | 'live';
  responses?: string[];
  transferDir?: string;
  pollIntervalMs?: number;
  timeoutMs?: number;
}

export const createBrowserAdapter = (config: BrowserAdapterConfig = {}): BrowserAdapter => {
  const mode = config.mode ?? 'fake';
  if (mode === 'live') {
    if (!config.transferDir) {
      throw new Error('transferDir is required when mode=live');
    }

    return new LiveBrowserAdapter({
      transferDir: config.transferDir,
      pollIntervalMs: config.pollIntervalMs ?? 50,
      timeoutMs: config.timeoutMs ?? 5000
    });
  }

  return new FakeChatGptBrowserAdapter(config.responses ?? []);
};
