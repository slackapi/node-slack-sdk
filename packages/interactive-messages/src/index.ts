import SlackMessageAdapter, { MessageAdapterOptions } from './adapter';
import { ErrorCode } from './errors';

export {
  ActionConstraints,
  ActionHandler,
  DispatchResult,
  MessageAdapterOptions,
  OptionsConstraints,
  OptionsHandler,
  Respond,
  ResponseStatus,
  ShortcutConstraints,
  ShortcutHandler,
  default as SlackMessageAdapter,
  ViewClosedHandler,
  ViewConstraints,
  ViewSubmissionHandler,
} from './adapter';
export { ErrorCode } from './errors';

/**
 * Dictionary of error codes that may appear on errors emitted from this package's objects
 */
export const errorCodes = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  BODY_PARSER_NOT_PERMITTED: ErrorCode.BodyParserNotPermitted,
} as const;
// TODO: export other error codes

/**
 * Factory method to create an instance of {@link SlackMessageAdapter}
 */
export function createMessageAdapter(signingSecret: string, options?: MessageAdapterOptions): SlackMessageAdapter {
  return new SlackMessageAdapter(signingSecret, options);
}
