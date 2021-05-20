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

  describe('cha.scheduleMessage', function () {
    it('should accept either an integer or a string value for post_at', async function() {
      const channelId = process.env.SLACK_SDK_TEST_WEB_TEST_CHANNEL_ID;
      const postAt = Number.parseInt((Date.now() / 1000) + 60 * 15);
      try {
        const params = {
          text: 'Hi there!',
          channel: channelId,
          post_at: postAt,
        };
        assert.isTrue(typeof params.post_at === 'number');
        assert.isTrue(Number.isInteger(params.post_at));
        const response1 = await botClient.chat.scheduleMessage(params);
        assert.isUndefined(response1.error);

        params.post_at = "" + params.post_at;
        assert.isTrue(typeof params.post_at === 'string');
        const response2 = await botClient.chat.scheduleMessage(params);
        assert.isUndefined(response2.error);
      } catch (e) {
        console.log(e.code + " / " + JSON.stringify(e.data));
        throw e;
      }
    });
  });
});