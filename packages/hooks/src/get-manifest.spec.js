import { after, before, describe, it } from 'mocha';
import assert from 'assert';
import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';

const exec = util.promisify(childProcess.exec);

describe('get-manifest implementation', async () => {
  describe('missing project manifest file', async () => {
    it('should error if no manifest.json exists', async () => {
      try {
        await exec('./src/get-manifest.js');
      } catch (err) {
        if (err instanceof Error) {
          assert(err.message.includes('Error: Failed to find a manifest file in this project'));
          return;
        }
      }
      assert(false);
    });
  });

  describe('broken project manifest file exists', async () => {
    before(() => {
      const tempDir = path.join(process.cwd(), 'tmp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      const filePath = path.join(tempDir, 'manifest.json');
      fs.writeFileSync(filePath, '{');
    });

    after(() => {
      const tempDir = path.join(process.cwd(), 'tmp');
      const filePath = path.join(tempDir, 'manifest.json');
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });

    it('should error for invalid manifest.json', async () => {
      try {
        await exec('./src/get-manifest.js');
      } catch (err) {
        if (err instanceof Error) {
          const nodeV18Error = 'SyntaxError: Unexpected end of JSON input';
          const nodeV20Error = "SyntaxError: Expected property name or '}' in JSON at position 1";
          assert(err.message.includes(nodeV20Error) || err.message.includes(nodeV18Error));
          assert(err.message.includes('Error: Failed to parse the manifest file for this project'));
          return;
        }
      }
      assert(false);
    });
  });

  describe('contains project manifest file', async () => {
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
      const tempDir = path.join(process.cwd(), 'tmp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      const filePath = path.join(tempDir, 'manifest.json');
      fs.writeFileSync(filePath, JSON.stringify(manifest, null, 2));
    });

    after(() => {
      const tempDir = path.join(process.cwd(), 'tmp');
      const filePath = path.join(tempDir, 'manifest.json');
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });

    it('should return existing manifest values', async () => {
      try {
        const { stdout } = await exec('./src/get-manifest.js');
        const parsedManifest = JSON.parse(stdout);
        assert.deepEqual(manifest, parsedManifest);
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
        assert(false);
      }
    });
  });
});
