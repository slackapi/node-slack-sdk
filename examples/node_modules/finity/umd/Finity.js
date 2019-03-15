(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Finity"] = factory();
	else
		root["Finity"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.commonjs.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Finity.js":
/*!***********************!*\
  !*** ./src/Finity.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _configuration = __webpack_require__(/*! ./configuration */ \"./src/configuration/index.js\");\n\nvar _HierarchicalStateMachine = __webpack_require__(/*! ./core/HierarchicalStateMachine */ \"./src/core/HierarchicalStateMachine.js\");\n\nvar _HierarchicalStateMachine2 = _interopRequireDefault(_HierarchicalStateMachine);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Finity = {\n  configure: function configure() {\n    return new _configuration.StateMachineConfigurator();\n  },\n  start: function start(config) {\n    return _HierarchicalStateMachine2.default.start(config);\n  }\n};\n\nexports.default = Finity;\n\n//# sourceURL=webpack://Finity/./src/Finity.js?");

/***/ }),

/***/ "./src/configuration/AsyncActionConfigurator.js":
/*!******************************************************!*\
  !*** ./src/configuration/AsyncActionConfigurator.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _BaseConfigurator2 = __webpack_require__(/*! ./BaseConfigurator */ \"./src/configuration/BaseConfigurator.js\");\n\nvar _BaseConfigurator3 = _interopRequireDefault(_BaseConfigurator2);\n\nvar _TriggerConfigurator = __webpack_require__(/*! ./TriggerConfigurator */ \"./src/configuration/TriggerConfigurator.js\");\n\nvar _TriggerConfigurator2 = _interopRequireDefault(_TriggerConfigurator);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar AsyncActionConfigurator = function (_BaseConfigurator) {\n  _inherits(AsyncActionConfigurator, _BaseConfigurator);\n\n  function AsyncActionConfigurator(parent, action) {\n    _classCallCheck(this, AsyncActionConfigurator);\n\n    var _this = _possibleConstructorReturn(this, _BaseConfigurator.call(this, parent));\n\n    _this.config = {\n      action: action,\n      successTrigger: new _TriggerConfigurator2.default(_this),\n      failureTrigger: new _TriggerConfigurator2.default(_this)\n    };\n    return _this;\n  }\n\n  AsyncActionConfigurator.prototype.onSuccess = function onSuccess() {\n    return this.config.successTrigger;\n  };\n\n  AsyncActionConfigurator.prototype.onFailure = function onFailure() {\n    return this.config.failureTrigger;\n  };\n\n  return AsyncActionConfigurator;\n}(_BaseConfigurator3.default);\n\nexports.default = AsyncActionConfigurator;\n\n//# sourceURL=webpack://Finity/./src/configuration/AsyncActionConfigurator.js?");

/***/ }),

/***/ "./src/configuration/BaseConfigurator.js":
/*!***********************************************!*\
  !*** ./src/configuration/BaseConfigurator.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _mapValues = __webpack_require__(/*! ../utils/mapValues */ \"./src/utils/mapValues.js\");\n\nvar _mapValues2 = _interopRequireDefault(_mapValues);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar BaseConfigurator = function () {\n  function BaseConfigurator(parent) {\n    _classCallCheck(this, BaseConfigurator);\n\n    this.parent = parent;\n  }\n\n  BaseConfigurator.prototype.getAncestor = function getAncestor(type) {\n    if (this.parent) {\n      return this.parent instanceof type ? this.parent : this.parent.getAncestor(type);\n    }\n    return null;\n  };\n\n  BaseConfigurator.prototype.buildConfig = function buildConfig() {\n    var mapper = function mapper(value) {\n      if (!value) {\n        return value;\n      }\n      if (value instanceof BaseConfigurator) {\n        return value.buildConfig();\n      }\n      if (Array.isArray(value)) {\n        return value.map(mapper);\n      }\n      if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {\n        return (0, _mapValues2.default)(value, mapper);\n      }\n      return value;\n    };\n    return (0, _mapValues2.default)(this.config, mapper);\n  };\n\n  return BaseConfigurator;\n}();\n\nexports.default = BaseConfigurator;\n\n//# sourceURL=webpack://Finity/./src/configuration/BaseConfigurator.js?");

/***/ }),

