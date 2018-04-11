import * as util from 'util';
import * as os from 'os';
import { Agent } from 'http';
import objectEntries = require('object.entries'); // tslint:disable-line:no-require-imports
const pkg = require('../package.json'); // tslint:disable-line:no-require-imports no-var-requires

/**
 * For when you need a function that does nothing
 */
export function noop(): void { } // tslint:disable-line:no-empty

/**
 * Replaces occurences of '/' with ':' in a string, since '/' is meaningful inside User-Agent strings as a separator.
 * @param s
 */
function replaceSlashes(s: string): string {
  return s.replace('/', ':');
}

const baseUserAgent = `${replaceSlashes(pkg.name)}/${pkg.version} ` +
                      `node/${process.version.replace('v', '')} ` +
                      `${os.platform()}/${os.release()}`;

const appMetadata: { [key: string]: string } = {};

/**
 * Appends the app metadata into the User-Agent value
 * @param appMetadata
 * @param appMetadata.name name of tool to be counted in instrumentation
 * @param appMetadata.version version of tool to be counted in instrumentation
 */
export function addAppMetadata({ name, version }: { name: string, version: string }): void {
  appMetadata[replaceSlashes(name)] = version;
}

/**
 * Returns the current User-Agent value for instrumentation
 */
export function getUserAgent(): string {
  const appIdentifier = objectEntries(appMetadata).map(([name, version]) => `${name}/${version}`).join(' ');
  // only prepend the appIdentifier when its not empty
  return ((appIdentifier.length > 0) ? `${appIdentifier} ` : '') + baseUserAgent;
}

/**
 * The following is a polyfill of Node >= 8.2.0's util.callbackify method. The source is copied (with some
 * modification) from:
 * https://github.com/nodejs/node/blob/bff5d5b8f0c462880ef63a396d8912d5188bbd31/lib/util.js#L1095-L1140
 * The modified parts are denoted using comments starting with `original` and ending with `modified`
 * This could really be made an independent module. It was suggested here: https://github.com/js-n/callbackify/issues/5
 */
// tslint:disable-next-line:typedef
export const callbackify = util.callbackify !== undefined ? util.callbackify : (function () {
  // Need polyfill of Object.getOwnPropertyDescriptors
  // tslint:disable
  require('object.getownpropertydescriptors').shim();

  // This function is a shallow stub of what the real function does, but we cannot import from `internal/errors`
  // @ts-ignore
  function makeNodeError(type, code) {
    const e = new type();
    e.code = code;
    return e;
  }

  // @ts-ignore
  function callbackifyOnRejected(reason, cb) {
    // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
    // Because `null` is a special error value in callbacks which means "no error
    // occurred", we error-wrap so the callback consumer can distinguish between
    // "the promise rejected with null" or "the promise fulfilled with undefined".
    if (!reason) {
      // original
      // const newReason = new errors.Error('FALSY_VALUE_REJECTION');
      // modified
      const newReason = makeNodeError(Error, 'FALSY_VALUE_REJECTION');
      newReason.reason = reason;
      reason = newReason;
      Error.captureStackTrace(reason, callbackifyOnRejected);
    }
    return cb(reason);
  }


  // @ts-ignore
  function callbackify(original) {
    if (typeof original !== 'function') {
      // original
      // throw new TypeError(
      //   'ERR_INVALID_ARG_TYPE',
      //   'original',
      //   'function');
      // modified
      throw makeNodeError(TypeError, 'ERR_INVALID_ARG_TYPE');
    }

    // We DO NOT return the promise as it gives the user a false sense that
    // the promise is actually somehow related to the callback's execution
    // and that the callback throwing will reject the promise.
    // @ts-ignore
    function callbackified(...args) {
      const maybeCb = args.pop();
      if (typeof maybeCb !== 'function') {
        // original
        // throw new errors.TypeError(
        //   'ERR_INVALID_ARG_TYPE',
        //   'last argument',
        //   'function');
        // modified
        throw makeNodeError(TypeError, 'ERR_INVALID_ARG_TYPE');
      }
      // @ts-ignore
      const cb = (...args) => { Reflect.apply(maybeCb, this, args); };
      // In true node style we process the callback on `nextTick` with all the
      // implications (stack, `uncaughtException`, `async_hooks`)
      // @ts-ignore
      Reflect.apply(original, this, args)
        // @ts-ignore
        .then((ret) => process.nextTick(cb, null, ret),
              // @ts-ignore
              (rej) => process.nextTick(callbackifyOnRejected, rej, cb));
    }

    Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
    Object.defineProperties(callbackified,
                            // @ts-ignore (installed with polyfill)
                            Object.getOwnPropertyDescriptors(original));
    return callbackified;
  }

  // tslint:enable
  return callbackify;
}() as typeof util.callbackify);

export type AgentOption = Agent | {
  http?: Agent,
  https?: Agent,
} | boolean;

// This interface is a subset of the options in SecureContextOptions from the node lib
// tslint:disable:prefer-array-literal
export interface TLSOptions {
  pfx?: string | Buffer | Array<string | Buffer | Object>;
  key?: string | Buffer | Array<Buffer | Object>;
  passphrase?: string;
  cert?: string | Buffer | Array<string | Buffer>;
  ca?: string | Buffer | Array<string | Buffer>;
}
// tslint:enable:prefer-array-literal
