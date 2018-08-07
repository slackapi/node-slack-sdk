import EventEmitter from 'events';
import http from 'http';
import isString from 'lodash.isstring';
import debugFactory from 'debug';
import { createHTTPHandler } from './http-handler';

const debug = debugFactory('@slack/events-api:adapter');

export const errorCodes = {
  BODY_PARSER_NOT_PERMITTED: 'SLACKADAPTER_BODY_PARSER_NOT_PERMITTED_FAILURE',
};

export default class SlackEventAdapter extends EventEmitter {
  constructor(signingSecret, options = {}) {
    if (!isString(signingSecret)) {
      throw new TypeError('SlackEventAdapter needs a verification token');
    }

    super();

    this.signingSecret = signingSecret;
    this.includeBody = !!options.includeBody || false;
    this.includeHeaders = !!options.includeHeaders || false;
    this.waitForResponse = !!options.waitForResponse || false;

    debug('adapter instantiated - options: %o', {
      includeBody: this.includeBody,
      includeHeaders: this.includeHeaders,
      waitForResponse: this.waitForResponse,
    });
  }

  // TODO: options (like https)
  createServer(path = '/slack/events') {
    // NOTE: this is a workaround for a shortcoming of the System.import() tranform
    return Promise.resolve().then(() => {
      debug('server created - path: %s', path);

      return http.createServer(this.requestListener());
    });
  }

  start(port) {
    return this.createServer()
      .then(server => new Promise((resolve, reject) => {
        this.server = server;
        server.on('error', reject);
        server.listen(port, () => resolve(server));
        debug('server started - port: %s', port);
      }));
  }

  stop() {
    return new Promise((resolve, reject) => {
      if (this.server) {
        this.server.close((error) => {
          delete this.server;
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      } else {
        reject(new Error('SlackEventAdapter cannot stop when it did not start a server'));
      }
    });
  }

  expressMiddleware(middlewareOptions = {}) {
    const requestListener = this.requestListener(middlewareOptions);
    return (req, res, next) => {
      // If parser is being used, we can't verify request signature
      if (req.body) {
        const error = new Error('Parsing request body prohibits request signature verification');
        error.code = errorCodes.BODY_PARSER_NOT_PERMITTED;
        next(error);
        return;
      }
      requestListener(req, res);
    };
  }

  requestListener(middlewareOptions = {}) {
    return createHTTPHandler(this, middlewareOptions);
  }

}
