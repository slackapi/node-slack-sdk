import { OperationOptions } from 'retry';

// SEMVER:MAJOR renaming exports to camelCase

/**
 * Options to create retry policies. Extends from https://github.com/tim-kos/node-retry.
 */
export interface RetryOptions extends OperationOptions {
}

/**
 * Keep retrying forever, with an exponential backoff.
 */
export const retryForeverExponential: RetryOptions = {
  forever: true,
};


/**
 * Same as {@link retryForeverExponential}, but capped at 30 minutes.
 * TODO: should this name really have "forever" in it? if not, remove from all the derived names below
 */
export const retryForeverExponentialCapped: RetryOptions = Object.assign({}, retryForeverExponential, {
  maxTimeout: 30 * 60 * 1000,
});


/**
 * Same as {@link retryForeverExponentialCapped}, but with randomization to
 * prevent stampeding herds.
 */
export const retryForeverExponentialCappedRandom: RetryOptions = Object.assign({}, retryForeverExponentialCapped, {
  randomize: true,
});


/**
 * Short & sweet, five retries in five minutes and then bail.
 */
export const fiveRetriesInFiveMinutes: RetryOptions = {
  retries: 5,
  factor: 3.86,
};


/**
 * This policy is just to keep the tests running fast.
 */
// SEMVER:MAJOR changing the name of this policy
export const rapidRetryPolicy: RetryOptions = {
  minTimeout: 0,
  maxTimeout: 1,
};

// SEMVER:MAJOR: removed retryPolicyFromOptions()

const policies = {
  retryForeverExponential,
  retryForeverExponentialCapped,
  retryForeverExponentialCappedRandom,
  fiveRetriesInFiveMinutes,
  rapidRetryPolicy,
};

export default policies;
