var expect = require('chai').expect;
var lodash = require('lodash');
var nock = require('nock');
var sinon = require('sinon');

var WebAPIClient = require('../../../lib/clients/web/client');


var mockTransport = function (args, cb) {
  cb(args.data.err, args.headers, args.data.statusCode, args.data.body);
};


describe('Web API Client', function () {

  it('should accept supplied defaults when present', function () {
    var opts = {
      slackAPIUrl: 'test',
      userAgent: 'test',
      transport: lodash.noop,
    };
    var client = new WebAPIClient('test-token', opts);

    expect(client.slackAPIUrl).to.equal('test');
    expect(client.userAgent).to.equal('test');
  });

  it('should register facets  during construction', function () {
    var client = new WebAPIClient('test-token', { transport: lodash.noop });
    expect(client.auth).to.not.equal(undefined);
  });

  it('should make API calls via the transport function', function (done) {
    var args = {
      headers: {},
      statusCode: 200,
      body: '{"test": 10}',
    };

    var client = new WebAPIClient('test-token', { transport: mockTransport });

    client.makeAPICall('test', args, function (err, res) {
      expect(res).to.deep.equal({ test: 10 });
      done();
    });
  });

  it('should not crash when no callback is supplied to an API request', function () {
    var client = new WebAPIClient('test-token', { transport: mockTransport });

    client.makeAPICall('test', { test: 'test' });
  });

  describe('it should retry failed or rate-limited requests', function () {

    var attemptAPICall = function (done) {
      var client;

      nock('https://slack.com/api')
        .post('/test')
        .reply(200, '{}');

      client = new WebAPIClient('test-token', {
        retryConfig: {
          minTimeout: 0,
          maxTimeout: 1,
        },
      });
      sinon.spy(client, 'transport');

      client.makeAPICall('test', {}, function () {
        expect(client.transport.callCount).to.equal(2);
        done();
      });
    };

    it('should pause job execution in response to a 429 header', function (done) {
      nock('https://slack.com/api')
        .post('/test')
        .reply(429, '{}', { 'X-Retry-After': 0 });

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
