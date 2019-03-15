'use strict';

exports.__esModule = true;

var _TriggerConfigurator2 = require('./TriggerConfigurator');

var _TriggerConfigurator3 = _interopRequireDefault(_TriggerConfigurator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TrimerConfigurator = function (_TriggerConfigurator) {
  _inherits(TrimerConfigurator, _TriggerConfigurator);

  function TrimerConfigurator(parent, timeout) {
    _classCallCheck(this, TrimerConfigurator);

    var _this = _possibleConstructorReturn(this, _TriggerConfigurator.call(this, parent));

    _this.config.timeout = timeout;
    return _this;
  }

  return TrimerConfigurator;
}(_TriggerConfigurator3.default);

exports.default = TrimerConfigurator;