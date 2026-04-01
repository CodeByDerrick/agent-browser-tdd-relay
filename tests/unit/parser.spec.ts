import { describe, expect, it } from 'vitest';
import { parseStructuredResponse } from '../../src/parsers/chatgptBlocks';

describe('parseStructuredResponse', () => {
  it('parses required and optional blocks', () => {
    const input = `[RECAP]\nDone\n[/RECAP]\n[NEXT_TASK_BRIEF]\nDo next\n[/NEXT_TASK_BRIEF]\n[ARCHITECTURE_NOTES]\nnote\n[/ARCHITECTURE_NOTES]`;
    const parsed = parseStructuredResponse(input);
    expect(parsed.recap).toBe('Done');
    expect(parsed.nextTaskBrief).toBe('Do next');
    expect(parsed.architectureNotes).toBe('note');
  });

  it('throws when required blocks missing', () => {
    expect(() => parseStructuredResponse('[RECAP]x[/RECAP]')).toThrow();
  });
});
