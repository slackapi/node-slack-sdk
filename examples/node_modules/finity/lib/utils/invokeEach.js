"use strict";

exports.__esModule = true;
exports.default = invokeEach;
function invokeEach(fns) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  fns.forEach(function (fn) {
    return fn.apply(undefined, args);
  });
}