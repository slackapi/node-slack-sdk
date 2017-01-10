import { errorCodes as middlewareErrorCodes } from './express-middleware';
import SlackEventAdapter, { errorCodes as adapterErrorCodes } from './adapter';

// TODO: merge these into one
export const errorCodes = { middleware: middlewareErrorCodes, adapter: adapterErrorCodes };

export default function createSlackEventAdapter(verificationToken, options) {
  return new SlackEventAdapter(verificationToken, options);
}
