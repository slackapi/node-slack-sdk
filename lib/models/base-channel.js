/**
 *
 */

var bind = require('lodash').bind;
var forEachRight = require('lodash').forEachRight;
var find = require('lodash').find;
var findLastIndex = require('lodash').findLastIndex;
var inherits = require('inherits');
var keys = require('lodash').keys;

var Model = require('./model');


function BaseChannel(objectName, opts) {
  /**
   *
   * @type {Array}
   */
  this.history = [];

  /**
   * Object, keyed on user id, values of timeouts that will be run to clear the user typing state.
   * @type {{}}
   * @private
   */
  this._typing = {};

  /**
   *
   */
  this.unreadCount = 0;


  /**
   * @type {string}
   */
  this.lastRead = '0000000000.000000';

  /**
   * @type {string}
   * @private
   */
  this._maxTs = '0000000000.000000';

  Model.call(this, objectName, opts);
}

inherits(BaseChannel, Model);


/**
 * The timeout after which the user typing entry should be removed.
 * @type {number}
 */
BaseChannel.prototype.USER_TYPING_TIMEOUT = 5000;


BaseChannel.prototype._setProperties = function setProperties(opts) {
  BaseChannel.super_.prototype._setProperties.call(this, opts);

  if (this.latest) {
    this.addMessage(this.latest);
  }
};


/**
 *
 * @param {string} userId
 */
BaseChannel.prototype.startedTyping = function startedTyping(userId) {
  if (this._typing[userId]) {
    clearTimeout(this._typing[userId]);
  }

  this._typing[userId] = setTimeout(bind(function removeSetTypingTimeout() {
    delete this._typing[userId];
  }, this), this.USER_TYPING_TIMEOUT);
};


/**
 *
 * @returns {number}
 */
BaseChannel.prototype.recalcUnreads = function recalcUnreads() {
  this.unreadCount = 0;
  forEachRight(this.history, function checkMessageIsUnread(message) {
    if (message.ts > this.lastRead) {
      this.unreadCount++;
    } else {
      return false;
    }
  }, this);

  return this.unreadCount;
};


/**
 * Returns the string form of the channel type.
 * @return {string}
 */
BaseChannel.prototype.getType = function getType() {
  return this._modelName.toLowerCase();
};


/**
 * Returns an array of user ids for all users who are currently typing.
 * @return {Array.<string>}
 */
BaseChannel.prototype.getTypingUsers = function getTypingUsers() {
  return keys(this._typing);
};


/**
 *
 * @param ts
 */
BaseChannel.prototype.getMessageByTs = function getMessageByTs(ts) {
  // This has the potential to get really slow, but ok for now I guess...
  return find(this.history, { ts: ts });
};


/**
 *
 * @param {Object} message
 */
BaseChannel.prototype.addMessage = function addMessage(message) {
  // TODO(leah): Do a reverse walk of this and compare the timestamps as an extra guarantee?
  this.history.push(message);

  if (message.ts > this._maxTs && !message.hidden) {
    this._maxTs = message.ts;
    this.unreadCount++;
  }
};


BaseChannel.prototype.updateMessage = function updateMessage(messageUpdatedMsg) {
  var message = messageUpdatedMsg.message;
  var msgIndex = findLastIndex(this.history, 'ts', message.ts);
  if (msgIndex !== -1) {
    this.history[msgIndex] = message;
  }
};


module.exports = BaseChannel;
