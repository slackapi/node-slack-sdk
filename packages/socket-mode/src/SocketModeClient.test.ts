import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { ConsoleLogger } from '@slack/logger';
import type { FetchFunction } from '@slack/web-api';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import logModule, { LogLevel } from './logger';
import type { SlackWebSocket } from './SlackWebSocket';
import { SocketModeClient } from './SocketModeClient';
import type { SocketModeDispatcher } from './SocketModeOptions';

describe('SocketModeClient', () => {
  const sandbox = sinon.createSandbox();
  afterEach(() => {
    sandbox.restore();
  });
  describe('constructor', () => {
    let logFactory: sinon.SinonStub;
    beforeEach(() => {
      logFactory = sandbox.stub(logModule, 'getLogger').returns(new ConsoleLogger());
    });
    it('should throw if no app token provided', () => {
      assert.throws(() => {
        new SocketModeClient({ appToken: '' });
      }, /provide an App-Level Token/);
    });
    it('should allow overriding of logger', () => {
      new SocketModeClient({ appToken: 'xapp-', logger: new ConsoleLogger() });
      assert.strictEqual(logFactory.called, false);
    });
    it('should create a default logger if none provided', () => {
      new SocketModeClient({ appToken: 'xapp-' });
      assert.strictEqual(logFactory.called, true);
    });
    describe('dispatcher option', () => {
      let capturedWebClientOptions: Record<string, unknown>;
      let ProxiedSocketModeClient: typeof SocketModeClient;

      beforeEach(() => {
        capturedWebClientOptions = {};
        ProxiedSocketModeClient = proxyquire('./SocketModeClient', {
          '@slack/web-api': {
            WebClient: class {
              constructor(_token: string, options: Record<string, unknown>) {
                capturedWebClientOptions = options;
              }
            },
            addAppMetadata: () => {},
          },
        }).SocketModeClient;
      });

      it('should wrap dispatcher into fetch when no custom fetch is provided', () => {
        const fakeDispatcher: SocketModeDispatcher = { dispatch: () => true };
        new ProxiedSocketModeClient({ appToken: 'xapp-', dispatcher: fakeDispatcher });
        assert.strictEqual(typeof capturedWebClientOptions.fetch, 'function');
      });

      it('should not overwrite fetch when a custom fetch is provided', () => {
        const fakeDispatcher: SocketModeDispatcher = { dispatch: () => true };
        const customFetch: FetchFunction = async () => new Response();
        new ProxiedSocketModeClient({
          appToken: 'xapp-',
          dispatcher: fakeDispatcher,
          clientOptions: { fetch: customFetch },
        });
        assert.strictEqual(capturedWebClientOptions.fetch, customFetch);
      });

      it('should leave fetch undefined when no dispatcher is provided', () => {
        new ProxiedSocketModeClient({ appToken: 'xapp-' });
        assert.strictEqual(capturedWebClientOptions.fetch, undefined);
      });
    });
  });

  describe('start()', () => {
    it('should resolve once Connected state emitted');
    it('should reject once Disconnected state emitted');
  });
  describe('disconnect()', () => {
    it('should resolve immediately if not yet connected');
    it('should resolve once Disconnected state emitted');
  });

  describe('onWebSocketMessage', () => {
    // While this method is protected and cannot be invoked directly, emitting the 'message' event directly invokes it
    describe('slash_commands messages', () => {
      const envelopeId = '1d3c79ab-0ffb-41f3-a080-d19e85f53649';
      const message = JSON.stringify({
        envelope_id: envelopeId,
        payload: {
          token: 'verification-token',
          team_id: 'T111',
          team_domain: 'xxx',
          channel_id: 'C111',
          channel_name: 'random',
          user_id: 'U111',
          user_name: 'seratch',
          command: '/hello-socket-mode',
          text: '',
          api_app_id: 'A111',
          response_url: 'https://hooks.slack.com/commands/T111/111/xxx',
          trigger_id: '111.222.xxx',
        },
        type: 'slash_commands',
        accepts_response_payload: true,
      });

      it('should be sent to both slash_commands and slack_event listeners', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        let commandListenerCalled = false;
        client.on('slash_commands', async (args) => {
          commandListenerCalled = args.ack !== undefined && args.body !== undefined;
        });
        let slackEventListenerCalled = false;
        client.on('slack_event', async (args) => {
          slackEventListenerCalled =
            args.ack !== undefined &&
            args.body !== undefined &&
            args.type === 'slash_commands' &&
            args.retry_num === undefined &&
            args.retry_reason === undefined;
        });
        client.emit('ws_message', message, false /* isBinary */);
        await sleep(30);
        assert.strictEqual(commandListenerCalled, true);
        assert.strictEqual(slackEventListenerCalled, true);
      });

      it('should pass all the properties to slash_commands listeners', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        let passedEnvelopeId = '';
        client.on('slash_commands', async ({ envelope_id }) => {
          passedEnvelopeId = envelope_id;
        });
        client.emit('ws_message', message, false /* isBinary */);
        await sleep(30);
        assert.strictEqual(passedEnvelopeId, envelopeId);
      });
      it('should pass all the properties to slack_event listeners', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        let passedEnvelopeId = '';
        client.on('slack_event', async ({ envelope_id }) => {
          passedEnvelopeId = envelope_id;
        });
        client.emit('ws_message', message, false /* isBinary */);
        await sleep(30);
        assert.strictEqual(passedEnvelopeId, envelopeId);
      });
    });

    describe('events_api messages', () => {
      class TestSocketModeClient extends SocketModeClient {
        async receive(payload: unknown): Promise<void> {
          await this.onWebSocketMessage(JSON.stringify(payload), false);
        }
      }

      it('should dispatch the inner event of an event_callback', async () => {
        const client = new TestSocketModeClient({ appToken: 'xapp-' });
        const event = { type: 'app_mention', text: '<@U111>' };
        const body = { type: 'event_callback', event };
        const specific = sandbox.spy();
        const generic = sandbox.spy();
        const callback = sandbox.spy();
        client.on('app_mention', specific);
        client.on('event_callback', callback);
        client.on('slack_event', generic);

        await client.receive({ type: 'events_api', payload: body, envelope_id: 'inner-event' });

        sinon.assert.calledOnce(specific);
        sinon.assert.notCalled(callback);
        assert.deepEqual(specific.firstCall.args[0].body, body);
        assert.deepEqual(specific.firstCall.args[0].event, event);
        sinon.assert.calledOnce(generic);
        assert.deepEqual(generic.firstCall.args[0].body, body);
      });

      it('should dispatch app_rate_limited without an inner event', async () => {
        const client = new TestSocketModeClient({ appToken: 'xapp-' });
        const body = { type: 'app_rate_limited', team_id: 'T111', minute_rate_limited: 1610241741 };
        const specific = sandbox.spy();
        const generic = sandbox.spy();
        client.on('app_rate_limited', specific);
        client.on('slack_event', generic);

        await client.receive({
          type: 'events_api',
          payload: body,
          envelope_id: 'rate-limited',
          retry_attempt: 2,
          retry_reason: 'timeout',
          accepts_response_payload: false,
        });

        sinon.assert.calledOnce(specific);
        const args = specific.firstCall.args[0];
        assert.deepEqual(args.body, body);
        assert.strictEqual(args.event, args.body);
        assert.strictEqual(args.envelope_id, 'rate-limited');
        assert.strictEqual(args.retry_num, 2);
        assert.strictEqual(args.retry_reason, 'timeout');
        assert.strictEqual(args.accepts_response_payload, false);
        sinon.assert.calledOnce(generic);
        assert.deepEqual(generic.firstCall.args[0].body, body);
        assert.strictEqual(generic.firstCall.args[0].ack, args.ack);
      });

      it('should allow generic listeners to ACK malformed payloads without a valid event type', async () => {
        for (const body of [
          {},
          { event: null },
          { event: { type: 123 }, type: 456 },
          { event: { type: '' }, type: '' },
          null,
          undefined,
        ]) {
          const client = new TestSocketModeClient({ appToken: 'xapp-' });
          const send = sandbox
            .stub(client as unknown as { send: (id: string, response: unknown) => Promise<void> }, 'send')
            .resolves();
          const generic = sandbox.spy();
          const emit = sandbox.spy(client, 'emit');
          client.on('slack_event', generic);

          await client.receive({ type: 'events_api', payload: body, envelope_id: 'malformed' });

          sinon.assert.calledOnce(emit);
          sinon.assert.calledOnce(generic);
          const args = generic.firstCall.args[0];
          assert.strictEqual(args.type, 'events_api');
          assert.deepEqual(args.body, body);
          await args.ack({});
          sinon.assert.calledOnceWithExactly(send, 'malformed', {});
        }
      });

      it('should use the payload type when the inner event type is invalid', async () => {
        const client = new TestSocketModeClient({ appToken: 'xapp-' });
        const body = { type: 'app_rate_limited', event: { type: 123 } };
        const specific = sandbox.spy();
        client.on('app_rate_limited', specific);

        await client.receive({ type: 'events_api', payload: body, envelope_id: 'invalid-inner-event' });

        sinon.assert.calledOnce(specific);
        assert.deepEqual(specific.firstCall.args[0].event, body);
      });

      const envelopeId = 'cda4159a-72a5-4744-aba3-4d66eb52682b';
      const appMention = JSON.stringify({
        envelope_id: envelopeId,
        payload: {
          token: 'verification-token',
          team_id: 'T111',
          api_app_id: 'A111',
          event: {
            client_msg_id: 'f0582a78-72db-4feb-b2f3-1e47d66365c8',
            type: 'app_mention',
            text: '<@U111>',
            user: 'U222',
            ts: '1610241741.000200',
            team: 'T111',
            blocks: [
              {
                type: 'rich_text',
                block_id: 'Sesm',
                elements: [
                  {
                    type: 'rich_text_section',
                    elements: [
                      {
                        type: 'user',
                        user_id: 'U111',
                      },
                    ],
                  },
                ],
              },
            ],
            channel: 'C111',
            event_ts: '1610241741.000200',
          },
          type: 'event_callback',
          event_id: 'Ev111',
          event_time: 1610241741,
          authorizations: [
            {
              enterprise_id: null,
              team_id: 'T111',
              user_id: 'U222',
              is_bot: true,
              is_enterprise_install: false,
            },
          ],
          is_ext_shared_channel: false,
          event_context: '1-app_mention-T111-C111',
        },
        type: 'events_api',
        accepts_response_payload: false,
        retry_attempt: 2,
        retry_reason: 'timeout',
      });
      const message = JSON.stringify({
        envelope_id: envelopeId,
        payload: {
          token: 'verification-token',
          team_id: 'T111',
          api_app_id: 'A111',
          event: {
            client_msg_id: 'f0582a78-72db-4feb-b2f3-1e47d66365c8',
            type: 'message',
            text: '<@U111>',
            user: 'U222',
            ts: '1610241741.000200',
            team: 'T111',
            blocks: [
              {
                type: 'rich_text',
                block_id: 'Sesm',
                elements: [
                  {
                    type: 'rich_text_section',
                    elements: [
                      {
                        type: 'user',
                        user_id: 'U111',
                      },
                    ],
                  },
                ],
              },
            ],
            channel: 'C111',
            event_ts: '1610241741.000200',
          },
          type: 'event_callback',
          event_id: 'Ev111',
          event_time: 1610241741,
          authorizations: [
            {
              enterprise_id: null,
              team_id: 'T111',
              user_id: 'U222',
              is_bot: true,
              is_enterprise_install: false,
            },
          ],
          is_ext_shared_channel: false,
          event_context: '1-app_mention-T111-C111',
        },
        type: 'events_api',
        accepts_response_payload: false,
        retry_attempt: 2,
        retry_reason: 'timeout',
      });

      it('should be sent to the specific and generic event listeners, and should not trip an unrelated event listener', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        let otherListenerCalled = false;
        client.on('app_home_opened', async () => {
          otherListenerCalled = true;
        });
        let eventsApiListenerCalled = false;
        client.on('app_mention', async (args) => {
          eventsApiListenerCalled =
            args.ack !== undefined &&
            args.body !== undefined &&
            args.retry_num === 2 &&
            args.retry_reason === 'timeout';
        });
        let slackEventListenerCalled = false;
        client.on('slack_event', async (args) => {
          slackEventListenerCalled =
            args.ack !== undefined &&
            args.body !== undefined &&
            args.retry_num === 2 &&
            args.retry_reason === 'timeout';
        });
        client.emit('ws_message', appMention, false /* isBinary */);
        await sleep(30);
        assert.strictEqual(otherListenerCalled, false);
        assert.strictEqual(eventsApiListenerCalled, true);
        assert.strictEqual(slackEventListenerCalled, true);
      });

      it('should pass all the properties to app_mention listeners', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        let passedEnvelopeId = '';
        client.on('app_mention', async ({ envelope_id }) => {
          passedEnvelopeId = envelope_id;
        });
        client.emit('ws_message', appMention, false /* isBinary */);
        await sleep(30);
        assert.strictEqual(passedEnvelopeId, envelopeId);
      });
      it('should pass all the properties to slack_event listeners', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        let passedEnvelopeId = '';
        client.on('slack_event', async ({ envelope_id }) => {
          passedEnvelopeId = envelope_id;
        });
        client.emit('ws_message', appMention, false /* isBinary */);
        await sleep(30);
        assert.strictEqual(passedEnvelopeId, envelopeId);
      });
      it('should process message events once', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        const spy = sinon.spy();
        client.on('message', spy);
        client.emit('ws_message', message, false /* isBinary */);
        sinon.assert.callCount(spy, 1);
      });
    });

    describe('interactivity messages', () => {
      const envelopeId = '57d6a792-4d35-4d0b-b6aa-3361493e1caf';
      const message = JSON.stringify({
        envelope_id: envelopeId,
        payload: {
          type: 'shortcut',
          token: 'verification-token',
          action_ts: '1610198080.300836',
          team: {
            id: 'T111',
            domain: 'seratch',
          },
          user: {
            id: 'U111',
            username: 'seratch',
            team_id: 'T111',
          },
          is_enterprise_install: false,
          enterprise: null,
          callback_id: 'do-something',
          trigger_id: '111.222.xxx',
        },
        type: 'interactive',
        accepts_response_payload: false,
      });

      it('should be sent to the specific and generic event type listeners, and should not trip an unrelated event listener', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        let otherListenerCalled = false;
        client.on('slash_commands', async () => {
          otherListenerCalled = true;
        });
        let interactiveListenerCalled = false;
        client.on('interactive', async (args) => {
          interactiveListenerCalled = args.ack !== undefined && args.body !== undefined;
        });
        let slackEventListenerCalled = false;
        client.on('slack_event', async (args) => {
          slackEventListenerCalled = args.ack !== undefined && args.body !== undefined;
        });
        client.emit('ws_message', message, false /* isBinary */);
        await sleep(30);
        assert.strictEqual(otherListenerCalled, false);
        assert.strictEqual(interactiveListenerCalled, true);
        assert.strictEqual(slackEventListenerCalled, true);
      });

      it('should pass all the properties to interactive listeners', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        let passedEnvelopeId = '';
        client.on('interactive', async ({ envelope_id }) => {
          passedEnvelopeId = envelope_id;
        });
        client.emit('ws_message', message, false /* isBinary */);
        await sleep(30);
        assert.strictEqual(passedEnvelopeId, envelopeId);
      });
      it('should pass all the properties to slack_event listeners', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        let passedEnvelopeId = '';
        client.on('slack_event', async ({ envelope_id }) => {
          passedEnvelopeId = envelope_id;
        });
        client.emit('ws_message', message, false /* isBinary */);
        await sleep(30);
        assert.strictEqual(passedEnvelopeId, envelopeId);
      });
    });
  });

  describe("reconnection on 'close' (issue #2709)", () => {
    it('should not reconnect on a stale close event while the current connection is still active', () => {
      const client = new SocketModeClient({ appToken: 'xapp-', logLevel: LogLevel.ERROR });
      client.websocket = { isActive: () => true } as unknown as SlackWebSocket;
      const startStub = sandbox.stub(client, 'start').resolves(undefined as never);
      const clock = sandbox.useFakeTimers();

      client.emit('close');
      clock.tick(1_000_000);

      sinon.assert.notCalled(startStub);
    });

    it('should schedule at most one reconnect when multiple close events fire', () => {
      const client = new SocketModeClient({ appToken: 'xapp-', logLevel: LogLevel.ERROR });
      const startStub = sandbox.stub(client, 'start').resolves(undefined as never);
      const clock = sandbox.useFakeTimers();

      client.emit('close');
      client.emit('close');
      clock.tick(1_000_000);

      sinon.assert.calledOnce(startStub);
    });
  });
});

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
