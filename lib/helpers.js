/**
 * Top level helpers.
 */

var ConsoleTransport = require('winston').transports.Console;
var bind = require('lodash').bind;
var winston = require('winston');
var os = require('os');
var pkginfo = require('pkginfo')(module, 'version', 'repository'); // eslint-disable-line no-unused-vars


/**
 *
 * @param {string} optLogLevel
 * @param {Object} optTransport
 * @returns {function(this:*)|Function|*}
 */
var getLogger = function getLogger(optLogLevel, optTransport) {
  var logger = new winston.Logger({
    level: optLogLevel || 'info',
    transports: [optTransport || new ConsoleTransport()]
  });
  return bind(logger.log, logger);
};

// TODO we can do this better
var versionStr = module.exports.repository.replace('/', ':') + '/' + module.exports.version + ' '
  + os.platform() + '/' + os.release() + ' '
  + 'node/' + process.version.replace('v', '');

var getVersionString = function getVersionString() {
  return versionStr;
};

var appendToVersionString = function appendToVersionString(name, version) {
  var correctName = name.replace('/', ':');
  if (version) {
    versionStr = versionStr + ' ' + correctName + '/' + version.replace('/', ':');
  } else {
    versionStr = versionStr + ' ' + correctName;
  }
};

module.exports.getLogger = getLogger;
module.exports.getVersionString = getVersionString;
module.exports.appendToVersionString = appendToVersionString;
