import { errorCodes as middlewareErrorCodes } from './express-middleware';
import SlackEventAdapter from './adapter';

// TODO: merge these into one
export const errorCodes = middlewareErrorCodes;

export default function createSlackEventAdapter(verificationToken, options) {
  return new SlackEventAdapter(verificationToken, options);
}
