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
  // const userClient = new WebClient(process.env.SLACK_SDK_TEST_USER_TOKEN, { logger, });

  // describe('auth.test', function () {

  //   it('should work with a bot token', async function () {
  //     const response = await botClient.auth.test();
  //     logger.info(response);
  //     assert.isUndefined(response.error);
  //   });

  //   it('should work with a user token', async function () {
  //     const response = await userClient.auth.test();
  //     logger.info(response);
  //     assert.isUndefined(response.error);
  //   });
  // });

  // describe('chat.scheduleMessage', function () {
  //   it('should accept either an integer or a string value for post_at', async function() {
  //     const channelId = process.env.SLACK_SDK_TEST_WEB_TEST_CHANNEL_ID;
  //     const postAt = Number.parseInt((Date.now() / 1000) + 60 * 15);
  //     try {
  //       const params = {
  //         text: 'Hi there!',
  //         channel: channelId,
  //         post_at: postAt,
  //       };
  //       assert.isTrue(typeof params.post_at === 'number');
  //       assert.isTrue(Number.isInteger(params.post_at));
  //       const response1 = await botClient.chat.scheduleMessage(params);
  //       assert.isUndefined(response1.error);

  //       params.post_at = "" + params.post_at;
  //       assert.isTrue(typeof params.post_at === 'string');
  //       const response2 = await botClient.chat.scheduleMessage(params);
  //       assert.isUndefined(response2.error);
  //     } catch (e) {
  //       console.log(e.code + " / " + JSON.stringify(e.data));
  //       throw e;
  //     }
  //   });
  // });

  describe('Slack Connect conversations.* methods', function (){
    /* 
      To run this test suite, we use two workspace-level bot tokens in paid paids, 
      one for the inviting workspace(list and send invites) another for the recipient 
      workspace (accept and approve) sent invites. Before being able to run this test, 
      we also need to have manually created a slack connect shared channel and added 
      these two bots as members first. 
      
      Required env variables:

      export SLACK_SDK_TEST_BOT_TOKEN= inviting workspace
      export SLACK_SDK_TEST_BOT_TOKEN_SLACK_CONNECT= responding workspace
      export SLACK_SDK_TEST_SLACK_CONNECT_CHANNEL_ID= inviting workspace channel to be connected
      export SLACK_SDK_TEST_SLACK_CONNECT_BOT_USER_ID=bot user id belonging to responding app
    */
    const botClientSlackConnect = new WebClient(process.env.SLACK_SDK_TEST_BOT_TOKEN_SLACK_CONNECT);
    let channelToShare = null;

    describe('listConnectInvites', function () {
      it('should list shared channel invites ', async function () {
        const res = await botClient.conversations.listConnectInvites({});
        assert.isUndefined(res.error);
      });
    });
    describe('inviteShared', function () {
      it('should successfully send an invite', async function () {
        let userIds = (process.env.SLACK_SDK_TEST_SLACK_CONNECT_BOT_USER_ID).split(',');
        // channels can only be shared if <7 days old. Creates new channel
        const newChannelRes = await botClient.conversations.create({
          name: Date.now().toString().concat('-connect-test'),
        });
        channelToShare = newChannelRes.channel;
        const res2 = await botClient.conversations.inviteShared({
          channel: channelToShare.id,
          user_ids: userIds,
        });
        assert.isUndefined(res2.error);
        console.log('Channel to share is ', channelToShare.name)
      });
    });
    describe('acceptSharedInvite', function () {
      it('should accept an invite', async function () {
        try {
          console.log('CHANNEL TO SHARE ID IS', channelToShare.id)
          const res3 = await botClientSlackConnect.conversations.acceptSharedInvite({
            channel_name: Date.now().toString().concat('-connect-test'),
            channel_id: channelToShare.id,
            free_trial_accepted: true,
          });
          assert.equal(res3.ok, true)
          console.log('ACCEPTED', res3);
        } catch (error) {
          console.log('ERROR', error);
        }
    });
    });

    /* 
      To run this test, you need an additional admin scoped user token xoxp with conversations.connect:manage scope to approve a request that has been accepted by a user on the workspace. The user who issued the token must have the appropriate workspace permissions to approve Slack Connect channels at the time the token is used (Org Owner, Org Admin)
    */
    // describe('approveSharedInvite', function () {
    //   it('should approve an invite', async function () {

    // });
  });
});