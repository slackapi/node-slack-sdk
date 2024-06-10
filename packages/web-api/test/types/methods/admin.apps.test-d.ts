import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.apps.activities.list
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.admin.apps.activities.list>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.admin.apps.activities.list>>([]); // no arg is fine

// admin.apps.approve
// -- sad path
expectError(web.admin.apps.approve()); // lacking argument
expectError(web.admin.apps.approve({})); // empty argument
expectError(web.admin.apps.approve({
  app_id: 'A1234', // missing team or enterprise id
}));
expectError(web.admin.apps.approve({
  request_id: 'R1234', // missing team or enterprise id
}));
expectError(web.admin.apps.approve({
  team_id: 'T1234', // missing request or app id
}));
expectError(web.admin.apps.approve({
  enterprise_id: 'E1234', // missing request or app id
}));
expectError(web.admin.apps.approve({
  app_id: 'A1234',
  request_id: 'R1234', // missing team or enterprise id, and cant specify both app and request id
}));
expectError(web.admin.apps.approve({
  enterprise_id: 'E1234',
  team_id: 'T1234', // missing request or app id, and canot specify both enterprise and team id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.apps.approve>>([{
  app_id: 'A1234',
  team_id: 'T1234',
}]);
expectAssignable<Parameters<typeof web.admin.apps.approve>>([{
  app_id: 'A1234',
  enterprise_id: 'T1234',
}]);
expectAssignable<Parameters<typeof web.admin.apps.approve>>([{
  request_id: 'R1234',
  team_id: 'T1234',
}]);
expectAssignable<Parameters<typeof web.admin.apps.approve>>([{
  request_id: 'R1234',
  enterprise_id: 'T1234',
}]);

