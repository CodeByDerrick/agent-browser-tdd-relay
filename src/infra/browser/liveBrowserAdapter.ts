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

export class LiveBrowserAdapterStub implements BrowserAdapter {
  async submitPrompt(): Promise<void> {
    throw new Error('LiveBrowserAdapter is a documented stub for first pass. Next step: wire Playwright/Stagehand implementation.');
  }

  async readLastAssistantMessage(): Promise<string> {
    throw new Error('LiveBrowserAdapter is a documented stub for first pass.');
  }
}
