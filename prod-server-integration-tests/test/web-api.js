require('mocha');
const { assert } = require('chai');
const { WebClient } = require('@slack/web-api');

const winston = require('winston');
const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.File({ filename: 'logs/console.log' }),
  ],
});

describe('Web APIs', function () {
  const botClient = new WebClient(process.env.SLACK_SDK_TEST_BOT_TOKEN, { logger, });
  const userClient = new WebClient(process.env.SLACK_SDK_TEST_USER_TOKEN, { logger, });

  describe('auth.test', function () {

    it('should work with a bot token', async function () {
      const response = await botClient.auth.test();
      logger.info(response);
      assert.isUndefined(response.error);
    });

    it('should work with a user token', async function () {
      const response = await userClient.auth.test();
      logger.info(response);
      assert.isUndefined(response.error);
    });
  });
});