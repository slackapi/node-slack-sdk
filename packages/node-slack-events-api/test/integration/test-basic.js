var http = require('http');
var assert = require('assert');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('superagent');
var createSlackEventAdapter = require('../../dist').default;
var errorCodes = require('../../dist').errorCodes;

var helpers = require('../helpers');

describe('when using middleware inside your own express application', function () {
  beforeEach(function (done) {
    this.port = process.env.PORT || '8080';
    this.verificationToken = 'VERIFICATION_TOKEN';
    this.adapter = createSlackEventAdapter(this.verificationToken);
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use('/slack', this.adapter.expressMiddleware());
    this.server = http.createServer(this.app);
    this.server.listen(this.port, done);
  });

  afterEach(function (done) {
    this.server.close(done);
  });

  it('should emit a slack event', function (done) {
    var partiallyComplete = helpers.completionAggregator(done, 2);
    var payload = {
      token: this.verificationToken,
      event: {
        type: 'any_event',
        key: 'value',
        foo: 'baz'
      }
    };
    this.adapter.on('any_event', function (event) {
      assert.deepEqual(event, payload.event);
      partiallyComplete();
    });
    request
      .post('http://localhost:' + this.port + '/slack')
      .send(payload)
      .end(function (err, res) {
        if (err) {
          partiallyComplete(err);
        } else {
          assert.equal(res.statusCode, 200);
          partiallyComplete();
        }
      });
  });

  it('should emit a verification error when handling a request with a bad verification token', function (done) {
    var partiallyComplete = helpers.completionAggregator(done, 2);
    var payload = {
      token: 'NOT_THE_RIGHT_VERIFICATION_TOKEN',
      event: {
        type: 'any_event',
        key: 'value',
        foo: 'baz'
      }
    };
    this.adapter.on('any_event', function (event) {
      // If this happens, the test has failed.
      partiallyComplete(event);
    });
    this.adapter.on('error', function (error) {
      assert(error instanceof Error);
      assert.equal(error.code, errorCodes.TOKEN_VERIFICATION_FAILURE);
      assert.deepEqual(error.body, payload);
      partiallyComplete();
    });
    request
      .post('http://localhost:' + this.port + '/slack')
      .send(payload)
      .end(function (err, res) {
        assert(err instanceof Error);
        assert.equal(res.statusCode, 500);
        partiallyComplete();
      });
  });

  it('should handle URL verification', function (done) {
    var challenge = 'CHALLENGE_VALUE';
    var payload = {
      token: this.verificationToken,
      challenge: challenge,
      type: 'url_verification'
    };
    request
      .post('http://localhost:' + this.port + '/slack')
      .send(payload)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          assert.equal(res.statusCode, 200);
          assert.equal(res.text, challenge);
          done();
        }
      });
  });

  it('should forward a challenge request error to the error handler');
});
