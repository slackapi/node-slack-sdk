import { expectAssignable, expectError } from 'tsd';
import { MessageAttachment } from '../src/index';

// -- sad path
expectError<MessageAttachment>({}); // if no blocks, either text or fallback is required.
expectError<MessageAttachment>({ fallback: 'hi', author_link: 'https://slack.com' }); // use of author_link requires author_name.
expectError<MessageAttachment>({ fallback: 'hi', author_icon: 'https://slack.com' }); // use of author_icon requires author_name.
expectError<MessageAttachment>({ fallback: 'hi', footer_icon: 'https://slack.com' }); // use of footer_icon requires footer.
expectError<MessageAttachment>({ fallback: 'hi', thumb_url: 'https://slack.com', image_url: 'https://slack.com' }); // cant use both image_url and thumb_url.
expectError<MessageAttachment>({ fallback: 'hi', callback_id: 'hollah' }); // cant use callback_id without actions.
expectError<MessageAttachment>({ fallback: 'hi', actions: [{ name: 'sup', text: 'sup', type: 'button'}] }); // cant use callback_id without actions.
expectError<MessageAttachment>({ fallback: 'hi', callback_id: 'hi', actions: [] }); // must specify at least one action.

// -- happy path
expectAssignable<MessageAttachment>({ text: 'hi' }); // if no blocks, either text or fallback is required.
expectAssignable<MessageAttachment>({ fallback: 'hi' }); // if no blocks, either text or fallback is required.
expectAssignable<MessageAttachment>({ fallback: 'hi', author_name: 'filmaj', author_icon: 'https://slack.com' }); // use of author_icon requires author_name.
expectAssignable<MessageAttachment>({ fallback: 'hi', author_name: 'filmaj', author_link: 'https://slack.com' }); // use of author_link requires author_name.
expectAssignable<MessageAttachment>({ fallback: 'hi', footer: 'filmaj', footer_icon: 'https://slack.com' }); // use of footer_icon requires footer.
