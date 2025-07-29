import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { after, before, describe, it } from 'mocha';

import getManifestData from './get-manifest.js';

describe('get-manifest implementation', async () => {
  describe('missing project manifest file', async () => {
    it('should error if no manifest.json exists', async () => {
      try {
        getManifestData(process.cwd());
      } catch (err) {
        if (err instanceof Error) {
          assert(err.message.includes('Failed to find a manifest.json file in this project'));
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
        console.error(err);
        assert(false);
      }
    });
  });

  describe('custom manifest filename', async () => {
    const tempDir = path.join(process.cwd(), 'tmp');
    const slackDir = path.join(tempDir, 'slack');
    const configPath = path.join(slackDir, 'config.json');
    const customFilePath = path.join(tempDir, 'custom-manifest.json');
    const manifest = {
      display_information: {
        name: 'Custom manifest app',
      },
    };

    before(() => {
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      if (!fs.existsSync(slackDir)) {
        fs.mkdirSync(slackDir);
      }
    });

    after(() => {
      if (fs.existsSync(customFilePath)) {
        fs.unlinkSync(customFilePath);
      }
      if (fs.existsSync(configPath)) {
        fs.unlinkSync(configPath);
      }
      if (fs.existsSync(slackDir)) {
        fs.rmSync(slackDir, { recursive: true });
      }
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });

    it('should use custom manifest filename from config', async () => {
      const config = {
        manifest: {
          filename: 'custom-manifest.json',
        },
      };

      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      fs.writeFileSync(customFilePath, JSON.stringify(manifest, null, 2));

      try {
        const parsedManifest = getManifestData(tempDir);
        assert.deepEqual(manifest, parsedManifest);
      } catch (err) {
        console.error(err);
        assert(false);
      }
    });

    it('should handle missing custom manifest file', async () => {
      const config = {
        manifest: {
          filename: 'missing-manifest.json',
        },
      };

      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

      try {
        getManifestData(tempDir);
        assert(false, 'Should have thrown an error');
      } catch (err) {
        if (err instanceof Error) {
          assert(err.message.includes('Failed to find a missing-manifest.json file in this project'));
          return;
        }
        assert(false);
      }
    });

    it('should handle malformed config file gracefully', async () => {
      const defaultManifestPath = path.join(tempDir, 'manifest.json');

      fs.writeFileSync(configPath, '{invalid json');
      fs.writeFileSync(defaultManifestPath, JSON.stringify(manifest, null, 2));

      try {
        const parsedManifest = getManifestData(tempDir);
        assert.deepEqual(manifest, parsedManifest);

        if (fs.existsSync(defaultManifestPath)) {
          fs.unlinkSync(defaultManifestPath);
        }
      } catch (err) {
        console.error(err);
        assert(false);
      }
    });

    it('should handle config without manifest property', async () => {
      const defaultManifestPath = path.join(tempDir, 'manifest.json');
      const config = {
        other_setting: 'value',
      };

      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      fs.writeFileSync(defaultManifestPath, JSON.stringify(manifest, null, 2));

      try {
        const parsedManifest = getManifestData(tempDir);
        assert.deepEqual(manifest, parsedManifest);

        if (fs.existsSync(defaultManifestPath)) {
          fs.unlinkSync(defaultManifestPath);
        }
      } catch (err) {
        console.error(err);
        assert(false);
      }
    });

    it('should handle config with manifest property but no filename', async () => {
      const defaultManifestPath = path.join(tempDir, 'manifest.json');
      const config = {
        manifest: {
          other_setting: 'value',
        },
      };

      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      fs.writeFileSync(defaultManifestPath, JSON.stringify(manifest, null, 2));

      try {
        const parsedManifest = getManifestData(tempDir);
        assert.deepEqual(manifest, parsedManifest);

        if (fs.existsSync(defaultManifestPath)) {
          fs.unlinkSync(defaultManifestPath);
        }
      } catch (err) {
        console.error(err);
        assert(false);
      }
    });
  });
});
