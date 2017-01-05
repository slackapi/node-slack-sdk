import middleware from './middleware';
import SlackEventAdapter from './adapter';

export default function createSlackEventDispatcher(verificationToken) {
  const adapter = new SlackEventAdapter(verificationToken);
  middleware.bindMiddlewareToAdapter(adapter);
  return adapter;
}
