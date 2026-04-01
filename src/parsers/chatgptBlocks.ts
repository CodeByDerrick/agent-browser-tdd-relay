import { ParsedChatGptResponse } from '../domain/types';

const extractBlock = (input: string, tag: string): string | null => {
  const pattern = new RegExp(`\\[${tag}\\]([\\s\\S]*?)\\[\\/${tag}\\]`, 'm');
  const match = input.match(pattern);
  return match ? match[1].trim() : null;
};

export const parseStructuredResponse = (input: string): ParsedChatGptResponse => {
  const recap = extractBlock(input, 'RECAP');
  const nextTaskBrief = extractBlock(input, 'NEXT_TASK_BRIEF');
  const architectureNotes = extractBlock(input, 'ARCHITECTURE_NOTES');

  if (!recap || !nextTaskBrief) {
    throw new Error('Structured response missing required RECAP or NEXT_TASK_BRIEF block');
  }

  return { recap, nextTaskBrief, architectureNotes: architectureNotes ?? undefined };
};
