var crypto = require('crypto');
var Readable = require('stream').Readable;

var requestSigningVersion = 'v0';

/**
 * Creates request object with proper headers
 * @param {string} signingSecret - A Slack signing secret
 * @param {Integer} ts - Timestamp of request
 * @param {string} rawBody - String of raw body
 * @returns {string} request signature for header
 */
function createRequestSignature(signingSecret, ts, rawBody) {
  const hmac = crypto.createHmac('sha256', signingSecret);
  hmac.update(`${requestSigningVersion}:${ts}:${rawBody}`);
  return `${requestSigningVersion}=${hmac.digest('hex')}`;
}

/**
 * Creates request object with proper headers
 * @param {string} signingSecret - A Slack signing secret for request verification
 * @param {Integer} ts - A timestamp for request verification and header
 * @param {string} rawBody - String of raw body to be passed in request
 * @returns {Object} pseudo request object
 */
function createRequest(signingSecret, ts, rawBody) {
  const signature = createRequestSignature(signingSecret, ts, rawBody);
  const headers = {
    'x-slack-signature': signature,
    'x-slack-request-timestamp': ts,
    'content-type': 'application/x-www-form-urlencoded'
  };
  return {
    headers: headers
  };
}

/**
 * Creates request object with proper headers and a rawBody field payload
 * @param {string} signingSecret - A Slack signing secret for request verification
 * @param {Integer} ts - A timestamp for request verification and header
 * @param {string} rawBody - String of raw body to be put in rawBody field
 * @returns {Object} pseudo request object
 */
function createRawBodyRequest(signingSecret, ts, rawBody) {
  const signature = createRequestSignature(signingSecret, ts, rawBody);
  const headers = {
    'x-slack-signature': signature,
    'x-slack-request-timestamp': ts,
    'content-type': 'application/json'
  };
  return {
    rawBody: Buffer.from(rawBody),
    headers: headers
  };
}

/**
 * Creates a readable stream of a request
 * @param {string} signingSecret - A Slack signing secret for request verification
 * @param {Integer} ts - A timestamp for request verification and header
 * @param {string} rawBody - String of raw body to be passed in request
 * @returns {ReadableStream}
 */
function createStreamRequest(signingSecret, ts, rawBody) {
  const signature = createRequestSignature(signingSecret, ts, rawBody);

  const fakeRequest = new Readable({
    read() {
      this.push(rawBody);
      this.push(null);
    }
  });
  fakeRequest.headers = {
    'x-slack-signature': signature,
    'x-slack-request-timestamp': ts,
    'content-type': 'application/x-www-form-urlencoded'
  };

  return fakeRequest;
}

/* global Promise */

/**
 * Returns a Promise that resolves or rejects in approximately the specified amount of time with
 * the specified value or error reason.
 * @param {number} ms time in milliseconds in which to resolve or reject. Zero is a special value which creates a
 * Promise that resolves or rejects as soon as possible.
 * @param {*} value value used for resolve
 * @param {string} [rejectionReason] reason used for rejection
 * @returns {Promise<*>} a promise of the value type
 */
function delayed(ms, value, rejectionReason) {
  var error;
  if (rejectionReason) {
    error = new Error(rejectionReason);
  }
  return new Promise(function (resolve, reject) {
    if (ms > 0) {
      var id = setTimeout(function () {
        clearTimeout(id);
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      }, ms);
    } else if (ms === 0) {
      // setImmediate allows the returned Promise to resolve much sooner than setTimeout.
      // See: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#setimmediate-vs-settimeout
      setImmediate(() => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    } else {
      reject(new Error('Cannot delay for a negative amount of time'));
    }
  });
}

module.exports.createRequest = createRequest;
module.exports.createRawBodyRequest = createRawBodyRequest;
module.exports.createRequestSignature = createRequestSignature;
module.exports.createStreamRequest = createStreamRequest;
module.exports.delayed = delayed;

