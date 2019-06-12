/**
 * @module @slack/interactive-messages
 */

import { SlackMessageAdapter, MessageAdapterOptions } from './adapter';
import { ErrorCode } from './errors';

/**
 * Dictionary of error codes that may appear on errors emitted from this package's objects
 * @readonly
 * @enum {string}
 */
export const errorCodes = {
  BODY_PARSER_NOT_PERMITTED: ErrorCode.BodyParserNotPermitted,
};

/**
 * Factory method to create an instance of {@link module:adapter~SlackMessageAdapter}
 *
 * @param {string} signingSecret
 * @param {Object} options
 * @returns {module:adapter~SlackMessageAdapter}
 */
export function createMessageAdapter(signingSecret: string, options?: MessageAdapterOptions): SlackMessageAdapter {
  return new SlackMessageAdapter(signingSecret, options);
}
