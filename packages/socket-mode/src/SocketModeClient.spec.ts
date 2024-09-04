import { ConsoleLogger } from '@slack/logger';
import { assert } from 'chai';
import sinon from 'sinon';

import { SocketModeClient } from './SocketModeClient';
import logModule from './logger';

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
      assert.throw(() => {
        new SocketModeClient({ appToken: '' });
      }, 'provide an App-Level Token');
    });
    it('should allow overriding of logger', () => {
      new SocketModeClient({ appToken: 'xapp-', logger: new ConsoleLogger() });
      assert.isFalse(logFactory.called);
    });
    it('should create a default logger if none provided', () => {
      new SocketModeClient({ appToken: 'xapp-' });
      assert.isTrue(logFactory.called);
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
        client.emit('message', message, false /* isBinary */);
        await sleep(30);
        assert.isTrue(commandListenerCalled);
        assert.isTrue(slackEventListenerCalled);
      });

      it('should pass all the properties to slash_commands listeners', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        let passedEnvelopeId = '';
        client.on('slash_commands', async ({ envelope_id }) => {
          passedEnvelopeId = envelope_id;
        });
        client.emit('message', message, false /* isBinary */);
        await sleep(30);
        assert.equal(passedEnvelopeId, envelopeId);
      });
      it('should pass all the properties to slack_event listeners', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        let passedEnvelopeId = '';
        client.on('slack_event', async ({ envelope_id }) => {
          passedEnvelopeId = envelope_id;
        });
        client.emit('message', message, false /* isBinary */);
        await sleep(30);
        assert.equal(passedEnvelopeId, envelopeId);
      });
    });

    describe('events_api messages', () => {
      const envelopeId = 'cda4159a-72a5-4744-aba3-4d66eb52682b';
      const message = JSON.stringify({
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
        client.emit('message', message, false /* isBinary */);
        await sleep(30);
        assert.isFalse(otherListenerCalled);
        assert.isTrue(eventsApiListenerCalled);
        assert.isTrue(slackEventListenerCalled);
      });

      it('should pass all the properties to app_mention listeners', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        let passedEnvelopeId = '';
        client.on('app_mention', async ({ envelope_id }) => {
          passedEnvelopeId = envelope_id;
        });
        client.emit('message', message, false /* isBinary */);
        await sleep(30);
        assert.equal(passedEnvelopeId, envelopeId);
      });
      it('should pass all the properties to slack_event listeners', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        let passedEnvelopeId = '';
        client.on('slack_event', async ({ envelope_id }) => {
          passedEnvelopeId = envelope_id;
        });
        client.emit('message', message, false /* isBinary */);
        await sleep(30);
        assert.equal(passedEnvelopeId, envelopeId);
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
        client.emit('message', message, false /* isBinary */);
        await sleep(30);
        assert.isFalse(otherListenerCalled);
        assert.isTrue(interactiveListenerCalled);
        assert.isTrue(slackEventListenerCalled);
      });

      it('should pass all the properties to interactive listeners', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        let passedEnvelopeId = '';
        client.on('interactive', async ({ envelope_id }) => {
          passedEnvelopeId = envelope_id;
        });
        client.emit('message', message, false /* isBinary */);
        await sleep(30);
        assert.equal(passedEnvelopeId, envelopeId);
      });
      it('should pass all the properties to slack_event listeners', async () => {
        const client = new SocketModeClient({ appToken: 'xapp-' });
        let passedEnvelopeId = '';
        client.on('slack_event', async ({ envelope_id }) => {
          passedEnvelopeId = envelope_id;
        });
        client.emit('message', message, false /* isBinary */);
        await sleep(30);
        assert.equal(passedEnvelopeId, envelopeId);
      });
    });
  });
});

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
