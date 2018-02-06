/**
 *
 */

var inherits = require('inherits');

var Model = require('./model');


function File(opts) {
  Model.call(this, 'File', opts);
}

inherits(File, Model);


module.exports = File;
