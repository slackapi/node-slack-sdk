import 'dotenv/config';
import { WebClient } from '@slack/web-api';

const client = new WebClient(process.env.SLACK_SDK_TEST_BOT_TOKEN, { logLevel: 'debug' });

let channelId = null;
try {
  const teamId = (await client.auth.test()).team_id;
  const creation = await client.conversations.create({
    name: `test-channel-${Date.now()}`,
    team_id: teamId,
  });
  console.log(JSON.stringify(creation, null, 2));

  channelId = creation.channel.id;

  const userIds = (
    await client.users.list({
      limit: 100,
    })
  ).members
    .filter(
      (m) =>
        m.id !== 'USLACKBOT' &&
        !m.is_bot &&
        !m.is_invited_user &&
        !m.is_restricted &&
        !m.is_ultra_restricted &&
        !m.deleted &&
        !m.is_workflow_bot,
    )
    .map((m) => m.id)
    .slice(0, 5);

  const invitations = await client.conversations.invite({
    channel: channelId,
    users: userIds.join(','),
  });
  console.log(JSON.stringify(invitations, null, 2));

  const members = await client.conversations.members({ channel: channelId });
  console.log(JSON.stringify(members, null, 2));
} finally {
  if (channelId !== null) {
    const cleanup = await client.conversations.archive({
      channel: channelId,
    });
    console.log(JSON.stringify(cleanup, null, 2));
  }
}
