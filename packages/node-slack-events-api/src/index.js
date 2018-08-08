import { errorCodes as adapterErrorCodes, SlackEventAdapter } from './adapter';

export const errorCodes = adapterErrorCodes;

export function createSlackEventAdapter(signingSecret, options) {
  return new SlackEventAdapter(signingSecret, options);
}
