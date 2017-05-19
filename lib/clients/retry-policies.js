/**
 * Aliases for useful retry policies.
 * See https://github.com/tim-kos/node-retry
 */


/**
 * Keep retrying forever, with an exponential backoff.
 */
var RETRY_FOREVER_EXPONENTIAL = {
  forever: true
};


/**
 * Same as {@link RETRY_FOREVER_EXPONENTIAL}, but capped at 30 minutes.
 */
var RETRY_FOREVER_EXPONENTIAL_CAPPED = {
  forever: true,
  maxTimeout: 30 * 60 * 1000
};


/**
 * Same as {@link RETRY_FOREVER_EXPONENTIAL_CAPPED}, but with randomization to
 * prevent stampeding herds.
 */
var RETRY_FOREVER_EXPONENTIAL_CAPPED_RANDOM = {
  forever: true,
  maxTimeout: 30 * 60 * 1000,
  randomize: true
};


/**
 * Short & sweet, five retries in five minutes and then bail.
 */
var FIVE_RETRIES_IN_FIVE_MINUTES = {
  retries: 5,
  factor: 3.86
};


/**
 * This policy is just to keep the tests running fast.
 */
var TEST_RETRY_POLICY = {
  minTimeout: 0,
  maxTimeout: 1
};


module.exports.RETRY_FOREVER_EXPONENTIAL = RETRY_FOREVER_EXPONENTIAL;
module.exports.RETRY_FOREVER_EXPONENTIAL_CAPPED = RETRY_FOREVER_EXPONENTIAL_CAPPED;
module.exports.RETRY_FOREVER_EXPONENTIAL_CAPPED_RANDOM = RETRY_FOREVER_EXPONENTIAL_CAPPED_RANDOM;
module.exports.FIVE_RETRIES_IN_FIVE_MINUTES = FIVE_RETRIES_IN_FIVE_MINUTES;
module.exports.TEST_RETRY_POLICY = TEST_RETRY_POLICY;

/**
 * Uses legacy RTM client options to make a retry policy.
 * @param {Object} opts
 * @param {Number} opts.maxReconnectionAttempts Maximum number of attempts before emitting error
 * @param {Number} opts.reconnectionBackoff     Time to wait between attempts
 */
module.exports.retryPolicyFromOptions = function retryPolicyFromOptions(opts) {
  return opts.maxReconnectionAttempts || opts.reconnectionBackoff ? {
    retries: opts.maxReconnectionAttempts || 10,
    minTimeout: opts.reconnectionBackoff || 3000,
    maxTimeout: opts.reconnectionBackoff || 3000
  } : null;
};
