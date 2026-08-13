import assert from 'node:assert';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { after, before, describe, it } from 'node:test';

import getManifestData from './get-manifest.js';

describe('get-manifest implementation', async () => {
  describe('missing project manifest file', async () => {
    it('should error if no manifest.json exists', async () => {
      try {
        getManifestData(process.cwd());
      } catch (err) {
        if (err instanceof Error) {
          assert(err.message.includes('Failed to find a manifest file in this project'));
          return;
        }
      }
      assert(false);
    });
  });

  describe('broken project manifest file exists', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'manifest-broken-'));
    const filePath = path.join(tempDir, 'manifest.json');

    before(() => {
      fs.writeFileSync(filePath, '{');
    });

    after(() => {
      fs.rmSync(tempDir, { recursive: true, force: true });
    });

    it('should error for invalid manifest.json', async () => {
      try {
        getManifestData(tempDir);
      } catch (err) {
        if (err instanceof Error) {
          const nodeV18Error = 'SyntaxError: Unexpected end of JSON input';
          const nodeV20Error = "SyntaxError: Expected property name or '}' in JSON at position 1";
          assert(err.message.includes(nodeV20Error) || err.message.includes(nodeV18Error));
          assert(err.message.includes('Failed to parse the manifest file for this project'));
          return;
        }
      }
      assert(false);
    });
  });

  describe('contains project manifest file', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'manifest-valid-'));
    const filePath = path.join(tempDir, 'manifest.json');
    const manifest = {
      display_information: {
        name: 'Example app',
      },
      functions: {
        sample_function: {
          title: 'Sample function',
          description: 'Runs a sample function',
          input_parameters: {
            sample_input: {
              title: 'Sample input text',
            },
          },
        },
      },
    };

    before(() => {
      fs.writeFileSync(filePath, JSON.stringify(manifest, null, 2));
    });

    after(() => {
      fs.rmSync(tempDir, { recursive: true, force: true });
    });

    it('should return existing manifest values', async () => {
      try {
        const parsedManifest = getManifestData(tempDir);
        assert.deepEqual(manifest, parsedManifest);
      } catch (err) {
        console.error(err);
        assert(false);
      }
    });
  });
});
