'use strict';

exports.__esModule = true;

var _BaseConfigurator2 = require('./BaseConfigurator');

var _BaseConfigurator3 = _interopRequireDefault(_BaseConfigurator2);

var _GlobalConfigurator = require('./GlobalConfigurator');

var _GlobalConfigurator2 = _interopRequireDefault(_GlobalConfigurator);

var _StateConfigurator = require('./StateConfigurator');

var _StateConfigurator2 = _interopRequireDefault(_StateConfigurator);

var _HierarchicalStateMachine = require('../core/HierarchicalStateMachine');

var _HierarchicalStateMachine2 = _interopRequireDefault(_HierarchicalStateMachine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StateMachineConfigurator = function (_BaseConfigurator) {
  _inherits(StateMachineConfigurator, _BaseConfigurator);

  function StateMachineConfigurator() {
    _classCallCheck(this, StateMachineConfigurator);

    var _this = _possibleConstructorReturn(this, _BaseConfigurator.call(this));

    _this.config = {
      global: new _GlobalConfigurator2.default(_this),
      initialState: null,
      states: Object.create(null)
    };
    return _this;
  }

  StateMachineConfigurator.prototype.global = function global() {
    return this.config.global;
  };

  StateMachineConfigurator.prototype.initialState = function initialState(state) {
    this.config.initialState = state;
    return this.state(state);
  };

  StateMachineConfigurator.prototype.state = function state(_state) {
    if (!this.config.states[_state]) {
      this.config.states[_state] = new _StateConfigurator2.default(this);
    }
    return this.config.states[_state];
  };

  StateMachineConfigurator.prototype.getConfig = function getConfig() {
    return this.buildConfig();
  };

  StateMachineConfigurator.prototype.start = function start() {
    var config = this.getConfig();
    return _HierarchicalStateMachine2.default.start(config);
  };

  return StateMachineConfigurator;
}(_BaseConfigurator3.default);

exports.default = StateMachineConfigurator;