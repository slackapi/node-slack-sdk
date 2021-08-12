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

describe('Web APIs', function () {
  const botClient = new WebClient(process.env.SLACK_SDK_TEST_BOT_TOKEN, { logger, });
  const userClient = new WebClient(process.env.SLACK_SDK_TEST_USER_TOKEN, { logger, });

  describe('auth.test', function () {

    it('should work with a bot token', async function () {
      const response = await botClient.auth.test();
      logger.info(response);
      assert.isUndefined(response.error);
    });

    it('should work with a user token', async function () {
      const response = await userClient.auth.test();
      logger.info(response);
      assert.isUndefined(response.error);
    });
  });

  describe('chat.scheduleMessage', function () {
    it('should accept either an integer or a string value for post_at', async function() {
      const channelId = process.env.SLACK_SDK_TEST_WEB_TEST_CHANNEL_ID;
      const postAt = Number.parseInt((Date.now() / 1000) + 60 * 15);
      try {
        const params = {
          text: 'Hi there!',
          channel: channelId,
          post_at: postAt,
        };
        assert.isTrue(typeof params.post_at === 'number');
        assert.isTrue(Number.isInteger(params.post_at));
        const response1 = await botClient.chat.scheduleMessage(params);
        assert.isUndefined(response1.error);

        params.post_at = "" + params.post_at;
        assert.isTrue(typeof params.post_at === 'string');
        const response2 = await botClient.chat.scheduleMessage(params);
        assert.isUndefined(response2.error);
      } catch (e) {
        console.log(e.code + " / " + JSON.stringify(e.data));
        throw e;
      }
    });
  });

  describe('Slack Connect conversations.* methods', async function (){
    /* 
      To run this test suite, we use two workspace-level bot tokens, 
      one for the sending workspace(list and send invites) another for the receiving 
      workspace (accept and approve) sent invites. Before being able to run this test, 
      we also need to have manually created a slack connect shared channel and added 
      these two bots as members first. 
      
      Required env variables:

      export SLACK_SDK_TEST_CONNECT_INVITE_SENDER_BOT_TOKEN=
      export SLACK_SDK_TEST_CONNECT_INVITE_RECEIVER_BOT_TOKEN= 
      export SLACK_SDK_TEST_CONNECT_INVITE_RECEIVER_BOT_USER_ID=
    */
    const sender= new WebClient(process.env.SLACK_SDK_TEST_CONNECT_INVITE_SENDER_BOT_TOKEN);
    const receiver = new WebClient(process.env.SLACK_SDK_TEST_CONNECT_INVITE_RECEIVER_BOT_TOKEN)

      describe('listConnectInvites', function () {
        it('should list shared channel invites ', async function () {
          const invites = await sender.conversations.listConnectInvites({});
          assert.isUndefined(invites.error);
        });
      });
      describe('inviteShared, acceptShared, approveShared', function () {
        it('should successfully send an invite and accept it', async function () {
          let channelId, inviteId = null;
          let channelName = Date.now().toString().concat('-connect-test');
          try {
            // creates channel to be shared
            const newChannel = await sender.conversations.create({
              name: channelName,
            });
            assert.isUndefined(newChannel.error);
            channelId = newChannel.channel.id;

            // sends invite to reciever bot
            const inviteShared = await sender.conversations.inviteShared({
              channel: channelId,
              user_ids: process.env.SLACK_SDK_TEST_CONNECT_INVITE_RECEIVER_BOT_USER_ID,
            });
            assert.isUndefined(inviteShared.error);
            assert.isDefined(inviteShared.invite_id);
            inviteId = inviteShared.invite_id;

            // accepts invite
            const accepted = await receiver.conversations.acceptSharedInvite({
              channel_name: channelName,
              invite_id: inviteId
            })
            assert.isUndefined(accepted.error);

            if (!accepted.implicit_approval) {
              // attempts to have receiver approve shared invite
              await receiver.conversations.approveSharedInvite({
                invite_id: inviteId
              })
            }
          } finally {
            // cleanup any created channels
            if (channelId) {
              const cleanup = await sender.conversations.archive({ channel: channelId })
              assert.isUndefined(cleanup.error)
            }
          }
        });
      });
    });
  });