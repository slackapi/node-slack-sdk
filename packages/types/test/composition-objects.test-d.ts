import { expectAssignable, expectError } from 'tsd';
import type { RawNumberElement, RawTextElement } from '../src/index';

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
