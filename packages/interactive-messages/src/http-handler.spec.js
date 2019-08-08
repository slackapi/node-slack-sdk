require('mocha');
const { assert } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const { createRequest, createRawBodyRequest } = require('../test/helpers');

const getRawBodyStub = sinon.stub();
const { createHTTPHandler } = proxyquire('./http-handler', {
  'raw-body': getRawBodyStub
});

const correctRawBody = 'payload=%7B%22type%22%3A%22interactive_message%22%7D';
const correctSigningSecret = 'SIGNING_SECRET';

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
    const dispatch = this.dispatch;
    const res = this.res;
    const date = Math.floor(Date.now() / 1000);
    const req = createRequest(correctSigningSecret, date, correctRawBody);
    dispatch.resolves({ status: 200 });
    getRawBodyStub.resolves(Buffer.from(correctRawBody));
    res.end.callsFake(function () {
      assert(dispatch.called);
      assert.equal(res.statusCode, 200);
      done();
    });
    this.requestListener(req, res);
  });

  it('should verify a correct signing secret for a request with rawBody attribute', function (done) {
    var dispatch = this.dispatch;
    var res = this.res;
    var req = createRawBodyRequest(correctSigningSecret, this.correctDate, correctRawBody);
    dispatch.resolves({ status: 200 });
    getRawBodyStub.resolves(Buffer.from(correctRawBody));
    res.end.callsFake(function () {
      assert.equal(res.statusCode, 200);
      done();
    });
    this.requestListener(req, res);
  });

  it('should fail request signing verification for a request with a body but no rawBody', function (done) {
    var res = this.res;
    var req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
    req.body = {};
    getRawBodyStub.resolves(Buffer.from(correctRawBody));
    res.end.callsFake(function () {
      assert.equal(res.statusCode, 500);
      done();
    });
    this.requestListener(req, res);
  });

  it('should fail request signing verification with an incorrect signing secret', function (done) {
    const dispatch = this.dispatch;
    const res = this.res;
    const req = createRequest('INVALID_SECRET', this.correctDate, correctRawBody);
    getRawBodyStub.resolves(Buffer.from(correctRawBody));
    res.end.callsFake(function () {
      assert(dispatch.notCalled);
      assert.equal(res.statusCode, 404);
      done();
    });
    this.requestListener(req, res);
  });

  it('should fail request signing verification with old timestamp', function (done) {
    const dispatch = this.dispatch;
    const res = this.res;
    const sixMinutesAgo = Math.floor(Date.now() / 1000) - (60 * 6);
    const req = createRequest(correctSigningSecret, sixMinutesAgo, correctRawBody);
    dispatch.resolves({ status: 200 });
    getRawBodyStub.resolves(Buffer.from(correctRawBody));
    res.end.callsFake(function () {
      assert(dispatch.notCalled);
      assert.equal(res.statusCode, 404);
      done();
    });
    this.requestListener(req, res);
  });

  it('should handle unexpected error', function (done) {
    const res = this.res;
    const req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
    getRawBodyStub.rejects(new Error('test error'));
    res.end.callsFake(function (result) {
      assert.equal(res.statusCode, 500);
      assert.isUndefined(result);
      done();
    });
    this.requestListener(req, res);
  });

  it('should provide message with unexpected errors in development', function (done) {
    const res = this.res;
    const req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
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
    const res = this.res;
    const dispatch = this.dispatch;
    const req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
    dispatch.returns(undefined);
    getRawBodyStub.resolves(Buffer.from(correctRawBody));
    res.end.callsFake(function () {
      assert.equal(res.statusCode, 404);
      done();
    });
    this.requestListener(req, res);
  });

  it('should set an identification header in its responses', function (done) {
    const dispatch = this.dispatch;
    const res = this.res;
    const req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
    dispatch.resolves({ status: 200 });
    getRawBodyStub.resolves(Buffer.from(correctRawBody));
    res.end.callsFake(function () {
      assert(res.setHeader.calledWith('X-Slack-Powered-By'));
      done();
    });
    this.requestListener(req, res);
  });

  it('should respond to ssl check requests', function (done) {
    const dispatch = this.dispatch;
    const res = this.res;
    const sslRawBody = 'payload=%7B%22ssl_check%22%3A%221%22%7D';
    const req = createRequest(correctSigningSecret, this.correctDate, sslRawBody);
    getRawBodyStub.resolves(Buffer.from(sslRawBody));
    res.end.callsFake(function () {
      assert(dispatch.notCalled);
      assert.equal(res.statusCode, 200);
      done();
    });
    this.requestListener(req, res);
  });

  describe('handling dispatch results', function () {
    it('should serialize objects in the content key as JSON', function (done) {
      const dispatch = this.dispatch;
      const res = this.res;
      const req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
      const content = {
        abc: 'def',
        ghi: true,
        jkl: ['m', 'n', 'o'],
        p: 5
      };
      dispatch.resolves({ status: 200, content: content });
      getRawBodyStub.resolves(Buffer.from(correctRawBody));
      res.end.callsFake(function (json) {
        assert(dispatch.called);
        assert.equal(res.statusCode, 200);
        assert(res.setHeader.calledWith('Content-Type', 'application/json'));
        assert.deepEqual(json, JSON.stringify(content));
        done();
      });
      this.requestListener(req, res);
    });

    it('should handle an undefined content key as no body', function (done) {
      const dispatch = this.dispatch;
      const res = this.res;
      const req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
      dispatch.resolves({ status: 500 });
      getRawBodyStub.resolves(Buffer.from(correctRawBody));
      res.end.callsFake(function (body) {
        assert(dispatch.called);
        assert.isUndefined(body);
        assert.equal(res.statusCode, 500);
        done();
      });
      this.requestListener(req, res);
    });

    it('should handle a string content key as the literal body', function (done) {
      const dispatch = this.dispatch;
      const res = this.res;
      const req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
      const content = 'hello, world';
      dispatch.resolves({ status: 200, content: content });
      getRawBodyStub.resolves(Buffer.from(correctRawBody));
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
