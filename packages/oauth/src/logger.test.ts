import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { LogLevel } from '@slack/logger';
import { getLogger } from './logger';

describe('Logger', async () => {
  it('should create a new logger instance', async () => {
    const newLogger = getLogger('test-logger-name', LogLevel.DEBUG);
    assert.strictEqual(newLogger.getLevel(), LogLevel.DEBUG);
  });
  it('should modify the passed logger', async () => {
    const existingLogger = getLogger('test-logger-name', LogLevel.ERROR);
    const returnedLogger = getLogger('overriden-logger-name', LogLevel.DEBUG, existingLogger);
    assert.strictEqual(returnedLogger.getLevel(), LogLevel.DEBUG);
    assert.strictEqual(existingLogger.getLevel(), LogLevel.DEBUG);
  });
});
