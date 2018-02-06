/**
 * Aliases for useful retry policies.
 * See https://github.com/tim-kos/node-retry
 */
import { OperationOptions } from 'retry';

// SEMVER:MAJOR renaming exports to camelCase

/**
 * Keep retrying forever, with an exponential backoff.
 */
export const retryForeverExponential: OperationOptions = {
  forever: true,
};


/**
 * Same as {@link retryForeverExponential}, but capped at 30 minutes.
 */
export const retryForeverExponentialCapped: OperationOptions = Object.assign({}, retryForeverExponential, {
  maxTimeout: 30 * 60 * 1000,
});


/**
 * Same as {@link retryForeverExponentialCapped}, but with randomization to
 * prevent stampeding herds.
 */
export const retryForeverExponentialCappedRandom: OperationOptions = Object.assign({}, retryForeverExponentialCapped, {
  randomize: true,
});


/**
 * Short & sweet, five retries in five minutes and then bail.
 */
export const fiveRetriesInFiveMinutes: OperationOptions = {
  retries: 5,
  factor: 3.86,
};


/**
 * This policy is just to keep the tests running fast.
 */
// SEMVER:MAJOR changing the name of this policy
export const rapidRetryPolicy: OperationOptions = {
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
