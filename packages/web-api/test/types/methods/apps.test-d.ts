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
expectAssignable<Parameters<typeof web.apps.event.authorizations.list>>([
  {
    event_context: '12345',
  },
]);

// apps.manifest.create
// -- sad path
expectError(web.apps.manifest.create()); // lacking argument
expectError(web.apps.manifest.create({})); // empty argument
expectError(
  web.apps.manifest.create({
    manifest: {
      display_information: { name: 'Agent' },
      features: {
        // assistant_view requires assistant_description
        assistant_view: {},
      },
    },
  }),
);
expectError(
  web.apps.manifest.create({
    manifest: {
      display_information: { name: 'Agent' },
      features: {
        agent_view: {
          // a suggested prompt requires both title and message
          suggested_prompts: [{ title: 'Summarize' }],
        },
      },
    },
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.apps.manifest.create>>([
  {
    manifest: {
      display_information: {
        name: 'Bare Minimum',
      },
    },
  },
]);
// -- happy path: agent_view (all fields optional) and assistant_view
expectAssignable<Parameters<typeof web.apps.manifest.create>>([
  {
    manifest: {
      display_information: { name: 'Agent' },
      features: {
        agent_view: {
          agent_description: 'Helps you get things done',
          suggested_prompts: [{ title: 'Summarize', message: 'Summarize this channel' }],
          actions: [{ name: 'summarize', description: 'Summarize the current view' }],
        },
        assistant_view: {
          assistant_description: 'An AI assistant',
          suggested_prompts: [{ title: 'Help', message: 'What can you do?' }],
        },
      },
    },
  },
]);
// -- happy path: agent_view with no properties is valid (all optional)
expectAssignable<Parameters<typeof web.apps.manifest.create>>([
  {
    manifest: {
      display_information: { name: 'Agent' },
      features: { agent_view: {} },
    },
  },
]);
// -- happy path: recent agent events, optional scopes, and metadata subscriptions
expectAssignable<Parameters<typeof web.apps.manifest.create>>([
  {
    manifest: {
      display_information: { name: 'Agent' },
      oauth_config: {
        scopes: {
          bot: ['chat:write'],
          bot_optional: ['channels:history'],
          user_optional: ['search:read'],
        },
      },
      settings: {
        event_subscriptions: {
          bot_events: ['app_context_changed', 'assistant_thread_started', 'assistant_thread_context_changed'],
          metadata_subscriptions: [{ app_id: 'A1234', event_type: 'my_metadata_event' }],
        },
      },
    },
  },
]);

// apps.manifest.delete
// -- sad path
expectError(web.apps.manifest.delete()); // lacking argument
expectError(web.apps.manifest.delete({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.apps.manifest.delete>>([
  {
    app_id: 'A1234',
  },
]);

// apps.manifest.export
// -- sad path
expectError(web.apps.manifest.export()); // lacking argument
expectError(web.apps.manifest.export({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.apps.manifest.export>>([
  {
    app_id: 'A1234',
  },
]);

// apps.manifest.update
// -- sad path
expectError(web.apps.manifest.update()); // lacking argument
expectError(web.apps.manifest.update({})); // empty argument
expectError(
  web.apps.manifest.update({
    app_id: 'A1234', // missing manifest
  }),
);
expectError(
  web.apps.manifest.update({
    manifest: {
      // missing app_id
      display_information: {
        name: 'Bare Minimum',
      },
    },
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.apps.manifest.update>>([
  {
    app_id: 'A1234',
    manifest: {
      display_information: {
        name: 'Bare Minimum',
      },
    },
  },
]);

// apps.manifest.validate
// -- sad path
expectError(web.apps.manifest.validate()); // lacking argument
expectError(web.apps.manifest.validate({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.apps.manifest.validate>>([
  {
    manifest: {
      display_information: {
        name: 'Bare Minimum',
      },
    },
  },
]);

// apps.user.connection.update
// -- sad path
expectError(web.apps.user.connection.update()); // lacking argument
expectError(web.apps.user.connection.update({})); // empty argument
expectError(
  web.apps.user.connection.update({
    user_id: 'U1234', // missing status
  }),
);
expectError(
  web.apps.user.connection.update({
    status: 'connected', // missing user_id
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.apps.user.connection.update>>([
  {
    user_id: 'U1234',
    status: 'connected',
  },
]);
expectAssignable<Parameters<typeof web.apps.user.connection.update>>([
  {
    user_id: 'U1234',
    status: 'disconnected',
  },
]);

// apps.uninstall
// -- sad path
expectError(web.apps.uninstall()); // lacking argument
expectError(web.apps.uninstall({})); // empty argument
expectError(
  web.apps.uninstall({
    client_id: '1234.56', // missing client_secret
  }),
);
expectError(
  web.apps.uninstall({
    client_secret: '1234.56', // missing client_id
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.apps.uninstall>>([
  {
    client_id: '1234.56',
    client_secret: 'ABC123',
  },
]);
expectAssignable<Parameters<typeof web.apps.uninstall>>([
  {
    token: 'xoxb-example',
    client_id: '1234.56',
    client_secret: 'ABC123',
  },
]);
