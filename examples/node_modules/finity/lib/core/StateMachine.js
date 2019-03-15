'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _invokeEach = require('../utils/invokeEach');

var _invokeEach2 = _interopRequireDefault(_invokeEach);

var _merge = require('../utils/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var noop = function noop() {};

var StateMachine = function () {
  function StateMachine(config, taskScheduler, contextFactory) {
    _classCallCheck(this, StateMachine);

    if (config === undefined || config === null) {
      throw new Error('Configuration must be specified.');
    }
    if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) !== 'object') {
      throw new Error('Configuration must be an object.');
    }
    if (config.initialState === undefined || config.initialState === null) {
      throw new Error('Initial state must be specified.');
    }
    this.config = config;
    this.taskScheduler = taskScheduler;
    this.contextFactory = contextFactory;
    this.currentState = null;
    this.submachines = Object.create(null);
    this.timerIDs = null;
    this.asyncActionCancelers = null;
    this.handleAsyncActionComplete = this.handleAsyncActionComplete.bind(this);
    this.handleTimeout = this.handleTimeout.bind(this);
  }

  StateMachine.prototype.getCurrentState = function getCurrentState() {
    return this.currentState;
  };

  StateMachine.prototype.canHandle = function canHandle(event, eventPayload) {
    if (!this.isStarted()) {
      return false;
    }

    var context = this.createContextWithEvent(event, eventPayload);
    return !!this.getFirstAllowedTransitionForEvent(context);
  };

  StateMachine.prototype.tryHandle = function tryHandle(event, eventPayload) {
    if (!this.isStarted()) {
      return false;
    }

    var context = this.createContextWithEvent(event, eventPayload);
    var transitionConfig = this.getFirstAllowedTransitionForEvent(context);
    if (transitionConfig) {
      this.executeTransition(transitionConfig, context);
      return true;
    }
    return false;
  };

  StateMachine.prototype.handleUnhandledEvent = function handleUnhandledEvent(event, eventPayload) {
    if (this.config.global.unhandledEventHooks.length > 0) {
      (0, _invokeEach2.default)(this.config.global.unhandledEventHooks, event, this.currentState, this.createContextWithEvent(event, eventPayload));
    } else {
      throw new Error('Unhandled event \'' + event + '\' in state \'' + this.currentState + '\'.');
    }
  };

  StateMachine.prototype.isStarted = function isStarted() {
    return this.currentState !== null;
  };

  StateMachine.prototype.start = function start() {
    if (!this.isStarted()) {
      this.enterState(this.config.initialState, this.createContext());
    }
  };

  StateMachine.prototype.stop = function stop() {
    if (this.isStarted()) {
      this.exitState(this.createContext());
      this.currentState = null;
    }
  };

  StateMachine.prototype.getSubmachine = function getSubmachine() {
    return this.isStarted() ? this.submachines[this.currentState] : null;
  };

  StateMachine.prototype.executeTransition = function executeTransition(transitionConfig, context) {
    if (transitionConfig.ignore) {
      return;
    }

    if (!transitionConfig.isInternal) {
      this.exitState(context);
    }

    var nextState = transitionConfig.targetState !== null ? transitionConfig.targetState : this.currentState;

    (0, _invokeEach2.default)(this.config.global.transitionHooks, this.currentState, nextState, context);
    (0, _invokeEach2.default)(transitionConfig.actions, this.currentState, nextState, context);

    if (!transitionConfig.isInternal) {
      this.enterState(nextState, context);
    }
  };

  StateMachine.prototype.enterState = function enterState(state, context) {
    (0, _invokeEach2.default)(this.config.global.stateEnterHooks, state, context);

    var stateConfig = this.config.states[state];
    if (stateConfig) {
      (0, _invokeEach2.default)(stateConfig.entryActions, state, context);
    }

    if (this.currentState !== null && this.currentState !== state) {
      (0, _invokeEach2.default)(this.config.global.stateChangeHooks, this.currentState, state, context);
    }

    try {
      this.startAsyncActions(state, context);
      this.startTimers(state);
      this.startSubmachines(state);
    } catch (error) {
      this.stopTimers();
      this.cancelAsyncActions();
      throw error;
    }

    this.currentState = state;
  };

  StateMachine.prototype.exitState = function exitState(context) {
    this.stopSubmachines();
    this.stopTimers();
    this.cancelAsyncActions();

    (0, _invokeEach2.default)(this.config.global.stateExitHooks, this.currentState, context);

    var stateConfig = this.config.states[this.currentState];
    if (stateConfig) {
      (0, _invokeEach2.default)(stateConfig.exitActions, this.currentState, context);
    }
  };

  StateMachine.prototype.startAsyncActions = function startAsyncActions(state, context) {
    var _this = this;

    var stateConfig = this.config.states[state];
    if (stateConfig) {
      stateConfig.asyncActions.forEach(function (asyncActionConfig) {
        return _this.startAsyncAction(asyncActionConfig, state, context);
      });
    }
  };

  StateMachine.prototype.startAsyncAction = function startAsyncAction(asyncActionConfig, state, context) {
    var action = asyncActionConfig.action,
        successTrigger = asyncActionConfig.successTrigger,
        failureTrigger = asyncActionConfig.failureTrigger;

    var handleComplete = this.handleAsyncActionComplete;
    action(state, context).then(function (result) {
      return handleComplete(successTrigger, { result: result });
    }, function (error) {
      return handleComplete(failureTrigger, { error: error });
    });
    this.asyncActionCancelers = this.asyncActionCancelers || [];
    this.asyncActionCancelers.push(function () {
      handleComplete = noop;
    });
  };

  StateMachine.prototype.cancelAsyncActions = function cancelAsyncActions() {
    if (this.asyncActionCancelers) {
      (0, _invokeEach2.default)(this.asyncActionCancelers);
      this.asyncActionCancelers = null;
    }
  };

  StateMachine.prototype.handleAsyncActionComplete = function handleAsyncActionComplete(triggerConfig, additionalContext) {
    var context = (0, _merge2.default)(this.createContext(), additionalContext);
    this.executeTrigger(triggerConfig, context);
  };

  StateMachine.prototype.startTimers = function startTimers(state) {
    var _this2 = this;

    var stateConfig = this.config.states[state];
    if (stateConfig && stateConfig.timers.length > 0) {
      this.timerIDs = stateConfig.timers.map(function (timerConfig) {
        return setTimeout(_this2.handleTimeout, timerConfig.timeout, timerConfig);
      });
    }
  };

  StateMachine.prototype.stopTimers = function stopTimers() {
    if (this.timerIDs) {
      this.timerIDs.forEach(clearTimeout);
      this.timerIDs = null;
    }
  };

  StateMachine.prototype.handleTimeout = function handleTimeout(timerConfig) {
    this.executeTrigger(timerConfig, this.createContext());
  };

  StateMachine.prototype.startSubmachines = function startSubmachines(state) {
    var stateConfig = this.config.states[state];
    if (stateConfig && stateConfig.submachine) {
      if (!this.submachines[state]) {
        this.submachines[state] = new StateMachine(stateConfig.submachine, this.taskScheduler, this.contextFactory);
      }
      this.submachines[state].start();
    }
  };

  StateMachine.prototype.stopSubmachines = function stopSubmachines() {
    var submachine = this.submachines[this.currentState];
    if (submachine) {
      submachine.stop();
    }
  };

  StateMachine.prototype.createContext = function createContext() {
    return this.contextFactory(this);
  };

  StateMachine.prototype.createContextWithEvent = function createContextWithEvent(event, eventPayload) {
    var context = this.createContext();
    context.event = event;
    if (eventPayload !== undefined) {
      context.eventPayload = eventPayload;
    }
    return context;
  };

  StateMachine.getFirstAllowedTransition = function getFirstAllowedTransition(transitions, context) {
    for (var i = 0; i < transitions.length; i++) {
      if (!transitions[i].condition || transitions[i].condition(context)) {
        return transitions[i];
      }
    }
    return null;
  };

  StateMachine.prototype.getFirstAllowedTransitionForEvent = function getFirstAllowedTransitionForEvent(context) {
    var stateConfig = this.config.states[this.currentState];
    if (!stateConfig) {
      return null;
    }

    var transitionConfig = null;

    var eventConfig = stateConfig.events[context.event];
    if (eventConfig) {
      transitionConfig = StateMachine.getFirstAllowedTransition(eventConfig.transitions, context);
    }

    if (!transitionConfig && stateConfig.anyEventTrigger) {
      transitionConfig = StateMachine.getFirstAllowedTransition(stateConfig.anyEventTrigger.transitions, context);
    }

    return transitionConfig;
  };

  StateMachine.prototype.executeTrigger = function executeTrigger(triggerConfig, context) {
    var _this3 = this;

    this.taskScheduler.execute(function () {
      var transitionConfig = StateMachine.getFirstAllowedTransition(triggerConfig.transitions, context);
      if (transitionConfig) {
        _this3.executeTransition(transitionConfig, context);
      }
    });
  };

  return StateMachine;
}();

exports.default = StateMachine;