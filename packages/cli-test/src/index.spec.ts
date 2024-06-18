import { assert } from 'chai';
import sinon from 'sinon';

import { SlackCLI, SlackTracerId } from '.';

describe('main module', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe('exports', () => {
    it('should export a SlackCLI object', () => {
      assert.isObject(SlackCLI);
    });
    it('should export a SlackTracerId object', () => {
      assert.isObject(SlackTracerId);
    });
  });
});