/***/ "./src/configuration/GlobalConfigurator.js":
/*!*************************************************!*\
  !*** ./src/configuration/GlobalConfigurator.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _BaseConfigurator2 = __webpack_require__(/*! ./BaseConfigurator */ \"./src/configuration/BaseConfigurator.js\");\n\nvar _BaseConfigurator3 = _interopRequireDefault(_BaseConfigurator2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar GlobalConfigurator = function (_BaseConfigurator) {\n  _inherits(GlobalConfigurator, _BaseConfigurator);\n\n  function GlobalConfigurator(parent) {\n    _classCallCheck(this, GlobalConfigurator);\n\n    var _this = _possibleConstructorReturn(this, _BaseConfigurator.call(this, parent));\n\n    _this.config = {\n      stateEnterHooks: [],\n      stateExitHooks: [],\n      stateChangeHooks: [],\n      transitionHooks: [],\n      unhandledEventHooks: []\n    };\n    return _this;\n  }\n\n  GlobalConfigurator.prototype.onStateEnter = function onStateEnter(hook) {\n    this.config.stateEnterHooks.push(hook);\n    return this;\n  };\n\n  GlobalConfigurator.prototype.onStateExit = function onStateExit(hook) {\n    this.config.stateExitHooks.push(hook);\n    return this;\n  };\n\n  GlobalConfigurator.prototype.onStateChange = function onStateChange(hook) {\n    this.config.stateChangeHooks.push(hook);\n    return this;\n  };\n\n  GlobalConfigurator.prototype.onTransition = function onTransition(hook) {\n    this.config.transitionHooks.push(hook);\n    return this;\n  };\n\n  GlobalConfigurator.prototype.onUnhandledEvent = function onUnhandledEvent(hook) {\n    this.config.unhandledEventHooks.push(hook);\n    return this;\n  };\n\n  return GlobalConfigurator;\n}(_BaseConfigurator3.default);\n\nexports.default = GlobalConfigurator;\n\n//# sourceURL=webpack://Finity/./src/configuration/GlobalConfigurator.js?");

/***/ }),

/***/ "./src/configuration/StateConfigurator.js":
/*!************************************************!*\
  !*** ./src/configuration/StateConfigurator.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _BaseConfigurator2 = __webpack_require__(/*! ./BaseConfigurator */ \"./src/configuration/BaseConfigurator.js\");\n\nvar _BaseConfigurator3 = _interopRequireDefault(_BaseConfigurator2);\n\nvar _TriggerConfigurator = __webpack_require__(/*! ./TriggerConfigurator */ \"./src/configuration/TriggerConfigurator.js\");\n\nvar _TriggerConfigurator2 = _interopRequireDefault(_TriggerConfigurator);\n\nvar _TimerConfigurator = __webpack_require__(/*! ./TimerConfigurator */ \"./src/configuration/TimerConfigurator.js\");\n\nvar _TimerConfigurator2 = _interopRequireDefault(_TimerConfigurator);\n\nvar _AsyncActionConfigurator = __webpack_require__(/*! ./AsyncActionConfigurator */ \"./src/configuration/AsyncActionConfigurator.js\");\n\nvar _AsyncActionConfigurator2 = _interopRequireDefault(_AsyncActionConfigurator);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar StateConfigurator = function (_BaseConfigurator) {\n  _inherits(StateConfigurator, _BaseConfigurator);\n\n  function StateConfigurator(parent) {\n    _classCallCheck(this, StateConfigurator);\n\n    var _this = _possibleConstructorReturn(this, _BaseConfigurator.call(this, parent));\n\n    _this.config = {\n      entryActions: [],\n      exitActions: [],\n      events: Object.create(null),\n      anyEventTrigger: null,\n      timers: [],\n      asyncActions: [],\n      submachine: null\n    };\n    return _this;\n  }\n\n  StateConfigurator.prototype.onEnter = function onEnter(action) {\n    this.config.entryActions.push(action);\n    return this;\n  };\n\n  StateConfigurator.prototype.onExit = function onExit(action) {\n    this.config.exitActions.push(action);\n    return this;\n  };\n\n  StateConfigurator.prototype.on = function on(event) {\n    if (!this.config.events[event]) {\n      this.config.events[event] = new _TriggerConfigurator2.default(this);\n    }\n    return this.config.events[event];\n  };\n\n  StateConfigurator.prototype.onAny = function onAny() {\n    if (!this.config.anyEventTrigger) {\n      this.config.anyEventTrigger = new _TriggerConfigurator2.default(this);\n    }\n    return this.config.anyEventTrigger;\n  };\n\n  StateConfigurator.prototype.onTimeout = function onTimeout(timeout) {\n    var timerConfigurator = new _TimerConfigurator2.default(this, timeout);\n    this.config.timers.push(timerConfigurator);\n    return timerConfigurator;\n  };\n\n  StateConfigurator.prototype.do = function _do(asyncAction) {\n    var asyncActionConfigurator = new _AsyncActionConfigurator2.default(this, asyncAction);\n    this.config.asyncActions.push(asyncActionConfigurator);\n    return asyncActionConfigurator;\n  };\n\n  StateConfigurator.prototype.submachine = function submachine(submachineConfig) {\n    this.config.submachine = submachineConfig;\n    return this;\n  };\n\n  return StateConfigurator;\n}(_BaseConfigurator3.default);\n\nexports.default = StateConfigurator;\n\n//# sourceURL=webpack://Finity/./src/configuration/StateConfigurator.js?");

