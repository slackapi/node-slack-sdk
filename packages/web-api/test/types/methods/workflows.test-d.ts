import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// workflows.featured.add
// -- sad path
expectError(web.workflows.featured.add()); // lacking argument
expectError(web.workflows.featured.add({})); // empty argument
expectError(
  web.workflows.featured.add({
    channel_id: 'C1234', // missing trigger_ids
  }),
);
expectError(
  web.workflows.featured.add({
    trigger_ids: [], // missing channel_id
  }),
);
expectError(
  web.workflows.featured.add({
    channel_id: 'C1234',
    trigger_ids: 'Ft1234', // not an array
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.workflows.featured.add>>([
  {
    channel_id: 'C1234',
    trigger_ids: [],
  },
]);
expectAssignable<Parameters<typeof web.workflows.featured.add>>([
  {
    channel_id: 'C1234',
    trigger_ids: ['Ft1234', 'Ft0001'],
  },
]);

// workflows.featured.list
// -- sad path
expectError(web.workflows.featured.list()); // lacking argument
expectError(web.workflows.featured.list({})); // empty argument
expectError(
  web.workflows.featured.list({
    channel_ids: 'C1234', // not an array
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.workflows.featured.list>>([
  {
    channel_ids: [],
  },
]);
expectAssignable<Parameters<typeof web.workflows.featured.list>>([
  {
    channel_ids: ['C1234', 'C0001'],
  },
]);

// workflows.featured.remove
// -- sad path
expectError(web.workflows.featured.remove()); // lacking argument
expectError(web.workflows.featured.remove({})); // empty argument
expectError(
  web.workflows.featured.remove({
    channel_id: 'C1234', // missing trigger_ids
  }),
);
expectError(
  web.workflows.featured.remove({
    trigger_ids: [], // missing channel_id
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.workflows.featured.remove>>([
  {
    channel_id: 'C1234',
    trigger_ids: [],
  },
]);
expectAssignable<Parameters<typeof web.workflows.featured.remove>>([
  {
    channel_id: 'C1234',
    trigger_ids: ['Ft1234', 'Ft0001'],
  },
]);

// workflows.featured.set
// -- sad path
expectError(web.workflows.featured.set()); // lacking argument
expectError(web.workflows.featured.set({})); // empty argument
expectError(web.workflows.featured.set({
  channel_id: 'C1234', // missing trigger_ids
}));
expectError(web.workflows.featured.set({
  trigger_ids: [], // missing channel_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.workflows.featured.set>>([{
  channel_id: 'C1234',
  trigger_ids: [],
}]);
expectAssignable<Parameters<typeof web.workflows.featured.set>>([{
  channel_id: 'C1234',
  trigger_ids: ['Ft1234', 'Ft0001'],
}]);
