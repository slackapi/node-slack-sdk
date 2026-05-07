// Prerequisites: requires 2 workspaces on your Enterprise Grid and
// the SLACK_SDK_TEST_GRID_SECONDARY_WORKSPACE_ID environment variable configured.
import 'dotenv/config';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { WebClient } from '@slack/web-api';
import { FileLogger } from '../logger.js';

const logger = new FileLogger('logs/console.log');

describe('admin.* Web APIs', () => {
  const primaryTeamId = process.env.SLACK_SDK_TEST_GRID_WORKSPACE_ID;
  const secondaryTeamId = process.env.SLACK_SDK_TEST_GRID_SECONDARY_WORKSPACE_ID;
  const orgAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN, { logger });

  describe('admin.conversations.bulk{Archive|Move|Delete}', () => {
    it('should bulk archive conversations using admin.conversations.bulkArchive', async () => {
      const testChannel = await orgAdminClient.conversations.create({
        name: `test-bulk-archive-${Date.now()}`,
        team_id: primaryTeamId,
      });
      const channelId = testChannel.channel.id;
      let archiving = null;
      let isInProgress = false;

      while (archiving === null || isInProgress) {
        try {
          archiving = await orgAdminClient.admin.conversations
            .bulkArchive({
              channel_ids: [channelId],
            })
            .catch((error) => {
              if (error.data.error === 'action_already_in_progress') {
                isInProgress = true;
                new Promise((r) => setTimeout(r, 3000));
              } else {
                throw error;
              }
            });

          if (archiving?.ok) {
            isInProgress = false;
          }
        } finally {
          await orgAdminClient.admin.conversations.delete({
            channel_id: channelId,
          });
        }
      }

      logger.info(archiving);
      assert.notEqual(archiving.bulk_action_id, undefined);
      assert.equal(archiving.error, undefined, archiving.error);
    });

    it('should bulk delete conversations using admin.conversations.bulkDelete', async () => {
      const testChannel = await orgAdminClient.conversations.create({
        name: `test-bulk-delete-${Date.now()}`,
        team_id: primaryTeamId,
      });
      const channelId = testChannel.channel.id;
      let removing = null;
      let isInProgress = false;

      while (removing === null || isInProgress) {
        removing = await orgAdminClient.admin.conversations
          .bulkDelete({
            channel_ids: [channelId],
          })
          .catch((error) => {
            if (error.data.error === 'action_already_in_progress') {
              isInProgress = true;
              new Promise((r) => setTimeout(r, 3000));
            } else {
              throw error;
            }
          });

        if (removing?.ok) {
          isInProgress = false;
        }
      }
      logger.info(removing);
      assert.notEqual(removing.bulk_action_id, undefined);
      assert.equal(removing.error, undefined, removing.error);
    });

    it('should bulk move conversations using admin.conversations.bulkMove', async () => {
      const testChannel = await orgAdminClient.conversations.create({
        name: `test-bulk-move-${Date.now()}`,
        team_id: primaryTeamId,
      });
      const channelId = testChannel.channel.id;
      let moving = null;
      let isInProgress = false;

      while (moving === null || isInProgress) {
        moving = await orgAdminClient.admin.conversations
          .bulkMove({
            channel_ids: [channelId],
            target_team_id: secondaryTeamId,
          })
          .catch((error) => {
            if (error.data.error === 'action_already_in_progress') {
              isInProgress = true;
              new Promise((r) => setTimeout(r, 3000));
            } else {
              throw error;
            }
          });

        if (moving?.ok) {
          isInProgress = false;
        }
      }
      logger.info(moving);
      assert.notEqual(moving.bulk_action_id, undefined);
      assert.equal(moving.error, undefined, moving.error);
    });
  });
});
