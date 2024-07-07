import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// usergroups.create
// -- sad path
expectError(web.usergroups.create()); // lacking argument
expectError(web.usergroups.create({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.usergroups.create>>([{
  name: 'knights who say ni', // must specify name
}]);

// usergroups.disable
// -- sad path
expectError(web.usergroups.disable()); // lacking argument
expectError(web.usergroups.disable({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.usergroups.disable>>([{
  usergroup: 'Sg1234', // must specify usergroup
}]);

// usergroups.enable
// -- sad path
expectError(web.usergroups.enable()); // lacking argument
expectError(web.usergroups.enable({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.usergroups.enable>>([{
  usergroup: 'Sg1234', // must specify usergroup
}]);

// usergroups.list
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.usergroups.list>>([{}]); // all optional properties
expectAssignable<Parameters<typeof web.usergroups.list>>([]); // no arg is fine

// usergroups.update
// -- sad path
expectError(web.usergroups.update()); // lacking argument
expectError(web.usergroups.update({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.usergroups.update>>([{
  usergroup: 'Sg1234', // must specify usergroup
}]);

// usergroups.users.list
// -- sad path
expectError(web.usergroups.users.list()); // lacking argument
expectError(web.usergroups.users.list({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.usergroups.users.list>>([{
  usergroup: 'Sg1234', // must specify usergroup
}]);

// usergroups.users.update
// -- sad path
expectError(web.usergroups.users.update()); // lacking argument
expectError(web.usergroups.users.update({})); // empty argument
expectError(web.usergroups.users.update({ usergroup: 'Sg1234' })); // missing users
expectError(web.usergroups.users.update({ users: 'U1,U2,U3' })); // missing usergroups
// -- happy path
expectAssignable<Parameters<typeof web.usergroups.users.update>>([{
  usergroup: 'Sg1234',
  users: 'U1,U2,U3', // must specify usergroup and users
}]);
