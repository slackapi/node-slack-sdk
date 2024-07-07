import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.workflows.collaborators.add
// -- sad path
expectError(web.admin.workflows.collaborators.add()); // lacking argument
expectError(web.admin.workflows.collaborators.add({})); // empty argument
expectError(web.admin.workflows.collaborators.add({
  collaborator_ids: ['U1234'], // missing workflow_ids
}));
expectError(web.admin.workflows.collaborators.add({
  workflow_ids: ['Wf1234'], // missing user_ids
}));
expectError(web.admin.workflows.collaborators.add({
  collaborator_ids: ['U1234'],
  workflow_ids: [], // must provide at least 1 id
}));
expectError(web.admin.workflows.collaborators.add({
  workflow_ids: ['Wf1234'],
  collaborator_ids: [], // must provide at least 1 id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.workflows.collaborators.add>>([{
  collaborator_ids: ['U1234'],
  workflow_ids: ['Wf1234'],
}]);

// admin.workflows.collaborators.remove
// -- sad path
expectError(web.admin.workflows.collaborators.remove()); // lacking argument
expectError(web.admin.workflows.collaborators.remove({})); // empty argument
expectError(web.admin.workflows.collaborators.remove({
  collaborator_ids: ['U1234'], // missing workflow_ids
}));
expectError(web.admin.workflows.collaborators.remove({
  workflow_ids: ['Wf1234'], // missing user_ids
}));
expectError(web.admin.workflows.collaborators.remove({
  collaborator_ids: ['U1234'],
  workflow_ids: [], // must provide at least 1 id
}));
expectError(web.admin.workflows.collaborators.remove({
  workflow_ids: ['Wf1234'],
  collaborator_ids: [], // must provide at least 1 id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.workflows.collaborators.remove>>([{
  collaborator_ids: ['U1234'],
  workflow_ids: ['Wf1234'],
}]);

// admin.workflows.permissions.lookup
// -- sad path
expectError(web.admin.workflows.permissions.lookup()); // lacking argument
expectError(web.admin.workflows.permissions.lookup({})); // empty argument
expectError(web.admin.workflows.permissions.lookup({
  workflow_ids: [], // must provide at least 1 id
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.workflows.permissions.lookup>>([{
  workflow_ids: ['Wf1234'],
}]);

// admin.workflows.search
// -- sad path
expectError(web.admin.workflows.search({
  collaborator_ids: [], // must provide at least 1 ID
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.workflows.search>>([{}]); // all optional args OK
expectAssignable<Parameters<typeof web.admin.workflows.search>>([]); // no arg is fine

// admin.workflows.unpublish
// -- sad path
expectError(web.admin.workflows.unpublish()); // lacking argument
expectError(web.admin.workflows.unpublish({
  workflow_ids: [], // must provide at least 1 ID
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.workflows.unpublish>>([{
  workflow_ids: ['Wf1234'],
}]);
