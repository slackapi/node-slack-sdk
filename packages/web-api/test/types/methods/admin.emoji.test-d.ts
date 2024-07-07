import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// admin.emoji.add
// -- sad path
expectError(web.admin.emoji.add()); // lacking argument
expectError(web.admin.emoji.add({})); // empty argument
expectError(web.admin.emoji.add({
  name: 'facepalm', // missing url
}));
expectError(web.admin.emoji.add({
  url: 'facepalm', // missing name
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.emoji.add>>([{
  name: 'facepalm',
  url: 'http://example.com',
}]);

// admin.emoji.addAlias
// -- sad path
expectError(web.admin.emoji.addAlias()); // lacking argument
expectError(web.admin.emoji.addAlias({})); // empty argument
expectError(web.admin.emoji.addAlias({
  name: 'facepalm', // missing alias_for
}));
expectError(web.admin.emoji.addAlias({
  alias_for: 'facepalm', // missing name
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.emoji.addAlias>>([{
  name: 'facepalm',
  alias_for: 'fp',
}]);

// admin.emoji.list
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.admin.emoji.list>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.admin.emoji.list>>([]); // no arg is fine

// admin.emoji.remove
// -- sad path
expectError(web.admin.emoji.remove()); // lacking argument
expectError(web.admin.emoji.remove({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.admin.emoji.remove>>([{
  name: 'facepalm',
}]);

// admin.emoji.rename
// -- sad path
expectError(web.admin.emoji.rename()); // lacking argument
expectError(web.admin.emoji.rename({})); // empty argument
expectError(web.admin.emoji.rename({
  name: 'facepalm', // missing new_name
}));
expectError(web.admin.emoji.rename({
  new_name: 'facepalm', // missing name
}));
// -- happy path
expectAssignable<Parameters<typeof web.admin.emoji.rename>>([{
  name: 'facepalm',
  new_name: 'fp',
}]);
