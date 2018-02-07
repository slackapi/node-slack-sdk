/* eslint no-unused-vars: 0 */

/**
 * Interface for creating a data store object for caching information from the Slack APIs.
 */

var bind = require('lodash').bind;
var forEach = require('lodash').forEach;
var isUndefined = require('lodash').isUndefined;

var RTM_API_EVENTS = require('../clients/events/rtm').EVENTS;
var getLogger = require('../helpers').getLogger;
var makeMessageEventWithSubtype = require('../clients/events/utils').makeMessageEventWithSubtype;
var messageHandlers = require('./message-handlers');
var models = require('../models');


/**
 *
 * @deprecated SlackDataStore interface will be removed in v4.0.0. See
 * {@link https://github.com/slackapi/node-slack-sdk/wiki/DataStore-v3.x-Migration-Guide|the migration guide}
 * for details.
 * @param {Object} opts
 * @param {string=} opts.logLevel The log level for the logger.
 * @param {Function=} opts.logger Function to use for log calls, takes (logLevel, logString) params.
 * @constructor
 */
function SlackDataStore(opts) {
  var dataStoreOpts = opts || {};

  /**
   * The logger function attached to this client.
   * @type {Function}
   */
  this.logger = dataStoreOpts.logger || getLogger(dataStoreOpts.logLevel);

  this.logger('warn', 'SlackDataStore is deprecated and will be removed in the next major ' +
  'version. See project documentation for a migration guide.');

  forEach(messageHandlers, bind(function anonRegisterMessageHandler(handler, event) {
    this.registerMessageHandler(event, handler);
  }, this));
}


/**
 * @type {Object}
 * @private
 */
SlackDataStore.prototype._messageHandlers = {};


/**
 * Sets a handler to save RTM event data to the data-store.
 * @param {string} event
 * @param {function} handler
 */
SlackDataStore.prototype.registerMessageHandler = function registerMessageHandler(event, handler) {
  this._messageHandlers[event] = handler;
};


/**
 * Clears the data store and re-sets it to the required starting state.
 */
SlackDataStore.prototype.clear = function clear() {

};


// ###############################################
// Getters
// ###############################################

/**
 * Returns the User object matching the supplied id.
 * @param {string} userId
 * @returns {Object}
 */
SlackDataStore.prototype.getUserById = function getUserById(userId) {
};


/**
 * Returns the User object matching the supplied name.
 * @param {string} name
 * @returns {Object}
 */
SlackDataStore.prototype.getUserByName = function getUserByName(name) {
};


/**
 * Returns the User object matching the supplied email.
 * @param {string} email
 * @returns {Object}
 */
SlackDataStore.prototype.getUserByEmail = function getUserByEmail(email) {
};


/**
 * Returns the User object matching the supplied bot ID.
 * @param {string} botId
 * @returns {Object}
 */
SlackDataStore.prototype.getUserByBotId = function getUserByBotId(botId) {
};


/**
 * Returns the Channel object matching the supplied id.
 * @param channelId
 * @returns {Object}
 */
SlackDataStore.prototype.getChannelById = function getChannelById(channelId) {
};


/**
 * Returns the Channel object matching the supplied name.
 * @param name
 * @returns {Object}
 */
SlackDataStore.prototype.getChannelByName = function getChannelByName(name) {
};


/**
 * Returns the Group object matching the supplied id.
 * @param groupId
 * @returns {Object}
 */
SlackDataStore.prototype.getGroupById = function getGroupById(groupId) {
};


/**
 * Returns the Group object matching the supplied name.
 * @param name
 * @returns {Object}
 */
SlackDataStore.prototype.getGroupByName = function getGroupByName(name) {

};


/**
 * Returns the DM object matching the supplied id.
 * @param dmId
 * @returns {Object}
 */
SlackDataStore.prototype.getDMById = function getDMById(dmId) {

};


/**
 * Returns the DM object between the registered user and the user with the supplied name.
 * @param name
 * @return {Object}
 */
SlackDataStore.prototype.getDMByName = function getDMByName(name) {
};


/**
 * Returns the DM object between the registered user and the user with the supplied id.
 * @param id
 * @return {Object}
 */
SlackDataStore.prototype.getDMByUserId = function getDMByName(userId) {
};


/**
 * Returns the bot object matching the supplied id.
 * @param botId
 * @returns {Object}
 */
SlackDataStore.prototype.getBotById = function getBotById(botId) {
};


/**
 * Returns the bot object matching the supplied name.
 * @param {string} name
 * @returns {Object}
 */
SlackDataStore.prototype.getBotByName = function getBotByName(name) {
};


/**
 * Returns the bot object matching the supplied user ID.
 * @param userId
 * @returns {Object}
 */
SlackDataStore.prototype.getBotByUserId = function getBotByUserId(userId) {
};


/**
 * Returns the bot object matching the supplied name.
 * @param {string} name
 * @returns {Object}
 */
SlackDataStore.prototype.getTeamById = function getTeamById(name) {
};


/**
 * Returns the unread count for all objects: channels, groups etc.
 */
SlackDataStore.prototype.getUnreadCount = function getUnreadCount() {
};


// ###############################################
// Setters
// ###############################################


/**
 * Stores a channel object in the data store.
 * @param {Object} channel
 */
SlackDataStore.prototype.setChannel = function setChannel(channel) {
};


/**
 *
 * @param {Object} group
 */
SlackDataStore.prototype.setGroup = function setGroup(group) {
};


/**
 *
 * @param {Object} dm
 */
SlackDataStore.prototype.setDM = function setDM(dm) {
};


/**
 *
 * @param {Object} user
 */
SlackDataStore.prototype.setUser = function setUser(user) {
};


