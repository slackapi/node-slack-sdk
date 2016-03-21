/**
 * Helpers for working with Slack API clients.
 */

// For some reason eslint sees the target[key] assigns as an issue
/* eslint no-param-reassign: 0 */

var isUndefined = require('lodash').isUndefined;
var isPlainObject = require('lodash').isPlainObject;
var isString = require('lodash').isString;
var forEach = require('lodash').forEach;


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
var getApiCallData = function getApiCallData(token, requiredArgs, optArgs) {
  var newData = {};
  assignApiArgs(newData, optArgs);
  assignApiArgs(newData, requiredArgs);

  // There are a couple of API calls that don't require tokens, so check before passing it through
  if (token) {
    newData.token = token;
  }

  return newData;
};


module.exports.getApiCallData = getApiCallData;
