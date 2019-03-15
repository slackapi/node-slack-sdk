"use strict";

exports.__esModule = true;
exports.default = merge;
function merge(target, source) {
  Object.keys(source).forEach(function (key) {
    target[key] = source[key];
  });
  return target;
}