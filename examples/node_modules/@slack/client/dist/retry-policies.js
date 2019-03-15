"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Keep retrying forever, with an exponential backoff.
 */
exports.retryForeverExponential = {
    forever: true,
};
/**
 * Same as {@link retryForeverExponential}, but capped at 30 minutes.
 * TODO: should this name really have "forever" in it? if not, remove from all the derived names below
 */
exports.retryForeverExponentialCapped = Object.assign({}, exports.retryForeverExponential, {
    maxTimeout: 30 * 60 * 1000,
});
/**
 * Same as {@link retryForeverExponentialCapped}, but with randomization to
 * prevent stampeding herds.
 */
exports.retryForeverExponentialCappedRandom = Object.assign({}, exports.retryForeverExponentialCapped, {
    randomize: true,
});
/**
 * Short & sweet, five retries in five minutes and then bail.
 */
exports.fiveRetriesInFiveMinutes = {
    retries: 5,
    factor: 3.86,
};
/**
 * This policy is just to keep the tests running fast.
 */
// SEMVER:MAJOR changing the name of this policy
exports.rapidRetryPolicy = {
    minTimeout: 0,
    maxTimeout: 1,
};
// SEMVER:MAJOR: removed retryPolicyFromOptions()
const policies = {
    retryForeverExponential: exports.retryForeverExponential,
    retryForeverExponentialCapped: exports.retryForeverExponentialCapped,
    retryForeverExponentialCappedRandom: exports.retryForeverExponentialCappedRandom,
    fiveRetriesInFiveMinutes: exports.fiveRetriesInFiveMinutes,
    rapidRetryPolicy: exports.rapidRetryPolicy,
};
exports.default = policies;
//# sourceMappingURL=retry-policies.js.map