/***/ }),

/***/ "./src/configuration/StateMachineConfigurator.js":
/*!*******************************************************!*\
  !*** ./src/configuration/StateMachineConfigurator.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _BaseConfigurator2 = __webpack_require__(/*! ./BaseConfigurator */ \"./src/configuration/BaseConfigurator.js\");\n\nvar _BaseConfigurator3 = _interopRequireDefault(_BaseConfigurator2);\n\nvar _GlobalConfigurator = __webpack_require__(/*! ./GlobalConfigurator */ \"./src/configuration/GlobalConfigurator.js\");\n\nvar _GlobalConfigurator2 = _interopRequireDefault(_GlobalConfigurator);\n\nvar _StateConfigurator = __webpack_require__(/*! ./StateConfigurator */ \"./src/configuration/StateConfigurator.js\");\n\nvar _StateConfigurator2 = _interopRequireDefault(_StateConfigurator);\n\nvar _HierarchicalStateMachine = __webpack_require__(/*! ../core/HierarchicalStateMachine */ \"./src/core/HierarchicalStateMachine.js\");\n\nvar _HierarchicalStateMachine2 = _interopRequireDefault(_HierarchicalStateMachine);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar StateMachineConfigurator = function (_BaseConfigurator) {\n  _inherits(StateMachineConfigurator, _BaseConfigurator);\n\n  function StateMachineConfigurator() {\n    _classCallCheck(this, StateMachineConfigurator);\n\n    var _this = _possibleConstructorReturn(this, _BaseConfigurator.call(this));\n\n    _this.config = {\n      global: new _GlobalConfigurator2.default(_this),\n      initialState: null,\n      states: Object.create(null)\n    };\n    return _this;\n  }\n\n  StateMachineConfigurator.prototype.global = function global() {\n    return this.config.global;\n  };\n\n  StateMachineConfigurator.prototype.initialState = function initialState(state) {\n    this.config.initialState = state;\n    return this.state(state);\n  };\n\n  StateMachineConfigurator.prototype.state = function state(_state) {\n    if (!this.config.states[_state]) {\n      this.config.states[_state] = new _StateConfigurator2.default(this);\n    }\n    return this.config.states[_state];\n  };\n\n  StateMachineConfigurator.prototype.getConfig = function getConfig() {\n    return this.buildConfig();\n  };\n\n  StateMachineConfigurator.prototype.start = function start() {\n    var config = this.getConfig();\n    return _HierarchicalStateMachine2.default.start(config);\n  };\n\n  return StateMachineConfigurator;\n}(_BaseConfigurator3.default);\n\nexports.default = StateMachineConfigurator;\n\n//# sourceURL=webpack://Finity/./src/configuration/StateMachineConfigurator.js?");

/***/ }),

/***/ "./src/configuration/TimerConfigurator.js":
/*!************************************************!*\
  !*** ./src/configuration/TimerConfigurator.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _TriggerConfigurator2 = __webpack_require__(/*! ./TriggerConfigurator */ \"./src/configuration/TriggerConfigurator.js\");\n\nvar _TriggerConfigurator3 = _interopRequireDefault(_TriggerConfigurator2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar TrimerConfigurator = function (_TriggerConfigurator) {\n  _inherits(TrimerConfigurator, _TriggerConfigurator);\n\n  function TrimerConfigurator(parent, timeout) {\n    _classCallCheck(this, TrimerConfigurator);\n\n    var _this = _possibleConstructorReturn(this, _TriggerConfigurator.call(this, parent));\n\n    _this.config.timeout = timeout;\n    return _this;\n  }\n\n  return TrimerConfigurator;\n}(_TriggerConfigurator3.default);\n\nexports.default = TrimerConfigurator;\n\n//# sourceURL=webpack://Finity/./src/configuration/TimerConfigurator.js?");

/***/ }),

/***/ "./src/configuration/TransitionConfigurator.js":
/*!*****************************************************!*\
  !*** ./src/configuration/TransitionConfigurator.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _BaseConfigurator2 = __webpack_require__(/*! ./BaseConfigurator */ \"./src/configuration/BaseConfigurator.js\");\n\nvar _BaseConfigurator3 = _interopRequireDefault(_BaseConfigurator2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar TransitionConfigurator = function (_BaseConfigurator) {\n  _inherits(TransitionConfigurator, _BaseConfigurator);\n\n  function TransitionConfigurator(parent, targetState) {\n    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n\n    _classCallCheck(this, TransitionConfigurator);\n\n    var _this = _possibleConstructorReturn(this, _BaseConfigurator.call(this, parent));\n\n    _this.config = _extends({\n      targetState: targetState\n    }, options, {\n      actions: [],\n      condition: null\n    });\n    return _this;\n  }\n\n  TransitionConfigurator.prototype.withAction = function withAction(action) {\n    this.config.actions.push(action);\n    return this;\n  };\n\n  TransitionConfigurator.prototype.withCondition = function withCondition(condition) {\n    this.config.condition = condition;\n    return this;\n  };\n\n  return TransitionConfigurator;\n}(_BaseConfigurator3.default);\n\nexports.default = TransitionConfigurator;\n\n//# sourceURL=webpack://Finity/./src/configuration/TransitionConfigurator.js?");

