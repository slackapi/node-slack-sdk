'use strict';

exports.__esModule = true;

var _configuration = require('./configuration');

var _HierarchicalStateMachine = require('./core/HierarchicalStateMachine');

var _HierarchicalStateMachine2 = _interopRequireDefault(_HierarchicalStateMachine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Finity = {
  configure: function configure() {
    return new _configuration.StateMachineConfigurator();
  },
  start: function start(config) {
    return _HierarchicalStateMachine2.default.start(config);
  }
};

exports.default = Finity;