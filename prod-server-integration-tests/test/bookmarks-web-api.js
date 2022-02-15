// npx mocha --timeout 10000 test/bookmarks-web-api.js
// run above from /prod-server-integration-tests
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

describe('bookmarks.* Web APIs', async function() {
  // export SLACK_SDK_TEST_BOT_TOKEN=xoxb-<your token here>
  // token used must have bookmarks:read, bookmarks:write scopes and channels:manage scopes to run tests properly

  const client = new WebClient(process.env.SLACK_SDK_TEST_BOT_TOKEN, { logger, });

  describe('bookmarks.{list|add|edit|remove}', async function () {
    it('should work', async function () {
      // prepare channel
      const channelRes = await client.conversations.create({
        name: `bookmarks-${Date.now()}`,
      });
      assert.isUndefined(channelRes.error);
      const channelId = channelRes.channel.id;
    
      // get current bookmarks
      const listRes = await client.bookmarks.list({
        channel_id: channelId,
      });
      assert.isUndefined(listRes.error);
  
      // add new bookmark
      const addRes = await client.bookmarks.add({
        channel_id: channelId,
        title: `${Date().now}`,
        type: 'link',
        link: 'https://www.example.com',
      });
      assert.isUndefined(addRes.error);
      const bookmark_id = addRes.bookmark.id;
  
      assert.isNotNull(bookmark_id);
  
      // edit bookmark
      const editRes = await client.bookmarks.edit({
        channel_id: channelId,
        bookmark_id,  
      });
      assert.isUndefined(editRes.error);
  
      // remove bookmark
      const removeRes = await client.bookmarks.remove({
        channel_id: channelId,
        bookmark_id,  
      });
      assert.isUndefined(removeRes.error);
  
      // cleanup channel
      client.conversations.archive({
        channel: channelId,
      });
    });
  });
});