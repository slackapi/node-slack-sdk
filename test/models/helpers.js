var expect = require('chai').expect;

var helpers = require('../../lib/models/helpers');
var userModel = require('../../lib/models/user');

var RTM_FIXTURE = require('../fixtures/rtm.start');

describe('Models', function () {
  describe('Model', function () {

    describe('#getModelClass()', function () {

      it('retrieves a User model when objects with user IDs with U or W are passed', function () {

        expect(helpers.getModelClass(RTM_FIXTURE.self)).to.equal(userModel);
        expect(helpers.getModelClass(RTM_FIXTURE.users[0])).to.equal(userModel);
        expect(helpers.getModelClass(RTM_FIXTURE.users[1])).to.equal(userModel);
        expect(helpers.getModelClass(RTM_FIXTURE.users[2])).to.equal(userModel);
        expect(helpers.getModelClass(RTM_FIXTURE.users[3])).to.equal(userModel);
        expect(helpers.getModelClass(RTM_FIXTURE.users[4])).to.equal(userModel);
        expect(helpers.getModelClass(RTM_FIXTURE.users[5])).to.equal(userModel);

      });

      it('does not retrieve a User model when IM objects are passed', function () {

        expect(helpers.getModelClass(RTM_FIXTURE.ims[0])).to.not.equal(userModel);
        expect(helpers.getModelClass(RTM_FIXTURE.ims[1])).to.not.equal(userModel);

      });

    });
  });
});
