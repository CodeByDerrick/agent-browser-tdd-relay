import { BrowserAdapter } from '../browser/types';

export class FakeChatGptBrowserAdapter implements BrowserAdapter {
  constructor(private readonly responses: string[]) {}

  private index = 0;

  async submitPrompt(): Promise<void> {
    return;
  }

  async readLastAssistantMessage(): Promise<string> {
    const response = this.responses[this.index] ?? this.responses[this.responses.length - 1];
    this.index += 1;
    return response;
  }
}
