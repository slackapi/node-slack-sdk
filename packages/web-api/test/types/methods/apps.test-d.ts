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
      display_information: { name: 'Connector' },
      features: {
        user_connections: {
          // missing is_enabled
          auth_hosts: ['example.com'],
        },
      },
    },
  }),
);
expectError(
  web.apps.manifest.create({
    manifest: {
      display_information: { name: 'Connector' },
      features: {
        user_connections: {
          // missing auth_hosts
          is_enabled: true,
        },
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
// -- happy path: agent_view, optional scopes, agent events, and metadata subscriptions
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
      },
      oauth_config: {
        scopes: {
          bot: ['chat:write'],
          bot_optional: ['channels:history'],
          user_optional: ['search:read'],
        },
      },
      settings: {
        event_subscriptions: {
          bot_events: ['app_context_changed'],
          metadata_subscriptions: [{ app_id: 'A1234', event_type: 'my_metadata_event' }],
        },
      },
    },
  },
]);
// -- happy path: user_connections
expectAssignable<Parameters<typeof web.apps.manifest.create>>([
  {
    manifest: {
      display_information: { name: 'Connector' },
      features: {
        user_connections: {
          is_enabled: true,
          auth_hosts: ['example.com', 'auth.example.com'],
        },
      },
    },
  },
]);
expectAssignable<Parameters<typeof web.apps.manifest.create>>([
  {
    manifest: {
      display_information: { name: 'Connector' },
      features: {
        user_connections: {
          is_enabled: false,
          auth_hosts: ['example.com'],
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

// apps.user.connection.bulkUpdate
// -- sad path
expectError(web.apps.user.connection.bulkUpdate()); // lacking argument
expectError(web.apps.user.connection.bulkUpdate({})); // missing both connected_user_ids and disconnected_user_ids
// -- happy path
expectAssignable<Parameters<typeof web.apps.user.connection.bulkUpdate>>([
  {
    connected_user_ids: ['U1234'],
  },
]);
expectAssignable<Parameters<typeof web.apps.user.connection.bulkUpdate>>([
  {
    disconnected_user_ids: ['U5678'],
  },
]);
expectAssignable<Parameters<typeof web.apps.user.connection.bulkUpdate>>([
  {
    connected_user_ids: ['U1234'],
    disconnected_user_ids: ['U5678'],
  },
]);

// apps.user.connection.requestAuth
// -- sad path
expectError(web.apps.user.connection.requestAuth()); // lacking argument
expectError(web.apps.user.connection.requestAuth({})); // empty argument
expectError(
  web.apps.user.connection.requestAuth({
    primary_provider: { value: 'github', name: { type: 'plain_text', text: 'GitHub' }, is_connected: false }, // missing trigger_id or user_id
  }),
);
expectError(
  web.apps.user.connection.requestAuth({
    user_id: 'U1234', // missing primary_provider
  }),
);
expectError(
  web.apps.user.connection.requestAuth({
    user_id: 'U1234',
    primary_provider: { name: { type: 'plain_text', text: 'GitHub' }, is_connected: false }, // missing value
  }),
);
expectError(
  web.apps.user.connection.requestAuth({
    user_id: 'U1234',
    primary_provider: { value: 'github', is_connected: false }, // missing name
  }),
);
expectError(
  web.apps.user.connection.requestAuth({
    user_id: 'U1234',
    primary_provider: { value: 'github', name: { type: 'plain_text', text: 'GitHub' } }, // missing is_connected
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.apps.user.connection.requestAuth>>([
  {
    trigger_id: '1234567890.1234567890.abcdef0123456789',
    primary_provider: {
      value: 'github',
      name: { type: 'plain_text', text: 'GitHub' },
      is_connected: true,
      description: { type: 'plain_text', text: 'Link pull requests to conversations' },
      icon_url: 'https://example.com/icon.png',
      auth_url: 'https://example.com/oauth',
      disconnect_url: 'https://example.com/disconnect',
      connected_identity: { type: 'plain_text', text: 'octocat' },
      connected_context: { type: 'plain_text', text: 'Acme Inc.' },
      accessory: {
        type: 'overflow',
        action_id: 'provider-menu',
        options: [
          { text: { type: 'plain_text', text: 'Switch accounts' }, value: 'switch' },
          { text: { type: 'plain_text', text: 'Disconnect' }, value: 'disconnect' },
        ],
      },
    },
  },
]);
expectAssignable<Parameters<typeof web.apps.user.connection.requestAuth>>([
  {
    user_id: 'U1234',
    primary_provider: { value: 'github', name: { type: 'plain_text', text: 'GitHub' }, is_connected: false },
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
