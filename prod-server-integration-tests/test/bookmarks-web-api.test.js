import 'dotenv/config';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { WebClient } from '@slack/web-api';
import { FileLogger } from '../logger.js';

const logger = new FileLogger('logs/console.log');

// Bot token must have bookmarks:read, bookmarks:write, and channels:manage scopes.
describe('bookmarks.* Web APIs', () => {
  const client = new WebClient(process.env.SLACK_SDK_TEST_BOT_TOKEN, { logger });

  describe('bookmarks.{list|add|edit|remove}', () => {
    it('should work', async () => {
      let channelId;
      try {
        const channelRes = await client.conversations.create({
          name: `bookmarks-${Date.now()}`,
        });
        assert.equal(channelRes.error, undefined, channelRes.error);
        channelId = channelRes.channel.id;

        const listRes = await client.bookmarks.list({
          channel_id: channelId,
        });
        assert.equal(listRes.error, undefined, listRes.error);

        const addRes = await client.bookmarks.add({
          channel_id: channelId,
          title: `${Date.now()}`,
          type: 'link',
          link: 'https://www.example.com',
        });
        assert.equal(addRes.error, undefined, addRes.error);
        const bookmark_id = addRes.bookmark.id;

        assert.notEqual(bookmark_id, null);

        const editRes = await client.bookmarks.edit({
          channel_id: channelId,
          bookmark_id,
        });
        assert.equal(editRes.error, undefined, editRes.error);

        const removeRes = await client.bookmarks.remove({
          channel_id: channelId,
          bookmark_id,
        });
        assert.equal(removeRes.error, undefined, removeRes.error);
      } finally {
        if (channelId) {
          await client.conversations.archive({ channel: channelId });
        }
      }
    });
  });
});
