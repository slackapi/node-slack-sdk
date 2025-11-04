import assert from 'node:assert/strict';
import { after, beforeEach, describe, it, mock } from 'node:test';
import { ConsoleLogger, LogLevel } from './index.js';

describe('Logger', () => {
  describe('ConsoleLogger', () => {
    let logger: ConsoleLogger;

    /**
     * A collection of included console loggers to restore later.
     */
    const output = {
      debug: console.debug,
      info: console.info,
      warn: console.warn,
      error: console.error,
    };

    /**
     * The set of loggers to mock for checking outputs.
     */
    const mocks = {
      debug: mock.fn(),
      info: mock.fn(),
      warn: mock.fn(),
      error: mock.fn(),
    };

    beforeEach(() => {
      console.debug = mocks.debug = mock.fn();
      console.info = mocks.info = mock.fn();
      console.warn = mocks.warn = mock.fn();
      console.error = mocks.error = mock.fn();
      logger = new ConsoleLogger();
    });

    after(() => {
      console.debug = output.debug;
      console.info = output.info;
      console.warn = output.warn;
      console.error = mocks.error;
    });

    describe('getLevel', () => {
      it('should have the default LogLevel', () => {
        assert.strictEqual(logger.getLevel(), LogLevel.INFO);
      });

      it('should get LogLevel corrrectly', () => {
        for (const level of [LogLevel.DEBUG, LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO]) {
          logger.setLevel(level);
          assert.strictEqual(logger.getLevel(), level);
        }
      });
    });

    describe('setLevel', () => {
      it('should set the log level', () => {
        logger.setLevel(LogLevel.DEBUG);

        logger.debug('i am debug');
        logger.info('i am info');

        assert.strictEqual(mocks.debug.mock.callCount(), 1);
        assert.strictEqual(mocks.info.mock.callCount(), 1);

        logger.setLevel(LogLevel.INFO);

        logger.debug('i am debug');
        logger.info('i am info');

        assert.strictEqual(mocks.debug.mock.callCount(), 1);
        assert.strictEqual(mocks.info.mock.callCount(), 2);
      });
    });

    describe('setName', () => {
      it('should set the name', () => {
        logger.setName('foobles');

        logger.info('test');

        assert.strictEqual(mocks.info.mock.callCount(), 1);
        assert.deepEqual(mocks.info.mock.calls[0].arguments, ['[INFO] ', 'foobles', 'test']);
      });
    });

    describe('log levels', () => {
      describe('debug', () => {
        it('should write debug level messages', () => {
          logger.setLevel(LogLevel.DEBUG);

          logger.debug('debug');
          logger.info('info');
          logger.warn('warn');
          logger.error('error');

          assert.strictEqual(mocks.debug.mock.callCount(), 1);
          assert.strictEqual(mocks.info.mock.callCount(), 1);
          assert.strictEqual(mocks.warn.mock.callCount(), 1);
          assert.strictEqual(mocks.error.mock.callCount(), 1);
        });
      });

      describe('info', () => {
        it('should write info level messages', () => {
          logger.setLevel(LogLevel.INFO);

          logger.debug('debug');
          logger.info('info');
          logger.warn('warn');
          logger.error('error');

          assert.strictEqual(mocks.debug.mock.callCount(), 0);
          assert.strictEqual(mocks.info.mock.callCount(), 1);
          assert.strictEqual(mocks.warn.mock.callCount(), 1);
          assert.strictEqual(mocks.error.mock.callCount(), 1);
        });
      });

      describe('warn', () => {
        it('should write warn level messages', () => {
          logger.setLevel(LogLevel.WARN);

          logger.debug('debug');
          logger.info('info');
          logger.warn('warn');
          logger.error('error');

          assert.strictEqual(mocks.debug.mock.callCount(), 0);
          assert.strictEqual(mocks.info.mock.callCount(), 0);
          assert.strictEqual(mocks.warn.mock.callCount(), 1);
          assert.strictEqual(mocks.error.mock.callCount(), 1);
        });
      });

      describe('error', () => {
        it('should write error level messages', () => {
          logger.setLevel(LogLevel.ERROR);

          logger.debug('debug');
          logger.info('info');
          logger.warn('warn');
          logger.error('error');

          assert.strictEqual(mocks.debug.mock.callCount(), 0);
          assert.strictEqual(mocks.info.mock.callCount(), 0);
          assert.strictEqual(mocks.warn.mock.callCount(), 0);
          assert.strictEqual(mocks.error.mock.callCount(), 1);
        });
      });
    });
  });
});
