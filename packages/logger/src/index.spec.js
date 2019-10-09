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

  it('should offer getLevel to test which level is currently set', () => {
    let largeObjectGenerated = false;
    function generateSomethingExpensive() {
      largeObjectGenerated = true;
      return JSON.stringify('{ description: "Something expensive to load" }');
    }

    const logger = new ConsoleLogger();
    logger.setLevel(LogLevel.INFO);
    if (logger.getLevel() === LogLevel.DEBUG) {
      const largeObj = generateSomethingExpensive();
      logger.debug(`debug: ${largeObj}`);
    }
    assert.isFalse(largeObjectGenerated);

    logger.setLevel(LogLevel.DEBUG);
    if (logger.getLevel() === LogLevel.DEBUG) {
      generateSomethingExpensive();
    }
    assert.isTrue(largeObjectGenerated);
  });
});