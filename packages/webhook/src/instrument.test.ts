import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { addAppMetadata } from './index';
import { getUserAgent } from './instrument';

describe('@slack/webhook public exports', () => {
  it('exposes a working addAppMetadata from the package entry point', () => {
    // addAppMetadata must be reachable from the package's public API (./index) and the instrument function.
    addAppMetadata({ name: '@slack/slack-github-action', version: '3.0.3' });
    assert.ok(
      getUserAgent().includes('@slack:slack-github-action/3.0.3'),
      'addAppMetadata re-exported from ./index should affect the User-Agent',
    );
  });
});