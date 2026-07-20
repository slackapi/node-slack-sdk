import 'dotenv/config';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { WebClient } from '@slack/web-api';
import { FileLogger } from '../logger.js';

const logger = new FileLogger('logs/console.log');

describe('admin.* Web APIs', () => {
  const primaryTeamId = process.env.SLACK_SDK_TEST_GRID_WORKSPACE_ID;
  const orgAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN, { logger });

  describe('admin.users.session.{get|set|clear}Settings', () => {
    it('should work', async () => {
      const users = await orgAdminClient.users.list({
        exclude_archived: true,
        limit: 100,
        team_id: primaryTeamId,
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

      const get = await orgAdminClient.admin.users.session.getSettings({
        user_ids: userIds,
      });
      logger.info(get);
      assert.equal(get.error, undefined, get.error);

      const set = await orgAdminClient.admin.users.session.setSettings({
        user_ids: userIds,
        duration: 60 * 60 * 24 * 30,
      });
      logger.info(set);
      assert.equal(set.error, undefined, set.error);

      const get2 = await orgAdminClient.admin.users.session.getSettings({
        user_ids: userIds,
      });
      logger.info(get2);
      assert.equal(get2.error, undefined, get2.error);
      assert.equal(get2.session_settings.length, userIds.length);

      const clear = await orgAdminClient.admin.users.session.clearSettings({
        user_ids: userIds,
      });
      logger.info(clear);
      assert.equal(clear.error, undefined, clear.error);

      const get3 = await orgAdminClient.admin.users.session.getSettings({
        user_ids: userIds,
      });
      logger.info(get3);
      assert.equal(get3.error, undefined, get3.error);
      assert.equal(get3.session_settings.length, 0);
      assert.equal(get3.no_settings_applied.length, userIds.length);
    });
  });

  // Prerequisites: requires an email_password auth policy enabled on the Enterprise Org,
  // which means having SSO enabled. SLACK_SDK_TEST_GRID_USER_ID must be a user managed by the IDP.
  describe('admin.auth.policy.{assign|get|remove}Entities', () => {
    it('should assign an entity', async () => {
      const res = await orgAdminClient.admin.auth.policy.assignEntities({
        entity_ids: [process.env.SLACK_SDK_TEST_GRID_USER_ID],
        entity_type: 'USER',
        policy_name: 'email_password',
      });
      assert.equal(res.error, undefined, res.error);
    });

    it('should get entities', async () => {
      const res2 = await orgAdminClient.admin.auth.policy.getEntities({
        policy_name: 'email_password',
      });
      logger.info(res2);
      assert.equal(res2.error, undefined, res2.error);
    });

    it('should remove entities', async () => {
      const res3 = await orgAdminClient.admin.auth.policy.removeEntities({
        entity_ids: [process.env.SLACK_SDK_TEST_GRID_USER_ID],
        entity_type: 'USER',
        policy_name: 'email_password',
      });
      assert.equal(res3.error, undefined, res3.error);
    });
  });
});
