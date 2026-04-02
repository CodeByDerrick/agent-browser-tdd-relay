export interface SelectorCandidate {
  selector: string;
  confidence: number;
}

export interface SelectorCache {
  get(key: string): string | undefined;
  set(key: string, selector: string): void;
}

export interface BrowserAdapter {
  submitPrompt(prompt: string): Promise<void>;
  readLastAssistantMessage(): Promise<string>;
  getMessageFingerprint?(message: string): string;
}
