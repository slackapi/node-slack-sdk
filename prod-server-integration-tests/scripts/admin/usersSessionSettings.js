// export SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN=
// export SLACK_SDK_TEST_GRID_WORKSPACE_ADMIN_USER_TOKEN=

const { WebClient } = require('@slack/web-api');

(async () => {
  // fetch 3 active members from a workspace
  const teamAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_WORKSPACE_ADMIN_USER_TOKEN);
  const users = await teamAdminClient.users.list({
    exclude_archived: true,
    limit: 100
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

  // call get/set/clearSettings APIs
  const orgAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN, {
    logLevel: 'debug'
  });

  const get = await orgAdminClient.admin.users.session.getSettings({
    user_ids: userIds
  });
  console.log(JSON.stringify(get, null, 2));

  const set = await orgAdminClient.admin.users.session.setSettings({
    user_ids: userIds,
    duration: 60 * 60 * 24 * 30
  });
  console.log(JSON.stringify(set, null, 2));

  const get2 = await orgAdminClient.admin.users.session.getSettings({
    user_ids: userIds
  });
  console.log(JSON.stringify(get2, null, 2));

  const clear = await orgAdminClient.admin.users.session.clearSettings({
    user_ids: userIds
  });
  console.log(JSON.stringify(clear, null, 2));
})();