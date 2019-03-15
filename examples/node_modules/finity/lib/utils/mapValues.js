"use strict";

exports.__esModule = true;
exports.default = mapValues;
function mapValues(obj, callback) {
  var prototype = Object.getPrototypeOf(obj);
  var result = Object.create(prototype);
  Object.keys(obj).forEach(function (key) {
    result[key] = callback(obj[key]);
  });
  return result;
}