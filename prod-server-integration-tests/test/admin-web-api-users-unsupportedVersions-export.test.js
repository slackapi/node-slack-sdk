import 'dotenv/config';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { WebClient } from '@slack/web-api';
import { FileLogger } from '../logger.js';

const logger = new FileLogger('logs/console.log');

describe('admin.users.unsupportedVersions.export', () => {
  it('should work', async () => {
    const orgAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN, { logger });
    const response = await orgAdminClient.admin.users.unsupportedVersions.export({
      date_end_of_support: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
      date_sessions_started: 0,
    });
    logger.info(response);
    assert.equal(response.error, undefined, response.error);
  });
});
