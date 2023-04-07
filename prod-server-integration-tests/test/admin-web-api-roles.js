// npx mocha --timeout 10000 npm test test/admin-web-api-roles.js
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

describe('admin.roles.*', function () {
  it('should work', async function () {
    const orgAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN, { logger, });
    const response = await orgAdminClient.admin.roles.listAssignments({
      role_ids: ["Rl0A"],
      limit: 3,
      sort_dir: "desc",
    })
    logger.info(response);
    assert.isUndefined(response.error);
    // TODO: add/removeAssignments
  });
});
