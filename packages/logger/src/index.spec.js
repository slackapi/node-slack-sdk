const { assert } = require('chai');
const sinon = require('sinon');
const { ConsoleLogger, LogLevel } = require('./index');

describe('Logger', () => {
  describe('ConsoleLogger', () => {
    let logger; // Logger

    beforeEach(() => {
      logger = new ConsoleLogger();
    });

    afterEach(() => {
      sinon.restore();
    });

    describe('getLevel', () => {
      it('should have the default LogLevel', () => {
        assert.equal(logger.getLevel(), LogLevel.INFO);
      });

      it('should get LogLevel corrrectly', () => {
        [LogLevel.DEBUG, LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO].forEach((level) => {
          logger.setLevel(level);
          assert.equal(logger.getLevel(), level);
        });
      });
    });

    describe('setLevel', () => {
      it('should set the log level', () => {
        const debugStub = sinon.stub(console, 'debug');
        const infoStub = sinon.stub(console, 'info');

        logger.setLevel(LogLevel.DEBUG);

        logger.debug('i am debug');
        logger.info('i am info');

        assert.equal(debugStub.callCount, 1);
        assert.equal(infoStub.callCount, 1);

        logger.setLevel(LogLevel.INFO);

        logger.debug('i am debug');
        logger.info('i am info');

        assert.equal(debugStub.callCount, 1);
        assert.equal(infoStub.callCount, 2);
      });
    });

    describe('setName', () => {
      it('should set the name', () => {
        const infoStub = sinon.stub(console, 'info');

        logger.setName('foobles');

        logger.info('test');

        assert.deepEqual(infoStub.firstCall.args, [
          '[INFO] ',
          'foobles',
          'test',
        ]);
      });
    });

    describe('log levels', () => {
      let debugStub; // sinon.SinonStub
      let infoStub; // sinon.SinonStub
      let warnStub; // sinon.SinonStub
      let errorStub; // sinon.SinonStub

      beforeEach(() => {
        debugStub = sinon.stub(console, 'debug');
        infoStub = sinon.stub(console, 'info');
        warnStub = sinon.stub(console, 'warn');
        errorStub = sinon.stub(console, 'error');
      });

      describe('debug', () => {
        it('should write debug level messages', () => {
          logger.setLevel(LogLevel.DEBUG);

          logger.debug('debug');
          logger.info('info');
          logger.warn('warn');
          logger.error('error');

          assert.equal(debugStub.called, true);
          assert.equal(infoStub.called, true);
          assert.equal(warnStub.called, true);
          assert.equal(errorStub.called, true);
        });
      });

      describe('info', () => {
        it('should write info level messages', () => {
          logger.setLevel(LogLevel.INFO);

          logger.debug('debug');
          logger.info('info');
          logger.warn('warn');
          logger.error('error');

          assert.equal(debugStub.called, false);
          assert.equal(infoStub.called, true);
          assert.equal(warnStub.called, true);
          assert.equal(errorStub.called, true);
        });
      });

      describe('warn', () => {
        it('should write warn level messages', () => {
          logger.setLevel(LogLevel.WARN);

          logger.debug('debug');
          logger.info('info');
          logger.warn('warn');
          logger.error('error');

          assert.equal(debugStub.called, false);
          assert.equal(infoStub.called, false);
          assert.equal(warnStub.called, true);
          assert.equal(errorStub.called, true);
        });
      });

      describe('error', () => {
        it('should write error level messages', () => {
          logger.setLevel(LogLevel.ERROR);

          logger.debug('debug');
          logger.info('info');
          logger.warn('warn');
          logger.error('error');

          assert.equal(debugStub.called, false);
          assert.equal(infoStub.called, false);
          assert.equal(warnStub.called, false);
          assert.equal(errorStub.called, true);
        });
      });
    });
  });
});