/***/ }),

/***/ "./src/configuration/TriggerConfigurator.js":
/*!**************************************************!*\
  !*** ./src/configuration/TriggerConfigurator.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _BaseConfigurator2 = __webpack_require__(/*! ./BaseConfigurator */ \"./src/configuration/BaseConfigurator.js\");\n\nvar _BaseConfigurator3 = _interopRequireDefault(_BaseConfigurator2);\n\nvar _TransitionConfigurator = __webpack_require__(/*! ./TransitionConfigurator */ \"./src/configuration/TransitionConfigurator.js\");\n\nvar _TransitionConfigurator2 = _interopRequireDefault(_TransitionConfigurator);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar TriggerConfigurator = function (_BaseConfigurator) {\n  _inherits(TriggerConfigurator, _BaseConfigurator);\n\n  function TriggerConfigurator(parent) {\n    _classCallCheck(this, TriggerConfigurator);\n\n    var _this = _possibleConstructorReturn(this, _BaseConfigurator.call(this, parent));\n\n    _this.config = {\n      transitions: []\n    };\n    return _this;\n  }\n\n  TriggerConfigurator.prototype.transitionTo = function transitionTo(targetState) {\n    return this.transition(targetState);\n  };\n\n  TriggerConfigurator.prototype.selfTransition = function selfTransition() {\n    return this.transition(null);\n  };\n\n  TriggerConfigurator.prototype.internalTransition = function internalTransition() {\n    return this.transition(null, { isInternal: true });\n  };\n\n  TriggerConfigurator.prototype.ignore = function ignore() {\n    return this.transition(null, { ignore: true });\n  };\n\n  TriggerConfigurator.prototype.transition = function transition(targetState, options) {\n    var transitionConfigurator = new _TransitionConfigurator2.default(this, targetState, options);\n    this.config.transitions.push(transitionConfigurator);\n    return transitionConfigurator;\n  };\n\n  return TriggerConfigurator;\n}(_BaseConfigurator3.default);\n\nexports.default = TriggerConfigurator;\n\n//# sourceURL=webpack://Finity/./src/configuration/TriggerConfigurator.js?");

/***/ }),

/***/ "./src/configuration/delegateToAncestor.js":
/*!*************************************************!*\
  !*** ./src/configuration/delegateToAncestor.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.default = delegateToAncestor;\nfunction delegateToAncestor(constructor, ancestorConstructor) {\n  var prototype = constructor.prototype;\n  var ancestorPrototype = ancestorConstructor.prototype;\n  Object.getOwnPropertyNames(ancestorPrototype).filter(function (name) {\n    return !prototype[name] && ancestorPrototype[name] instanceof Function && ancestorPrototype[name] !== ancestorConstructor;\n  }).forEach(function (name) {\n    // eslint-disable-next-line func-names\n    prototype[name] = function () {\n      var method = ancestorPrototype[name];\n\n      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      return method.apply(this.getAncestor(ancestorConstructor), args);\n    };\n  });\n}\n\n//# sourceURL=webpack://Finity/./src/configuration/delegateToAncestor.js?");

/***/ }),

