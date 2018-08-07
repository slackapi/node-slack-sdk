import { errorCodes as requestListenerErrorCodes } from './http-handler';
import SlackEventAdapter from './adapter';

export const errorCodes = requestListenerErrorCodes;

export function createSlackEventAdapter(signingSecret, options) {
  return new SlackEventAdapter(signingSecret, options);
}
