/**
 * Top level helpers.
 */

var ConsoleTransport = require('winston').transports.Console;
var bind = require('lodash').bind;
var winston = require('winston');
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
var versions = [
  [module.exports.repository, module.exports.version]
  // TODO grab OS, and node runtime information.
  // ["linux", "1.0"], ["node", "6.5.0"], etc.
];

var getVersionString = function getVersionString() {
  var str = '';
  var i;

  for (i = 0; i < versions.length; ++i) {
    str = str + versions[i][0] + '/' + versions[i][1] + ' ';
  }
  return str.trim();
};

var appendToVersionString = function appendToVersionString(name, version) {
  versions.push([name, version]);
};

module.exports.getLogger = getLogger;
module.exports.getVersionString = getVersionString;
module.exports.appendToVersionString = appendToVersionString;
