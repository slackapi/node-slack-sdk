require('mocha');
const { assert } = require('chai');
const { ConsoleLogger, LogLevel } = require('./index');

describe('logger', () => {
  it('should have the default LogLevel', () => {
    const logger = new ConsoleLogger();
    assert.equal(logger.getLevel(), LogLevel.INFO);
  });

  it('should set LogLevel corrrectly', () => {
    const logger = new ConsoleLogger();
    assert.equal(logger.getLevel(), LogLevel.INFO);

    [LogLevel.DEBUG, LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO].forEach((level) => {
      logger.setLevel(level);
      assert.equal(logger.getLevel(), level);
    });
  });
});
