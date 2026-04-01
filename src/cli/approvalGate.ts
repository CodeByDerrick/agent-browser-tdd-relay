import { ApprovalInput, ApprovalViewModel } from '../domain/types';

export interface ApprovalGateIO {
  write(message: string): void;
  readLine(): Promise<string>;
}

export const renderApprovalPrompt = (view: ApprovalViewModel): string => {
  const paths = view.artifactPaths.map((p) => `  - ${p}`).join('\n');
  return [
    '=== HUMAN APPROVAL REQUIRED ===',
    `mode: ${view.mode}`,
    `sliceCount: ${view.sliceCount}`,
    `recap: ${view.recap}`,
    `next brief: ${view.nextBriefSummary}`,
    'artifacts:',
    paths || '  (none)',
    'Approve? [Y]es [N]o [E]dit [R]etry [Q]uit'
  ].join('\n');
};

export const requestApproval = async (io: ApprovalGateIO, view: ApprovalViewModel): Promise<ApprovalInput> => {
  io.write(`${renderApprovalPrompt(view)}\n`);

  while (true) {
    const normalized = (await io.readLine()).trim().toUpperCase();
    if (['Y', 'N', 'E', 'R', 'Q'].includes(normalized)) {
      return normalized as ApprovalInput;
    }
    io.write('Invalid input. Enter one of: Y, N, E, R, Q\n');
  }
};
