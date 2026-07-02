import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { fiveRetriesInFiveMinutes, rapidRetryPolicy, tenRetriesInAboutThirtyMinutes } from './retry-policies';

describe('retry-policies', () => {
  it('fiveRetriesInFiveMinutes retries five times', () => {
    assert.strictEqual(fiveRetriesInFiveMinutes.retries, 5);
  });

  it('tenRetriesInAboutThirtyMinutes retries ten times', () => {
    assert.strictEqual(tenRetriesInAboutThirtyMinutes.retries, 10);
  });

  it('rapidRetryPolicy uses a tiny timeout', () => {
    assert.strictEqual(rapidRetryPolicy.minTimeout, 0);
    assert.strictEqual(rapidRetryPolicy.maxTimeout, 1);
  });
});
