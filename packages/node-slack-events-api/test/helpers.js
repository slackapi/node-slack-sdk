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
  var hmac = crypto.createHmac('sha256', signingSecret);
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
    'content-type': 'application/json'
  };
  return {
    body: rawBody,
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

function completionAggregator(done, totalParts) {
  var completedParts = 0;
  var errorSeen = null;
  return function partiallyComplete(error) {
    if (errorSeen) return;
    if (error) {
      errorSeen = error;
      done(error);
    } else {
      completedParts += 1;
      if (completedParts === totalParts) {
        done();
      }
    }
  };
}

module.exports.createRequest = createRequest;
module.exports.createRequestSignature = createRequestSignature;
module.exports.createStreamRequest = createStreamRequest;
exports.completionAggregator = completionAggregator;