/***/ "./src/configuration/index.js":
/*!************************************!*\
  !*** ./src/configuration/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.StateMachineConfigurator = undefined;\n\nvar _StateMachineConfigurator = __webpack_require__(/*! ./StateMachineConfigurator */ \"./src/configuration/StateMachineConfigurator.js\");\n\nvar _StateMachineConfigurator2 = _interopRequireDefault(_StateMachineConfigurator);\n\nvar _GlobalConfigurator = __webpack_require__(/*! ./GlobalConfigurator */ \"./src/configuration/GlobalConfigurator.js\");\n\nvar _GlobalConfigurator2 = _interopRequireDefault(_GlobalConfigurator);\n\nvar _StateConfigurator = __webpack_require__(/*! ./StateConfigurator */ \"./src/configuration/StateConfigurator.js\");\n\nvar _StateConfigurator2 = _interopRequireDefault(_StateConfigurator);\n\nvar _TriggerConfigurator = __webpack_require__(/*! ./TriggerConfigurator */ \"./src/configuration/TriggerConfigurator.js\");\n\nvar _TriggerConfigurator2 = _interopRequireDefault(_TriggerConfigurator);\n\nvar _TransitionConfigurator = __webpack_require__(/*! ./TransitionConfigurator */ \"./src/configuration/TransitionConfigurator.js\");\n\nvar _TransitionConfigurator2 = _interopRequireDefault(_TransitionConfigurator);\n\nvar _AsyncActionConfigurator = __webpack_require__(/*! ./AsyncActionConfigurator */ \"./src/configuration/AsyncActionConfigurator.js\");\n\nvar _AsyncActionConfigurator2 = _interopRequireDefault(_AsyncActionConfigurator);\n\nvar _delegateToAncestor = __webpack_require__(/*! ./delegateToAncestor */ \"./src/configuration/delegateToAncestor.js\");\n\nvar _delegateToAncestor2 = _interopRequireDefault(_delegateToAncestor);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.StateMachineConfigurator = _StateMachineConfigurator2.default; /* eslint-disable import/prefer-default-export */\n\n(0, _delegateToAncestor2.default)(_GlobalConfigurator2.default, _StateMachineConfigurator2.default);\n(0, _delegateToAncestor2.default)(_StateConfigurator2.default, _StateMachineConfigurator2.default);\n(0, _delegateToAncestor2.default)(_TransitionConfigurator2.default, _StateConfigurator2.default);\n(0, _delegateToAncestor2.default)(_TransitionConfigurator2.default, _TriggerConfigurator2.default);\n(0, _delegateToAncestor2.default)(_TransitionConfigurator2.default, _AsyncActionConfigurator2.default);\n\n//# sourceURL=webpack://Finity/./src/configuration/index.js?");

/***/ }),

/***/ "./src/core/HierarchicalStateMachine.js":
/*!**********************************************!*\
  !*** ./src/core/HierarchicalStateMachine.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _StateMachine = __webpack_require__(/*! ./StateMachine */ \"./src/core/StateMachine.js\");\n\nvar _StateMachine2 = _interopRequireDefault(_StateMachine);\n\nvar _TaskScheduler = __webpack_require__(/*! ./TaskScheduler */ \"./src/core/TaskScheduler.js\");\n\nvar _TaskScheduler2 = _interopRequireDefault(_TaskScheduler);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar HierarchicalStateMachine = function () {\n  function HierarchicalStateMachine(rootStateMachine, currentStateMachine, taskScheduler) {\n    _classCallCheck(this, HierarchicalStateMachine);\n\n    this.rootStateMachine = rootStateMachine;\n    this.currentStateMachine = currentStateMachine;\n    this.taskScheduler = taskScheduler;\n  }\n\n  HierarchicalStateMachine.start = function start(config) {\n    var taskScheduler = new _TaskScheduler2.default();\n    var rootStateMachine = void 0;\n    var createContext = function createContext(stateMachine) {\n      return {\n        stateMachine: new HierarchicalStateMachine(rootStateMachine, stateMachine, taskScheduler)\n      };\n    };\n    rootStateMachine = new _StateMachine2.default(config, taskScheduler, createContext);\n    taskScheduler.execute(function () {\n      return rootStateMachine.start();\n    });\n    return new HierarchicalStateMachine(rootStateMachine, rootStateMachine, taskScheduler);\n  };\n\n  HierarchicalStateMachine.prototype.getCurrentState = function getCurrentState() {\n    return this.currentStateMachine.getCurrentState();\n  };\n\n  HierarchicalStateMachine.prototype.getSubmachine = function getSubmachine() {\n    var submachine = this.currentStateMachine.getSubmachine();\n    if (submachine) {\n      return new HierarchicalStateMachine(this.rootStateMachine, submachine, this.taskScheduler);\n    }\n    return null;\n  };\n\n  HierarchicalStateMachine.prototype.getStateHierarchy = function getStateHierarchy() {\n    return this.getStateMachines().map(function (stateMachine) {\n      return stateMachine.getCurrentState();\n    });\n  };\n\n  HierarchicalStateMachine.prototype.canHandle = function canHandle(event, eventPayload) {\n    var stateMachines = this.getStateMachines();\n    for (var i = stateMachines.length - 1; i >= 0; i--) {\n      if (stateMachines[i].canHandle(event, eventPayload)) {\n        return true;\n      }\n    }\n    return false;\n  };\n\n  HierarchicalStateMachine.prototype.handle = function handle(event, eventPayload) {\n    var _this = this;\n\n    this.taskScheduler.enqueue(function () {\n      var stateMachines = _this.getStateMachines();\n      for (var i = stateMachines.length - 1; i >= 0; i--) {\n        if (stateMachines[i].tryHandle(event, eventPayload)) {\n          return;\n        }\n      }\n      _this.currentStateMachine.handleUnhandledEvent(event, eventPayload);\n    });\n    return this;\n  };\n\n  HierarchicalStateMachine.prototype.getStateMachines = function getStateMachines() {\n    var stateMachines = [];\n    var stateMachine = this.rootStateMachine;\n    do {\n      stateMachines.push(stateMachine);\n      stateMachine = stateMachine.getSubmachine();\n    } while (stateMachine);\n    return stateMachines;\n  };\n\n  HierarchicalStateMachine.prototype.toString = function toString() {\n    return 'StateMachine(currentState: ' + this.getCurrentState() + ')';\n  };\n\n  return HierarchicalStateMachine;\n}();\n\nexports.default = HierarchicalStateMachine;\n\n//# sourceURL=webpack://Finity/./src/core/HierarchicalStateMachine.js?");

