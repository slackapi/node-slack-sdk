/**
 * Simple transport using the node request library.
 */

var request = require('request');


var requestTransport = function requestTransport(args, cb) {
  var requestArgs = {
    url: args.url,
    form: args.data,
    headers: args.headers,
  };

  request.post(requestArgs, function handleRequestTranportResponse(err, response, body) {
    var headers;
    var statusCode;

    if (err) {
      headers = response ? response.headers || {} : {};
      statusCode = response ? response.statusCode || null : null;
      cb(err, headers, statusCode, body);
    } else {
      cb(err, response.headers, response.statusCode, body);
    }
  });
};


module.exports = requestTransport;
