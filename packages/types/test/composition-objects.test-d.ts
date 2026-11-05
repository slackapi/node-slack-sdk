import { expectAssignable, expectError } from 'tsd';
import type { ActionCellElement, RawNumberElement, RawTextElement } from '../src/index';

// ActionCellElement
// -- sad path
expectError<ActionCellElement>({}); // missing type and element
expectError<ActionCellElement>({ type: 'action_cell' }); // missing required element
expectError<ActionCellElement>({ type: 'action_cell', fallback: { type: 'raw_text', text: 'Open' } }); // missing required element
expectError<ActionCellElement>({
  type: 'action_cell',
  element: { type: 'button', text: { type: 'plain_text', text: 'Mark done' } },
  fallback: { type: 'rich_text', elements: [] },
}); // fallback must be raw_text or raw_number
// -- happy path
expectAssignable<ActionCellElement>({
  type: 'action_cell',
  element: {
    type: 'button',
    text: { type: 'plain_text', text: 'Mark done' },
    action_id: 'mark_done',
    value: 'task_123',
  },
  fallback: { type: 'raw_text', text: 'Open' },
});
expectAssignable<ActionCellElement>({
  type: 'action_cell',
  element: {
    type: 'button',
    text: { type: 'plain_text', text: 'Mark done' },
    action_id: 'mark_done',
    value: 'task_123',
  },
  fallback: { type: 'raw_number', value: 1, text: '1' },
});
expectAssignable<ActionCellElement>({
  type: 'action_cell',
  element: {
    type: 'button',
    text: { type: 'plain_text', text: 'Mark done' },
    action_id: 'mark_done',
    value: 'task_123',
  },
});

// RawNumberElement
// -- sad path
expectError<RawNumberElement>({}); // missing type, value, and text
expectError<RawNumberElement>({ type: 'raw_number' }); // missing required value and text
expectError<RawNumberElement>({ type: 'raw_number', value: 42 }); // missing required text
expectError<RawNumberElement>({ type: 'raw_number', text: '42' }); // missing required value
expectError<RawNumberElement>({ type: 'raw_number', value: '42', text: '42' }); // value must be a number
// -- happy path
expectAssignable<RawNumberElement>({ type: 'raw_number', value: 42, text: '42' });

// RawTextElement
// -- sad path
expectError<RawTextElement>({}); // missing type and text
expectError<RawTextElement>({ type: 'raw_text' }); // missing required text
// -- happy path
expectAssignable<RawTextElement>({ type: 'raw_text', text: 'Item' });
