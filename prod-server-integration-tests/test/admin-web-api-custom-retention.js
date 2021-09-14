// npx mocha --timeout 10000 test/admin-web-api-custom-retention.js
// tail -f logs/console.log | jq
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

describe('admin.* Web APIs', function () {
  // admin user's token for a workspace in an Enterprise Grid org
  const teamAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_WORKSPACE_ADMIN_USER_TOKEN, { logger, });
  // org-level admin user's token
  const orgAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN, { logger, });

  describe('admin.conversations.{get|set|remove}CustomRetention', function () {
    it('should work', async function () {
      const crewation = await teamAdminClient.conversations.create({
        name: `test-channel-${new Date().getTime()}`,
      });
      const channelId = crewation.channel.id;
      try {
        let get = await orgAdminClient.admin.conversations.getCustomRetention({
          channel_id: channelId
        });
        logger.info(get);
        assert.isUndefined(get.error);
        assert.equal(get.duration_days, 0);

        const set = await orgAdminClient.admin.conversations.setCustomRetention({
          channel_id: channelId,
          duration_days: 700,
        });
        logger.info(set);
        assert.isUndefined(set.error);

        get = await orgAdminClient.admin.conversations.getCustomRetention({
          channel_id: channelId
        });
        logger.info(get);
        assert.isUndefined(get.error);
        assert.equal(get.duration_days, 700);

        const remove = await orgAdminClient.admin.conversations.removeCustomRetention({
          channel_id: channelId
        });
        logger.info(remove);
        assert.isUndefined(remove.error);

        get = await orgAdminClient.admin.conversations.getCustomRetention({
          channel_id: channelId
        });
        logger.info(get);
        assert.isUndefined(get.error);
        assert.equal(get.duration_days, 0);

      } finally {
        await orgAdminClient.admin.conversations.delete({
          channel_id: channelId,
        })
      }
    });
  });
});
