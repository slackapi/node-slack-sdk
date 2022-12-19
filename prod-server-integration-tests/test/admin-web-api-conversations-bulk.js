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

// Note: to run this test, you must have 2 workspaces on your Enterprise Grid and
// you must have the SLACK_SDK_TEST_GRID_SECONDARY_WORKSPACE_ID environment variable configured.
describe('admin.* Web APIs', function () {
  // admin user's token for a workspace in an Enterprise Grid org
  const teamAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_WORKSPACE_ADMIN_USER_TOKEN, { logger, });
  // admin user's team ID for a secondary workspace in an Enterprise Grid org
  // (must be in same org as workspace for teamAdminClient, but a different workspace)
  const secondaryTeamId = process.env.SLACK_SDK_TEST_GRID_SECONDARY_WORKSPACE_ID;
  // org-level admin user's token
  const orgAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN, { logger, });

  describe('admin.conversations.bulk{Archive|Move|Delete}', function () {
    // Test bulkArchive
    it('should bulk archive conversations using admin.conversations.bulkArchive', async function () {
      const testChannel = await teamAdminClient.conversations.create({
        name: `test-bulk-archive-${new Date().getTime()}`,
      });
      const channelId = testChannel.channel.id;
      let archiving = null;
      let isInProgress = false;

      while (archiving === null || isInProgress) {
        try {
          archiving = await orgAdminClient.admin.conversations.bulkArchive({
            channel_ids: [channelId]
          }).catch((error) => {
            if (error.data.error === 'action_already_in_progress') {
                isInProgress = true;
                new Promise(r => setTimeout(r, 3000));
            } else {
                throw error;
            }
          });

          if (archiving && archiving.ok) {
            isInProgress = false;
          }
        } finally {
          await orgAdminClient.admin.conversations.delete({
            channel_id: channelId,
          });
        }
      }

      logger.info(archiving);
      assert.isDefined(archiving.bulk_action_id);
      assert.isUndefined(archiving.error);
    });
    it('should bulk delete conversations using admin.conversations.bulkDelete', async function () {
      const testChannel = await teamAdminClient.conversations.create({
        name: `test-bulk-delete-${new Date().getTime()}`,
      });
      const channelId = testChannel.channel.id;
      let removing = null;
      let isInProgress = false;

      while (removing === null || isInProgress) {
        removing = await orgAdminClient.admin.conversations.bulkDelete({
            channel_ids: [channelId]
          }).catch((error) => {
            if (error.data.error === 'action_already_in_progress') {
              isInProgress = true;
              new Promise(r => setTimeout(r, 3000));
            } else {
              throw error;
            }
          });

          if (removing && removing.ok) {
            isInProgress = false;
          }
        }
        logger.info(removing);
        assert.isDefined(removing.bulk_action_id);
        assert.isUndefined(removing.error);
    });
    it('should bulk move conversations using admin.conversations.bulkMove', async function () {
      const testChannel = await teamAdminClient.conversations.create({
        name: `test-bulk-move-${new Date().getTime()}`,
      });
      const channelId = testChannel.channel.id;
      let moving = null;
      let isInProgress = false;

      while (moving === null || isInProgress) {
        moving = await orgAdminClient.admin.conversations.bulkMove({
            channel_ids: [channelId],
            target_team_id: secondaryTeamId,
          }).catch((error) => {
            if (error.data.error === 'action_already_in_progress') {
              isInProgress = true;
              new Promise(r => setTimeout(r, 3000));
            } else {
              throw error;
            }
          });

          if (moving && moving.ok) {
            isInProgress = false;
          }
        }
        logger.info(moving);
        assert.isDefined(moving.bulk_action_id);
        assert.isUndefined(moving.error);
    });
  });
});
