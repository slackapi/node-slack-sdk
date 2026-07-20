import 'dotenv/config';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { WebClient } from '@slack/web-api';
import { FileLogger } from '../logger.js';

const logger = new FileLogger('logs/console.log');

describe('admin.* Web APIs', () => {
  const primaryTeamId = process.env.SLACK_SDK_TEST_GRID_WORKSPACE_ID;
  const orgAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN, { logger });

  describe('admin.conversations.{get|set|remove}CustomRetention', () => {
    it('should work', async () => {
      const creation = await orgAdminClient.conversations.create({
        name: `test-channel-${Date.now()}`,
        team_id: primaryTeamId,
      });
      const channelId = creation.channel.id;
      try {
        let get = await orgAdminClient.admin.conversations.getCustomRetention({
          channel_id: channelId,
        });
        logger.info(get);
        assert.equal(get.error, undefined, get.error);
        assert.equal(get.duration_days, 0);

        const set = await orgAdminClient.admin.conversations.setCustomRetention({
          channel_id: channelId,
          duration_days: 700,
        });
        logger.info(set);
        assert.equal(set.error, undefined, set.error);

        get = await orgAdminClient.admin.conversations.getCustomRetention({
          channel_id: channelId,
        });
        logger.info(get);
        assert.equal(get.error, undefined, get.error);
        assert.equal(get.duration_days, 700);

        const remove = await orgAdminClient.admin.conversations.removeCustomRetention({
          channel_id: channelId,
        });
        logger.info(remove);
        assert.equal(remove.error, undefined, remove.error);

        get = await orgAdminClient.admin.conversations.getCustomRetention({
          channel_id: channelId,
        });
        logger.info(get);
        assert.equal(get.error, undefined, get.error);
        assert.equal(get.duration_days, 0);
      } finally {
        await orgAdminClient.admin.conversations.delete({
          channel_id: channelId,
        });
      }
    });
  });
});
