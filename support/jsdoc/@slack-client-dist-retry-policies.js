/** 
 * @module @slack/client/dist/retry-policies
 */

/**
 * * Short & sweet, five retries in five minutes and then bail.
 * @type {module:@slack/client.RetryOptions}
 * @constant
 */
export var fiveRetriesInFiveMinutes
/**
 * * This policy is just to keep the tests running fast.
 * @type {module:@slack/client.RetryOptions}
 * @constant
 */
export var rapidRetryPolicy
/**
 * * Keep retrying forever, with an exponential backoff.
 * @type {module:@slack/client.RetryOptions}
 * @constant
 */
export var retryForeverExponential
/**
 * * Same as {@link retryForeverExponential}, but capped at 30 minutes.
 * * TODO: should this name really have "forever" in it? if not, remove from all the derived names below
 * @type {module:@slack/client.RetryOptions}
 * @constant
 */
export var retryForeverExponentialCapped
/**
 * * Same as {@link retryForeverExponentialCapped}, but with randomization to
 * * prevent stampeding herds.
 * @type {module:@slack/client.RetryOptions}
 * @constant
 */
export var retryForeverExponentialCappedRandom
