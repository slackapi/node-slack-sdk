"use strict";

exports.__esModule = true;
exports.default = delegateToAncestor;
function delegateToAncestor(constructor, ancestorConstructor) {
  var prototype = constructor.prototype;
  var ancestorPrototype = ancestorConstructor.prototype;
  Object.getOwnPropertyNames(ancestorPrototype).filter(function (name) {
    return !prototype[name] && ancestorPrototype[name] instanceof Function && ancestorPrototype[name] !== ancestorConstructor;
  }).forEach(function (name) {
    // eslint-disable-next-line func-names
    prototype[name] = function () {
      var method = ancestorPrototype[name];

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return method.apply(this.getAncestor(ancestorConstructor), args);
    };
  });
}