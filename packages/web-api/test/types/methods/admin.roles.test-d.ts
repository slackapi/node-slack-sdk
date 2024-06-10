import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.roles.addAssignments
// -- sad path
expectError(web.admin.roles.addAssignments()); // lacking argument
expectError(web.admin.roles.addAssignments({})); // empty argument
expectError(web.admin.roles.addAssignments({
  entity_ids: ['E1234'], // missing role_id, user_ids
}));
expectError(web.admin.roles.addAssignments({
  role_id: 'Rl0A', // missing entity_ids, user_ids
}));
expectError(web.admin.roles.addAssignments({
  user_ids: ['U1234'], // missing entity_ids, role_id
}));
expectError(web.admin.roles.addAssignments({
  entity_ids: ['E1234'], // missing user_ids
  role_id: 'Rl0A',
}));
expectError(web.admin.roles.addAssignments({
  entity_ids: ['E1234'], // missing role_id
  user_ids: ['U1234'],
}));
expectError(web.admin.roles.addAssignments({
  role_id: 'Rl0A', // missing entity_ids
  user_ids: ['U1234'],
}));
expectError(web.admin.roles.addAssignments({
  entity_ids: [], // need at least 1 item
  role_id: 'Rl0A',
  user_ids: ['U1234'],
}));
expectError(web.admin.roles.addAssignments({
  entity_ids: ['C1234'],
  role_id: 'Rl0A',
  user_ids: [], // need at least 1 item,
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.roles.addAssignments>>([{
  entity_ids: ['C1234'],
  role_id: 'Rl0A',
  user_ids: ['U1234'],
}]);

// admin.roles.listAssignments
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.admin.roles.listAssignments>>([{}]); // all optional
expectAssignable<Parameters<typeof web.admin.roles.listAssignments>>([]); // no arg is fine

// admin.roles.removeAssignments
// -- sad path
expectError(web.admin.roles.removeAssignments()); // lacking argument
expectError(web.admin.roles.removeAssignments({})); // empty argument
expectError(web.admin.roles.removeAssignments({
  entity_ids: ['E1234'], // missing role_id, user_ids
}));
expectError(web.admin.roles.removeAssignments({
  role_id: 'Rl0A', // missing entity_ids, user_ids
}));
expectError(web.admin.roles.removeAssignments({
  user_ids: ['U1234'], // missing entity_ids, role_id
}));
expectError(web.admin.roles.removeAssignments({
  entity_ids: ['E1234'], // missing user_ids
  role_id: 'Rl0A',
}));
expectError(web.admin.roles.removeAssignments({
  entity_ids: ['E1234'], // missing role_id
  user_ids: ['U1234'],
}));
expectError(web.admin.roles.removeAssignments({
  role_id: 'Rl0A', // missing entity_ids
  user_ids: ['U1234'],
}));
expectError(web.admin.roles.removeAssignments({
  entity_ids: [], // need at least 1 item
  role_id: 'Rl0A',
  user_ids: ['U1234'],
}));
expectError(web.admin.roles.removeAssignments({
  entity_ids: ['C1234'],
  role_id: 'Rl0A',
  user_ids: [], // need at least 1 item,
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.roles.removeAssignments>>([{
  entity_ids: ['C1234'],
  role_id: 'Rl0A',
  user_ids: ['U1234'],
}]);
