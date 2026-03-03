import assert from 'node:assert/strict';
import { describe, it, afterEach } from 'node:test';

import sinon from 'sinon';

import { SlackCLI, SlackTracerId } from '.';

describe('main module', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe('exports', () => {
    it('should export a SlackCLI object', () => {
      assert.strictEqual(typeof SlackCLI, 'object');
    });
    it('should export a SlackTracerId object', () => {
      assert.strictEqual(typeof SlackTracerId, 'object');
    });
  });
});
