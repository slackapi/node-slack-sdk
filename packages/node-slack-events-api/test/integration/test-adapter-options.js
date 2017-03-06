var assert = require('assert');
var request = require('superagent');
var createSlackEventAdapter = require('../../dist').createSlackEventAdapter;

var isFunction = require('lodash.isfunction');

describe('when using the waitForResponse option', function () {
  beforeEach(function () {
    this.port = process.env.PORT || '8080';
    // This is the default path
    this.path = '/slack/events';
    this.verificationToken = 'VERIFICATION_TOKEN';
    this.adapter = createSlackEventAdapter(this.verificationToken, {
      waitForResponse: true
    });
    return this.adapter.start(this.port);
  });

  afterEach(function () {
    return this.adapter.stop();
  });

  it('should emit a respond function with events', function (done) {
    var payload = {
      token: this.verificationToken,
      event: {
        type: 'any_event',
        key: 'value',
        foo: 'baz'
      }
    };
    this.adapter.on('any_event', function (event, respond) {
      assert(isFunction(respond));
      respond();
    });
    request
      .post('http://localhost:' + this.port + this.path)
      .send(payload)
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
      token: this.verificationToken,
      event: {
        type: 'any_event',
        key: 'value',
        foo: 'baz'
      }
    };
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
      token: 'NOT_THE_RIGHT_VERIFICATION_TOKEN',
      event: {
        type: 'any_event',
        key: 'value',
        foo: 'baz'
      }
    };
    this.adapter.on('error', function (error, respond) {
      assert(isFunction(respond));
      respond();
    });
    request
      .post('http://localhost:' + this.port + this.path)
      .send(payload)
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
