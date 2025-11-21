import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// slackLists.create
// -- sad path
expectError(web.slackLists.create()); // lacking argument
expectError(web.slackLists.create({})); // missing name

// -- happy path
expectAssignable<Parameters<typeof web.slackLists.create>>([
  {
    name: 'Backlog',
  },
]);

// slackLists.access.delete
// -- sad path
expectError(web.slackLists.access.delete()); // lacking argument
expectError(web.slackLists.access.delete({})); // missing list_id

// -- happy path
expectAssignable<Parameters<typeof web.slackLists.access.delete>>([
  {
    list_id: 'L1234567890',
  },
]);

// slackLists.access.set
// -- sad path
expectError(web.slackLists.access.set()); // lacking argument
expectError(web.slackLists.access.set({})); // missing list_id and access_level
expectError(web.slackLists.access.set({ list_id: 'L1234567890' })); // missing access_level

// -- happy path
expectAssignable<Parameters<typeof web.slackLists.access.set>>([
  {
    list_id: 'L1234567890',
    access_level: 'public',
  },
]);

// slackLists.download.get
// -- sad path
expectError(web.slackLists.download.get()); // lacking argument
expectError(web.slackLists.download.get({})); // missing list_id and job_id
expectError(web.slackLists.download.get({ list_id: 'L1234567890' })); // missing job_id

// -- happy path
expectAssignable<Parameters<typeof web.slackLists.download.get>>([
  {
    list_id: 'F1234567890',
    job_id: 'Le1234567890',
  },
]);

// slackLists.download.start
// -- sad path
expectError(web.slackLists.download.start()); // lacking argument
expectError(web.slackLists.download.start({})); // missing list_id

// -- happy path
expectAssignable<Parameters<typeof web.slackLists.download.start>>([
  {
    list_id: 'L1234567890',
  },
]);

// slackLists.items.create
// -- sad path
expectError(web.slackLists.items.create()); // lacking argument
expectError(web.slackLists.items.create({})); // missing list_id

// -- happy path
expectAssignable<Parameters<typeof web.slackLists.items.create>>([
  {
    list_id: 'L1234567890',
  },
]);

// slackLists.items.delete
// -- sad path
expectError(web.slackLists.items.delete()); // lacking argument
expectError(web.slackLists.items.delete({})); // missing list_id and id
expectError(web.slackLists.items.delete({ list_id: 'L1234567890' })); // missing id

// -- happy path
expectAssignable<Parameters<typeof web.slackLists.items.delete>>([
  {
    list_id: 'L1234567890',
    id: 'I1234567890',
  },
]);

// slackLists.items.deleteMultiple
// -- sad path
expectError(web.slackLists.items.deleteMultiple()); // lacking argument
expectError(web.slackLists.items.deleteMultiple({})); // missing list_id and ids
expectError(web.slackLists.items.deleteMultiple({ list_id: 'L1234567890' })); // missing ids

// -- happy path
expectAssignable<Parameters<typeof web.slackLists.items.deleteMultiple>>([
  {
    list_id: 'F1234567890',
    ids: ['Fe1234567890', 'Fe0987654321'],
  },
]);

// slackLists.items.info
// -- sad path
expectError(web.slackLists.items.info()); // lacking argument
expectError(web.slackLists.items.info({})); // missing list_id and id
expectError(web.slackLists.items.info({ list_id: 'L1234567890' })); // missing id

// -- happy path
expectAssignable<Parameters<typeof web.slackLists.items.info>>([
  {
    list_id: 'L1234567890',
    id: 'I1234567890',
  },
]);

// slackLists.items.list
// -- sad path
expectError(web.slackLists.items.list()); // lacking argument
expectError(web.slackLists.items.list({})); // missing list_id

// -- happy path
expectAssignable<Parameters<typeof web.slackLists.items.list>>([
  {
    list_id: 'L1234567890',
  },
]);

// slackLists.items.update
// -- sad path
expectError(web.slackLists.items.update()); // lacking argument
expectError(web.slackLists.items.update({})); // missing list_id and cells
expectError(web.slackLists.items.update({ list_id: 'L1234567890' })); // missing cells

// -- happy path
expectAssignable<Parameters<typeof web.slackLists.items.update>>([
  {
    list_id: 'L1234567890',
    cells: [{ row_id: 'Rec014K005UQJ', column_id: 'Col014K005UQJ', user: ['U01284PCR98', 'U0137181B5H'] }],
  },
]);

// slackLists.update
// -- sad path
expectError(web.slackLists.update()); // lacking argument
expectError(web.slackLists.update({})); // missing id

// -- happy path
expectAssignable<Parameters<typeof web.slackLists.update>>([
  {
    id: 'L1234567890',
  },
]);
