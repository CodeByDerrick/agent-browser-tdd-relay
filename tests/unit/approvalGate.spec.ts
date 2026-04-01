import { describe, expect, it } from 'vitest';
import { requestApproval } from '../../src/cli/approvalGate';

class FakeIo {
  outputs: string[] = [];
  constructor(private readonly inputs: string[]) {}

  write(message: string): void {
    this.outputs.push(message);
  }

  async readLine(): Promise<string> {
    return this.inputs.shift() ?? 'Q';
  }
}

describe('approval gate', () => {
  it('accepts valid branching inputs', async () => {
    const io = new FakeIo(['x', 'R']);
    const result = await requestApproval(io, {
      mode: 'slice',
      sliceCount: 1,
      recap: 'recap',
      nextBriefSummary: 'brief',
      artifactPaths: ['a']
    });

    expect(result).toBe('R');
    expect(io.outputs.some((x) => x.includes('Invalid input'))).toBe(true);
  });
});
