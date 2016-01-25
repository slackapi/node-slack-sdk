/**
 * Helpers for working with Slack API clients.
 */

var assign = require('lodash').assign;
var humps = require('humps');
var isFunction = require('lodash').isFunction;
var isUndefined = require('lodash').isUndefined;
var forEach = require('lodash').forEach;
var noop = require('lodash').noop;


/**
 *
 */
var parseAPIResponse = function parseAPIResponse(res) {
  var updatedRes;

  try {
    updatedRes = JSON.parse(res);
    updatedRes = humps.camelizeKeys(updatedRes);
  } catch (err) {
    // TODO(leah): Update this to throw a meaningful error
    throw new Error();
  }

  return updatedRes;
};


/**
 *
 * @param {object} data
 * @returns {object}
 */
var getData = function getData(data, token) {
  var newData = assign({}, data ? data.opts || {} : {});

  forEach(data || {}, function getValidData(val, key) {
    if (!isUndefined(val) && val !== null && key !== 'opts') {
      newData[key] = val;
    }
  });
  newData.token = token;

  return newData;
};


var getAPICallArgs = function getAPICallArgs(token, optData, optCb) {
  var data;
  var cb;

  if (arguments.length === 1) {
    // Pass in a no-op function here to avoid adding more conditionals in the _callTransport fn
    cb = noop;
    data = getData({}, token);
  } else if (arguments.length === 2) {
    if (isFunction(arguments[1])) {
      cb = arguments[1];
      data = getData({}, token);
    } else {
      cb = noop;
      data = getData(optData, token);
    }
  } else if (arguments.length === 3) {
    cb = optCb || noop;
    data = getData(optData, token);
  }

  return {
    cb: cb,
    data: data,
  };
};


module.exports.getData = getData;
module.exports.parseAPIResponse = parseAPIResponse;
module.exports.getAPICallArgs = getAPICallArgs;
