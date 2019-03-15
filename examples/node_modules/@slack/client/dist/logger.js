"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("loglevel");
const util_1 = require("./util");
/**
 * Severity levels for log entries
 */
var LogLevel;
(function (LogLevel) {
    LogLevel["ERROR"] = "error";
    LogLevel["WARN"] = "warn";
    LogLevel["INFO"] = "info";
    LogLevel["DEBUG"] = "debug";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
// Implements logger name prefixing using loglevel plugin API. Based on example: http://jsbin.com/xehoye
const originalFactory = log.methodFactory;
// @ts-ignore this is the recommended way to use the plugin API for loglevel
log.methodFactory = function (methodName, logLevel, loggerName) {
    const rawMethod = originalFactory(methodName, logLevel, loggerName);
    return function () {
        const messages = [`[${methodName.toUpperCase()}]`, loggerName];
        for (let i = 0; i < arguments.length; i = i + 1) {
            messages.push(arguments[i]);
        }
        rawMethod.apply(undefined, messages);
    };
};
/**
 * INTERNAL interface for getting or creating a named Logger
 */
// TODO: implement logger name prefixing (example plugins available on the loglevel package's site)
exports.getLogger = log.getLogger;
/**
 * Decides whether `level` is more severe than the `threshold` for logging. When this returns true, logs should be
 * output.
 *
 * @param level log level to check
 * @param threshold lower bound on severity, expressed as a number inside the loglevel package
 */
function isMoreSevere(level, threshold) {
    if (level === LogLevel.DEBUG) {
        return threshold <= 1;
    }
    if (level === LogLevel.INFO) {
        return threshold <= 2;
    }
    if (level === LogLevel.WARN) {
        return threshold <= 3;
    }
    if (level === LogLevel.ERROR) {
        return threshold <= 4;
    }
    return true;
}
/**
 * INTERNAL function for transforming an external LoggerFunc type into the internal Logger interface
 * @param name
 * @param loggingFunc
 */
function loggerFromLoggingFunc(name, loggingFunc) {
    const logger = log.getLogger(name);
    logger.methodFactory = function (methodName, logLevel, loggerName) {
        if (isMoreSevere(methodName, logLevel)) {
            return function (...msg) {
                loggingFunc(methodName, `${loggerName} ${msg.map(m => JSON.stringify(m)).join(' ')}`);
            };
        }
        return util_1.noop;
    };
    return logger;
}
exports.loggerFromLoggingFunc = loggerFromLoggingFunc;
//# sourceMappingURL=logger.js.map