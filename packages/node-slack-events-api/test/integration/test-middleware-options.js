var http = require('http');
var assert = require('assert');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('superagent');
var createSlackEventAdapter = require('../../dist').createSlackEventAdapter;

var helpers = require('../helpers');

describe('when using middleware propogate errors option', function () {
  beforeEach(function (done) {
    this.port = process.env.PORT || '8080';
    this.verificationToken = 'VERIFICATION_TOKEN';
    this.adapter = createSlackEventAdapter(this.verificationToken);
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use('/slack', this.adapter.expressMiddleware({
      propagateErrors: true
    }));
    this.server = http.createServer(this.app);
    this.server.listen(this.port, done);
  });

  afterEach(function (done) {
    this.server.close(done);
  });

  it('should propogate errors to express error handlers', function (done) {
    var partiallyComplete = helpers.completionAggregator(done, 2);
    var payload = {
      token: 'NOT_THE_RIGHT_VERIFICATION_TOKEN',
      event: {}
    };
    this.app.use(function (err, req, res, next) { // eslint-disable-line no-unused-vars
      assert(err instanceof Error);
      res.sendStatus(500);
      partiallyComplete();
    });
    request
      .post('http://localhost:' + this.port + '/slack')
      .send(payload)
      .end(function () {
        partiallyComplete();
      });
  });
});
