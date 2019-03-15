'use strict';

exports.__esModule = true;

var _StateMachine = require('./StateMachine');

var _StateMachine2 = _interopRequireDefault(_StateMachine);

var _TaskScheduler = require('./TaskScheduler');

var _TaskScheduler2 = _interopRequireDefault(_TaskScheduler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HierarchicalStateMachine = function () {
  function HierarchicalStateMachine(rootStateMachine, currentStateMachine, taskScheduler) {
    _classCallCheck(this, HierarchicalStateMachine);

    this.rootStateMachine = rootStateMachine;
    this.currentStateMachine = currentStateMachine;
    this.taskScheduler = taskScheduler;
  }

  HierarchicalStateMachine.start = function start(config) {
    var taskScheduler = new _TaskScheduler2.default();
    var rootStateMachine = void 0;
    var createContext = function createContext(stateMachine) {
      return {
        stateMachine: new HierarchicalStateMachine(rootStateMachine, stateMachine, taskScheduler)
      };
    };
    rootStateMachine = new _StateMachine2.default(config, taskScheduler, createContext);
    taskScheduler.execute(function () {
      return rootStateMachine.start();
    });
    return new HierarchicalStateMachine(rootStateMachine, rootStateMachine, taskScheduler);
  };

  HierarchicalStateMachine.prototype.getCurrentState = function getCurrentState() {
    return this.currentStateMachine.getCurrentState();
  };

  HierarchicalStateMachine.prototype.getSubmachine = function getSubmachine() {
    var submachine = this.currentStateMachine.getSubmachine();
    if (submachine) {
      return new HierarchicalStateMachine(this.rootStateMachine, submachine, this.taskScheduler);
    }
    return null;
  };

  HierarchicalStateMachine.prototype.getStateHierarchy = function getStateHierarchy() {
    return this.getStateMachines().map(function (stateMachine) {
      return stateMachine.getCurrentState();
    });
  };

  HierarchicalStateMachine.prototype.canHandle = function canHandle(event, eventPayload) {
    var stateMachines = this.getStateMachines();
    for (var i = stateMachines.length - 1; i >= 0; i--) {
      if (stateMachines[i].canHandle(event, eventPayload)) {
        return true;
      }
    }
    return false;
  };

  HierarchicalStateMachine.prototype.handle = function handle(event, eventPayload) {
    var _this = this;

    this.taskScheduler.enqueue(function () {
      var stateMachines = _this.getStateMachines();
      for (var i = stateMachines.length - 1; i >= 0; i--) {
        if (stateMachines[i].tryHandle(event, eventPayload)) {
          return;
        }
      }
      _this.currentStateMachine.handleUnhandledEvent(event, eventPayload);
    });
    return this;
  };

  HierarchicalStateMachine.prototype.getStateMachines = function getStateMachines() {
    var stateMachines = [];
    var stateMachine = this.rootStateMachine;
    do {
      stateMachines.push(stateMachine);
      stateMachine = stateMachine.getSubmachine();
    } while (stateMachine);
    return stateMachines;
  };

  HierarchicalStateMachine.prototype.toString = function toString() {
    return 'StateMachine(currentState: ' + this.getCurrentState() + ')';
  };

  return HierarchicalStateMachine;
}();

exports.default = HierarchicalStateMachine;