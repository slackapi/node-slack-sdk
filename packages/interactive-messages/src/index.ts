import { SlackMessageAdapter, MessageAdapterOptions } from './adapter';
import { ErrorCode } from './errors';

/**
 * Dictionary of error codes that may appear on errors emitted from this package's objects
 */
export const errorCodes = {
  BODY_PARSER_NOT_PERMITTED: ErrorCode.BodyParserNotPermitted,
} as const;

/**
 * Factory method to create an instance of {@link SlackMessageAdapter}
 */
export function createMessageAdapter(signingSecret: string, options?: MessageAdapterOptions): SlackMessageAdapter {
  return new SlackMessageAdapter(signingSecret, options);
}