/***/ }),

/***/ "./src/core/StateMachine.js":
/*!**********************************!*\
  !*** ./src/core/StateMachine.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _invokeEach = __webpack_require__(/*! ../utils/invokeEach */ \"./src/utils/invokeEach.js\");\n\nvar _invokeEach2 = _interopRequireDefault(_invokeEach);\n\nvar _merge = __webpack_require__(/*! ../utils/merge */ \"./src/utils/merge.js\");\n\nvar _merge2 = _interopRequireDefault(_merge);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar noop = function noop() {};\n\nvar StateMachine = function () {\n  function StateMachine(config, taskScheduler, contextFactory) {\n    _classCallCheck(this, StateMachine);\n\n    if (config === undefined || config === null) {\n      throw new Error('Configuration must be specified.');\n    }\n    if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) !== 'object') {\n      throw new Error('Configuration must be an object.');\n    }\n    if (config.initialState === undefined || config.initialState === null) {\n      throw new Error('Initial state must be specified.');\n    }\n    this.config = config;\n    this.taskScheduler = taskScheduler;\n    this.contextFactory = contextFactory;\n    this.currentState = null;\n    this.submachines = Object.create(null);\n    this.timerIDs = null;\n    this.asyncActionCancelers = null;\n    this.handleAsyncActionComplete = this.handleAsyncActionComplete.bind(this);\n    this.handleTimeout = this.handleTimeout.bind(this);\n  }\n\n  StateMachine.prototype.getCurrentState = function getCurrentState() {\n    return this.currentState;\n  };\n\n  StateMachine.prototype.canHandle = function canHandle(event, eventPayload) {\n    if (!this.isStarted()) {\n      return false;\n    }\n\n    var context = this.createContextWithEvent(event, eventPayload);\n    return !!this.getFirstAllowedTransitionForEvent(context);\n  };\n\n  StateMachine.prototype.tryHandle = function tryHandle(event, eventPayload) {\n    if (!this.isStarted()) {\n      return false;\n    }\n\n    var context = this.createContextWithEvent(event, eventPayload);\n    var transitionConfig = this.getFirstAllowedTransitionForEvent(context);\n    if (transitionConfig) {\n      this.executeTransition(transitionConfig, context);\n      return true;\n    }\n    return false;\n  };\n\n  StateMachine.prototype.handleUnhandledEvent = function handleUnhandledEvent(event, eventPayload) {\n    if (this.config.global.unhandledEventHooks.length > 0) {\n      (0, _invokeEach2.default)(this.config.global.unhandledEventHooks, event, this.currentState, this.createContextWithEvent(event, eventPayload));\n    } else {\n      throw new Error('Unhandled event \\'' + event + '\\' in state \\'' + this.currentState + '\\'.');\n    }\n  };\n\n  StateMachine.prototype.isStarted = function isStarted() {\n    return this.currentState !== null;\n  };\n\n  StateMachine.prototype.start = function start() {\n    if (!this.isStarted()) {\n      this.enterState(this.config.initialState, this.createContext());\n    }\n  };\n\n  StateMachine.prototype.stop = function stop() {\n    if (this.isStarted()) {\n      this.exitState(this.createContext());\n      this.currentState = null;\n    }\n  };\n\n  StateMachine.prototype.getSubmachine = function getSubmachine() {\n    return this.isStarted() ? this.submachines[this.currentState] : null;\n  };\n\n  StateMachine.prototype.executeTransition = function executeTransition(transitionConfig, context) {\n    if (transitionConfig.ignore) {\n      return;\n    }\n\n    if (!transitionConfig.isInternal) {\n      this.exitState(context);\n    }\n\n    var nextState = transitionConfig.targetState !== null ? transitionConfig.targetState : this.currentState;\n\n    (0, _invokeEach2.default)(this.config.global.transitionHooks, this.currentState, nextState, context);\n    (0, _invokeEach2.default)(transitionConfig.actions, this.currentState, nextState, context);\n\n    if (!transitionConfig.isInternal) {\n      this.enterState(nextState, context);\n    }\n  };\n\n  StateMachine.prototype.enterState = function enterState(state, context) {\n    (0, _invokeEach2.default)(this.config.global.stateEnterHooks, state, context);\n\n    var stateConfig = this.config.states[state];\n    if (stateConfig) {\n      (0, _invokeEach2.default)(stateConfig.entryActions, state, context);\n    }\n\n    if (this.currentState !== null && this.currentState !== state) {\n      (0, _invokeEach2.default)(this.config.global.stateChangeHooks, this.currentState, state, context);\n    }\n\n    try {\n      this.startAsyncActions(state, context);\n      this.startTimers(state);\n      this.startSubmachines(state);\n    } catch (error) {\n      this.stopTimers();\n      this.cancelAsyncActions();\n      throw error;\n    }\n\n    this.currentState = state;\n  };\n\n  StateMachine.prototype.exitState = function exitState(context) {\n    this.stopSubmachines();\n    this.stopTimers();\n    this.cancelAsyncActions();\n\n    (0, _invokeEach2.default)(this.config.global.stateExitHooks, this.currentState, context);\n\n    var stateConfig = this.config.states[this.currentState];\n    if (stateConfig) {\n      (0, _invokeEach2.default)(stateConfig.exitActions, this.currentState, context);\n    }\n  };\n\n  StateMachine.prototype.startAsyncActions = function startAsyncActions(state, context) {\n    var _this = this;\n\n    var stateConfig = this.config.states[state];\n    if (stateConfig) {\n      stateConfig.asyncActions.forEach(function (asyncActionConfig) {\n        return _this.startAsyncAction(asyncActionConfig, state, context);\n      });\n    }\n  };\n\n  StateMachine.prototype.startAsyncAction = function startAsyncAction(asyncActionConfig, state, context) {\n    var action = asyncActionConfig.action,\n        successTrigger = asyncActionConfig.successTrigger,\n        failureTrigger = asyncActionConfig.failureTrigger;\n\n    var handleComplete = this.handleAsyncActionComplete;\n    action(state, context).then(function (result) {\n      return handleComplete(successTrigger, { result: result });\n    }, function (error) {\n      return handleComplete(failureTrigger, { error: error });\n    });\n    this.asyncActionCancelers = this.asyncActionCancelers || [];\n    this.asyncActionCancelers.push(function () {\n      handleComplete = noop;\n    });\n  };\n\n  StateMachine.prototype.cancelAsyncActions = function cancelAsyncActions() {\n    if (this.asyncActionCancelers) {\n      (0, _invokeEach2.default)(this.asyncActionCancelers);\n      this.asyncActionCancelers = null;\n    }\n  };\n\n  StateMachine.prototype.handleAsyncActionComplete = function handleAsyncActionComplete(triggerConfig, additionalContext) {\n    var context = (0, _merge2.default)(this.createContext(), additionalContext);\n    this.executeTrigger(triggerConfig, context);\n  };\n\n  StateMachine.prototype.startTimers = function startTimers(state) {\n    var _this2 = this;\n\n    var stateConfig = this.config.states[state];\n    if (stateConfig && stateConfig.timers.length > 0) {\n      this.timerIDs = stateConfig.timers.map(function (timerConfig) {\n        return setTimeout(_this2.handleTimeout, timerConfig.timeout, timerConfig);\n      });\n    }\n  };\n\n  StateMachine.prototype.stopTimers = function stopTimers() {\n    if (this.timerIDs) {\n      this.timerIDs.forEach(clearTimeout);\n      this.timerIDs = null;\n    }\n  };\n\n  StateMachine.prototype.handleTimeout = function handleTimeout(timerConfig) {\n    this.executeTrigger(timerConfig, this.createContext());\n  };\n\n  StateMachine.prototype.startSubmachines = function startSubmachines(state) {\n    var stateConfig = this.config.states[state];\n    if (stateConfig && stateConfig.submachine) {\n      if (!this.submachines[state]) {\n        this.submachines[state] = new StateMachine(stateConfig.submachine, this.taskScheduler, this.contextFactory);\n      }\n      this.submachines[state].start();\n    }\n  };\n\n  StateMachine.prototype.stopSubmachines = function stopSubmachines() {\n    var submachine = this.submachines[this.currentState];\n    if (submachine) {\n      submachine.stop();\n    }\n  };\n\n  StateMachine.prototype.createContext = function createContext() {\n    return this.contextFactory(this);\n  };\n\n  StateMachine.prototype.createContextWithEvent = function createContextWithEvent(event, eventPayload) {\n    var context = this.createContext();\n    context.event = event;\n    if (eventPayload !== undefined) {\n      context.eventPayload = eventPayload;\n    }\n    return context;\n  };\n\n  StateMachine.getFirstAllowedTransition = function getFirstAllowedTransition(transitions, context) {\n    for (var i = 0; i < transitions.length; i++) {\n      if (!transitions[i].condition || transitions[i].condition(context)) {\n        return transitions[i];\n      }\n    }\n    return null;\n  };\n\n  StateMachine.prototype.getFirstAllowedTransitionForEvent = function getFirstAllowedTransitionForEvent(context) {\n    var stateConfig = this.config.states[this.currentState];\n    if (!stateConfig) {\n      return null;\n    }\n\n    var transitionConfig = null;\n\n    var eventConfig = stateConfig.events[context.event];\n    if (eventConfig) {\n      transitionConfig = StateMachine.getFirstAllowedTransition(eventConfig.transitions, context);\n    }\n\n    if (!transitionConfig && stateConfig.anyEventTrigger) {\n      transitionConfig = StateMachine.getFirstAllowedTransition(stateConfig.anyEventTrigger.transitions, context);\n    }\n\n    return transitionConfig;\n  };\n\n  StateMachine.prototype.executeTrigger = function executeTrigger(triggerConfig, context) {\n    var _this3 = this;\n\n    this.taskScheduler.execute(function () {\n      var transitionConfig = StateMachine.getFirstAllowedTransition(triggerConfig.transitions, context);\n      if (transitionConfig) {\n        _this3.executeTransition(transitionConfig, context);\n      }\n    });\n  };\n\n  return StateMachine;\n}();\n\nexports.default = StateMachine;\n\n//# sourceURL=webpack://Finity/./src/core/StateMachine.js?");

