import { OperationOptions } from 'retry';
/**
 * Options to create retry policies. Extends from https://github.com/tim-kos/node-retry.
 */
export interface RetryOptions extends OperationOptions {
}
/**
 * Keep retrying forever, with an exponential backoff.
 */
export declare const retryForeverExponential: RetryOptions;
/**
 * Same as {@link retryForeverExponential}, but capped at 30 minutes.
 * TODO: should this name really have "forever" in it? if not, remove from all the derived names below
 */
export declare const retryForeverExponentialCapped: RetryOptions;
/**
 * Same as {@link retryForeverExponentialCapped}, but with randomization to
 * prevent stampeding herds.
 */
export declare const retryForeverExponentialCappedRandom: RetryOptions;
/**
 * Short & sweet, five retries in five minutes and then bail.
 */
export declare const fiveRetriesInFiveMinutes: RetryOptions;
/**
 * This policy is just to keep the tests running fast.
 */
export declare const rapidRetryPolicy: RetryOptions;
declare const policies: {
    retryForeverExponential: RetryOptions;
    retryForeverExponentialCapped: RetryOptions;
    retryForeverExponentialCappedRandom: RetryOptions;
    fiveRetriesInFiveMinutes: RetryOptions;
    rapidRetryPolicy: RetryOptions;
};
export default policies;
