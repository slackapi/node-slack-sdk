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

  describe('admin.auth.policy.{assign|get|remove}Entities', function () {
    /* 
      To run this test suite manually, you need an email_password auth policy
      enabled on the Enterprise Org. For this, you need to have an Enterprise Org
      with SSO enabled. You will additionally need to export a User ID for 
      a user managed by the IDP for testing. 

      export SLACK_SDK_TEST_GRID_USER_ID= 
     */
    it('should assign an entity', async function () {
        const res = await orgAdminClient.admin.auth.policy.assignEntities({
          entity_ids: [process.env.SLACK_SDK_TEST_GRID_USER_ID],
          entity_type: "USER",
          policy_name: "email_password",
        });
        assert.equal(res.ok, true);
        assert.isUndefined(res.error);
    })
    it('should get entities', async function () {
      const res2 = await orgAdminClient.admin.auth.policy.getEntities({
        policy_name: "email_password",
      });
      logger.info(res2);
      assert.equal(res2.ok, true);
      assert.isUndefined(res2.error);
    })
    it('should remove entities', async function () {
        const res3 = await orgAdminClient.admin.auth.policy.removeEntities({
          entity_ids: [process.env.SLACK_SDK_TEST_GRID_USER_ID], 
          entity_type: "USER",
          policy_name: "email_password",
        })
        assert.equal(res3.ok, true);
        assert.isUndefined(res3.error);
    })
  })
});
