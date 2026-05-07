// npx mocha --timeout 10000 test/bookmarks-web-api.js
// run above from /prod-server-integration-tests
require('mocha');
const { config } = require('dotenv');
const { assert } = require('chai');
const { WebClient } = require('@slack/web-api');

const winston = require('winston');
const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.File({ filename: 'logs/console.log' }),
  ],
});

config();

describe('bookmarks.* Web APIs', async function () {
  // export SLACK_SDK_TEST_BOT_TOKEN=xoxb-<your token here>
  // token used must have bookmarks:read, bookmarks:write scopes and channels:manage scopes to run tests properly

  const client = new WebClient(process.env.SLACK_SDK_TEST_BOT_TOKEN, { logger, });

  describe('bookmarks.{list|add|edit|remove}', async function () {
    it('should work', async function () {
      let channelId;
      try {
        const channelRes = await client.conversations.create({
          name: `bookmarks-${Date.now()}`,
        });
        assert.isUndefined(channelRes.error);
        channelId = channelRes.channel.id;

        const listRes = await client.bookmarks.list({
          channel_id: channelId,
        });
        assert.isUndefined(listRes.error);

        const addRes = await client.bookmarks.add({
          channel_id: channelId,
          title: `${Date().now}`,
          type: 'link',
          link: 'https://www.example.com',
        });
        assert.isUndefined(addRes.error);
        const bookmark_id = addRes.bookmark.id;

        assert.isNotNull(bookmark_id);

        const editRes = await client.bookmarks.edit({
          channel_id: channelId,
          bookmark_id,
        });
        if (editRes.error) console.log('bookmarks.edit failed:', editRes.error);
        assert.isUndefined(editRes.error);

        const removeRes = await client.bookmarks.remove({
          channel_id: channelId,
          bookmark_id,
        });
        if (removeRes.error) console.log('bookmarks.remove failed:', removeRes.error);
        assert.isUndefined(removeRes.error);
      } finally {
        if (channelId) {
          await client.conversations.archive({ channel: channelId });
        }
      }
    });
  });
});