// admin.apps.approved.list
// -- sad path
expectError(web.admin.apps.approved.list()); // lacking argument
expectError(web.admin.apps.approved.list({
  enterprise_id: 'E1234',
  team_id: 'T1234', // cannot specify both enterprise and team id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.apps.approved.list>>([{}]); // all args optional
expectAssignable<Parameters<typeof web.admin.apps.approved.list>>([{
  team_id: 'T1234', // can optionally specify team id
}]);
expectAssignable<Parameters<typeof web.admin.apps.approved.list>>([{
  enterprise_id: 'T1234', // can optionally specify enterprise id
}]);

// admin.apps.clearResolution
// -- sad path
expectError(web.admin.apps.clearResolution()); // lacking argument
expectError(web.admin.apps.clearResolution({})); // empty argument
expectError(web.admin.apps.clearResolution({
  app_id: 'A1234', // missing team or enterprise id
}));
expectError(web.admin.apps.clearResolution({
  enterprise_id: 'E1234', // missing app_id
}));
expectError(web.admin.apps.clearResolution({
  team_id: 'T1234', // missing app_id
}));
expectError(web.admin.apps.clearResolution({
  app_id: 'A1234',
  enterprise_id: 'E1234',
  team_id: 'T1234', // cannot specify both enterprise and team id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.apps.clearResolution>>([{
  app_id: 'A1234',
  team_id: 'T1234',
}]);
expectAssignable<Parameters<typeof web.admin.apps.clearResolution>>([{
  app_id: 'A1234',
  enterprise_id: 'E1234',
}]);

// admin.apps.config.lookup
// -- sad path
expectError(web.admin.apps.config.lookup()); // lacking argument
expectError(web.admin.apps.config.lookup({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.apps.config.lookup>>([{
  app_ids: ['A1234'],
}]);

// admin.apps.config.set
// -- sad path
expectError(web.admin.apps.config.set()); // lacking argument
expectError(web.admin.apps.config.set({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.apps.config.set>>([{
  app_id: 'A1234',
}]);

// admin.apps.requests.cancel
// -- sad path
expectError(web.admin.apps.requests.cancel()); // lacking argument
expectError(web.admin.apps.requests.cancel({})); // empty argument
expectError(web.admin.apps.requests.cancel({
  request_id: 'A1234', // missing team or enterprise id
}));
expectError(web.admin.apps.requests.cancel({
  enterprise_id: 'E1234', // missing request_id
}));
expectError(web.admin.apps.requests.cancel({
  team_id: 'T1234', // missing request_id
}));
expectError(web.admin.apps.requests.cancel({
  request_id: 'A1234',
  enterprise_id: 'E1234',
  team_id: 'T1234', // cannot specify both enterprise and team id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.apps.requests.cancel>>([{
  request_id: 'A1234',
  team_id: 'T1234',
}]);
expectAssignable<Parameters<typeof web.admin.apps.requests.cancel>>([{
  request_id: 'A1234',
  enterprise_id: 'E1234',
}]);

// admin.apps.requests.list
// -- sad path
expectError(web.admin.apps.requests.list()); // lacking argument
expectError(web.admin.apps.requests.list({})); // empty argument
expectError(web.admin.apps.requests.list({
  enterprise_id: 'E1234',
  team_id: 'T1234', // cannot specify both enterprise and team id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.apps.requests.list>>([{
  team_id: 'T1234',
}]);
expectAssignable<Parameters<typeof web.admin.apps.requests.list>>([{
  enterprise_id: 'E1234',
}]);

// admin.apps.restrict
// -- sad path
expectError(web.admin.apps.restrict()); // lacking argument
expectError(web.admin.apps.restrict({})); // empty argument
expectError(web.admin.apps.restrict({
  app_id: 'A1234', // missing team or enterprise id
}));
expectError(web.admin.apps.restrict({
  request_id: 'R1234', // missing team or enterprise id
}));
expectError(web.admin.apps.restrict({
  team_id: 'T1234', // missing request or app id
}));
expectError(web.admin.apps.restrict({
  enterprise_id: 'E1234', // missing request or app id
}));
expectError(web.admin.apps.restrict({
  app_id: 'A1234',
  request_id: 'R1234', // missing team or enterprise id, and cant specify both app and request id
}));
expectError(web.admin.apps.restrict({
  enterprise_id: 'E1234',
  team_id: 'T1234', // missing request or app id, and canot specify both enterprise and team id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.apps.restrict>>([{
  app_id: 'A1234',
  team_id: 'T1234',
}]);
expectAssignable<Parameters<typeof web.admin.apps.restrict>>([{
  app_id: 'A1234',
  enterprise_id: 'T1234',
}]);
expectAssignable<Parameters<typeof web.admin.apps.restrict>>([{
  request_id: 'R1234',
  team_id: 'T1234',
}]);
expectAssignable<Parameters<typeof web.admin.apps.restrict>>([{
  request_id: 'R1234',
  enterprise_id: 'T1234',
}]);

// admin.apps.restricted.list
// -- sad path
expectError(web.admin.apps.restricted.list()); // lacking argument
expectError(web.admin.apps.restricted.list({})); // empty argument
expectError(web.admin.apps.restricted.list({
  enterprise_id: 'E1234',
  team_id: 'T1234', // cannot specify both enterprise and team id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.apps.restricted.list>>([{
  team_id: 'T1234',
}]);
expectAssignable<Parameters<typeof web.admin.apps.restricted.list>>([{
  enterprise_id: 'E1234',
}]);

// admin.apps.uninstall
// -- sad path
expectError(web.admin.apps.uninstall()); // lacking argument
expectError(web.admin.apps.uninstall({})); // empty argument
expectError(web.admin.apps.uninstall({
  app_id: 'A1234', // missing team or enterprise id
}));
expectError(web.admin.apps.uninstall({
  enterprise_id: 'E1234', // missing app_id
}));
expectError(web.admin.apps.uninstall({
  team_id: 'T1234', // missing app_id
}));
expectError(web.admin.apps.uninstall({
  app_id: 'A1234',
  enterprise_id: 'E1234',
  team_id: 'T1234', // cannot specify both enterprise and team id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.apps.uninstall>>([{
  app_id: 'A1234',
  team_id: 'T1234',
}]);
expectAssignable<Parameters<typeof web.admin.apps.uninstall>>([{
  app_id: 'A1234',
  enterprise_id: 'E1234',
}]);
