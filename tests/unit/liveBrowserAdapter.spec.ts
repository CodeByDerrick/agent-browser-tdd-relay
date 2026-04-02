import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { LiveBrowserAdapter } from '../../src/infra/browser/liveBrowserAdapter';

describe('LiveBrowserAdapter', () => {
  it('fails to read when the response file is missing', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-live-browser-missing-'));
    const adapter = new LiveBrowserAdapter({
      transferDir: dir,
      pollIntervalMs: 5,
      timeoutMs: 20
    });

    await expect(adapter.readLastAssistantMessage()).rejects.toThrow('Timed out waiting for response file');
  });

  it('fails to read when the response file is unstructured', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'relay-live-browser-unstructured-'));
    const responsesDir = join(dir, 'responses');
    const adapter = new LiveBrowserAdapter({
      transferDir: dir,
      pollIntervalMs: 5,
      timeoutMs: 50
    });

    await mkdir(responsesDir, { recursive: true });
    await writeFile(join(responsesDir, 'response-001.txt'), 'plain text only', 'utf8');

    await expect(adapter.readLastAssistantMessage()).rejects.toThrow(
      'Structured response missing required RECAP or NEXT_TASK_BRIEF block'
    );
  });
});
