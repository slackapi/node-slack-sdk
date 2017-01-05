// TODO: expose error types
function bindMiddlewareToAdapter(adapter) {
  // eslint-disable-next-line no-param-reassign
  adapter.middleware = function slackEventAdapterMiddlware(req, res, next) {
    // Check that the request body has been parsed
    if (!req.body) {
      next(new Error('The incoming HTTP request did not have a parsed body.'));
      return;
    }

    // Handle event challenge
    if (req.body.type === 'url_verification') {
      if (req.body.token === adapter.verificationToken) {
        res.json({ challenge: req.body.challenge });
      } else {
        next(new Error('Slack token verification failed.'));
      }
      return;
    }

    // Handle event token verification
    if (req.body.token && req.body.token !== adapter.verificationToken) {
      next(new Error('Slack token verification failed.'));
      return;
    }

    adapter.emit(req.body.event.type, req.body.event);
  };
}

export default {
  bindMiddlewareToAdapter,
};
