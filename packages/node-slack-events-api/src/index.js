import { errorCodes as middlewareErrorCodes } from './express-middleware';
import SlackEventAdapter from './adapter';

export const errorCodes = middlewareErrorCodes;

export function createSlackEventAdapter(verificationToken, options) {
  return new SlackEventAdapter(verificationToken, options);
}
