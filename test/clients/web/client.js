var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var nock = require('nock');
var sinon = require('sinon');
var pkginfo = require('pkginfo')(module, 'version', 'repository'); // eslint-disable-line no-unused-vars

var WebAPIClient = require('../../../lib/clients/web/client');
var retryPolicies = require('../../../lib/clients/retry-policies');


var mockTransport = function (args, cb) {
  cb(args.data.err, args.headers, args.data.statusCode, args.data.body);
};


describe('Web API Client', function () {

  it('should add all available facets', function () {
    var client = new WebAPIClient('test-token');
    var facets = fs
      .readdirSync(path.resolve('lib', 'clients', 'web', 'facets'))
      .filter(function (file) {
        return /\.js$/.test(file) && file !== 'index.js';
      })
      .map(function (file) {
        return require('../../../lib/clients/web/facets/' + file);
      });

    // Check that all facet files have been registered:
    facets.forEach(function (Facet) {
      var name = new Facet().name;
      // The 'im' facet is aliased to dm:
      if (name === 'dm') {
        expect(client[name].name).to.equal('im');
      } else {
        expect(client[name].name).to.equal(name);
      }
    });
  });

  it('should accept supplied defaults when present', function () {
    var opts = {
      slackAPIUrl: 'test',
      transport: lodash.noop
    };
    var client = new WebAPIClient('test-token', opts);

    expect(client.slackAPIUrl).to.equal('test');
  });

  it('should register facets  during construction', function () {
    var client = new WebAPIClient('test-token', { transport: lodash.noop });
    expect(client.auth).to.not.equal(undefined);
  });

  it('should make API calls via the transport function', function (done) {
    var args = {
      headers: {},
      statusCode: 200,
      body: '{"test": 10}'
    };

    var client = new WebAPIClient('test-token', { transport: mockTransport });

    client._makeAPICall('test', args, null, function (err, res) {
      expect(res).to.deep.equal({ test: 10 });
      done();
    });
  });

  it('should not crash when no callback is supplied to an API request', function () {
    var client = new WebAPIClient('test-token', { transport: mockTransport });

    client._makeAPICall('test', { test: 'test' }, null, null);
  });

  describe('it should retry failed or rate-limited requests', function () {

    var attemptAPICall = function (done) {
      var client;

      nock('https://slack.com/api')
        .post('/test')
        .reply(200, '{}');

      client = new WebAPIClient('test-token', {
        retryConfig: retryPolicies.TEST_RETRY_POLICY
      });
      sinon.spy(client, 'transport');

      client._makeAPICall('test', {}, null, function () {
        expect(client.transport.callCount).to.equal(2);
        done();
      });
    };

    it('should pause job execution in response to a 429 header', function (done) {
      nock('https://slack.com/api')
        .post('/test')
        .reply(429, '{}', { 'retry-after': 0 });

      attemptAPICall(done);
    });

    it('should retry failed requests', function (done) {
      nock('https://slack.com/api')
        .post('/test')
        .replyWithError('this should never happen');

      attemptAPICall(done);
    });

    it('should retry non 200 or 429 responses', function (done) {
      nock('https://slack.com/api')
        .post('/test')
        .reply(500, '');

      attemptAPICall(done);
    });

  });

});
