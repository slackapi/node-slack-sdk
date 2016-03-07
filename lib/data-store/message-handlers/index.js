/**
 *
 */

var forEach = require('lodash').forEach;


var handlerModules = [
  require('./bots'),
  require('./channels'),
  require('./groups'),
  require('./dm'),
  require('./presence'),
  require('./stars'),
  require('./team'),
  require('./user'),
  require('./message'),
  require('./reactions')
];


forEach(handlerModules, function registerHandlerModule(mod) {
  forEach(mod, function registerHandlerFn(val, key) {
    module.exports[key] = val;
  });
});
