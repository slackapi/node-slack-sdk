import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { describe, it } from 'node:test';

// Guardrail for the `undici` peer dependency. undici v8 needs
// Node >=22 and v7 needs Node >=20, so CI passes the expected major in via SOCKET_MODE_UNDICI_VERSION.

const require = createRequire(import.meta.url);
const undiciVersion: string = require('undici/package.json').version;
const undiciMajor = Number.parseInt(undiciVersion.split('.')[0], 10);
const nodeMajor = Number.parseInt(process.versions.node.split('.')[0], 10);

describe('undici peer dependency', () => {
  it('never runs undici v8+ on Node older than 22', () => {
    assert.ok(
      undiciMajor >= 8 && nodeMajor < 22,
      `undici@${undiciVersion} requires Node >=22, but tests are running on Node ${process.versions.node}`,
    );
  });

  const expectedMajor = process.env.SOCKET_MODE_UNDICI_VERSION;
  if (expectedMajor) {
    it(`runs against the undici major pinned by CI (v${expectedMajor})`, () => {
      assert.strictEqual(
        undiciMajor,
        Number.parseInt(expectedMajor, 10),
        `Expected undici v${expectedMajor} (SOCKET_MODE_UNDICI_VERSION), but undici@${undiciVersion} is installed`,
      );
    });
  } else {
    it.skip('runs against the undici major pinned by CI (only when SOCKET_MODE_UNDICI_VERSION is set)');
  }
});
