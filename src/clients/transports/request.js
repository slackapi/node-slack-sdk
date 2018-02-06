/**
 * Simple transport using the node request library.
 */

var HttpsProxyAgent = require('https-proxy-agent');
var has = require('lodash').has;
var partial = require('lodash').partial;
var defaults = require('lodash').defaults;
var cloneDeep = require('lodash').cloneDeep;
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

    // Buffers are sometimes not handled well by the underlying form-data package. Adding extra
    // metadata can resolve this.
    // see: https://github.com/slackapi/node-slack-sdk/issues/307#issuecomment-289231737
    if (Buffer.isBuffer(transportArgs.formData.file) && has(args.data, 'filename')) {
      transportArgs.formData.file = {
        value: transportArgs.formData.file,
        options: {
          filename: args.data.filename
        }
      };
    }
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

var requestOptionsTransport = function requestOptionsTransport(options) {
  return function _requestOptionsTransport(args, cb) {
    var instanceOptions = cloneDeep(options);
    var requestArgs = defaults(instanceOptions, getRequestTransportArgs(args));
    request.post(requestArgs, partial(handleRequestTranportRes, cb));
  };
};

var requestTransport = function requestTransport(args, cb) {
  var requestArgs = getRequestTransportArgs(args);
  request.post(requestArgs, partial(handleRequestTranportRes, cb));
};

module.exports.proxiedRequestTransport = proxiedRequestTransport;
module.exports.requestOptionsTransport = requestOptionsTransport;
module.exports.requestTransport = requestTransport;
