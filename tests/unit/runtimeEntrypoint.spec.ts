import { describe, expect, it } from 'vitest';
import { installSignalHandlers } from '../../src/index';
import { createInitialState } from '../../src/domain/transitions';

class FakeProcess {
  exitCode: number | undefined;
  private listener: (() => void) | null = null;

  argv = ['node', 'src/index.ts'];
  env = {};

  cwd(): string {
    return process.cwd();
  }

  on(_event: 'SIGINT', listener: () => void): this {
    this.listener = listener;
    return this;
  }

  emitSigint(): void {
    this.listener?.();
  }
}

describe('runtime entrypoint', () => {
  it('saves the latest state and marks exit code on SIGINT', async () => {
    const processRef = new FakeProcess();
    const loaded = createInitialState('r1', 't1', '2026-04-02T00:00:00.000Z');
    const saved: Array<typeof loaded> = [];
    const store = {
      async load() {
        return loaded;
      },
      async save(state: typeof loaded) {
        saved.push(state);
      }
    };

    installSignalHandlers(processRef, store, () => '2026-04-02T00:00:01.000Z');
    processRef.emitSigint();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(processRef.exitCode).toBe(130);
    expect(saved).toHaveLength(1);
    expect(saved[0].updatedAt).toBe('2026-04-02T00:00:01.000Z');
  });
});
