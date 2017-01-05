import EventEmitter from 'events';
import http from 'http';
import isString from 'lodash.isstring';

export const errorCodes = {
  MIDDLEWARE_NOT_BOUND: 'SLACKEVENTADAPTER_MIDDLEWARE_NOT_BOUND',
};

// Private
function checkMiddlewareBound(adapter) {
  if (!adapter.middleware) {
    const error = new Error('An express server can only be created after this adapter has been bound to middleware');
    error.code = errorCodes.MIDDLEWARE_NOT_BOUND;
    throw error;
  }
}

export default class SlackEventAdapter extends EventEmitter {
  constructor(verificationToken) {
    if (!isString(verificationToken)) {
      throw new TypeError('SlackEventAdapter needs a verification token');
    }
    super();
    this.verificationToken = verificationToken;
  }

  // TODO: options (like https)
  expressServer() {
    return new Promise((resolve) => {
      checkMiddlewareBound(this);
      resolve();
    })
    .then(() => { // eslint-disable-line arrow-body-style
      return Promise.all([
        System.import('express'),
        System.import('body-parser'),
        // System.import('express'),
        // System.import('body-parser'),

        // The previous lines should be written as the comment following it, since `System.import()`
        // is going to disappear after dynamic imports land (https://github.com/tc39/proposal-dynamic-import).
        // There are two problems with using dynamic imports now:
        //   1. eslint's parser (espree) doesn't support parsing it, and while babel's parser can,
        //      using `babel-eslint` in order to delegate eslint's parsing to babel did not work.
        //   2. there are no babel transforms for this syntax that seem to work at the moment. the
        //      following was meant to work but ended up not working:
        //      https://github.com/pwmckenna/babel-plugin-transform-import-commonjs.
      ]);
    })
    .then(([express, bodyParser]) => {
      const app = express();
      app.use(bodyParser.json());
      app.post('/event', this.middleware);

      return http.createServer(app);
    });
  }

}
