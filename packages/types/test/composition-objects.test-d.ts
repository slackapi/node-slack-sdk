import { expectAssignable, expectError } from 'tsd';
import type { MrkdwnOption, PlainTextOption, RawNumberElement, RawTextElement } from '../src/index';

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

// MrkdwnOption (checkboxes and radio buttons): description may be plain_text or mrkdwn
// -- happy path
expectAssignable<MrkdwnOption>({
  text: { type: 'mrkdwn', text: '*bold* option' },
  description: { type: 'plain_text', text: 'plain description' },
});
expectAssignable<MrkdwnOption>({
  text: { type: 'mrkdwn', text: '*bold* option' },
  description: { type: 'mrkdwn', text: '*bold* description' },
});

// PlainTextOption (overflow, select, multi-select): description must be plain_text only
// -- happy path
expectAssignable<PlainTextOption>({
  text: { type: 'plain_text', text: 'option' },
  description: { type: 'plain_text', text: 'plain description' },
});
// -- sad path
expectError<PlainTextOption>({
  text: { type: 'plain_text', text: 'option' },
  description: { type: 'mrkdwn', text: '*bold* description' },
});