/***/ }),

/***/ "./src/core/TaskScheduler.js":
/*!***********************************!*\
  !*** ./src/core/TaskScheduler.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar TaskScheduler = function () {\n  function TaskScheduler() {\n    _classCallCheck(this, TaskScheduler);\n\n    this.queue = [];\n    this.isBusy = false;\n  }\n\n  TaskScheduler.prototype.enqueue = function enqueue(task) {\n    if (this.isBusy) {\n      this.queue.push(task);\n    } else {\n      this.execute(task);\n    }\n  };\n\n  TaskScheduler.prototype.execute = function execute(task) {\n    if (this.isBusy) {\n      throw new Error('Cannot execute task because another task is already running.');\n    }\n    this.isBusy = true;\n    try {\n      task();\n      while (this.queue.length > 0) {\n        var nextTask = this.queue.shift();\n        nextTask();\n      }\n    } finally {\n      // Clean up\n      if (this.queue.length > 0) {\n        this.queue = [];\n      }\n      this.isBusy = false;\n    }\n  };\n\n  return TaskScheduler;\n}();\n\nexports.default = TaskScheduler;\n\n//# sourceURL=webpack://Finity/./src/core/TaskScheduler.js?");

/***/ }),

/***/ "./src/index.commonjs.js":
/*!*******************************!*\
  !*** ./src/index.commonjs.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* eslint-disable */\n\n\nvar Finity = __webpack_require__(/*! ./Finity */ \"./src/Finity.js\").default;\nvar merge = __webpack_require__(/*! ./utils/merge */ \"./src/utils/merge.js\").default;\n\nmerge(exports, Finity);\n\n// Allow the use of the default import syntax in TypeScript (import Finity from 'finity')\nexports.default = Finity;\n\n\n//# sourceURL=webpack://Finity/./src/index.commonjs.js?");

