/**
 * Handlers for all RTM `team_` events.
 */
var zipObject = require('lodash').zipObject;

var RTM_EVENTS = require('../../clients/events/rtm').EVENTS;

var helpers = require('./helpers');


/** {@link https://api.slack.com/events/team_domain_change|team_domain_change} */
var handleTeamDomainChange = function handleTeamDomainChange(
  activeUserId, activeTeamId, dataStore, message) {
  var team = dataStore.getTeamById(activeTeamId);
  team.domain = message.domain;
  team.url = message.url;
  dataStore.setTeam(team);
};


/** {@link https://api.slack.com/events/team_rename|team_rename} */
var handleTeamRename = function handleTeamRename(activeUserId, activeTeamId, dataStore, message) {
  var team = dataStore.getTeamById(activeTeamId);
  team.name = message.name;
  dataStore.setTeam(team);
};


/** {@link https://api.slack.com/events/team_pref_change|team_pref_change} */
var handleTeamPrefChange = function handleTeamPrefChange(
  activeUserId, activeTeamId, dataStore, message) {
  var team = dataStore.getTeamById(activeTeamId);
  team.prefs[message.name] = message.value;
  dataStore.setTeam(team);
};


var handlers = [
  [RTM_EVENTS.TEAM_DOMAIN_CHANGE, handleTeamDomainChange],
  [RTM_EVENTS.TEAM_RENAME, handleTeamRename],
  [RTM_EVENTS.TEAM_PREF_CHANGE, handleTeamPrefChange],
  [RTM_EVENTS.TEAM_JOIN, helpers.handleNewOrUpdatedUser],
];


module.exports = zipObject(handlers);
