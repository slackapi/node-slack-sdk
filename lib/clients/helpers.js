/**
 * Helpers for working with Slack API clients.
 */

// For some reason eslint sees the target[key] assigns as an issue
/* eslint no-param-reassign: 0 */

var isUndefined = require('lodash').isUndefined;
var isPlainObject = require('lodash').isPlainObject;
var isFunction = require('lodash').isFunction;
var isNull = require('lodash').isNull;
var isString = require('lodash').isString;
var forEach = require('lodash').forEach;
var urlJoin = require('url-join');


var assignApiArgs = function assignApiArgs(target, source) {
  if (!isPlainObject(source)) {
    return;
  }

  forEach(source, function getValidData(val, key) {
    if (!isUndefined(val) && val !== null && key !== 'opts') {
      // For the web API, this should always be a JSON-encoded array, see:
      //   https://api.slack.com/docs/attachments
      if (key === 'attachments') {
        if (isString(val)) {
          target[key] = val;
        } else {
          target[key] = JSON.stringify(val);
        }
      // For the web API, this should always be a JSON-encoded object, see:
      //   https://api.slack.com/methods/chat.unfurl
      } else if (key === 'unfurls') {
        if (isString(val)) {
          target[key] = val;
        } else {
          target[key] = JSON.stringify(val);
        }
      } else if (key !== 'opts') {
        target[key] = val;
      }
    }
  });
};


/**
 *
 * @param token
 * @param requiredArgs
 * @param optArgs
 * @returns {{}}
 */
var getAPICallData = function getAPICallData(token, requiredArgs, optArgs) {
  var newData = {};
  assignApiArgs(newData, optArgs);
  assignApiArgs(newData, requiredArgs);

  // There are a couple of API calls that don't require tokens, so check before passing it through
  if (token) {
    newData.token = token;
  }

  return newData;
};


var getAPICallArgs = function getAPICallArgs(
  token, userAgent, slackAPIUrl, endpoint, apiArgs, apiOptArgs, optCb) {
  var optArgs = null;
  var cb = optCb;

  // Avoid having to push breaking API changes in API method signatures when we add optional args
  // to HTTP endpoints by checking which of apiOptArgs and optCb are actually opt args and cb
  // respectively
  if (isPlainObject(apiOptArgs) || isNull(apiOptArgs)) {
    optArgs = apiOptArgs;
  } else {
    if (isFunction(apiOptArgs)) {
      cb = apiOptArgs;
    }
  }

  return {
    args: {
      url: urlJoin(slackAPIUrl, endpoint),
      data: getAPICallData(token, apiArgs, optArgs),
      headers: {
        'User-Agent': userAgent
      }
    },
    cb: cb
  };
};


module.exports.getAPICallData = getAPICallData;
module.exports.getAPICallArgs = getAPICallArgs;
