/**
 * Helpers for working with Slack API clients.
 */

var assign = require('lodash').assign;
var humps = require('humps');
var isUndefined = require('lodash').isUndefined;
var forEach = require('lodash').forEach;

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


module.exports.getData = getData;
module.exports.parseAPIResponse = parseAPIResponse;
