/* eslint vars-on-top: 0 */

var inherits = require('inherits');

var SlackAPIError = function SlackAPIError(error) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = error;
};

inherits(SlackAPIError, Error);


var SlackRTMSendError = function SlackRTMError(error, message) {
  SlackAPIError.call(this, error);
  this.message = message;
};

inherits(SlackRTMSendError, SlackAPIError);


module.exports.SlackAPIError = SlackAPIError;
module.exports.SlackRTMError = SlackRTMSendError;
