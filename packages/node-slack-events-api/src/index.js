import { errorCodes as adapterErrorCodes, SlackEventAdapter } from './adapter';

export { verifyRequestSignature } from './http-handler';
export const errorCodes = adapterErrorCodes;

export function createEventAdapter(signingSecret, options) {
  return new SlackEventAdapter(signingSecret, options);
}
