import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// users.conversations
// -- sad path
expectError(web.users.conversations()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.users.conversations>>([{}]); // all args are optional

// users.deletePhoto
// -- sad path
expectError(web.users.deletePhoto()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.users.deletePhoto>>([{}]); // all args are optional

// users.getPresence
// -- sad path
expectError(web.users.getPresence()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.users.getPresence>>([{}]); // all args are optional

// users.identity
// -- sad path
expectError(web.users.identity()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.users.identity>>([{}]); // all args are optional

// users.info
// -- sad path
expectError(web.users.info()); // lacking argument
expectError(web.users.info({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.users.info>>([
  {
    user: 'U1234', // must specify a user
  },
]);

// users.list
// -- sad path
expectError(web.users.list()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.users.list>>([{}]); // all args are optional

// users.lookupByEmail
// -- sad path
expectError(web.users.lookupByEmail()); // lacking argument
expectError(web.users.lookupByEmail({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.users.lookupByEmail>>([
  {
    email: 'ceo@slack.com', // must specify an email
  },
]);

// users.setPhoto
// -- sad path
expectError(web.users.setPhoto()); // lacking argument
expectError(web.users.setPhoto({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.users.setPhoto>>([
  {
    image: Buffer.from([1]), // must specify an image
  },
]);

// users.setPresence
// -- sad path
expectError(web.users.setPresence()); // lacking argument
expectError(web.users.setPresence({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.users.setPresence>>([
  {
    presence: 'auto', // must specify presence
  },
]);

// users.profile.get
// -- sad path
expectError(web.users.profile.get()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.users.profile.get>>([{}]); // all args are optional

// users.profile.set
// -- sad path
expectError(web.users.profile.set()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.users.profile.set>>([{}]); // all args are optional
