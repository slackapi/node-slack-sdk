'use strict';

exports.__esModule = true;

var _BaseConfigurator2 = require('./BaseConfigurator');

var _BaseConfigurator3 = _interopRequireDefault(_BaseConfigurator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GlobalConfigurator = function (_BaseConfigurator) {
  _inherits(GlobalConfigurator, _BaseConfigurator);

  function GlobalConfigurator(parent) {
    _classCallCheck(this, GlobalConfigurator);

    var _this = _possibleConstructorReturn(this, _BaseConfigurator.call(this, parent));

    _this.config = {
      stateEnterHooks: [],
      stateExitHooks: [],
      stateChangeHooks: [],
      transitionHooks: [],
      unhandledEventHooks: []
    };
    return _this;
  }

  GlobalConfigurator.prototype.onStateEnter = function onStateEnter(hook) {
    this.config.stateEnterHooks.push(hook);
    return this;
  };

  GlobalConfigurator.prototype.onStateExit = function onStateExit(hook) {
    this.config.stateExitHooks.push(hook);
    return this;
  };

  GlobalConfigurator.prototype.onStateChange = function onStateChange(hook) {
    this.config.stateChangeHooks.push(hook);
    return this;
  };

  GlobalConfigurator.prototype.onTransition = function onTransition(hook) {
    this.config.transitionHooks.push(hook);
    return this;
  };

  GlobalConfigurator.prototype.onUnhandledEvent = function onUnhandledEvent(hook) {
    this.config.unhandledEventHooks.push(hook);
    return this;
  };

  return GlobalConfigurator;
}(_BaseConfigurator3.default);

exports.default = GlobalConfigurator;