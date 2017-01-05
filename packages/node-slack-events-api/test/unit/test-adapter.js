var assert = require('assert');
var http = require('http');
var EventEmitter = require('events');
var proxyquire = require('proxyquire');
var express = require('express');
var bodyParser = require('body-parser');
var SlackEventAdapter = require('../../dist/adapter').default;

// fixtures and test helpers
var workingVerificationToken = 'VERIFICATION_TOKEN';
function fakeBindMiddlewareToAdapter(adapter) {
  // eslint-disable-next-line no-param-reassign
  adapter.middleware = function _fakeMiddleware() { };
}

describe('SlackEventAdapter', function () {
  describe('constructor', function () {
    it('should be an EventEmitter subclass', function () {
      var adapter = new SlackEventAdapter(workingVerificationToken);
      assert(adapter instanceof EventEmitter);
    });
    it('should fail without a verification token', function () {
      assert.throws(function () {
        var adapter = new SlackEventAdapter();  // eslint-disable-line no-unused-vars
      }, TypeError);
    });
    it('should store the verification token', function () {
      var adapter = new SlackEventAdapter(workingVerificationToken);
      assert.equal(adapter.verificationToken, workingVerificationToken);
    });
  });

  describe('#expressServer()', function () {
    beforeEach(function () {
      this.adapter = new SlackEventAdapter(workingVerificationToken);
    });

    it('should reject if the adapter does not have middleware bound', function () {
      return this.adapter.expressServer()
        .then(function (server) {
          assert.fail(server, null, 'a server was created');
        }).catch(function (error) {
          assert(error instanceof Error);
        });
    });

    describe('when express package is not found', function () {
      beforeEach(function () {
        proxyquire('../../dist/adapter', { express: null });
      });
      afterEach(function () {
        proxyquire('../../dist/adapter', { express: express });
      });
      it('should reject', function () {
        return this.adapter.expressServer()
          .then(function (server) {
            assert(server, null, 'a server was created');
          })
          .catch(function (error) {
            assert(error instanceof Error);
          });
      });
    });

    describe('when body-parser package is not found', function () {
      beforeEach(function () {
        proxyquire('../../dist/adapter', { 'body-parser': null });
      });
      afterEach(function () {
        proxyquire('../../dist/adapter', { 'body-parser': bodyParser });
      });
      it('should reject', function () {
        return this.adapter.expressServer()
          .then(function (server) {
            assert(server, null, 'a server was created');
          })
          .catch(function (error) {
            assert(error instanceof Error);
          });
      });
    });

    it('should return a Promise of an http.Server', function () {
      fakeBindMiddlewareToAdapter(this.adapter);
      return this.adapter.expressServer().then(function (server) {
        assert(server instanceof http.Server);
      });
    });
  });
});
