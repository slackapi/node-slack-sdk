var assert = require('chai').assert;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var createRequest = require('../helpers').createRequest;
var correctRawBody = 'payload=%7B%22type%22%3A%22interactive_message%22%7D';
var getRawBodyStub = sinon.stub();
var systemUnderTest = proxyquire('../../dist/http-handler', {
  'raw-body': getRawBodyStub
});
var createHTTPHandler = systemUnderTest.createHTTPHandler;
// fixtures
var correctSigningSecret = 'SIGNING_SECRET';

describe('createHTTPHandler', function () {
  beforeEach(function () {
    this.dispatch = sinon.stub();
    this.res = sinon.stub({
      setHeader: function () { },
      send: function () { },
      end: function () { }
    });
    this.next = sinon.stub();
    this.correctDate = Math.floor(Date.now() / 1000);
    this.requestListener = createHTTPHandler({
      signingSecret: correctSigningSecret,
      dispatch: this.dispatch
    });
  });

  it('should verify a correct signing secret', function (done) {
    var dispatch = this.dispatch;
    var res = this.res;
    var date = Math.floor(Date.now() / 1000);
    var req = createRequest(correctSigningSecret, date, correctRawBody);
    dispatch.resolves({ status: 200 });
    getRawBodyStub.resolves(correctRawBody);
    res.end.callsFake(function () {
      assert(dispatch.called);
      assert.equal(res.statusCode, 200);
      done();
    });
    this.requestListener(req, res);
  });

  it('should fail request signing verification with an incorrect signing secret', function (done) {
    var dispatch = this.dispatch;
    var res = this.res;
    var req = createRequest('INVALID_SECRET', this.correctDate, correctRawBody);
    getRawBodyStub.resolves(correctRawBody);
    res.end.callsFake(function () {
      assert(dispatch.notCalled);
      assert.equal(res.statusCode, 404);
      done();
    });
    this.requestListener(req, res);
  });

  it('should fail request signing verification with old timestamp', function (done) {
    var dispatch = this.dispatch;
    var res = this.res;
    var sixMinutesAgo = Math.floor(Date.now() / 1000) - (60 * 6);
    var req = createRequest(correctSigningSecret, sixMinutesAgo, correctRawBody);
    dispatch.resolves({ status: 200 });
    getRawBodyStub.resolves(correctRawBody);
    res.end.callsFake(function () {
      assert(dispatch.notCalled);
      assert.equal(res.statusCode, 404);
      done();
    });
    this.requestListener(req, res);
  });

  it('should handle unexpected error', function (done) {
    var res = this.res;
    var req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
    getRawBodyStub.rejects(new Error('test error'));
    res.end.callsFake(function (result) {
      assert.equal(res.statusCode, 500);
      assert.isUndefined(result);
      done();
    });
    this.requestListener(req, res);
  });

  it('should provide message with unexpected errors in development', function (done) {
    var res = this.res;
    var req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
    process.env.NODE_ENV = 'development';
    getRawBodyStub.rejects(new Error('test error'));
    res.end.callsFake(function (result) {
      assert.equal(res.statusCode, 500);
      assert.equal(result, 'test error');
      delete process.env.NODE_ENV;
      done();
    });
    this.requestListener(req, res);
  });

  it('should handle no callback', function (done) {
    var res = this.res;
    var dispatch = this.dispatch;
    var req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
    dispatch.returns(undefined);
    getRawBodyStub.resolves(correctRawBody);
    res.end.callsFake(function () {
      assert.equal(res.statusCode, 404);
      done();
    });
    this.requestListener(req, res);
  });

  it('should set an identification header in its responses', function (done) {
    var dispatch = this.dispatch;
    var res = this.res;
    var req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
    dispatch.resolves({ status: 200 });
    getRawBodyStub.resolves(correctRawBody);
    res.end.callsFake(function () {
      assert(res.setHeader.calledWith('X-Slack-Powered-By'));
      done();
    });
    this.requestListener(req, res);
  });

  it('should respond to ssl check requests', function (done) {
    var dispatch = this.dispatch;
    var res = this.res;
    var sslRawBody = 'payload=%7B%22ssl_check%22%3A%221%22%7D';
    var req = createRequest(correctSigningSecret, this.correctDate, sslRawBody);
    getRawBodyStub.resolves(sslRawBody);
    res.end.callsFake(function () {
      assert(dispatch.notCalled);
      assert.equal(res.statusCode, 200);
      done();
    });
    this.requestListener(req, res);
  });

  describe('handling dispatch results', function () {
    it('should serialize objects in the content key as JSON', function (done) {
      var dispatch = this.dispatch;
      var res = this.res;
      var req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
      var content = {
        abc: 'def',
        ghi: true,
        jkl: ['m', 'n', 'o'],
        p: 5
      };
      dispatch.resolves({ status: 200, content: content });
      getRawBodyStub.resolves(correctRawBody);
      res.end.callsFake(function (json) {
        assert(dispatch.called);
        assert.equal(res.statusCode, 200);
        assert.deepEqual(json, JSON.stringify(content));
        done();
      });
      this.requestListener(req, res);
    });

    it('should handle an undefined content key as no body', function (done) {
      var dispatch = this.dispatch;
      var res = this.res;
      var req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
      dispatch.resolves({ status: 500 });
      getRawBodyStub.resolves(correctRawBody);
      res.end.callsFake(function (body) {
        assert(dispatch.called);
        assert.isUndefined(body);
        assert.equal(res.statusCode, 500);
        done();
      });
      this.requestListener(req, res);
    });

    it('should handle a string content key as the literal body', function (done) {
      var dispatch = this.dispatch;
      var res = this.res;
      var req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
      var content = 'hello, world';
      dispatch.resolves({ status: 200, content: content });
      getRawBodyStub.resolves(correctRawBody);
      res.end.callsFake(function (body) {
        assert(dispatch.called);
        assert.equal(res.statusCode, 200);
        assert.deepEqual(body, content);
        done();
      });
      this.requestListener(req, res);
    });
  });
});
