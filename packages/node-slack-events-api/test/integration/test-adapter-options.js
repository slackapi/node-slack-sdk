var assert = require('assert');
var request = require('superagent');
var createRequestSignature = require('../helpers').createRequestSignature;
var createSlackEventAdapter = require('../../dist').createSlackEventAdapter;

var isFunction = require('lodash.isfunction');
var correctSigningSecret = 'SIGNING_SECRET';

describe('when using the waitForResponse option', function () {
  beforeEach(function () {
    this.port = process.env.PORT || '8080';
    // This is the default path
    this.path = '/slack/events';
    this.signingSecret = correctSigningSecret;
    this.ts = Math.floor(Date.now() / 1000);
    this.adapter = createSlackEventAdapter(this.signingSecret, {
      waitForResponse: true
    });
    return this.adapter.start(this.port);
  });

  afterEach(function () {
    return this.adapter.stop();
  });

  it('should emit a respond function with events', function (done) {
    var payload = {
      event: {
        type: 'any_event',
        key: 'value',
        foo: 'baz'
      }
    };
    var signature = createRequestSignature(this.signingSecret, this.ts, JSON.stringify(payload));
    this.adapter.on('any_event', function (event, respond) {
      assert(isFunction(respond));
      respond();
    });
    request
      .post('http://localhost:' + this.port + this.path)
      .send(payload)
      .set('x-slack-signature', signature)
      .set('x-slack-request-timestamp', this.ts)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          assert.equal(res.statusCode, 200);
          done();
        }
      });
  });

  it('should emit a respond function with errors that originate from user code', function (done) {
    var payload = {
      event: {
        type: 'any_event',
        key: 'value',
        foo: 'baz'
      }
    };
    var signature = createRequestSignature(this.signingSecret, this.ts, JSON.stringify(payload));
    this.adapter.on('any_event', function () {
      throw new Error();
    });
    this.adapter.on('error', function (event, respond) {
      assert(isFunction(respond));
      respond();
    });
    request
      .post('http://localhost:' + this.port + this.path)
      .send(payload)
      .set('x-slack-signature', signature)
      .set('x-slack-request-timestamp', this.ts)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          assert.equal(res.statusCode, 200);
          done();
        }
      });
  });

  it('should emit a respond function with errors that originate from known failures', function (done) {
    var payload = {
      event: {
        type: 'any_event',
        key: 'value',
        foo: 'baz'
      }
    };
    var signature = createRequestSignature('NOT_VALID_SECRET', this.ts, JSON.stringify(payload));
    this.adapter.on('error', function (error, respond) {
      assert(isFunction(respond));
      respond();
    });
    request
      .post('http://localhost:' + this.port + this.path)
      .send(payload)
      .set('x-slack-signature', signature)
      .set('x-slack-request-timestamp', this.ts)
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          assert.equal(res.statusCode, 200);
          done();
        }
      });
  });
});
