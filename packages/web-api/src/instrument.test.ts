import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { afterEach, describe, it } from 'node:test';

const require = createRequire(import.meta.url);

function isLatin1Safe(s: string): boolean {
  return Buffer.from(s, 'latin1').toString('latin1') === s;
}

describe('instrument', () => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(process, 'title');
  const modulePath = require.resolve('./instrument.ts');

  afterEach(() => {
    // Restore the original process.title property
    if (originalDescriptor) {
      Object.defineProperty(process, 'title', originalDescriptor);
    }
    // Clear module cache so next require gets a fresh evaluation
    delete require.cache[modulePath];
  });

  function mockProcessTitle(title: string): void {
    Object.defineProperty(process, 'title', {
      get: () => title,
      configurable: true,
    });
  }

  /**
   * Returns a fresh import of the instrument module. Since `baseUserAgent` is computed at module
   * load time, we clear the require cache and re-require to pick up a mocked `process.title`.
   */
  function freshImport(): typeof import('./instrument') {
    delete require.cache[modulePath];
    return require(modulePath);
  }

  describe('getUserAgent', () => {
    it('should contain the package name', () => {
      const { getUserAgent } = freshImport();
      const ua = getUserAgent();
      assert.ok(ua.includes('@slack:web-api'), `User-Agent should contain @slack:web-api: ${ua}`);
    });

    it('should include an ASCII process.title in the user agent', () => {
      mockProcessTitle('node');
      const { getUserAgent } = freshImport();
      const ua = getUserAgent();
      assert.ok(ua.includes('node/'), `User-Agent should contain node/: ${ua}`);
      assert.ok(isLatin1Safe(ua));
    });

    it('should include other ASCII process.title in the user agent', () => {
      mockProcessTitle('openclaw-gateway');
      const { getUserAgent } = freshImport();
      const ua = getUserAgent();
      assert.ok(ua.includes('openclaw-gateway/'), `User-Agent should contain openclaw-gateway/: ${ua}`);
      assert.ok(isLatin1Safe(ua));
    });

    it('should return a Latin-1 safe user agent when process.title contains non-Latin-1 characters', () => {
      const notLatin1SafeTitle = '管理者: Windows PowerShell';
      assert.strictEqual(isLatin1Safe(notLatin1SafeTitle), false);

      mockProcessTitle(notLatin1SafeTitle);
      const { getUserAgent } = freshImport();
      const ua = getUserAgent();
      assert.ok(isLatin1Safe(ua), `User-Agent contains non-Latin-1 characters: ${ua}`);
      assert.ok(!ua.includes(notLatin1SafeTitle), 'User-Agent should not contain raw non-ASCII characters');
      assert.ok(
        ua.includes('%E7%AE%A1%E7%90%86%E8%80%85: Windows PowerShell'),
        'User-Agent should percent-encode only non-Latin-1 characters',
      );
    });

    it('should preserve Latin-1 characters in process.title', () => {
      mockProcessTitle('café');
      const { getUserAgent } = freshImport();
      const ua = getUserAgent();
      assert.ok(ua.includes('café/'), `User-Agent should preserve Latin-1 characters: ${ua}`);
      assert.ok(isLatin1Safe(ua));
    });
  });
});
