import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// blocks.validate
// -- happy path
expectAssignable<Parameters<typeof web.blocks.validate>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.blocks.validate>>([]); // no arg is fine
expectAssignable<Parameters<typeof web.blocks.validate>>([
  { blocks: [{ type: 'section', text: { type: 'plain_text', text: 'Hello world' } }] },
]);
expectAssignable<Parameters<typeof web.blocks.validate>>([
  { message: { blocks: [{ type: 'section', text: { type: 'mrkdwn', text: 'Hello' } }] } },
]);
expectAssignable<Parameters<typeof web.blocks.validate>>([
  { view: { type: 'modal', title: { type: 'plain_text', text: 'Title' }, blocks: [] } },
]);
// -- sad path
expectError<Parameters<typeof web.blocks.validate>>([{ blocks: '[]' }]); // must be typed blocks, not a string
