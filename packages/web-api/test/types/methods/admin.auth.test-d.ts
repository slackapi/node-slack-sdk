import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.auth.policy.assignEntities
// -- sad path
expectError(web.admin.auth.policy.assignEntities()); // lacking argument
expectError(web.admin.auth.policy.assignEntities({})); // empty argument
expectError(web.admin.auth.policy.assignEntities({
  entity_ids: ['U1234'], // missing entity_type and policy_name
}));
expectError(web.admin.auth.policy.assignEntities({
  entity_type: 'USER', // missing entity_ids and policy_name
}));
expectError(web.admin.auth.policy.assignEntities({
  policy_name: 'email_password', // missing entity_ids and entity_type
}));
expectError(web.admin.auth.policy.assignEntities({
  entity_ids: ['U1234'], // missing policy_name
  entity_type: 'USER',
}));
expectError(web.admin.auth.policy.assignEntities({
  entity_ids: ['U1234'], // missing entity_type
  policy_name: 'email_password',
}));
expectError(web.admin.auth.policy.assignEntities({
  entity_type: 'USER', // missing entity_ids
  policy_name: 'email_password',
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.auth.policy.assignEntities>>([{
  policy_name: 'email_password',
  entity_type: 'USER',
  entity_ids: ['U1234'],
}]);

// admin.auth.policy.getEntities
// -- sad path
expectError(web.admin.auth.policy.getEntities()); // lacking argument
expectError(web.admin.auth.policy.getEntities({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.auth.policy.getEntities>>([{
  policy_name: 'email_password',
}]);

// admin.auth.policy.removeEntities
// -- sad path
expectError(web.admin.auth.policy.removeEntities()); // lacking argument
expectError(web.admin.auth.policy.removeEntities({})); // empty argument
expectError(web.admin.auth.policy.removeEntities({
  entity_ids: ['U1234'], // missing entity_type and policy_name
}));
expectError(web.admin.auth.policy.removeEntities({
  entity_type: 'USER', // missing entity_ids and policy_name
}));
expectError(web.admin.auth.policy.removeEntities({
  policy_name: 'email_password', // missing entity_ids and entity_type
}));
expectError(web.admin.auth.policy.removeEntities({
  entity_ids: ['U1234'], // missing policy_name
  entity_type: 'USER',
}));
expectError(web.admin.auth.policy.removeEntities({
  entity_ids: ['U1234'], // missing entity_type
  policy_name: 'email_password',
}));
expectError(web.admin.auth.policy.removeEntities({
  entity_type: 'USER', // missing entity_ids
  policy_name: 'email_password',
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.auth.policy.removeEntities>>([{
  policy_name: 'email_password',
  entity_type: 'USER',
  entity_ids: ['U1234'],
}]);
