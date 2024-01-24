import { after, before, describe, it } from 'mocha';
import assert from 'assert';
import fs from 'fs';
import path from 'path';

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
    const tempDir = path.join(process.cwd(), 'tmp');
    const filePath = path.join(tempDir, 'manifest.json');

    before(() => {
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      fs.writeFileSync(filePath, '{');
    });

    after(() => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });

    it('should error for invalid manifest.json', async () => {
      try {
        getManifestData(process.cwd());
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
    const tempDir = path.join(process.cwd(), 'tmp');
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
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      fs.writeFileSync(filePath, JSON.stringify(manifest, null, 2));
    });

    after(() => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });

    it('should return existing manifest values', async () => {
      try {
        const parsedManifest = getManifestData(process.cwd());
        assert.deepEqual(manifest, parsedManifest);
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
        assert(false);
      }
    });
  });
});
