import EventEmitter from 'events';
import http from 'http';
import isString from 'lodash.isstring';
import { createExpressMiddleware } from './express-middleware';

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
  }

  // TODO: options (like https)
  createServer() {
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
      app.post('/event', this.expressMiddleware());

      return http.createServer(app);
    });
  }

  start(port) {
    return this.createServer()
      .then(server => new Promise((resolve) => {
        server.listen(port, resolve);
      }));
  }

  expressMiddleware(middlewareOptions = {}) {
    return createExpressMiddleware(this, middlewareOptions);
  }

}
