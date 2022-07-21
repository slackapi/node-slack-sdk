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
    it('should get an available file for a public_channel type and a date that has passed', async function () {
      // This test may fail depending on the enterprise grid account you are testing on.
      // To get this test to pass, please adjust the date to anywhere from 1 day after
      // your enterprise grid org was created to the current date.
      const body = { type: 'public_channel', date: '2022-07-06' };
      const res = await orgAdminClient.admin.analytics.getFile(body);
      assert.isUndefined(res.error);
      assert.isDefined(res.file_data);
      assert.property(res.file_data[0], 'total_members_count');
      assert.property(res.file_data[0], 'full_members_count');
    });

    it('should fail to get an available file for a future date', async function () {
      // This test may fail depending on the current date and the enterprise grid account you are testing on.
      // To get this test to pass, please adjust the date to anywhere after today's date.
      const body = { type: 'public_channel', date: '2035-10-06' };
      try {
        await orgAdminClient.admin.analytics.getFile(body);
      } catch (error) {
        assert.isFalse(error.data.ok);
        assert.equal(error.data.error, 'file_not_yet_available');
      }
    });

    it('should get an available file for a member type and a date that has passed', async function () {
      // This test may fail depending on the enterprise grid account you are testing on.
      // To get this test to pass, please adjust the date to anywhere from 1 day after
      // your enterprise grid org was created to the current date.
      const body = { type: 'member', date: '2022-07-06' };
      const res1 = await orgAdminClient.admin.analytics.getFile(body);
      assert.isUndefined(res1.error);
      assert.isDefined(res1.file_data);
      assert.property(res1.file_data[0], 'user_id');
      assert.property(res1.file_data[0], 'email_address');
    });

    it('should get metadata when using public_channel type and metadata_only options', async function () {
      const body = { type: 'public_channel', metadata_only: true };
      const res2 = await orgAdminClient.admin.analytics.getFile(body);
      assert.isUndefined(res2.error);
      assert.isDefined(res2.file_data);
      assert.property(res2.file_data[0], 'name');
      assert.property(res2.file_data[0], 'topic');
      assert.property(res2.file_data[0], 'description');
    });

    it('should fail to get metadata when using member type and metadata_only options', async function () {
      const body = { type: 'member', metadata_only: true };
      try {
        await orgAdminClient.admin.analytics.getFile(body);
      } catch (error) {
        assert.isFalse(error.data.ok);
        assert.equal(error.data.error, 'metadata_not_available');
      }
    });
  });
});
