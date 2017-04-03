import { errorCodes as middlewareErrorCodes } from './express-middleware';
import SlackMessageAdapter from './adapter';

export const errorCodes = middlewareErrorCodes;

export function createSlackMessageAdapter(verificationToken, options) {
  return new SlackMessageAdapter(verificationToken, options);
}
