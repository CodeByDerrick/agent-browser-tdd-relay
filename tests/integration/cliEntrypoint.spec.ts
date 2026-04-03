import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { createRuntime, loadRuntimeConfig } from '../../src/index';

class FakeIo {
  outputs: string[] = [];

  write(message: string): void {
    this.outputs.push(message);
  }

  async readLine(): Promise<string> {
    return 'Y';
  }
}

describe('cli entrypoint', () => {
  it('fails to start when RELAY_DB_PATH is missing', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-cli-missing-db-'));

    expect(() =>
      loadRuntimeConfig({
        cwd: dir,
        env: {}
      })
    ).toThrow('RELAY_DB_PATH is required');
  });

  it('defaults to fake mode when ADAPTER_MODE is unset', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-cli-fake-default-'));
    await writeFile(join(dir, 'brief.md'), '# brief\n', 'utf8');
    const io = new FakeIo();
    const runtime = createRuntime({
      cwd: dir,
      argv: ['brief.md'],
      env: {
        RELAY_DB_PATH: join(dir, 'relay.sqlite')
      },
      io
    });

    expect(runtime.config.adapterMode).toBe('fake');
    expect(runtime.config.transferDir).toBeUndefined();
    expect(runtime.config.projectName).toBe('Agent Bridge');
  });

  it('fails when live mode is requested without TRANSFER_DIR, but loads project identity from project_profile.json when present', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-cli-live-config-'));
    await writeFile(join(dir, 'project_profile.json'), JSON.stringify({ projectName: 'Agent Bridge Runtime' }), 'utf8');
    await writeFile(join(dir, 'brief.md'), '# brief\n', 'utf8');

    expect(() =>
      loadRuntimeConfig({
        cwd: dir,
        argv: ['brief.md'],
        env: {
          RELAY_DB_PATH: join(dir, 'relay.sqlite'),
          ADAPTER_MODE: 'live'
        }
      })
    ).toThrow('TRANSFER_DIR is required when ADAPTER_MODE=live');

    const io = new FakeIo();
    const runtime = createRuntime({
      cwd: dir,
      argv: ['brief.md'],
      env: {
        RELAY_DB_PATH: join(dir, 'relay.sqlite'),
        ADAPTER_MODE: 'live',
        TRANSFER_DIR: join(dir, 'transfer')
      },
      io
    });

    expect(runtime.config.adapterMode).toBe('live');
    expect(runtime.config.relayDbPath).toBe(join(dir, 'relay.sqlite'));
    expect(runtime.config.projectName).toBe('Agent Bridge Runtime');
  });
});
