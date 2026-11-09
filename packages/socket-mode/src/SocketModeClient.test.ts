import assert from 'node:assert/strict';
import { type AddressInfo, createServer, type Server, type Socket } from 'node:net';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { ConsoleLogger } from '@slack/logger';
import type { FetchFunction, WebClient } from '@slack/web-api';
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

  const CONNECTING = 0;
  const OPEN = 1;

  class FakeSlackWebSocket {
    static instances: FakeSlackWebSocket[] = [];
    readyState: number | undefined = CONNECTING;
    sent: string[] = [];
    disconnectCalls = 0;
    private client: { emit: (event: string, ...args: unknown[]) => boolean };
    constructor({ client }: { client: { emit: (event: string, ...args: unknown[]) => boolean } }) {
      this.client = client;
      FakeSlackWebSocket.instances.push(this);
    }
    connect() {}
    isActive() {
      return this.readyState === OPEN;
    }
    open() {
      this.readyState = OPEN;
      return this;
    }
    receive(message: Record<string, unknown>) {
      this.client.emit('ws_message', JSON.stringify(message), false, this);
    }
    hello() {
      this.receive({ type: 'hello' });
    }
    drop() {
      this.readyState = undefined;
      this.client.emit('close', this);
    }
    disconnect() {
      this.disconnectCalls += 1;
      this.drop();
    }
    send(data: string, cb: (err: Error | undefined) => void) {
      this.sent.push(data);
      cb(undefined);
    }
  }

  const sockets = FakeSlackWebSocket.instances;

  function createClient(options: { clientPingTimeout?: number; autoReconnectEnabled?: boolean } = {}) {
    sockets.length = 0;
    const ProxiedSocketModeClient: typeof SocketModeClient = proxyquire('./SocketModeClient', {
      './SlackWebSocket': { SlackWebSocket: FakeSlackWebSocket },
    }).SocketModeClient;
    const logger = new ConsoleLogger();
    const error = sandbox.stub(logger, 'error');
    sandbox.stub(logger, 'debug');
    const client = new ProxiedSocketModeClient({ appToken: 'xapp-', clientPingTimeout: 60_000, logger, ...options });
    const urls: Array<() => Promise<string>> = [];
    const fetches = sandbox
      .stub(client as unknown as { retrieveWSSURL: () => Promise<string> }, 'retrieveWSSURL')
      .callsFake(() => urls.shift()?.() ?? Promise.resolve('wss://fake'));
    const holdNextURL = () => {
      let release: () => void = () => {};
      const held = new Promise<string>((resolve) => (release = () => resolve('wss://fake')));
      urls.push(() => held);
      return () => release();
    };
    const failNextURL = (cause: Error) => {
      urls.push(() => Promise.reject(cause));
    };
    client.on('interactive', ({ ack }) => ack());
    return { client, error, fetches, holdNextURL, failNextURL };
  }

  async function connect(client: SocketModeClient) {
    const started = client.start();
    await sleep(0);
    sockets[sockets.length - 1].open().hello();
    await started;
    return sockets[sockets.length - 1];
  }
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

      client.emit('close', {} as SlackWebSocket);
      clock.tick(1_000_000);

      sinon.assert.notCalled(startStub);
    });

    it('should schedule at most one reconnect when multiple close events fire', async () => {
      const client = new SocketModeClient({ appToken: 'xapp-', logLevel: LogLevel.ERROR });
      const startStub = sandbox.stub(client, 'start').resolves(undefined as never);
      const clock = sandbox.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });

      client.emit('close', client.websocket);
      client.emit('close', client.websocket);
      await clock.tickAsync(1_000_000);

      sinon.assert.calledOnce(startStub);
    });
  });

  describe('reconnect failures (issue #2656)', () => {
    let unhandledRejection: sinon.SinonSpy;
    let neverUpgrades: Server;
    let heldSockets: Socket[];
    beforeEach(async () => {
      unhandledRejection = sandbox.spy();
      process.on('unhandledRejection', unhandledRejection);
      heldSockets = [];
      neverUpgrades = createServer((socket) => heldSockets.push(socket));
      await new Promise<void>((resolve) => neverUpgrades.listen(0, '127.0.0.1', resolve));
    });
    afterEach(async () => {
      process.off('unhandledRejection', unhandledRejection);
      for (const socket of heldSockets) socket.destroy();
      await new Promise((resolve) => neverUpgrades.close(resolve));
    });

    function clientWithLogger(clientPingTimeout = 1) {
      const logger = new ConsoleLogger();
      const error = sandbox.stub(logger, 'error');
      sandbox.stub(logger, 'debug');
      const client = new SocketModeClient({ appToken: 'xapp-', clientPingTimeout, logger });
      return { client, error };
    }

    function holdHandshake(client: SocketModeClient) {
      const { port } = neverUpgrades.address() as AddressInfo;
      sandbox
        .stub(client as unknown as { retrieveWSSURL: () => Promise<string> }, 'retrieveWSSURL')
        .resolves(`ws://127.0.0.1:${port}/`);
    }

    function failWSSURL(client: SocketModeClient) {
      const { webClient } = client as unknown as { webClient: WebClient };
      sandbox.stub(webClient.apps.connections, 'open').rejects(new Error('internal_error'));
    }

    function holdThenFailWSSURL(client: SocketModeClient) {
      const { webClient } = client as unknown as { webClient: WebClient };
      let rejectURL: (error: Error) => void = () => {};
      sandbox.stub(webClient.apps.connections, 'open').returns(new Promise((_resolve, reject) => (rejectURL = reject)));
      return (error: Error) => rejectURL(error);
    }

    function holdWSSURL(client: SocketModeClient) {
      let resolveURL: (url: string) => void = () => {};
      sandbox
        .stub(client as unknown as { retrieveWSSURL: () => Promise<string> }, 'retrieveWSSURL')
        .returns(new Promise((resolve) => (resolveURL = resolve)));
      return (url: string) => resolveURL(url);
    }

    it('should reject with the cause when a reconnect fails for good', async () => {
      const { client, failNextURL } = createClient({ clientPingTimeout: 1 });
      const old = await connect(client);
      const cause = new Error('invalid_auth');
      failNextURL(cause);
      const [onClose] = client.listeners('close');

      old.readyState = undefined;

      await assert.rejects(async () => onClose(old), cause);
    });

    it('should not open a connection when disconnect() wins the race with a reconnect', async () => {
      const { client, error } = clientWithLogger();
      const releaseURL = holdWSSURL(client);

      client.emit('close', client.websocket);
      await sleep(10);
      await client.disconnect();
      releaseURL('ws://127.0.0.1:1/');
      await sleep(10);

      assert.strictEqual(client.websocket, undefined);
      sinon.assert.notCalled(error);
      sinon.assert.notCalled(unhandledRejection);
    });

    it('should resolve disconnect() while a reconnect is waiting', { timeout: 2000 }, async () => {
      const { client } = clientWithLogger(60_000);
      const startStub = sandbox.stub(client, 'start');
      client.websocket = {
        isActive: () => false,
        disconnect: () => client.emit('close', client.websocket),
      } as unknown as SlackWebSocket;

      client.emit('close', client.websocket);
      await sleep(10);
      await client.disconnect();

      sinon.assert.notCalled(startStub);
      sinon.assert.notCalled(unhandledRejection);
    });

    it('should open one connection when disconnect() and start() run during the reconnect wait', async () => {
      const { client, fetches } = createClient({ clientPingTimeout: 20 });
      const old = await connect(client);

      old.drop();
      await client.disconnect();
      const restarted = client.start();
      await sleep(0);
      sockets[1].open().hello();
      await restarted;
      await sleep(50);

      assert.strictEqual(sockets.length, 2);
      sinon.assert.calledTwice(fetches);
    });

    it('should drop a reconnect URL that arrives after disconnect() and start()', async () => {
      const { client, holdNextURL } = createClient({ clientPingTimeout: 1 });
      const old = await connect(client);
      const releaseURL = holdNextURL();
      const disconnected = sandbox.spy();
      client.on('disconnected', disconnected);

      old.drop();
      await sleep(10);
      await client.disconnect();
      const restarted = client.start();
      await sleep(0);
      sockets[1].open().hello();
      await restarted;
      releaseURL();
      await sleep(10);

      assert.strictEqual(sockets.length, 2);
      assert.strictEqual(client.websocket, sockets[1]);
      sinon.assert.calledOnce(disconnected);
    });

    it('should not schedule a reconnect while start() is fetching its URL', async () => {
      const { client, holdNextURL } = createClient({ clientPingTimeout: 1 });
      const old = await connect(client);
      const releaseURL = holdNextURL();

      const restarted = client.start();
      old.drop();
      await sleep(10);
      releaseURL();
      await sleep(0);
      sockets[1].open().hello();
      await restarted;
      await sleep(10);

      assert.strictEqual(sockets.length, 2);
    });

    it('should reject start() when disconnect() is called while it is connecting', async () => {
      const { client } = clientWithLogger();
      const releaseURL = holdWSSURL(client);

      const starting = client.start();
      await client.disconnect();
      releaseURL('ws://127.0.0.1:1/');

      await assert.rejects(starting, { name: 'SMConnectAbortedError' });
      assert.strictEqual(client.websocket, undefined);
    });

    it('should reject start() when disconnect() is called during the WebSocket handshake', async () => {
      const { client } = clientWithLogger();
      holdHandshake(client);

      const starting = client.start();
      await sleep(10);
      await client.disconnect();

      await assert.rejects(starting, { name: 'SMConnectAbortedError' });
    });

    it('should stop a reconnect during the WebSocket handshake without an unhandled rejection', async () => {
      const { client } = clientWithLogger();
      holdHandshake(client);
      const disconnected = sandbox.spy();
      client.on('disconnected', disconnected);

      client.emit('close', client.websocket);
      await sleep(10);
      await client.disconnect();
      await sleep(10);

      sinon.assert.notCalled(unhandledRejection);
      sinon.assert.calledOnce(disconnected);
    });

    it('should reject start() when disconnect() is called while waiting to retry the WSS URL', async () => {
      const { client } = clientWithLogger(60_000);
      failWSSURL(client);

      const starting = client.start();
      await sleep(10);
      await client.disconnect();

      await assert.rejects(starting, { name: 'SMConnectAbortedError' });
    });

    it('should reject start() without waiting to retry when the WSS URL fails after disconnect()', async () => {
      const { client } = clientWithLogger(60_000);
      const failURL = holdThenFailWSSURL(client);

      const starting = client.start();
      await client.disconnect();
      failURL(new Error('internal_error'));

      await assert.rejects(starting, { name: 'SMConnectAbortedError' });
    });
  });

  describe('server-requested disconnect (issue #2767)', () => {
    const refreshRequested = { type: 'disconnect', reason: 'refresh_requested' };
    const envelope = { type: 'interactive', envelope_id: 'e-1', payload: {} };

    it('should open the replacement right away and close the old connection only once it says hello', async () => {
      const { client, error } = createClient();
      const old = await connect(client);
      const disconnected = sandbox.spy();
      client.on('disconnected', disconnected);

      old.receive(refreshRequested);
      await sleep(0);

      assert.strictEqual(sockets.length, 2, 'the replacement should open without waiting for a backoff');
      assert.strictEqual(old.disconnectCalls, 0);

      sockets[1].open().hello();
      await sleep(10);

      assert.strictEqual(old.disconnectCalls, 1);
      assert.strictEqual(client.websocket, sockets[1]);
      assert.strictEqual(sockets.length, 2, "the old connection's close must not trigger another reconnect");
      sinon.assert.notCalled(disconnected);
      sinon.assert.notCalled(error);
    });

    it('should keep acknowledging on the old connection until the replacement says hello', async () => {
      const { client } = createClient();
      const old = await connect(client);

      old.receive(refreshRequested);
      await sleep(0);
      old.receive(envelope);
      sockets[1].open();
      old.receive(envelope);
      await sleep(0);

      assert.strictEqual(old.sent.length, 2);
      assert.strictEqual(sockets[1].sent.length, 0);

      sockets[1].hello();
      sockets[1].receive(envelope);
      await sleep(0);

      assert.strictEqual(sockets[1].sent.length, 1);
    });

    it('should back off and keep the old connection serving when the replacement fails before hello', async () => {
      const { client } = createClient({ clientPingTimeout: 1 });
      const old = await connect(client);

      old.receive(refreshRequested);
      await sleep(0);
      sockets[1].drop();
      await sleep(10);

      assert.strictEqual(sockets.length, 3, 'the failed replacement should be retried with the usual backoff');
      assert.strictEqual(old.disconnectCalls, 0);
      old.receive(envelope);
      await sleep(0);
      assert.strictEqual(old.sent.length, 1);

      sockets[2].open().hello();
      await sleep(0);

      assert.strictEqual(old.disconnectCalls, 1);
      assert.strictEqual(client.websocket, sockets[2]);
    });

    it('should open only the replacement when the old connection closes while its URL is fetched', async () => {
      const { client, holdNextURL } = createClient({ clientPingTimeout: 1 });
      const old = await connect(client);
      const releaseURL = holdNextURL();
      const events = { connected: sandbox.spy(), reconnecting: sandbox.spy() };
      for (const [name, spy] of Object.entries(events)) client.on(name, spy);

      old.receive(refreshRequested);
      await sleep(0);
      old.drop();
      await sleep(10);
      releaseURL();
      await sleep(0);
      sockets[1].open().hello();
      await sleep(10);

      assert.deepStrictEqual(
        sockets.map((socket) => socket.isActive()),
        [false, true],
      );
      assert.strictEqual(client.websocket, sockets[1]);
      sinon.assert.calledOnce(events.connected);
      sinon.assert.calledOnce(events.reconnecting);
    });

    it('should converge on one connection when disconnect messages arrive back to back', async () => {
      const { client } = createClient();
      const old = await connect(client);

      old.receive({ type: 'disconnect', reason: 'warning' });
      old.receive(refreshRequested);
      await sleep(0);
      sockets[sockets.length - 1].open().hello();
      await sleep(10);

      assert.strictEqual(sockets.filter((socket) => socket.isActive()).length, 1);
      assert.strictEqual(client.websocket?.isActive(), true);
      assert.strictEqual(old.disconnectCalls, 1);
    });

    it('should keep the first replacement serving when a second disconnect arrives before its hello', async () => {
      const { client } = createClient();
      const old = await connect(client);

      old.receive({ type: 'disconnect', reason: 'warning' });
      await sleep(0);
      const first = sockets[1].open();
      old.receive(refreshRequested);
      await sleep(0);
      first.hello();
      first.receive(envelope);
      await sleep(0);

      assert.strictEqual(first.disconnectCalls, 0, "a replaced connection's hello must not close it");
      assert.strictEqual(first.sent.length, 1);

      sockets[2].open().hello();
      await sleep(10);

      assert.strictEqual(first.disconnectCalls, 1);
      assert.strictEqual(client.websocket, sockets[2]);
      assert.strictEqual(sockets.filter((socket) => socket.isActive()).length, 1);
    });

    it('should close both connections and emit disconnected once when disconnect() runs mid-refresh', async () => {
      const { client, error } = createClient();
      const old = await connect(client);
      const disconnected = sandbox.spy();
      client.on('disconnected', disconnected);

      old.receive(refreshRequested);
      await sleep(0);
      await client.disconnect();
      await sleep(10);

      assert.strictEqual(old.disconnectCalls, 1);
      assert.strictEqual(sockets[1].disconnectCalls, 1);
      sinon.assert.calledOnce(disconnected);
      sinon.assert.notCalled(error);
    });

    it('should close without reconnecting when auto-reconnect is disabled', async () => {
      const { client } = createClient({ autoReconnectEnabled: false });
      const old = await connect(client);
      const disconnected = sandbox.spy();
      client.on('disconnected', disconnected);

      old.receive(refreshRequested);
      await sleep(10);

      assert.strictEqual(old.disconnectCalls, 1);
      assert.strictEqual(sockets.length, 1);
      sinon.assert.calledOnce(disconnected);
    });

    it('should close the connection instead of opening a replacement when the link is disabled', async () => {
      const { client } = createClient();
      const old = await connect(client);

      old.receive({ type: 'disconnect', reason: 'link_disabled' });
      await sleep(0);

      assert.strictEqual(sockets.length, 1);
      assert.strictEqual(old.disconnectCalls, 1);
      await client.disconnect();
    });
  });
});

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
