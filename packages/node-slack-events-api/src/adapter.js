import EventEmitter from 'events';
import http from 'http';
import isString from 'lodash.isstring';
import debugFactory from 'debug';
import { createExpressMiddleware } from './express-middleware';

const debug = debugFactory('@slack/events-api:adapter');

export default class SlackEventAdapter extends EventEmitter {
  constructor(verificationToken, options = {}) {
    if (!isString(verificationToken)) {
      throw new TypeError('SlackEventAdapter needs a verification token');
    }

    super();

    this.verificationToken = verificationToken;
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
    return Promise.resolve().then(() => Promise.all([
      System.import('express'),
      System.import('body-parser'),
      // import('express'),
      // import('body-parser'),

      // The previous lines should be written as the comment following it, since `System.import()`
      // is going to disappear after dynamic imports land (https://github.com/tc39/proposal-dynamic-import).
      // There are no babel transforms for this syntax that seem to work at the moment. The
      // following was meant to work but ended up not working:
      // https://github.com/pwmckenna/babel-plugin-transform-import-commonjs.
    ]))
    .then(([express, bodyParser]) => {
      const app = express();
      app.use(bodyParser.json());
      app.post(path, this.expressMiddleware());

      debug('server created - path: %s', path);

      return http.createServer(app);
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
    return createExpressMiddleware(this, middlewareOptions);
  }

}
