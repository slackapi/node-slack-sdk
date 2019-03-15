'use strict';

exports.__esModule = true;

var _BaseConfigurator2 = require('./BaseConfigurator');

var _BaseConfigurator3 = _interopRequireDefault(_BaseConfigurator2);

var _TriggerConfigurator = require('./TriggerConfigurator');

var _TriggerConfigurator2 = _interopRequireDefault(_TriggerConfigurator);

var _TimerConfigurator = require('./TimerConfigurator');

var _TimerConfigurator2 = _interopRequireDefault(_TimerConfigurator);

var _AsyncActionConfigurator = require('./AsyncActionConfigurator');

var _AsyncActionConfigurator2 = _interopRequireDefault(_AsyncActionConfigurator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StateConfigurator = function (_BaseConfigurator) {
  _inherits(StateConfigurator, _BaseConfigurator);

  function StateConfigurator(parent) {
    _classCallCheck(this, StateConfigurator);

    var _this = _possibleConstructorReturn(this, _BaseConfigurator.call(this, parent));

    _this.config = {
      entryActions: [],
      exitActions: [],
      events: Object.create(null),
      anyEventTrigger: null,
      timers: [],
      asyncActions: [],
      submachine: null
    };
    return _this;
  }

  StateConfigurator.prototype.onEnter = function onEnter(action) {
    this.config.entryActions.push(action);
    return this;
  };

  StateConfigurator.prototype.onExit = function onExit(action) {
    this.config.exitActions.push(action);
    return this;
  };

  StateConfigurator.prototype.on = function on(event) {
    if (!this.config.events[event]) {
      this.config.events[event] = new _TriggerConfigurator2.default(this);
    }
    return this.config.events[event];
  };

  StateConfigurator.prototype.onAny = function onAny() {
    if (!this.config.anyEventTrigger) {
      this.config.anyEventTrigger = new _TriggerConfigurator2.default(this);
    }
    return this.config.anyEventTrigger;
  };

  StateConfigurator.prototype.onTimeout = function onTimeout(timeout) {
    var timerConfigurator = new _TimerConfigurator2.default(this, timeout);
    this.config.timers.push(timerConfigurator);
    return timerConfigurator;
  };

  StateConfigurator.prototype.do = function _do(asyncAction) {
    var asyncActionConfigurator = new _AsyncActionConfigurator2.default(this, asyncAction);
    this.config.asyncActions.push(asyncActionConfigurator);
    return asyncActionConfigurator;
  };

  StateConfigurator.prototype.submachine = function submachine(submachineConfig) {
    this.config.submachine = submachineConfig;
    return this;
  };

  return StateConfigurator;
}(_BaseConfigurator3.default);

exports.default = StateConfigurator;