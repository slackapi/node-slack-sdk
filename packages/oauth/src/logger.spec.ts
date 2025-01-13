import { LogLevel } from '@slack/logger';
import { assert } from 'chai';
import { getLogger } from './logger';

describe('Logger', async () => {
  it('should create a new logger instance', async () => {
    const newLogger = getLogger('test-logger-name', LogLevel.DEBUG);
    assert.equal(newLogger.getLevel(), LogLevel.DEBUG);
  });
  it('should modify the passed logger', async () => {
    const existingLogger = getLogger('test-logger-name', LogLevel.ERROR);
    const returnedLogger = getLogger('overriden-logger-name', LogLevel.DEBUG, existingLogger);
    assert.equal(returnedLogger.getLevel(), LogLevel.DEBUG);
    assert.equal(existingLogger.getLevel(), LogLevel.DEBUG);
  });
});
