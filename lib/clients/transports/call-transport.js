// For some reason, I can't turn this off only for functions, so suppress all cases
/* eslint no-use-before-define: 0 */

/**
 * Worker functions for making requests to Slack's API.
 */

var partial = require('lodash').partial;

var WEB_CLIENT_EVENTS = require('../events/client').WEB;


/**
 *
 * @param err
 * @param retryOp
 * @param apiCb
 * @returns {boolean}
 */
var handleTransportError = function handleTransportError(err, retryOp, apiCb) {
  if (!retryOp.retry(err)) {
    apiCb(retryOp.mainError(), null);
    return true;
  }

  return false;
};


/**
 *
 * @param retryArgs
 * @param headers
 * @returns {boolean}
 */
var handleRateLimitResponse = function handleRateLimitResponse(retryArgs, headers) {
  var client = retryArgs.client;
  var retryAfter = parseInt(headers['retry-after'], 10);
  var headerSecs = Number.isInteger(retryAfter) ? retryAfter : 60;
  var headerMs = headerSecs * 1000;
  client.logger('info', 'Rate limited, will retry %s seconds', headerSecs);

  client.requestQueue.pause();

  setTimeout(function retryRateLimitedRequest() {
    // Don't retry limit requests that were rejected due to retry-after
    client.transport(retryArgs.task.args, partial(handleTransportResponse, retryArgs));
    client.requestQueue.resume();
  }, headerMs);

  client.emit(WEB_CLIENT_EVENTS.RATE_LIMITED, headerSecs);

  return false;
};


/**
 * If this is reached, it means an error outside the normal error logic was received. These
 * should be very unusual as standard errors come back with a 200 code and an "error"
 * property.
 *
 * Given that, assume that something really weird happened and retry the request as normal.
 *
 * @param retryOp
 * @param apiCb
 * @param statusCode
 */
var handleHttpErr = function handleHttpErr(retryOp, apiCb, statusCode) {
  var httpErr = new Error('Unable to process request, received status ' + statusCode);
  if (!retryOp.retry(httpErr)) {
    apiCb(httpErr, null);
    return true;
  }

  return false;
};


/**
 *
 * @param body
 * @param client
 * @param apiCb
 * @returns {boolean}
 */
var handleHttpResponse = function handleHttpResponse(body, headers, client, apiCb) {
  var jsonResponse;
  var jsonError;

  try {
    jsonResponse = JSON.parse(body);
  } catch (parseErr) {
    // TODO(leah): Emit an event here?
    jsonError = new Error('unable to parse Slack API Response');
    return false;
  }

  if (!jsonError && jsonResponse.warning) {
    client.logger('warn', jsonResponse.warning);
  }

  if (!jsonResponse.ok) {
    jsonError = new Error(jsonResponse.error);
    client.logger('error', 'Response not OK: ', jsonResponse.error);
  }

  jsonResponse.scopes = (headers['x-oauth-scopes'] === undefined) ?
    [] :
    headers['x-oauth-scopes'].trim().split(/\s*,\s*/);
  jsonResponse.acceptedScopes = (headers['x-accepted-oauth-scopes'] === undefined) ?
    [] :
    headers['x-accepted-oauth-scopes'].trim().split(/\s*,\s*/);


  try {
    apiCb(jsonError, jsonResponse);
  } catch (callbackErr) {
    // Never retry requests that fail in the callback
    client.logger('error', callbackErr);
  }

  return true;
};


/**
 *
 * @param retryArgs
 * @param err
 * @param headers
 * @param statusCode
 * @param body
 */
var handleTransportResponse = function handleTransportResponse(
  retryArgs, err, headers, statusCode, body) {
  var callQueueCb = false;

  if (err) {
    callQueueCb = handleTransportError(err, retryArgs.retryOp, retryArgs.task.cb);
  } else if (statusCode !== 200) {
    // There are only a couple of possible bad cases here:
    //   - 429: the application is being rate-limited. The client is designed to automatically
    //          respect this
    //   - 4xx or 5xx: something bad, but probably recoverable, has happened, so requeue the
    //          request

    if (statusCode === 429) {
      callQueueCb = handleRateLimitResponse(retryArgs, headers);
    } else {
      callQueueCb = handleHttpErr(retryArgs.retryOp, retryArgs.task.cb, statusCode);
    }
  } else {
    callQueueCb = handleHttpResponse(body, headers, retryArgs.client, retryArgs.task.cb);
  }

  // This is always an empty callback, even if there's an error, as it's used to signal the
  // request queue that a request has completed processing, and nothing else.
  if (callQueueCb) {
    retryArgs.queueCb();
  }
};


module.exports.handleTransportResponse = handleTransportResponse;
module.exports.handleTransportError = handleTransportError;
module.exports.handleRateLimitResponse = handleRateLimitResponse;
module.exports.handleHttpErr = handleHttpErr;
module.exports.handleHttpResponse = handleHttpResponse;
