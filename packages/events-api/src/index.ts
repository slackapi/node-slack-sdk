import { SlackEventAdapter, EventAdapterOptions } from './adapter';

export { verifyRequestSignature, errorCodes } from './http-handler';

/**
 * Creates a new {@link SlackEventAdapter}.
 */
export function createEventAdapter(signingSecret: string, options?: EventAdapterOptions): SlackEventAdapter {
  return new SlackEventAdapter(signingSecret, options);
}
