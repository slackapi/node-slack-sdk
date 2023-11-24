import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// apps.connections.open
// -- sad path
expectError(web.apps.connections.open()); // lacking argument
// -- happy path
expectAssignable<Parameters<typeof web.apps.connections.open>>([{}]); // all optional args

// apps.event.authorizations.list
// -- sad path
expectError(web.apps.event.authorizations.list()); // lacking argument
expectError(web.apps.event.authorizations.list({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.apps.event.authorizations.list>>([{
  event_context: '12345',
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
