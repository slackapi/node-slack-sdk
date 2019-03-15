'use strict';

exports.__esModule = true;

var _BaseConfigurator2 = require('./BaseConfigurator');

var _BaseConfigurator3 = _interopRequireDefault(_BaseConfigurator2);

var _TriggerConfigurator = require('./TriggerConfigurator');

var _TriggerConfigurator2 = _interopRequireDefault(_TriggerConfigurator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncActionConfigurator = function (_BaseConfigurator) {
  _inherits(AsyncActionConfigurator, _BaseConfigurator);

  function AsyncActionConfigurator(parent, action) {
    _classCallCheck(this, AsyncActionConfigurator);

    var _this = _possibleConstructorReturn(this, _BaseConfigurator.call(this, parent));

    _this.config = {
      action: action,
      successTrigger: new _TriggerConfigurator2.default(_this),
      failureTrigger: new _TriggerConfigurator2.default(_this)
    };
    return _this;
  }

  AsyncActionConfigurator.prototype.onSuccess = function onSuccess() {
    return this.config.successTrigger;
  };

  AsyncActionConfigurator.prototype.onFailure = function onFailure() {
    return this.config.failureTrigger;
  };

  return AsyncActionConfigurator;
}(_BaseConfigurator3.default);

exports.default = AsyncActionConfigurator;