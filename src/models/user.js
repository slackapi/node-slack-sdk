/**
 *
 */

var inherits = require('inherits');

var Model = require('./model');


function User(opts) {
  Model.call(this, 'User', opts);
}

inherits(User, Model);


module.exports = User;
