var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var nock = require('nock');
var sinon = require('sinon');
var Busboy = require('busboy');
var pkginfo = require('pkginfo')(module, 'version', 'repository'); // eslint-disable-line no-unused-vars

var WebAPIClient = require('../../../lib/clients/web/client');
var retryPolicies = require('../../../lib/clients/retry-policies');
var defaultHTTPResponseHandler =
  require('../../../lib/clients/transports/call-transport').handleHttpResponse;

var requestTransport = require('../../../lib/clients/transports/request');

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

  it('should register facets during construction', function () {
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
      expect(res.test).to.equal(10);
      done();
    });
  });

  it('should make API calls in the order they are executed', function (done) {
    var args1 = {
      headers: {},
      statusCode: 200,
      body: '{"test": 10}'
    };

    var args2 = {
      headers: {},
      statusCode: 200,
      body: '{"test": 20}'
    };

    var client = new WebAPIClient('test-token', { transport: mockTransport });
    sinon.spy(client, 'transport');

    client._makeAPICall('test', args1, null, function () {
      expect(client.transport.callCount).to.equal(1);
      expect(client.transport.args[0][0].data.body).to.equal('{"test": 10}');
      expect(client.transport.args.length).to.equal(1);
    });
    client._makeAPICall('test', args2, null, function () {
      expect(client.transport.callCount).to.equal(2);
      expect(client.transport.args[0][0].data.body).to.equal('{"test": 10}');
      expect(client.transport.args[1][0].data.body).to.equal('{"test": 20}');
      expect(client.transport.args.length).to.equal(2);
    });
    done();
  });

  it('should not crash when no callback is supplied to an API request', function () {
    var client = new WebAPIClient('test-token', { transport: mockTransport });

    client._makeAPICall('test', { test: 'test' }, null, null);
  });

  it('should accept overriding of request options', function (done) {

    // Add Basic Auth

    var options = {
      auth: {
        user: 'slack',
        pass: 'slack'
      }
    };

    var requestOptionsTransport = requestTransport.requestOptionsTransport(options);

    var client = new WebAPIClient('test-token', { transport: requestOptionsTransport });

    // Mock a result where Basic Auth was passed

    nock('https://slack.com/api', {
      reqheaders: {
        authorization: /Basic [0-9A-Za-z]+/i
      }
    })
      .post('/test')
      .reply(200, '{"test":"test"}');

    client._makeAPICall('test', {}, null, function (e, results) {
      expect(results.test).to.equal('test');
      done();
    });

  });

  it('should add metadata to raw Buffers for files.upload', function (done) {
    var imageBuffer = fs.readFileSync(path.resolve('test', 'fixtures', 'train.jpg'));
    var client = new WebAPIClient('test-token', { retryConfig: { retries: 0 } });

    nock('https://slack.com/api')
      .post('/files.upload')
      .reply(function (uri, requestBody, cb) {
        var busboy = new Busboy({ headers: this.req.headers });
        var fileFound = false; // eslint-disable-line no-unused-vars
        var filenameFound = false; // eslint-disable-line no-unused-vars
        var errorFound = undefined;
        var bodyBuffer;
        busboy.on('file', function (fieldname, file, filename) {
          fileFound = (fieldname === 'file' && filename === 'train.jpg');
          file.resume();
        });
        busboy.on('field', function (fieldname, val) {
          filenameFound = (fieldname === 'filename' && val === 'train.jpg');
        });
        busboy.on('error', function (error) {
          errorFound = error;
        });
        busboy.on('finish', function () {
          if (errorFound) {
            cb(errorFound);
          } else {
            cb(null, [200, '{ "ok": true, "test": "passed" }']);
          }
        });
        if (requestBody) {
          if (lodash.isFunction(Buffer.from)) {
            bodyBuffer = Buffer.from(requestBody, 'hex');
          } else {
            bodyBuffer = new Buffer(requestBody, 'hex');
          }
          busboy.end(bodyBuffer);
        } else {
          cb(null, [500, '{ "ok": false, "test": "failed" }']);
        }
      });

    client._makeAPICall('files.upload',
      { filename: 'train.jpg' },
      { file: imageBuffer },
      function (error, results) {
        expect(error).to.not.be.an('error');
        expect(results.test).to.equal('passed');
        done();
      }
    );
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

describe('Default transport', function () {
  it('should report scope information when present', function (done) {
    // See https://api.slack.com/docs/oauth-scopes#working_with_scopes
    var headers = {
      'x-oauth-scopes': 'foo, bar,baz ,qux',
      'x-accepted-oauth-scopes': 'a, i,u ,e'
    };
    var body = '{"test": 10}';
    var client = {
      logger: function () {}
    };

    defaultHTTPResponseHandler(body, headers, client, function (err, res) {
      expect(res).to.deep.equal({
        test: 10,
        scopes: ['foo', 'bar', 'baz', 'qux'],
        acceptedScopes: ['a', 'i', 'u', 'e']
      });
      done();
    });
  });
});
