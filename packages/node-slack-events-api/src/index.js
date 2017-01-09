import middleware, { errorCodes as middlewareErrorCodes } from './middleware';
import SlackEventAdapter, { errorCodes as adapterErrorCodes } from './adapter';

export const errorCodes = { middleware: middlewareErrorCodes, adapter: adapterErrorCodes };

export default function createSlackEventDispatcher(verificationToken, options) {
  const adapter = new SlackEventAdapter(verificationToken, options);
  middleware.bindMiddlewareToAdapter(adapter);
  return adapter;
}
