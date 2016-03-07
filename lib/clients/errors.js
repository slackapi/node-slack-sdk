
var inherits = require('inherits');


var SlackAPIError = function SlackAPIError(error) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = error;
};

inherits(SlackAPIError, Error);


module.exports.SlackAPIError = SlackAPIError;
