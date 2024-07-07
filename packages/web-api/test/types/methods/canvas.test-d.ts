import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// canvases.access.delete
// -- sad path
expectError(web.canvases.access.delete()); // lacking argument
expectError(web.canvases.access.delete({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.canvases.access.delete>>([{
  canvas_id: 'F1234',
}]);

// canvases.access.set
// -- sad path
expectError(web.canvases.access.set()); // lacking argument
expectError(web.canvases.access.set({})); // empty argument
expectError(web.canvases.access.set({
  canvas_id: 'F1234', // missing access_level
}));
expectError(web.canvases.access.set({
  access_level: 'read', // missing canvas_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.canvases.access.set>>([{
  canvas_id: 'F1234',
  access_level: 'write',
}]);

// canvases.create
// -- sad path
expectError(web.canvases.create({
  document_content: 'heyo', // invalid document_content
}));
expectError(web.canvases.create({
  document_content: { type: 'mrkdwn', markdown: 'hihi' }, // invalid document_content
}));
// -- happy path
expectAssignable<Parameters<typeof web.canvases.create>>([]); // no arg ok
expectAssignable<Parameters<typeof web.canvases.create>>([{}]); // all optional args

// canvases.sections.lookup
// -- sad path
expectError(web.canvases.sections.lookup()); // lacking argument
expectError(web.canvases.sections.lookup({})); // empty argument
expectError(web.canvases.sections.lookup({
  canvas_id: 'F1234', // missing criteria
}));
expectError(web.canvases.sections.lookup({
  criteria: { contains_text: 'hi' }, // missing canvas_id
}));
expectError(web.canvases.sections.lookup({
  canvas_id: 'F1234',
  criteria: {}, // empty criteria object
}));
expectError(web.canvases.sections.lookup({
  canvas_id: 'F1234',
  criteria: {
    section_types: [], // need at least one section type
  },
}));
// -- happy path
expectAssignable<Parameters<typeof web.canvases.sections.lookup>>([{
  canvas_id: 'F1234',
  criteria: { contains_text: 'hi' },
}]);
expectAssignable<Parameters<typeof web.canvases.sections.lookup>>([{
  canvas_id: 'F1234',
  criteria: { section_types: ['any_header'] },
}]);
expectAssignable<Parameters<typeof web.canvases.sections.lookup>>([{
  canvas_id: 'F1234',
  criteria: {
    section_types: ['any_header'],
    contains_text: 'list',
  },
}]);

// canvases.delete
// -- sad path
expectError(web.canvases.delete()); // lacking argument
expectError(web.canvases.delete({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.canvases.delete>>([{
  canvas_id: 'F1234',
}]);

// canvases.edit
// -- sad path
expectError(web.canvases.edit()); // lacking argument
expectError(web.canvases.edit({})); // empty argument
expectError(web.canvases.edit({
  canvas_id: 'F1234', // missing changes
}));
expectError(web.canvases.edit({
  changes: [{
    operation: 'delete',
    section_id: 'S1234',
  }], // missing canvas_id
}));
expectError(web.canvases.edit({
  changes: [], // minimum 1 change
  canvas_id: 'F1234',
}));
expectError(web.canvases.edit({
  changes: [{
    document_content: { type: 'markdown', markdown: 'hihi' }, // missing operation
  }],
  canvas_id: 'F1234',
}));
expectError(web.canvases.edit({
  changes: [{
    operation: 'insert_after',
    document_content: { type: 'markdown', markdown: 'hihi' }, // missing section_id for op: insert_after
  }],
  canvas_id: 'F1234',
}));
expectError(web.canvases.edit({
  changes: [{
    operation: 'insert_before',
    section_id: '1234', // missing document_content for op: insert_before
  }],
  canvas_id: 'F1234',
}));
expectError(web.canvases.edit({
  changes: [{
    operation: 'insert_at_end', // missing document_content for op: insert_at_end
  }],
  canvas_id: 'F1234',
}));
expectError(web.canvases.edit({
  changes: [{
    operation: 'replace', // missing document_content for op: replace
    section_id: '1234',
  }],
  canvas_id: 'F1234',
}));
expectError(web.canvases.edit({
  changes: [{
    operation: 'delete', // missing section_id for op: delete
  }],
  canvas_id: 'F1234',
}));
// -- happy path
expectAssignable<Parameters<typeof web.canvases.edit>>([{
  canvas_id: 'F1234',
  changes: [{
    operation: 'insert_after',
    document_content: { type: 'markdown', markdown: 'hihi' },
    section_id: '1234',
  }, {
    operation: 'insert_at_start',
    document_content: { type: 'markdown', markdown: 'hihi' },
  }, {
    operation: 'replace',
    document_content: { type: 'markdown', markdown: 'hihi' },
    section_id: '1234',
  }, {
    operation: 'delete',
    section_id: '1234',
  }],
}]);

// conversations.canvases.create
// -- sad path
expectError(web.conversations.canvases.create()); // lacking argument
expectError(web.conversations.canvases.create({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.conversations.canvases.create>>([{
  channel_id: 'C1234',
}]);
