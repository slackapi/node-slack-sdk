import 'dotenv/config';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { WebClient } from '@slack/web-api';
import { FileLogger } from '../logger.js';

const logger = new FileLogger('logs/console.log');

/** @param {Date} date @returns {string} Date formatted as YYYY-MM-DD */
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

describe('admin.analytics.* Web API', () => {
  const orgAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN, { logger });

  describe('admin.analytics.getFile', () => {
    it('should get an available file for a public_channel type and a date that has passed', async () => {
      const body = { type: 'public_channel', date: formatDate(yesterday) };
      const res = await orgAdminClient.admin.analytics.getFile(body);
      assert.equal(res.error, undefined, res.error);
      assert.notEqual(res.file_data, undefined);
      assert.ok('total_members_count' in res.file_data[0]);
      assert.ok('full_members_count' in res.file_data[0]);
    });

    it('should fail to get an available file for a future date', async () => {
      const body = { type: 'public_channel', date: formatDate(tomorrow) };
      try {
        await orgAdminClient.admin.analytics.getFile(body);
      } catch (error) {
        assert.strictEqual(error.data.ok, false);
        assert.equal(error.data.error, 'file_not_yet_available');
      }
    });

    it('should get an available file for a member type and a date that has passed', async () => {
      const body = { type: 'member', date: formatDate(yesterday) };
      const res1 = await orgAdminClient.admin.analytics.getFile(body);
      assert.equal(res1.error, undefined, res1.error);
      assert.notEqual(res1.file_data, undefined);
      assert.ok('user_id' in res1.file_data[0]);
      assert.ok('email_address' in res1.file_data[0]);
    });

    it('should get metadata when using public_channel type and metadata_only options', async () => {
      const body = { type: 'public_channel', metadata_only: true };
      const res2 = await orgAdminClient.admin.analytics.getFile(body);
      assert.equal(res2.error, undefined, res2.error);
      assert.notEqual(res2.file_data, undefined);
      assert.ok('name' in res2.file_data[0]);
      assert.ok('topic' in res2.file_data[0]);
      assert.ok('description' in res2.file_data[0]);
    });

    it('should fail to get metadata when using member type and metadata_only options', async () => {
      const body = { type: 'member', metadata_only: true };
      try {
        await orgAdminClient.admin.analytics.getFile(body);
      } catch (error) {
        assert.strictEqual(error.data.ok, false);
        assert.equal(error.data.error, 'metadata_not_available');
      }
    });
  });
});
