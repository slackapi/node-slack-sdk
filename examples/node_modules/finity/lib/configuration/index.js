'use strict';

exports.__esModule = true;
exports.StateMachineConfigurator = undefined;

var _StateMachineConfigurator = require('./StateMachineConfigurator');

var _StateMachineConfigurator2 = _interopRequireDefault(_StateMachineConfigurator);

var _GlobalConfigurator = require('./GlobalConfigurator');

var _GlobalConfigurator2 = _interopRequireDefault(_GlobalConfigurator);

var _StateConfigurator = require('./StateConfigurator');

var _StateConfigurator2 = _interopRequireDefault(_StateConfigurator);

var _TriggerConfigurator = require('./TriggerConfigurator');

var _TriggerConfigurator2 = _interopRequireDefault(_TriggerConfigurator);

var _TransitionConfigurator = require('./TransitionConfigurator');

var _TransitionConfigurator2 = _interopRequireDefault(_TransitionConfigurator);

var _AsyncActionConfigurator = require('./AsyncActionConfigurator');

var _AsyncActionConfigurator2 = _interopRequireDefault(_AsyncActionConfigurator);

var _delegateToAncestor = require('./delegateToAncestor');

var _delegateToAncestor2 = _interopRequireDefault(_delegateToAncestor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.StateMachineConfigurator = _StateMachineConfigurator2.default; /* eslint-disable import/prefer-default-export */

(0, _delegateToAncestor2.default)(_GlobalConfigurator2.default, _StateMachineConfigurator2.default);
(0, _delegateToAncestor2.default)(_StateConfigurator2.default, _StateMachineConfigurator2.default);
(0, _delegateToAncestor2.default)(_TransitionConfigurator2.default, _StateConfigurator2.default);
(0, _delegateToAncestor2.default)(_TransitionConfigurator2.default, _TriggerConfigurator2.default);
(0, _delegateToAncestor2.default)(_TransitionConfigurator2.default, _AsyncActionConfigurator2.default);