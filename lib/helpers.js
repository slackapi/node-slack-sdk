/**
 * Top level helpers.
 */

var ConsoleTransport = require('winston').transports.Console;
var bind = require('lodash').bind;
var winston = require('winston');


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


module.exports.getLogger = getLogger;
