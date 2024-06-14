import { expectAssignable, expectError } from 'tsd';
import { HomeView, ModalView, PlainTextElement } from '../src/index';

const plaintext: PlainTextElement = { type: 'plain_text', text: 'hi' };

// HomeView
// -- sad path
expectError<HomeView>({}); // missing type, blocks
expectError<HomeView>({ type: 'home' }); // missing blocks
expectError<HomeView>({ blocks: [] }); // missing type
// -- happy path
expectAssignable<HomeView>({ type: 'home', blocks: [] });

// ModalView
// -- sad path
expectError<ModalView>({}); // missing type, blocks, title
expectError<ModalView>({ type: 'modal' }); // missing blocks, title
expectError<ModalView>({ blocks: [] }); // missing type, title
expectError<ModalView>({ title: plaintext }); // missing type, blocks
expectError<ModalView>({ type: 'modal', blocks: [] }); // missing title
expectError<ModalView>({ blocks: [], title: plaintext }); // missing type
expectError<ModalView>({ title: plaintext, type: 'modal' }); // missing blocks
// -- happy path
expectAssignable<ModalView>({ type: 'modal', blocks: [], title: plaintext });
