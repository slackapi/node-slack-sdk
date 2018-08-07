/**
 * @module @slack/interactive-messages
 */
import { SlackMessageAdapter, errorCodes as adapterErrorCodes } from './adapter';

/**
 * Dictionary of error codes that may appear on errors emitted from this package's objects
 * @readonly
 * @enum {string}
 */
export const errorCodes = adapterErrorCodes;

/**
 * Factory method to create an instance of {@link module:adapter~SlackMessageAdapter}
 *
 * @param {string} verificationToken
 * @param {Object} options
 * @returns {module:adapter~SlackMessageAdapter}
 */
export function createMessageAdapter(signingSecret, options) {
  return new SlackMessageAdapter(signingSecret, options);
}
