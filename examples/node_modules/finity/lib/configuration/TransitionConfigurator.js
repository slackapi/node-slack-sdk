'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _BaseConfigurator2 = require('./BaseConfigurator');

var _BaseConfigurator3 = _interopRequireDefault(_BaseConfigurator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransitionConfigurator = function (_BaseConfigurator) {
  _inherits(TransitionConfigurator, _BaseConfigurator);

  function TransitionConfigurator(parent, targetState) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, TransitionConfigurator);

    var _this = _possibleConstructorReturn(this, _BaseConfigurator.call(this, parent));

    _this.config = _extends({
      targetState: targetState
    }, options, {
      actions: [],
      condition: null
    });
    return _this;
  }

  TransitionConfigurator.prototype.withAction = function withAction(action) {
    this.config.actions.push(action);
    return this;
  };

  TransitionConfigurator.prototype.withCondition = function withCondition(condition) {
    this.config.condition = condition;
    return this;
  };

  return TransitionConfigurator;
}(_BaseConfigurator3.default);

exports.default = TransitionConfigurator;