var hasKey = require('lodash').has;

// Channel, file, group, DM, user, usergroup
var RECOGNIZED_API_TYPE_PREFIXES = ['C', 'F', 'G', 'D', 'U', 'S'];


/**
 * Tests whether a supplied JSON object represents a Slack API type.
 * @param {Object} obj
 * @returns {boolean}
 */
var isModelObj = function isModelObj(obj) {
  if (hasKey(obj, 'id')) {
    return RECOGNIZED_API_TYPE_PREFIXES.indexOf(obj.id.substr(0, 1)) !== -1;
  }

  return false;
};


/**
 * Returns the model class for the JSON object from the Slack API.
 */
var getModelClass = function getModelClass(obj) {
  var apiTypePrefix = obj.id.substr(0, 1);

  switch (apiTypePrefix) {
    case 'C':
      return require('./channel');
    case 'F':
      return require('./file');
    case 'D':
      return require('./dm');
    case 'U':
      return require('./user');
    case 'S':
      return require('./user-group');

    default:
      // The MPDM and Group classes share the same prefix, so do an extra check here
      if (apiTypePrefix === 'G') {
        if (obj.is_mpim) {
          return require('./mpdm');
        }

        if (obj.is_group) {
          return require('./group');
        }
      }
  }
};


module.exports.isModelObj = isModelObj;
module.exports.getModelClass = getModelClass;
