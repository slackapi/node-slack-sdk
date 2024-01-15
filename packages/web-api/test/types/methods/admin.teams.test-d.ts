import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.teams.admins.list
// -- sad path
expectError(web.admin.teams.admins.list()); // lacking argument
expectError(web.admin.teams.admins.list({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.teams.admins.list>>([{
  team_id: 'T1234',
}]);

// admin.teams.create
// -- sad path
expectError(web.admin.teams.create()); // lacking argument
expectError(web.admin.teams.create({})); // empty argument
expectError(web.admin.teams.create({
  team_name: 'Jokers', // missing team_domain
}));
expectError(web.admin.teams.create({
  team_domain: 'jokers', // missing team_name
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.teams.create>>([{
  team_domain: 'jokers',
  team_name: 'Jokers',
}]);

// admin.teams.list
// -- sad path
expectError(web.admin.teams.list()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.teams.list>>([{}]); // all optional

// admin.teams.owners.list
// -- sad path
expectError(web.admin.teams.owners.list()); // lacking argument
expectError(web.admin.teams.owners.list({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.teams.owners.list>>([{
  team_id: 'T1234',
}]);

// admin.teams.settings.info
// -- sad path
expectError(web.admin.teams.settings.info()); // lacking argument
expectError(web.admin.teams.settings.info({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.teams.settings.info>>([{
  team_id: 'T1234',
}]);

// admin.teams.settings.setDefaultChannels
// -- sad path
expectError(web.admin.teams.settings.setDefaultChannels()); // lacking argument
expectError(web.admin.teams.settings.setDefaultChannels({})); // empty argument
expectError(web.admin.teams.settings.setDefaultChannels({
  team_id: 'T1234', // missing channel_ids
}));
expectError(web.admin.teams.settings.setDefaultChannels({
  channel_ids: ['C1234'], // missing team_id
}));
expectError(web.admin.teams.settings.setDefaultChannels({
  team_id: 'T1234',
  channel_ids: [], // must include at least 1 channel
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.teams.settings.setDefaultChannels>>([{
  team_id: 'T1234',
  channel_ids: ['C1234'],
}]);

// admin.teams.settings.setDescription
// -- sad path
expectError(web.admin.teams.settings.setDescription()); // lacking argument
expectError(web.admin.teams.settings.setDescription({})); // empty argument
expectError(web.admin.teams.settings.setDescription({
  team_id: 'T1234', // missing description
}));
expectError(web.admin.teams.settings.setDescription({
  description: 'hey ho', // missing team_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.teams.settings.setDescription>>([{
  team_id: 'T1234',
  description: 'existential dread',
}]);

// admin.teams.settings.setDiscoverability
// -- sad path
expectError(web.admin.teams.settings.setDiscoverability()); // lacking argument
expectError(web.admin.teams.settings.setDiscoverability({})); // empty argument
expectError(web.admin.teams.settings.setDiscoverability({
  team_id: 'T1234', // missing discoverability
}));
expectError(web.admin.teams.settings.setDiscoverability({
  discoverability: 'open', // missing team_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.teams.settings.setDiscoverability>>([{
  team_id: 'T1234',
  discoverability: 'closed',
}]);

// admin.teams.settings.setIcon
// -- sad path
expectError(web.admin.teams.settings.setIcon()); // lacking argument
expectError(web.admin.teams.settings.setIcon({})); // empty argument
expectError(web.admin.teams.settings.setIcon({
  team_id: 'T1234', // missing image_url
}));
expectError(web.admin.teams.settings.setIcon({
  image_url: 'example.com', // missing team_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.teams.settings.setIcon>>([{
  team_id: 'T1234',
  image_url: 'example.com',
}]);

// admin.teams.settings.setName
// -- sad path
expectError(web.admin.teams.settings.setName()); // lacking argument
expectError(web.admin.teams.settings.setName({})); // empty argument
expectError(web.admin.teams.settings.setName({
  team_id: 'T1234', // missing name
}));
expectError(web.admin.teams.settings.setName({
  name: 'SlackHQ', // missing team_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.teams.settings.setName>>([{
  team_id: 'T1234',
  name: 'SlackHQ',
}]);
