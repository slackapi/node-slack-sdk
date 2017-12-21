/**
 *
 */

var bind = require('lodash').bind;
var forEach = require('lodash').forEach;
var inherits = require('inherits');

var BaseAPIClient = require('../client');
var facets = require('./facets/index');


/**
 * Slack Web API client.
 *
 * @param token - The Slack API token to use with this client.
 * @param {Object} [opts]
 * @param {Object} [opts.retryConfig] - The configuration to use for the retry operation,
 * see {@link https://github.com/tim-kos/node-retry|node-retry} for more details.
 * @constructor
 */
function WebAPIClient(token, opts) {
  var clientOpts = opts || {};
  BaseAPIClient.call(this, token, clientOpts);
  this.logger('debug', 'WebAPIClient initialized');
}

inherits(WebAPIClient, BaseAPIClient);

/**
 * @name WebAPIClient#api
 * @type {ApiFacet}
 * @see {@link /node-slack-sdk/reference/ApiFacet|ApiFacet}
 */

 /**
 * @name WebAPIClient#auth
 * @type {AuthFacet}
 * @see {@link /node-slack-sdk/reference/AuthFacet|AuthFacet}
 */

 /**
 * @name WebAPIClient#bots
 * @type {BotsFacet}
 * @see {@link /node-slack-sdk/reference/BotsFacet|BotsFacet}
 */

 /**
 * @name WebAPIClient#channels
 * @type {ChannelsFacet}
 * @see {@link /node-slack-sdk/reference/ChannelsFacet|ChannelsFacet}
 */

 /**
 * @name WebAPIClient#chat
 * @type {ChatFacet}
 * @see {@link /node-slack-sdk/reference/ChatFacet|ChatFacet}
 */

 /**
 * @name WebAPIClient#conversations
 * @type {ConversationsFacet}
 * @see {@link /node-slack-sdk/reference/ConversationsFacet|ConversationsFacet}
 */

 /**
 * @name WebAPIClient#dialog
 * @type {DialogFacet}
 * @see {@link /node-slack-sdk/reference/DialogFacet|DialogFacet}
 */

 /**
 * @name WebAPIClient#dnd
 * @type {DndFacet}
 * @see {@link /node-slack-sdk/reference/DndFacet|DndFacet}
 */

 /**
 * @name WebAPIClient#emoji
 * @type {EmojiFacet}
 * @see {@link /node-slack-sdk/reference/EmojiFacet|EmojiFacet}
 */

 /**
 * @name WebAPIClient#files.comments
 * @type {FilesCommentsFacet}
 * @see {@link /node-slack-sdk/reference/FilesCommentsFacet|FilesCommentsFacet}
 */

 /**
 * @name WebAPIClient#files
 * @type {FilesFacet}
 * @see {@link /node-slack-sdk/reference/FilesFacet|FilesFacet}
 */

 /**
 * @name WebAPIClient#groups
 * @type {GroupsFacet}
 * @see {@link /node-slack-sdk/reference/GroupsFacet|GroupsFacet}
 */

 /**
 * @name WebAPIClient#im
 * @type {ImFacet}
 * @see {@link /node-slack-sdk/reference/ImFacet|ImFacet}
 */

 /**
 * @name WebAPIClient#mpim
 * @type {MpimFacet}
 * @see {@link /node-slack-sdk/reference/MpimFacet|MpimFacet}
 */

 /**
 * @name WebAPIClient#oauth
 * @type {OauthFacet}
 * @see {@link /node-slack-sdk/reference/OauthFacet|OauthFacet}
 */

 /**
 * @name WebAPIClient#pins
 * @type {PinsFacet}
 * @see {@link /node-slack-sdk/reference/PinsFacet|PinsFacet}
 */

 /**
 * @name WebAPIClient#presence
 * @type {PresenceFacet}
 * @see {@link /node-slack-sdk/reference/PresenceFacet|PresenceFacet}
 */

 /**
 * @name WebAPIClient#reactions
 * @type {ReactionsFacet}
 * @see {@link /node-slack-sdk/reference/ReactionsFacet|ReactionsFacet}
 */

 /**
 * @name WebAPIClient#reminders
 * @type {RemindersFacet}
 * @see {@link /node-slack-sdk/reference/RemindersFacet|RemindersFacet}
 */

 /**
 * @name WebAPIClient#rtm
 * @type {RtmFacet}
 * @see {@link /node-slack-sdk/reference/RtmFacet|RtmFacet}
 */

 /**
 * @name WebAPIClient#search
 * @type {SearchFacet}
 * @see {@link /node-slack-sdk/reference/SearchFacet|SearchFacet}
 */

 /**
 * @name WebAPIClient#stars
 * @type {StarsFacet}
 * @see {@link /node-slack-sdk/reference/StarsFacet|StarsFacet}
 */

 /**
 * @name WebAPIClient#team
 * @type {TeamFacet}
 * @see {@link /node-slack-sdk/reference/TeamFacet|TeamFacet}
 */

 /**
 * @name WebAPIClient#usergroups
 * @type {UsergroupsFacet}
 * @see {@link /node-slack-sdk/reference/UsergroupsFacet|UsergroupsFacet}
 */

 /**
 * @name WebAPIClient#usergroups.users
 * @type {UsergroupsUsersFacet}
 * @see {@link /node-slack-sdk/reference/UsergroupsUsersFacet|UsergroupsUsersFacet}
 */

 /**
 * @name WebAPIClient#users
 * @type {UsersFacet}
 * @see {@link /node-slack-sdk/reference/UsersFacet|UsersFacet}
 */

 /**
 * @name WebAPIClient#users.profiles
 * @type {UsersProfilesFacet}
 * @see {@link /node-slack-sdk/reference/UsersProfilesFacet|UsersProfilesFacet}
 */

/** @inheritDocs **/
WebAPIClient.prototype._createFacets = function _createFacets() {
  var newFacet;
  var makeAPICall;

  WebAPIClient.super_.prototype._createFacets.call(this);

  makeAPICall = bind(this._makeAPICall, this);
  forEach(facets, bind(function registerWebClientFacet(Facet) {
    newFacet = new Facet(makeAPICall);
    this[newFacet.name] = newFacet;
  }, this));

  // Add a dm alias for the im and mpim facets
  this.dm = this.im;
  this.mpdm = this.mpim;
  // Alias for subfacets
  this.files.comments = this['files.comments'];
  this.usergroups.users = this['usergroups.users'];
  this.users.profile = this['users.profile'];
};


module.exports = WebAPIClient;
