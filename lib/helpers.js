/**
 * Top level helpers.
 */

var ConsoleTransport = require('winston').transports.Console;
var bind = require('lodash').bind;
var winston = require('winston');
var os = require('os');
var pkginfo = require('pkginfo')(module, 'version', 'name'); // eslint-disable-line no-unused-vars


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
var versionStr = module.exports.name.replace('/', ':') + '/' + module.exports.version + ' '
  + os.platform() + '/' + os.release() + ' '
  + 'node/' + process.version.replace('v', '');

var getVersionString = function getVersionString() {
  return versionStr;
};

/**
 *
 * A function to append information to the end of the informational string. You can append an
 * arbitrary string in the first parameter (although all `/` characters will be replaced with
 * `:` characters. You can provide an optional string for the version of the resource as well, when
 * this makes sense.
 *
 * In general, you should use this function to let us know what you are building with this SDK. If
 * you are building a bot called "FooBot", and are currently on version "1.0", then call the function
 * as `appendToVersionString('FooBot', '1.0') to have that information sent to Slack during
 * interactions with the Slack Platform
 *
 * @param {string} name
 * @param {string} [version]
 *
 */
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
