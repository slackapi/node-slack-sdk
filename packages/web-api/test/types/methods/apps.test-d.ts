import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// apps.connections.open
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.apps.connections.open>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.apps.connections.open>>([]); // no arg is fine

// apps.event.authorizations.list
// -- sad path
expectError(web.apps.event.authorizations.list()); // lacking argument
expectError(web.apps.event.authorizations.list({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.apps.event.authorizations.list>>([{
  event_context: '12345',
}]);

// apps.manifest.create
// -- sad path
expectError(web.apps.manifest.create()); // lacking argument
expectError(web.apps.manifest.create({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.apps.manifest.create>>([{
  manifest: {
    display_information: {
      name: 'Bare Minimum',
    },
  },
}]);

// apps.manifest.delete
// -- sad path
expectError(web.apps.manifest.delete()); // lacking argument
expectError(web.apps.manifest.delete({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.apps.manifest.delete>>([{
  app_id: 'A1234',
}]);

// apps.manifest.export
// -- sad path
expectError(web.apps.manifest.export()); // lacking argument
expectError(web.apps.manifest.export({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.apps.manifest.export>>([{
  app_id: 'A1234',
}]);

// apps.manifest.update
// -- sad path
expectError(web.apps.manifest.update()); // lacking argument
expectError(web.apps.manifest.update({})); // empty argument
expectError(web.apps.manifest.update({
  app_id: 'A1234', // missing manifest
}));
expectError(web.apps.manifest.update({
  manifest: { // missing app_id
    display_information: {
      name: 'Bare Minimum',
    },
  },
}));
// -- happy path
expectAssignable<Parameters<typeof web.apps.manifest.update>>([{
  app_id: 'A1234',
  manifest: {
    display_information: {
      name: 'Bare Minimum',
    },
  },
}]);

// apps.manifest.validate
// -- sad path
expectError(web.apps.manifest.validate()); // lacking argument
expectError(web.apps.manifest.validate({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.apps.manifest.validate>>([{
  manifest: {
    display_information: {
      name: 'Bare Minimum',
    },
  },
}]);

// apps.uninstall
// -- sad path
expectError(web.apps.uninstall()); // lacking argument
expectError(web.apps.uninstall({})); // empty argument
expectError(web.apps.uninstall({
  client_id: '1234.56', // missing client_secret
}));
expectError(web.apps.uninstall({
  client_secret: '1234.56', // missing client_id
}));
// -- happy path
expectAssignable<Parameters<typeof web.apps.uninstall>>([{
  client_id: '1234.56',
  client_secret: 'ABC123',
}]);
expectAssignable<Parameters<typeof web.apps.uninstall>>([{
  token: 'xoxb-example',
  client_id: '1234.56',
  client_secret: 'ABC123',
}]);
