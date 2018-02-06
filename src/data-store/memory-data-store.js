/**
 * In memory data store for caching information from the Slack API.
 */

var assign = require('lodash').assign;
var find = require('lodash').find;
var has = require('lodash').has;
var inherits = require('inherits');

var SlackDataStore = require('./data-store');
var models = require('../models');


/**
 *
 * @deprecated SlackMemoryDataStore will be removed in v4.0.0. See
 * {@link https://github.com/slackapi/node-slack-sdk/wiki/DataStore-v3.x-Migration-Guide|the migration guide}
 * for details.
 * @constructor
 */
function SlackMemoryDataStore(opts) {
  SlackDataStore.call(this, opts);

  /**
   *
   * @type {Object}
   */
  this.users = {};


  /**
   *
   * @type {Object}
   */
  this.channels = {};


  /**
   *
   * @type {Object}
   */
  this.dms = {};


  /**
   *
   * @type {Object}
   */
  this.groups = {};


  /**
   *
   * @type {Object}
   */
  this.bots = {};


  /**
   *
   * @type {Object}
   */
  this.teams = {};
}

inherits(SlackMemoryDataStore, SlackDataStore);


/** @inheritdoc */
SlackMemoryDataStore.prototype.clear = function clear() {
  this.users = {};
  this.channels = {};
  this.dms = {};
  this.groups = {};
  this.bots = {};
  this.teams = {};
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.getUserById = function getUserById(userId) {
  return this.users[userId];
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.getUserByName = function getUserByName(name) {
  return find(this.users, ['name', name]);
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.getUserByEmail = function getUserByEmail(email) {
  return find(this.users, { profile: { email: email } });
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.getUserByBotId = function getUserByBotId(botId) {
  return find(this.users, { profile: { bot_id: botId } });
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.getChannelById = function getChannelById(channelId) {
  return this.channels[channelId];
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.getChannelByName = function getChannelByName(name) {
  var transformedName = name.replace(/^#/, '');
  return find(this.channels, ['name', transformedName]);
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.getGroupById = function getGroupById(groupId) {
  return this.groups[groupId];
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.getGroupByName = function getGroupByName(name) {
  return find(this.groups, ['name', name]);
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.getDMById = function getDMById(dmId) {
  return this.dms[dmId];
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.getDMByName = function getDMByName(name) {
  var user = this.getUserByName(name);
  return (user) ? find(this.dms, ['user', user.id]) : undefined;
};

/** @inheritdoc */
SlackMemoryDataStore.prototype.getDMByUserId = function getDMByUserId(userId) {
  return find(this.dms, ['user', userId]);
};

/** @inheritdoc */
SlackMemoryDataStore.prototype.getBotById = function getBotById(botId) {
  return this.bots[botId];
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.getBotByName = function getBotByName(name) {
  return find(this.bots, ['name', name]);
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.getBotByUserId = function getBotByUserId(userId) {
  var bot;
  var user = this.getUserById(userId);
  if (user) {
    bot = this.getBotById(user.profile.bot_id);
  }

  return bot;
};

/** @inheritdoc */
SlackMemoryDataStore.prototype.getTeamById = function getTeamById(teamId) {
  return this.teams[teamId];
};


/**
 * Returns the unread count for all objects: channels, groups etc.
 */
SlackMemoryDataStore.prototype.getUnreadCount = function getUnreadCount() {
};


// ###############################################
// Setters
// ###############################################


/** @inheritdoc */
SlackMemoryDataStore.prototype.setChannel = function setChannel(channel) {
  this.channels[channel.id] = channel;
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.setGroup = function setGroup(group) {
  this.groups[group.id] = group;
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.setDM = function setDM(dm) {
  this.dms[dm.id] = dm;
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.setUser = function setUser(user) {
  this.users[user.id] = user;
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.setBot = function setBot(bot) {
  this.bots[bot.id] = bot;
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.setTeam = function setTeam(team) {
  this.teams[team.id] = team;
};


// ###############################################
// Upserts
// ###############################################


/** @inheritdoc */
SlackMemoryDataStore.prototype.upsertChannel = function upsertChannel(channel) {
  if (has(this.channels, channel.id)) {
    this.setChannel(this.getChannelById(channel.id).update(channel));
  } else {
    this.setChannel(new models.Channel(channel));
  }
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.upsertGroup = function upsertGroup(group) {
  if (has(this.groups, group.id)) {
    this.setGroup(this.getGroupById(group.id).update(group));
  } else {
    this.setGroup(new models.Group(group));
  }
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.upsertDM = function upsertDM(dm) {
  if (has(this.dms, dm.id)) {
    this.setDM(this.getDMById(dm.id).update(dm));
  } else {
    this.setDM(new models.DM(dm));
  }
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.upsertUser = function upsertUser(user) {
  if (has(this.users, user.id)) {
    this.setUser(this.getUserById(user.id).update(user));
  } else {
    this.setUser(new models.User(user));
  }
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.upsertBot = function upsertBot(bot) {
  var currentBot;

  if (has(this.bots, bot.id)) {
    currentBot = this.getBotById(bot.id);
    this.setBot(assign(currentBot, bot));
  } else {
    this.setBot(bot);
  }
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.upsertTeam = function upsertTeam(team) {
  var currentTeam;

  if (has(this.teams, team.id)) {
    currentTeam = this.getTeamById(team.id);
    this.setTeam(assign(currentTeam, team));
  } else {
    this.setTeam(team);
  }
};


// ###############################################
// Deletion methods
// ###############################################


/** @inheritdoc */
SlackMemoryDataStore.prototype.removeChannel = function removeChannel(channelId) {
  delete this.channels[channelId];
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.removeGroup = function removeGroup(groupId) {
  delete this.groups[groupId];
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.removeDM = function removeDM(dmId) {
  delete this.dms[dmId];
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.removeUser = function removeUser(userId) {
  delete this.users[userId];
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.removeBot = function removeBot(botId) {
  delete this.bots[botId];
};


/** @inheritdoc */
SlackMemoryDataStore.prototype.removeTeam = function removeTeam(teamId) {
  delete this.teams[teamId];
};


module.exports = SlackMemoryDataStore;
