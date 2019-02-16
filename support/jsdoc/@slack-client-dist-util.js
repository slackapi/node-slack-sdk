/** 
 * @module @slack/client/dist/util
 */

/**
 * Returns an agent (or false or undefined) for the specific scheme and option passed in
 * @param {string} scheme either 'http' or 'https'
 * @param {"undefined" | "undefined" | module:http.Agent | module:@slack/client/dist/util.__type} agentOption
 * @returns {undefined | "undefined" | "undefined" | module:http.Agent}
 */
export function agentForScheme() {}
/**
 * Reduce an asynchronous iterable into a single value.
 * @param {module:node_modules/typescript/lib/lib.esnext.asynciterable.AsyncIterable<module:@slack/client/dist/util.T>} iterable the async iterable to be reduced
 * @param {callback} callbackfn a function that implements one step of the reduction
 * @param {module:@slack/client/dist/util.U} initialValue the initial value for the accumulator
 * @returns {Promise<module:@slack/client/dist/util.U>}
 */
export function awaitAndReduce() {}
/**
 * Build a Promise that will resolve after the specified number of milliseconds.
 * @param {number} ms milliseconds to wait
 * @param {module:@slack/client/dist/util.T} value value for eventual resolution
 * @returns {Promise<module:@slack/client/dist/util.T>}
 */
export function delay() {}
/**
 * Returns the current User-Agent value for instrumentation
 * @returns {string}
 */
export function getUserAgent() {}
