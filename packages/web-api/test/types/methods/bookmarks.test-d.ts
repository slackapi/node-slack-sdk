import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// bookmarks.add
// -- sad path
expectError(web.bookmarks.add()); // lacking argument
expectError(web.bookmarks.add({})); // empty argument
expectError(web.bookmarks.add({
  channel_id: 'C1234', // missing title, link, type
}));
expectError(web.bookmarks.add({
  type: 'link',
  channel_id: 'C1234', // missing title, link
}));
expectError(web.bookmarks.add({
  title: 'link',
  channel_id: 'C1234', // missing type, link
}));
expectError(web.bookmarks.add({
  link: 'url.com',
  channel_id: 'C1234', // missing type, channel_id
}));
expectError(web.bookmarks.add({
  type: 'link',
  channel_id: 'C1234', // missing link
  title: 'test',
}));
expectError(web.bookmarks.add({
  link: 'link',
  channel_id: 'C1234', // missing type
  title: 'test',
}));
expectError(web.bookmarks.add({
  link: 'link',
  channel_id: 'C1234', // missing title
  type: 'link',
}));
expectError(web.bookmarks.add({
  type: 'link', // missing channel_id, link, title
}));
expectError(web.bookmarks.add({
  type: 'link', // missing channel_id, link
  title: 'test',
}));
expectError(web.bookmarks.add({
  type: 'link', // missing channel_id, title
  link: 'url',
}));
expectError(web.bookmarks.add({
  link: 'link',
  title: 'test', // missing channel_id
  type: 'link',
}));
expectError(web.bookmarks.add({
  title: 'test', // missing channel_id, link, type
}));
expectError(web.bookmarks.add({
  title: 'test', // missing channel_id, type
  link: 'test.com',
}));
expectError(web.bookmarks.add({
  channel_id: 'C1234',
  title: 'test', // missing link
  type: 'link',
}));
expectError(web.bookmarks.add({
  link: 'test', // missing channel_id, title, type
}));
expectError(web.bookmarks.add({
  link: 'link',
  title: 'test', // missing channel
  type: 'link',
}));
// -- happy path
expectAssignable<Parameters<typeof web.bookmarks.add>>([{
  type: 'link',
  title: 'test',
  channel_id: 'C1234',
  link: 'example.com',
}]);

// bookmarks.edit
// -- sad path
expectError(web.bookmarks.edit()); // lacking argument
expectError(web.bookmarks.edit({})); // empty argument
expectError(web.bookmarks.edit({
  channel_id: 'C1234', // missing bookmark_id
}));
expectError(web.bookmarks.edit({
  bookmark_id: 'B1234', // missing channel_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.bookmarks.edit>>([{
  channel_id: 'C1234',
  bookmark_id: 'B1234',
}]);

// bookmarks.list
// -- sad path
expectError(web.bookmarks.list()); // lacking argument
expectError(web.bookmarks.list({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.bookmarks.list>>([{
  channel_id: 'C1234',
}]);

// bookmarks.remove
// -- sad path
expectError(web.bookmarks.remove()); // lacking argument
expectError(web.bookmarks.remove({})); // empty argument
expectError(web.bookmarks.remove({
  channel_id: 'C1234', // missing bookmark_id
}));
expectError(web.bookmarks.remove({
  bookmark_id: 'B1234', // missing channel_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.bookmarks.remove>>([{
  channel_id: 'C1234',
  bookmark_id: 'B1234',
}]);
