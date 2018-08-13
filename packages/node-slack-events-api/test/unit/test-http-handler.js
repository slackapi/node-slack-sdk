var assert = require('chai').assert;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var createRequest = require('../helpers').createRequest;
var getRawBodyStub = sinon.stub();
var systemUnderTest = proxyquire('../../dist/http-handler', {
  'raw-body': getRawBodyStub
});
var createHTTPHandler = systemUnderTest.createHTTPHandler;
var verifyRequestSignature = systemUnderTest.verifyRequestSignature;

// fixtures
var correctSigningSecret = 'SIGNING_SECRET';
var correctRawBody = '{"type":"event_callback","event":{"type":"reaction_added",' +
'"user":"U123","item":{"type":"message","channel":"C123"}}}';

describe('http-handler', function () {
  beforeEach(function () {
    this.correctDate = Math.floor(Date.now() / 1000);
  });

  describe('verifyRequestSignature', function () {
    it('should return true for a valid request', function () {
      var req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
      var isVerified = verifyRequestSignature({
        signingSecret: correctSigningSecret,
        requestTimestamp: req.headers['x-slack-request-timestamp'],
        requestSignature: req.headers['x-slack-signature'],
        body: req.body
      });

      assert.isTrue(isVerified);
    });

    it('should throw for a request signed with a different secret', function () {
      var req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
      assert.throws(() => verifyRequestSignature({
        signingSecret: 'INVALID_SECRET',
        requestTimestamp: req.headers['x-slack-request-timestamp'],
        requestSignature: req.headers['x-slack-signature'],
        body: req.body
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
      var emit = this.emit;
      var res = this.res;
      var req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
      emit.resolves({ status: 200 });
      getRawBodyStub.resolves(correctRawBody);
      res.end.callsFake(function () {
        assert.equal(res.statusCode, 200);
        done();
      });
      this.requestListener(req, res);
    });

    it('should fail request signing verification with an incorrect signing secret', function (done) {
      var res = this.res;
      var req = createRequest('INVALID_SECRET', this.correctDate, correctRawBody);
      getRawBodyStub.resolves(correctRawBody);
      res.end.callsFake(function () {
        assert.equal(res.statusCode, 404);
        done();
      });
      this.requestListener(req, res);
    });

    it('should fail request signing verification with old timestamp', function (done) {
      var res = this.res;
      var sixMinutesAgo = Math.floor(Date.now() / 1000) - (60 * 6);
      var req = createRequest(correctSigningSecret, sixMinutesAgo, correctRawBody);
      getRawBodyStub.resolves(correctRawBody);
      res.end.callsFake(function () {
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

    it('should set an identification header in its responses', function (done) {
      var emit = this.emit;
      var res = this.res;
      var req = createRequest(correctSigningSecret, this.correctDate, correctRawBody);
      emit.resolves({ status: 200 });
      getRawBodyStub.resolves(correctRawBody);
      res.end.callsFake(function () {
        assert(res.setHeader.calledWith('X-Slack-Powered-By'));
        done();
      });
      this.requestListener(req, res);
    });

    it('should respond to url verification requests', function (done) {
      var res = this.res;
      var emit = this.emit;
      var urlVerificationBody = '{"type":"url_verification","challenge": "TEST_CHALLENGE"}';
      var req = createRequest(correctSigningSecret, this.correctDate, urlVerificationBody);
      getRawBodyStub.resolves(urlVerificationBody);
      res.end.callsFake(function () {
        assert(emit.notCalled);
        assert.equal(res.statusCode, 200);
        done();
      });
      this.requestListener(req, res);
    });
  });
});
