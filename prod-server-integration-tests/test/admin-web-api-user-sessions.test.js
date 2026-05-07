import 'dotenv/config';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { WebClient } from '@slack/web-api';
import { FileLogger } from '../logger.js';

const logger = new FileLogger('logs/console.log');

describe('admin.users.session.* Web APIs', () => {
  const primaryTeamId = process.env.SLACK_SDK_TEST_GRID_WORKSPACE_ID;
  const orgAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN, { logger });

  describe('admin.users.session.reset/resetBulk', () => {
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

      const single = await orgAdminClient.admin.users.session.reset({
        user_id: userIds[0],
        mobile_only: true,
        web_only: false,
      });
      logger.info(single);
      assert.equal(single.error, undefined, single.error);

      const bulk = await orgAdminClient.admin.users.session.resetBulk({
        user_ids: userIds,
        mobile_only: true,
        web_only: false,
      });
      logger.info(bulk);
      assert.equal(bulk.error, undefined, bulk.error);
    });
  });
});
