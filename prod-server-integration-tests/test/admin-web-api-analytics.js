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

describe('admin.analytics.* Web API', function () {
  // org-level admin user's token
  const orgAdminClient = new WebClient(process.env.SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN, { logger, });

  describe('admin.analytics.getFile', function () {
    it('should get file data', async function () {
      const body = { type: 'public_channel', date: '2022-07-06' };
      const res = await orgAdminClient.admin.analytics.getFile(body);
      assert.isUndefined(res.error);
      assert.isDefined(res.file_data);
    });
  });

  describe('admin.analytics.getFile', function () {
    it('should fail to get an available file', async function () {
      const body = { type: 'public_channel', date: '2022-10-06' };
      try {
        await orgAdminClient.admin.analytics.getFile(body);
      } catch (error) {
        assert.isFalse(error.data.ok);
        assert.isDefined(error.data.error, 'file_not_yet_available');
      }
    });
  });

  describe('admin.analytics.getFile', function () {
    it('should get metadata when using public_channel type', async function () {
      const body = { type: 'public_channel', metadata_only: true };
      const res1 = await orgAdminClient.admin.analytics.getFile(body);
      assert.isUndefined(res1.error);
      assert.isDefined(res1.file_data);
    });
  });

  describe('admin.analytics.getFile', function () {
    it('should fail to get metadata when using member type', async function () {
      const body = { type: 'member', metadata_only: true };
      try {
        await orgAdminClient.admin.analytics.getFile(body);
      } catch (error) {
        assert.isFalse(error.data.ok);
        assert.isDefined(error.data.error, 'metadata_not_available');
      }
    });
  });
});
