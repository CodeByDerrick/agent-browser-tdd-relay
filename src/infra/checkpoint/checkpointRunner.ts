export class CheckpointRunner {
  async run(checkpointPath: string): Promise<{ checkpointPath: string }> {
    return { checkpointPath };
  }
}
