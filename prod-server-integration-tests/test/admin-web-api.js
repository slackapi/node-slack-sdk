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

  describe('admin.users.session.{get|set|clear}Settings', function () {
    it('should work', async function () {
      // fetch 3 active members from a workspace
      const users = await teamAdminClient.users.list({
        exclude_archived: true,
        limit: 100
      });
      const userIds = [];
      for (const u of users.members) {
        if (userIds.length >= 3) {
          break;
        }
        if (!u.is_bot && !u.deleted && !u.is_app_user && !u.is_owner && u.id !== 'USLACKBOT') {
          userIds.push(u.id);
        }
      }

      // call get/set/clearSettings APIs
      const get = await orgAdminClient.admin.users.session.getSettings({
        user_ids: userIds
      });
      logger.info(get);
      assert.isUndefined(get.error);

      const set = await orgAdminClient.admin.users.session.setSettings({
        user_ids: userIds,
        duration: 60 * 60 * 24 * 30
      });
      logger.info(set);
      assert.isUndefined(set.error);

      const get2 = await orgAdminClient.admin.users.session.getSettings({
        user_ids: userIds
      });
      logger.info(get2);
      assert.isUndefined(get2.error);
      assert.equal(get2.session_settings.length, userIds.length);

      const clear = await orgAdminClient.admin.users.session.clearSettings({
        user_ids: userIds
      });
      logger.info(clear);
      assert.isUndefined(clear.error);

      const get3 = await orgAdminClient.admin.users.session.getSettings({
        user_ids: userIds
      });
      logger.info(get3);
      assert.isUndefined(get3.error);
      assert.equal(get3.session_settings.length, 0);
      assert.equal(get3.no_settings_applied.length, userIds.length);
    });
  });
});