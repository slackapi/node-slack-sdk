/**
 *
 */

var isFunction = require('lodash').isFunction;
var isNull = require('lodash').isNull;
var isUndefined = require('lodash').isUndefined;


var getArgsForFnsWithOptArgs = function getArgsForFnsWithOptArgs(optArg, optCb, optArgName) {
  var ret = {
    args: {},
  };

  if (isFunction(optCb)) {
    ret.cb = optCb;
    if (!isUndefined(optArg) && !isNull(optArg)) {
      ret.args[optArgName] = optArg;
    }
  } else if (!isUndefined(optArg) && !isNull(optArg)) {
    if (!isFunction(optArg)) {
      ret.args[optArgName] = optArg;
    } else {
      ret.cb = optArg;
    }
  }

  return ret;
};


module.exports.getArgsForFnsWithOptArgs = getArgsForFnsWithOptArgs;
