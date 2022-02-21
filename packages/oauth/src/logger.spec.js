require('mocha');
const { assert } = require('chai');
const { getLogger } = require('./logger');
const { LogLevel } = require('@slack/logger');

describe('Logger', async () => {
  it('should create a new logger instance', async () => {
    const newLogger = getLogger('test-logger-name', LogLevel.DEBUG);
    assert.match(newLogger.name, /test-logger-name:\d+/);
    assert.equal(newLogger.getLevel(), LogLevel.DEBUG);
  });
  it('should modify the passed logger', async () => {
    const existingLogger = getLogger('test-logger-name', LogLevel.ERROR);
    assert.match(existingLogger.name, /test-logger-name:\d+/);
    const returnedLogger = getLogger('overriden-logger-name', LogLevel.DEBUG, existingLogger);
    assert.match(returnedLogger.name, /overriden-logger-name:\d+/);
    assert.equal(returnedLogger.getLevel(), LogLevel.DEBUG);
    assert.match(existingLogger.name, /overriden-logger-name:\d+/);
    assert.equal(existingLogger.getLevel(), LogLevel.DEBUG);
  });
});
