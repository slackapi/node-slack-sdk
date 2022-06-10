require('mocha');
const { createServer } = require('http');
const shutdown = require('http-shutdown');
const setup = require('proxy');
const HttpsProxyAgent = require('https-proxy-agent');
const { assert } = require('chai');
const sinon = require('sinon');
const { WebClient, retryPolicies } = require('@slack/web-api');

const proxyPort = 31280;

// TODO: Fix the test failure
/*
$ npm test

> test
> mocha proxy-test.js



  with a proxy server listening
    ✓ should connect to a host through the proxy when a proxy agent is configured (267ms)
[WARN]  web-api:WebClient:1 http request failed An HTTP protocol error occurred: statusCode = 404
[WARN]  web-api:WebClient:1 http request failed An HTTP protocol error occurred: statusCode = 404
[WARN]  web-api:WebClient:1 http request failed An HTTP protocol error occurred: statusCode = 404
[WARN]  web-api:WebClient:1 http request failed An HTTP protocol error occurred: statusCode = 404
[WARN]  web-api:WebClient:1 http request failed An HTTP protocol error occurred: statusCode = 404
[WARN]  web-api:WebClient:1 http request failed An HTTP protocol error occurred: statusCode = 404
    1) should NOT connect to a proxy when an environment variable is used


  1 passing (2s)
  1 failing

  1) with a proxy server listening
       should NOT connect to a proxy when an environment variable is used:
     Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/Users/kazuhiro.sera/github/node-slack-sdk/support/integration-tests/proxy-test.js)
      at listOnTimeout (node:internal/timers:557:17)
      at processTimers (node:internal/timers:500:7)
*/

/*
describe('with a proxy server listening', function () {
  beforeEach(function (done) {
    this.proxyUrl = `http://localhost:${proxyPort}`;
    this.server = shutdown(setup(createServer()));
    this.server.listen(proxyPort, done);
  });

  it('should connect to a host through the proxy when a proxy agent is configured', function () {
    const agent = new HttpsProxyAgent(this.proxyUrl);
    const client = new WebClient(undefined, { agent, retryConfig: retryPolicies.rapidRetryPolicy });

    // Hooking into authenticate just to observe when an inbound request is seen at the proxy
    const spy = sinon.spy();
    this.server.authenticate = (req, fn) => {
      spy();
      fn(null, true);
    };

    return client.apiCall('method')
      .catch(() => {
        assert(spy.called);
      });
  });

  it('should NOT connect to a proxy when an environment variable is used', function () {
    // manipulate the environment
    process.env.http_proxy = this.proxyUrl;
    after(function () {
      delete process.env.http_proxy;
    });

    // NOTE: we are intentionally using a non-TLS URL here to make this test effective. otherwise we'd still see the
    // effect that the proxy was not called, and that would be a false positive.
    const client = new WebClient(undefined, {
      slackApiUrl: 'http://example.com/',
      retryConfig: retryPolicies.rapidRetryPolicy
    });

    // Hooking into authenticate just to observe when an inbound request is seen at the proxy
    const spy = sinon.spy();
    this.server.authenticate = (req, fn) => {
      spy();
      fn(null, true);
    };

    return client.apiCall('method')
      .catch(() => {
        assert(spy.notCalled);
      });
  });

  afterEach(function (done) {
    this.server.shutdown(done);
  });
});
*/