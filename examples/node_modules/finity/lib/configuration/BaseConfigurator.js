'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _mapValues = require('../utils/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseConfigurator = function () {
  function BaseConfigurator(parent) {
    _classCallCheck(this, BaseConfigurator);

    this.parent = parent;
  }

  BaseConfigurator.prototype.getAncestor = function getAncestor(type) {
    if (this.parent) {
      return this.parent instanceof type ? this.parent : this.parent.getAncestor(type);
    }
    return null;
  };

  BaseConfigurator.prototype.buildConfig = function buildConfig() {
    var mapper = function mapper(value) {
      if (!value) {
        return value;
      }
      if (value instanceof BaseConfigurator) {
        return value.buildConfig();
      }
      if (Array.isArray(value)) {
        return value.map(mapper);
      }
      if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        return (0, _mapValues2.default)(value, mapper);
      }
      return value;
    };
    return (0, _mapValues2.default)(this.config, mapper);
  };

  return BaseConfigurator;
}();

exports.default = BaseConfigurator;