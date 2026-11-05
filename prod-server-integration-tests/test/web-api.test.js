import 'dotenv/config';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { WebClient } from '@slack/web-api';
import { FileLogger } from '../logger.js';

const logger = new FileLogger('logs/console.log');

describe('Web APIs', () => {
  const botClient = new WebClient(process.env.SLACK_SDK_TEST_BOT_TOKEN, { logger });
  const userClient = new WebClient(process.env.SLACK_SDK_TEST_USER_TOKEN, { logger });

  describe('auth.test', () => {
    it('should work with a bot token', async () => {
      const response = await botClient.auth.test();
      logger.info(response);
      assert.equal(response.error, undefined, response.error);
    });

    it('should work with a user token', async () => {
      const response = await userClient.auth.test();
      logger.info(response);
      assert.equal(response.error, undefined, response.error);
    });
  });

  describe('chat.scheduleMessage', () => {
    it('should accept either an integer or a string value for post_at', async () => {
      const channelId = process.env.SLACK_SDK_TEST_WEB_TEST_CHANNEL_ID;
      const postAt = Number.parseInt(Date.now() / 1000 + 60 * 15, 10);
      try {
        const params = {
          text: 'Hi there!',
          channel: channelId,
          post_at: postAt,
        };
        assert.strictEqual(typeof params.post_at, 'number');
        assert.ok(Number.isInteger(params.post_at));
        const response1 = await botClient.chat.scheduleMessage(params);
        assert.equal(response1.error, undefined, response1.error);

        params.post_at = `${params.post_at}`;
        assert.strictEqual(typeof params.post_at, 'string');
        const response2 = await botClient.chat.scheduleMessage(params);
        assert.equal(response2.error, undefined, response2.error);
      } catch (e) {
        console.log(`${e.code} / ${JSON.stringify(e.data)}`);
        throw e;
      }
    });
  });

  // Prerequisites: two workspace-level bot tokens are needed — one for the sending workspace
  // (list and send invites) and another for the receiving workspace (accept and approve invites).
  // A Slack Connect shared channel must be manually created with both bots added as members first.
  describe('Slack Connect conversations.* methods', () => {
    const sender = new WebClient(process.env.SLACK_SDK_TEST_CONNECT_INVITE_SENDER_BOT_TOKEN);
    const receiver = new WebClient(process.env.SLACK_SDK_TEST_CONNECT_INVITE_RECEIVER_BOT_TOKEN);

    describe('listConnectInvites', () => {
      it('should list shared channel invites', async () => {
        const invites = await sender.conversations.listConnectInvites({});
        assert.equal(invites.error, undefined, invites.error);
      });
    });

    describe('inviteShared, acceptShared, approveShared', () => {
      it('should successfully send an invite and accept it', async () => {
        let channelId = null;
        const channelName = Date.now().toString().concat('-connect-test');
        try {
          const newChannel = await sender.conversations.create({
            name: channelName,
          });
          assert.equal(newChannel.error, undefined, newChannel.error);
          channelId = newChannel.channel.id;

          const inviteShared = await sender.conversations.inviteShared({
            channel: channelId,
            user_ids: process.env.SLACK_SDK_TEST_CONNECT_INVITE_RECEIVER_BOT_USER_ID,
          });
          assert.equal(inviteShared.error, undefined, inviteShared.error);
          assert.notEqual(inviteShared.invite_id, undefined);
          const inviteId = inviteShared.invite_id;

          const accepted = await receiver.conversations.acceptSharedInvite({
            channel_name: channelName,
            invite_id: inviteId,
          });
          assert.equal(accepted.error, undefined, accepted.error);

          if (!accepted.implicit_approval) {
            await receiver.conversations.approveSharedInvite({
              invite_id: inviteId,
            });
          }
        } finally {
          if (channelId) {
            const cleanup = await sender.conversations.archive({ channel: channelId });
            assert.equal(cleanup.error, undefined, cleanup.error);
          }
        }
      });
    });
  });

  describe('team.* for rtm.start migration', () => {
    it('should work with a bot token (team.billing.info)', async () => {
      const response = await botClient.team.billing.info();
      logger.info(response);
      assert.equal(response.error, undefined, response.error);
    });

    it('should work with a bot token (team.preferences.list)', async () => {
      const response = await botClient.team.preferences.list();
      logger.info(response);
      assert.equal(response.error, undefined, response.error);
    });
  });
});
