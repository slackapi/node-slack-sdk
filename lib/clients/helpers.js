/**
 * Helpers for working with Slack API clients.
 */

var assign = require('lodash').assign;
var isFunction = require('lodash').isFunction;
var isUndefined = require('lodash').isUndefined;
var isString = require('lodash').isString;
var forEach = require('lodash').forEach;


/**
 *
 * @param {object} data
 * @returns {object}
 */
var getData = function getData(data, token) {
  var newData = {};
  assign(data, data ? data.opts || {} : {});

  forEach(data || {}, function getValidData(val, key) {
    if (!isUndefined(val) && val !== null && key !== 'opts') {
      // For the web API, this should always be a JSON-encoded array, see:
      //   https://api.slack.com/docs/attachments
      if (key === 'attachments') {
        if (isString(val)) {
          newData[key] = val;
        } else {
          newData[key] = JSON.stringify(val);
        }
      } else if (key !== 'opts') {
        newData[key] = val;
      }
    }
  });

  // There are a couple of API calls that don't require tokens, so check before passing it through
  if (token) {
    newData.token = token;
  }

  return newData;
};


var getAPICallArgs = function getAPICallArgs(token, optData, optCb) {
  var data;
  var cb;

  if (arguments.length === 1) {
    data = getData({}, token);
  } else if (arguments.length === 2) {
    if (isFunction(arguments[1])) {
      cb = arguments[1];
      data = getData({}, token);
    } else {
      data = getData(optData, token);
    }
  } else if (arguments.length === 3) {
    cb = optCb;
    data = getData(optData, token);
  }

  return {
    cb: cb,
    data: data
  };
};


module.exports.getData = getData;
module.exports.getAPICallArgs = getAPICallArgs;
