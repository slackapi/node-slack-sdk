// npx mocha --timeout 10000 test/admin-web-api-user-sessions.js
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

describe('admin.users.session.* Web APIs', function () {
  // admin user's token for a workspace in an Enterprise Grid org
  const teamAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_WORKSPACE_ADMIN_USER_TOKEN, { logger, });
  // org-level admin user's token
  const orgAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN, { logger, });

  describe('admin.users.session.reset/resetBulk', function () {
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
      let single = await orgAdminClient.admin.users.session.reset({
        user_id: userIds[0],
        mobile_only: true,
        web_only: false,
      });
      logger.info(single);
      assert.isUndefined(single.error);

      let bulk = await orgAdminClient.admin.users.session.resetBulk({
        user_ids: userIds,
        mobile_only: true,
        web_only: false,
      });
      logger.info(bulk);
      assert.isUndefined(bulk.error);
    });
  });
});
