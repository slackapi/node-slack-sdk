import { SlackEventAdapter, EventAdapterOptions } from './adapter';

export {
  CodedError,
  ErrorCode,
  errorCodes,
  verifyRequestSignature,
  VerifyRequestSignatureParams,
} from './http-handler';
export { SlackEventAdapter, EventAdapterOptions } from './adapter';

/**
 * Creates a new {@link SlackEventAdapter}.
 */
export function createEventAdapter(signingSecret: string, options?: EventAdapterOptions): SlackEventAdapter {
  return new SlackEventAdapter(signingSecret, options);
}