/**
 *
 * @param {Object} bot
 */
SlackDataStore.prototype.setBot = function setBot(bot) {
};


/**
 * @param {Object} team
 */
SlackDataStore.prototype.setTeam = function setTeam(team) {
};


// ###############################################
// Upserts
// ###############################################


/** @param channel */
SlackDataStore.prototype.upsertChannel = function upsertChannel(channel) {

};


/** @param group */
SlackDataStore.prototype.upsertGroup = function upsertGroup(group) {

};


/** @param dm */
SlackDataStore.prototype.upsertDM = function upsertDM(dm) {

};


/** @param user */
SlackDataStore.prototype.upsertUser = function upsertUser(user) {

};


/** @param bot */
SlackDataStore.prototype.upsertBot = function upsertBot(bot) {

};


/** @param team */
SlackDataStore.prototype.upsertTeam = function upsertTeam(team) {

};


// ###############################################
// Deletion methods
// ###############################################


SlackDataStore.prototype.removeChannel = function removeChannel(channelId) {
};


SlackDataStore.prototype.removeGroup = function removeGroup(groupId) {
};


SlackDataStore.prototype.removeDM = function removeDM(dmId) {
};


SlackDataStore.prototype.removeUser = function removeUser(userId) {
};


SlackDataStore.prototype.removeBot = function removeBot(botId) {
};


SlackDataStore.prototype.removeTeam = function removeTeam(teamId) {
};

// ###############################################
// Helpers
// ###############################################

/**
 *
 * @param id
 * @param obj
 */
SlackDataStore.prototype.upsertChannelGroupOrDMById = function upsertChannelGroupOrDMById(id, obj) {
  var firstChar = id.substring(0, 1);

  if (firstChar === 'C') {
    this.upsertChannel(obj);
  } else if (firstChar === 'G') {
    this.upsertGroup(obj);
  } else if (firstChar === 'D') {
    this.upsertDM(obj);
  }
};


/**
 * Returns the channel, group or DM object matching the supplied Id.
 * @param objId
 * @returns {Object}
 */
SlackDataStore.prototype.getChannelGroupOrDMById = function getChannelGroupOrDMById(objId) {
  var ret;
  var firstChar = objId.substring(0, 1);

  if (firstChar === 'C') {
    ret = this.getChannelById(objId);
  } else if (firstChar === 'G') {
    ret = this.getGroupById(objId);
  } else if (firstChar === 'D') {
    ret = this.getDMById(objId);
  }

  return ret;
};


/**
 * Returns the channel or group object matching name, finding by channel, then group then DM.
 * @param objId
 * @returns {Object}
 */
SlackDataStore.prototype.getChannelOrGroupByName = function getChannelOrGroupByName(name) {
  var channel = this.getChannelByName(name);
  return channel || this.getGroupByName(name);
};


// ###############################################
// Web API response handlers
// ###############################################

/**
 * Caches an {@link https://api.slack.com/methods/rtm.start|rtm.start} response to the datastore.
 * @param {Object} data
 */
SlackDataStore.prototype.cacheRtmStart = function cacheRtmStart(data) {
  var self;
  this.clear();

  forEach(data.users || [], bind(function cacheRtmUser(user) {
    this.setUser(new models.User(user));
  }, this));
  forEach(data.channels || [], bind(function cacheRtmChannel(channel) {
    this.setChannel(new models.Channel(channel));
  }, this));
  forEach(data.ims || [], bind(function cacheRtmDM(dm) {
    this.setDM(new models.DM(dm));
  }, this));
  forEach(data.groups || [], bind(function cacheRtmGroup(group) {
    this.setGroup(new models.Group(group));
  }, this));
  forEach(data.mpims || [], bind(function cacheRtmMpim(mpim) {
    // MPIMs are basically groups (they have the same prefix)
    // NOTE: there is a Model class for MPDM, and it is used in the model helpers `getModelClass`
    //       so this could be introducing some inconsistencies in behavior.
    this.setGroup(new models.Group(mpim));
  }, this));
  forEach(data.bots || [], bind(function cacheRtmBot(bot) {
    // Bots don't have a separate type currently, so treat them as simple objects
    this.setBot(bot);
  }, this));

  self = this.getUserById(data.self.id);
  if (self) {
    self.update(data.self);
  } else {
    // If we got here from an rtm.connect, we may not have any users
    this.setUser(new models.User(data.self));
  }
  this.setTeam(data.team);
};


// ###############################################
// RTM Message handlers
// ###############################################


/**
 *
 * @param {string} activeUserId
 * @param {string} activeTeamId
 * @param {string} messageType
 * @param {Object} message
 */
SlackDataStore.prototype.handleRtmMessage = function handleRtmMessage(
  activeUserId, activeTeamId, messageType, message) {
  var handler;
  if (messageType === RTM_API_EVENTS.MESSAGE && !isUndefined(message.subtype)) {
    handler = this._messageHandlers[makeMessageEventWithSubtype(message.subtype)];

    // If there's a custom handler for the message subtype, use that, otherwise default to adding
    // the message to the base channel history
    handler = handler || this._messageHandlers[
        makeMessageEventWithSubtype('rtm_client_add_message')];
  } else {
    handler = this._messageHandlers[messageType];
  }

  if (!isUndefined(handler)) {
    try {
      // Some handlers require the active user / team id, so support providing it as needed
      if (handler.length === 4) {
        handler(activeUserId, activeTeamId, this, message);
      } else {
        handler(this, message);
      }
    } catch (err) {
      // TODO(leah): Do something more here?
      this.logger('debug', err);
    }
  }
};


module.exports = SlackDataStore;
