/**
 * Aliases for useful retry policies.
 * See https://github.com/tim-kos/node-retry
 */


var FIVE_RETRIES_IN_FIVE_MINUTES = {
  retries: 5,
  factor: 3.86
};


var TEST_RETRY_POLICY = {
  minTimeout: 0,
  maxTimeout: 1
};


module.exports.FIVE_RETRIES_IN_FIVE_MINUTES = FIVE_RETRIES_IN_FIVE_MINUTES;
module.exports.TEST_RETRY_POLICY = TEST_RETRY_POLICY;
