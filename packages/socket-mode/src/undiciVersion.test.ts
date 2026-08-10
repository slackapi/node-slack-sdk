import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { describe, it } from 'node:test';

// This is a guardrail, not a behavioral test. `@slack/socket-mode` supports undici
// as a peer dependency across two majors (`^7.0.0 || ^8.0.0`), but the two majors do
// not run on the same Node.js versions: undici v8 requires Node >=22.19.0, while
// undici v7 runs on Node >=20. CI pairs each Node row with a specific undici major
// (see the `versions` matrix in .github/workflows/ci-build.yml) and exposes the
// expected major via SOCKET_MODE_EXPECT_UNDICI_MAJOR. This test verifies that the
// undici actually resolved at runtime matches that pairing, so we never ship
// "supports v8" without having run the suite against v8 on a capable Node.

const require = createRequire(import.meta.url);

// The lowest Node.js version undici v8 supports (its own `engines.node`).
const UNDICI_V8_MIN_NODE = '22.19.0';

// Read the major of the undici that is actually installed and resolvable from this
// package, rather than trusting the declared range — this reflects what the source,
// integration tests, and WHATWG event classes import via the bare 'undici' specifier.
const undiciVersion: string = require('undici/package.json').version;
const undiciMajor = Number.parseInt(undiciVersion.split('.')[0], 10);

// Dependency-free numeric version comparison. `semver` is only transitively available,
// so we avoid importing it. `process.versions.node` is "MAJOR.MINOR.PATCH"; any
// pre-release suffix on the patch segment parses down to its leading integer.
function nodeAtLeast(target: string): boolean {
  const actual = process.versions.node.split('.').map((part) => Number.parseInt(part, 10));
  const min = target.split('.').map((part) => Number.parseInt(part, 10));
  for (let i = 0; i < min.length; i++) {
    const a = actual[i] ?? 0;
    if (a !== min[i]) {
      return a > min[i];
    }
  }
  return true;
}

describe('undici peer dependency', () => {
  // Safety invariant — runs in every environment (local and CI). It can only fail on
  // the genuinely broken combination of undici v8+ on a Node older than 22.19.0.
  it('never pairs undici v8+ with a Node.js version older than 22.19.0', () => {
    const brokenCombo = undiciMajor >= 8 && !nodeAtLeast(UNDICI_V8_MIN_NODE);
    assert.ok(
      !brokenCombo,
      `undici@${undiciVersion} requires Node >=${UNDICI_V8_MIN_NODE}, but the tests are running on Node ${process.versions.node}`,
    );
  });

  // Strict pairing — enforced only when CI pins the expected major via the matrix.
  // This is the "recent Node runs the latest undici" guarantee: it proves Node 20 ran
  // on v7 and Node 22/24/26 ran on v8. Skipped locally so a plain `npm test` after
  // `npm ci` (which installs the v7 dev default) never fails.
  const expectedMajor = process.env.SOCKET_MODE_EXPECT_UNDICI_MAJOR;
  if (expectedMajor) {
    it(`runs against the undici major pinned by CI (undici v${expectedMajor})`, () => {
      assert.strictEqual(
        undiciMajor,
        Number.parseInt(expectedMajor, 10),
        `Expected socket-mode to run against undici v${expectedMajor} (from SOCKET_MODE_EXPECT_UNDICI_MAJOR), but undici@${undiciVersion} is installed`,
      );
    });
  } else {
    it.skip('runs against the undici major pinned by CI (only enforced when SOCKET_MODE_EXPECT_UNDICI_MAJOR is set)');
  }
});
