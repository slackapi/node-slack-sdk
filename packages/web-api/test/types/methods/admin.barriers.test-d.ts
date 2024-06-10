import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.barriers.create
// -- sad path
expectError(web.admin.barriers.create()); // lacking argument
expectError(web.admin.barriers.create({})); // empty argument
expectError(web.admin.barriers.create({
  barriered_from_usergroup_ids: [], // missing primary_usergroup_id and restricted_subjects
}));
expectError(web.admin.barriers.create({
  primary_usergroup_id: '1234', // missing barriered_from_usergroup_ids and restricted_subjets
}));
expectError(web.admin.barriers.create({
  restricted_subjects: ['im', 'mpim', 'call'], // missing barriered_from_usergroup_ids and primary_usergroup_id
}));
expectError(web.admin.barriers.create({
  barriered_from_usergroup_ids: [], // missing restricted_subjects
  primary_usergroup_id: '1234',
}));
expectError(web.admin.barriers.create({
  barriered_from_usergroup_ids: [], // missing primary_usergroup_id
  restricted_subjects: ['im', 'mpim', 'call'],
}));
expectError(web.admin.barriers.create({
  primary_usergroup_id: '1234', // missing barriered_from_usergroup_ids
  restricted_subjects: ['im', 'mpim', 'call'],
}));
expectError(web.admin.barriers.create({
  barriered_from_usergroup_ids: [],
  primary_usergroup_id: '1234',
  restricted_subjects: ['im', 'mpim'], // must provide all three of im, mpim and call
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.barriers.create>>([{
  barriered_from_usergroup_ids: [],
  primary_usergroup_id: '1234',
  restricted_subjects: ['im', 'mpim', 'call'],
}]);

// admin.barriers.delete
// -- sad path
expectError(web.admin.barriers.delete()); // lacking argument
expectError(web.admin.barriers.delete({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.barriers.delete>>([{
  barrier_id: 'B1234',
}]);

// admin.barriers.list
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.admin.barriers.list>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.admin.barriers.list>>([]); // no arg is fine

// admin.barriers.update
// -- sad path
expectError(web.admin.barriers.update()); // lacking argument
expectError(web.admin.barriers.update({})); // empty argument
expectError(web.admin.barriers.update({
  barriered_from_usergroup_ids: [], // missing primary_usergroup_id and restricted_subjects and barrier_id
}));
expectError(web.admin.barriers.update({
  primary_usergroup_id: '1234', // missing barriered_from_usergroup_ids and restricted_subjets and barrier_id
}));
expectError(web.admin.barriers.update({
  restricted_subjects: ['im', 'mpim', 'call'], // missing barriered_from_usergroup_ids and primary_usergroup_id and barrier_id
}));
expectError(web.admin.barriers.update({
  barrier_id: 'B1234', // missing barriered_from_usergroup_ids, primary_usergroup_id and restricted_subjects
}));
expectError(web.admin.barriers.update({
  barriered_from_usergroup_ids: [], // missing restricted_subjects and barrier_id
  primary_usergroup_id: '1234',
}));
expectError(web.admin.barriers.update({
  barriered_from_usergroup_ids: [], // missing primary_usergroup_id and barrier_id
  restricted_subjects: ['im', 'mpim', 'call'],
}));
expectError(web.admin.barriers.update({
  barriered_from_usergroup_ids: [], // missing primary_usergroup_id and restructed_subjects
  barrier_id: 'B1234',
}));
expectError(web.admin.barriers.update({
  primary_usergroup_id: '1234', // missing barriered_from_usergroup_ids and barrier_id
  restricted_subjects: ['im', 'mpim', 'call'],
}));
expectError(web.admin.barriers.update({
  primary_usergroup_id: '1234', // missing barriered_from_usergroup_ids and restricted_subjects
  barrier_id: 'B1234',
}));
expectError(web.admin.barriers.update({
  restricted_subjects: ['im', 'mpim', 'call'],
  barrier_id: 'B1234', // missing barriered_from_usergroup_ids and primary_usergroup_id
}));
expectError(web.admin.barriers.update({
  barriered_from_usergroup_ids: [],
  primary_usergroup_id: '1234',
  restricted_subjects: ['im', 'mpim', 'call'], // missing barrier_id
}));
expectError(web.admin.barriers.update({
  barriered_from_usergroup_ids: [],
  primary_usergroup_id: '1234',
  barrier_id: 'B1234', // missing restricted_subjects
}));
expectError(web.admin.barriers.update({
  primary_usergroup_id: '1234',
  barrier_id: 'B1234',
  restricted_subjects: ['im', 'mpim', 'call'], // missing barriered_from_usergroup_ids
}));
expectError(web.admin.barriers.update({
  barriered_from_usergroup_ids: [],
  barrier_id: 'B1234',
  restricted_subjects: ['im', 'mpim', 'call'], // missing primary_usergroup_id
}));
expectError(web.admin.barriers.update({
  barrier_id: 'B1234',
  barriered_from_usergroup_ids: [],
  primary_usergroup_id: '1234',
  restricted_subjects: ['im', 'mpim'], // must provide all three of im, mpim and call
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.barriers.update>>([{
  barrier_id: 'B1234',
  barriered_from_usergroup_ids: [],
  primary_usergroup_id: '1234',
  restricted_subjects: ['im', 'mpim', 'call'],
}]);
