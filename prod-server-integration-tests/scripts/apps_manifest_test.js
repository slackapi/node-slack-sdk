import 'dotenv/config';
import { WebClient } from '@slack/web-api';

const options = {};

const TOOLING_TOKEN = process.env.SLACK_TOOLING_TOKEN;

if (process.env.SLACK_SDK_TEST_DEV_API_URL !== undefined) {
  options.slackApiUrl = process.env.SLACK_SDK_TEST_DEV_API_URL;
}

const client = new WebClient(options);

const manifest = `{
  "_metadata": {
      "major_version": 1,
      "minor_version": 1
  },
  "display_information": {
      "name": "Test Manifest App"
  },
  "features": {
      "bot_user": {
          "display_name": "Test Manifest App",
          "always_online": false
      }
  },
  "oauth_config": {
      "scopes": {
          "bot": [
              "channels:history"
          ]
      }
  },
  "settings": {
      "event_subscriptions": {
          "request_url": "https://yourhosthere.ngrok.io/slack/events",
          "bot_events": [
              "message.channels"
          ]
      },
      "org_deploy_enabled": false,
      "socket_mode_enabled": false,
      "is_hosted": false,
      "token_rotation_enabled": false
  }
}`;

let appId;

try {
  const validateRes = await client.apps.manifest.validate({ token: TOOLING_TOKEN, manifest });
  console.log(JSON.stringify(validateRes, null, 2));

  const createRes = await client.apps.manifest.create({ token: TOOLING_TOKEN, manifest });
  appId = createRes.app_id;
  console.log(JSON.stringify(createRes, null, 2));

  const updatedManifest = { ...JSON.parse(manifest), display_information: { name: 'Updated Test Manifest App' } };
  const updateRes = await client.apps.manifest.update({
    token: TOOLING_TOKEN,
    app_id: appId,
    manifest: updatedManifest,
  });
  console.log(JSON.stringify(updateRes, null, 2));

  const exportRes = await client.apps.manifest.export({ token: TOOLING_TOKEN, app_id: appId });
  console.log(JSON.stringify(exportRes, null, 2));
} finally {
  const deleteRes = await client.apps.manifest.delete({ token: TOOLING_TOKEN, app_id: appId });
  console.log(JSON.stringify(deleteRes, null, 2));
}
