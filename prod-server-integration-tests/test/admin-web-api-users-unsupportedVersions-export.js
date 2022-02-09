// npx mocha --timeout 10000 npm test test/admin-web-api-users-unsupportedVersions-export.js
// tail -f logs/console.log | jq
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

describe('admin.users.unsupportedVersions.export', function () {
  it('should work', async function () {
    const orgAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN, { logger, });
    const response = await orgAdminClient.admin.users.unsupportedVersions.export({
      date_end_of_support: Math.floor(+new Date() / 1000) + 60 * 60 * 24 *365,
      date_sessions_started: 0,
    });
    logger.info(response);
    assert.isUndefined(response.error);
  });
});
