const { assert } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const { createRequest, createRawBodyRequest, createRequestWithoutRequiredHeaders } = require('../test/helpers');

const getRawBodyStub = sinon.stub();
const { createHTTPHandler, verifyRequestSignature } = proxyquire('./http-handler', { 'raw-body': getRawBodyStub });

// fixtures
const correctSigningSecret = 'SIGNING_SECRET';
const correctRawBody = '{"type":"event_callback","event":{"type":"reaction_added","user":"U123","item":{"type":"messa' +
  'ge","channel":"C123"}}}';

describe('http-handler', function () {
  beforeEach(function () {
    this.correctDate = Math.floor(Date.now() / 1000);
  });

  describe('verifyRequestSignature', function () {
    it('should return true for a valid request', function () {
      const req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
      const isVerified = verifyRequestSignature({
        signingSecret: correctSigningSecret,
        requestTimestamp: req.headers['x-slack-request-timestamp'],
        requestSignature: req.headers['x-slack-signature'],
        body: correctRawBody
      });

      assert.isTrue(isVerified);
    });

    it('should throw for a request signed with a different secret', function () {
      const req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
      assert.throws(() => verifyRequestSignature({
        signingSecret: 'INVALID_SECRET',
        requestTimestamp: req.headers['x-slack-request-timestamp'],
        requestSignature: req.headers['x-slack-signature'],
        body: correctRawBody
      }), 'Slack request signing verification failed');
    });
  });

  describe('createHTTPHandler', function () {
    beforeEach(function () {
      this.emit = sinon.stub();
      this.res = sinon.stub({
        setHeader: function () { },
        send: function () { },
        end: function () { }
      });
      this.next = sinon.stub();
      this.correctDate = Math.floor(Date.now() / 1000);
      this.requestListener = createHTTPHandler({
        signingSecret: correctSigningSecret,
        emit: this.emit
      });
    });

    it('should verify a correct signing secret', function (done) {
      const emit = this.emit;
      const res = this.res;
      const req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
      emit.resolves({ status: 200 });
      getRawBodyStub.resolves(Buffer.from(correctRawBody));
      res.end.callsFake(function () {
        assert.equal(res.statusCode, 200);
        done();
      });
      this.requestListener(req, res);
    });

    it('should verify a correct signing secret for a request with rawBody attribute', function (done) {
      const emit = this.emit;
      const res = this.res;
      const req = createRawBodyRequest(correctSigningSecret, this.correctDate, correctRawBody);
      emit.resolves({ status: 200 });
      getRawBodyStub.resolves(Buffer.from(correctRawBody));
      res.end.callsFake(function () {
        assert.equal(res.statusCode, 200);
        done();
      });
      this.requestListener(req, res);
    });

    it('should fail request signing verification for a request with a body but no rawBody', function (done) {
      const res = this.res;
      const req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
      req.body = {};
      getRawBodyStub.resolves(Buffer.from(correctRawBody));
      res.end.callsFake(function () {
        assert.equal(res.statusCode, 500);
        done();
      });
      this.requestListener(req, res);
    });

    it('should fail request signing verification with an incorrect signing secret', function (done) {
      const res = this.res;
      const req = createRequest('INVALID_SECRET', this.correctDate, correctRawBody);
      getRawBodyStub.resolves(Buffer.from(correctRawBody));
      res.end.callsFake(function () {
        assert.equal(res.statusCode, 404);
        done();
      });
      this.requestListener(req, res);
    });

    it('should fail request signing verification with old timestamp', function (done) {
      const res = this.res;
      const sixMinutesAgo = Math.floor(Date.now() / 1000) - (60 * 6);
      const req = createRequest(correctSigningSecret, sixMinutesAgo, correctRawBody);
      getRawBodyStub.resolves(Buffer.from(correctRawBody));
      res.end.callsFake(function () {
        assert.equal(res.statusCode, 404);
        done();
      });
      this.requestListener(req, res);
    });

    it('should fail request signing verification if signature and timestamp headers are not present', function (done) {
      const res = this.res;
      const req = createRequestWithoutRequiredHeaders();
      getRawBodyStub.resolves(Buffer.from(correctRawBody));
      res.end.callsFake(function () {
        assert.equal(res.statusCode, 404);
        done();
      });
      this.requestListener(req, res);
    })

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

    it('should set an identification header in its responses', function (done) {
      const emit = this.emit;
      const res = this.res;
      const req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
      emit.resolves({ status: 200 });
      getRawBodyStub.resolves(Buffer.from(correctRawBody));
      res.end.callsFake(function () {
        assert(res.setHeader.calledWith('X-Slack-Powered-By'));
        done();
      });
      this.requestListener(req, res);
    });

    it('should respond to url verification requests', function (done) {
      const res = this.res;
      const emit = this.emit;
      const urlVerificationBody = '{"type":"url_verification","challenge": "TEST_CHALLENGE"}';
      const req = createRequest(correctSigningSecret, this.correctDate, urlVerificationBody);
      getRawBodyStub.resolves(Buffer.from(urlVerificationBody));
      res.end.callsFake(function () {
        assert(emit.notCalled);
        assert.equal(res.statusCode, 200);
        done();
      });
      this.requestListener(req, res);
    });
  });
});
