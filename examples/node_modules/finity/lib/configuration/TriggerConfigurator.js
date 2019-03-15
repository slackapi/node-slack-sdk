'use strict';

exports.__esModule = true;

var _BaseConfigurator2 = require('./BaseConfigurator');

var _BaseConfigurator3 = _interopRequireDefault(_BaseConfigurator2);

var _TransitionConfigurator = require('./TransitionConfigurator');

var _TransitionConfigurator2 = _interopRequireDefault(_TransitionConfigurator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TriggerConfigurator = function (_BaseConfigurator) {
  _inherits(TriggerConfigurator, _BaseConfigurator);

  function TriggerConfigurator(parent) {
    _classCallCheck(this, TriggerConfigurator);

    var _this = _possibleConstructorReturn(this, _BaseConfigurator.call(this, parent));

    _this.config = {
      transitions: []
    };
    return _this;
  }

  TriggerConfigurator.prototype.transitionTo = function transitionTo(targetState) {
    return this.transition(targetState);
  };

  TriggerConfigurator.prototype.selfTransition = function selfTransition() {
    return this.transition(null);
  };

  TriggerConfigurator.prototype.internalTransition = function internalTransition() {
    return this.transition(null, { isInternal: true });
  };

  TriggerConfigurator.prototype.ignore = function ignore() {
    return this.transition(null, { ignore: true });
  };

  TriggerConfigurator.prototype.transition = function transition(targetState, options) {
    var transitionConfigurator = new _TransitionConfigurator2.default(this, targetState, options);
    this.config.transitions.push(transitionConfigurator);
    return transitionConfigurator;
  };

  return TriggerConfigurator;
}(_BaseConfigurator3.default);

exports.default = TriggerConfigurator;