/***/ }),

/***/ "./src/utils/invokeEach.js":
/*!*********************************!*\
  !*** ./src/utils/invokeEach.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.default = invokeEach;\nfunction invokeEach(fns) {\n  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n    args[_key - 1] = arguments[_key];\n  }\n\n  fns.forEach(function (fn) {\n    return fn.apply(undefined, args);\n  });\n}\n\n//# sourceURL=webpack://Finity/./src/utils/invokeEach.js?");

/***/ }),

/***/ "./src/utils/mapValues.js":
/*!********************************!*\
  !*** ./src/utils/mapValues.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.default = mapValues;\nfunction mapValues(obj, callback) {\n  var prototype = Object.getPrototypeOf(obj);\n  var result = Object.create(prototype);\n  Object.keys(obj).forEach(function (key) {\n    result[key] = callback(obj[key]);\n  });\n  return result;\n}\n\n//# sourceURL=webpack://Finity/./src/utils/mapValues.js?");

/***/ }),

/***/ "./src/utils/merge.js":
/*!****************************!*\
  !*** ./src/utils/merge.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.default = merge;\nfunction merge(target, source) {\n  Object.keys(source).forEach(function (key) {\n    target[key] = source[key];\n  });\n  return target;\n}\n\n//# sourceURL=webpack://Finity/./src/utils/merge.js?");

/***/ })

/******/ });
});