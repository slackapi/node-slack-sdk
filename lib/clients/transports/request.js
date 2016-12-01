/**
 * Simple transport using the node request library.
 */

var HttpsProxyAgent = require('https-proxy-agent');
var has = require('lodash').has;
var partial = require('lodash').partial;
var request = require('request');


var handleRequestTranportRes = function handleRequestTranportRes(cb, err, response, body) {
  var headers;
  var statusCode;

  if (err) {
    headers = response ? response.headers || {} : {};
    statusCode = response ? response.statusCode || null : null;
    cb(err, headers, statusCode, body);
  } else {
    cb(err, response.headers, response.statusCode, body);
  }
};


var getRequestTransportArgs = function getReqestTransportArgs(args) {
  var transportArgs = {
    url: args.url,
    headers: args.headers
  };

  if (has(args.data, 'file')) {
    transportArgs.formData = args.data;
  } else {
    transportArgs.form = args.data;
  }

  if (has(args, 'body')) {
    transportArgs.body = JSON.stringify(args.body);
  }

  return transportArgs;
};


var proxiedRequestTransport = function proxiedRequestTransport(proxyURL) {
  return function _proxiedRequestTransport(args, cb) {
    var requestArgs = getRequestTransportArgs(args);
    requestArgs.agent = new HttpsProxyAgent(proxyURL);
    request.post(requestArgs, partial(handleRequestTranportRes, cb));
  };
};


var requestTransport = function requestTransport(args, cb) {
  var requestArgs = getRequestTransportArgs(args);
  request.post(requestArgs, partial(handleRequestTranportRes, cb));
};


module.exports.proxiedRequestTransport = proxiedRequestTransport;
module.exports.requestTransport = requestTransport;
