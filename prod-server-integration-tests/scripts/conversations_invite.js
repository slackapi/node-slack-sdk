// Simple example script demonstrating how to create a new channel and invite members using a bot token
// This example is originally created to verify if the web-api works without any issues for https://github.com/slackapi/bolt-js/issues/973 but the code should be useful for general purposes.

const { WebClient } = require('@slack/web-api');

const client = new WebClient(
  token = process.env.SLACK_SDK_TEST_BOT_TOKEN,
  { logLevel: 'debug' },
);

(async () => {
  let channelId = null;
  try {
    // Create a new public channel
    const teamId = (await client.auth.test()).team_id;
    const creation = await client.conversations.create({
      name: `test-channel-${Date.now()}`,
      team_id: teamId,
    })
    console.log(JSON.stringify(creation, null, 2));

    channelId = creation.channel.id;

    // Randomly pick up human user IDs to invite
    const userIds = (await client.users.list({
      limit: 100
    })).members.filter(m =>
      m.id !== 'USLACKBOT' && // USLACKBOT is a special user ID for @SlackBot
      !m.is_bot &&
      !m.is_invited_user &&
      !m.is_restricted &&
      !m.is_ultra_restricted &&
      !m.deleted &&
      !m.is_workflow_bot
    ).map(m => m.id).slice(0, 5);

    // Invite the users to the channel
    const invitations = await client.conversations.invite({
      channel: channelId,
      users: userIds.join(","),
    })
    console.log(JSON.stringify(invitations, null, 2));

    // Verify if the channel has members as expected
    const members = await client.conversations.members({ channel: channelId })
    console.log(JSON.stringify(members, null, 2));

  } finally {
    // Archive the channel if you want to remove the channel from your Slack client view
    if (channelId !== null) {
      const cleanup = await client.conversations.archive({
        channel: channelId,
      })
      console.log(JSON.stringify(cleanup, null, 2));
    }
  };
})();