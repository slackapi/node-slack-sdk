import { EventEmitter } from 'eventemitter3';
import WebSocket from 'ws';
import Finity, { Context, StateMachine, Configuration } from 'finity';
import {
  WebClient,
  AppsConnectionsOpenResponse,
  WebAPICallError,
  ErrorCode as APICallErrorCode,
  addAppMetadata,
  WebClientOptions,
} from '@slack/web-api';
import { LogLevel, Logger, getLogger } from './logger';
import {
  websocketErrorWithOriginal,
  sendWhileDisconnectedError,
  sendWhileNotReadyError,
} from './errors';
import { UnrecoverableSocketModeStartError } from './UnrecoverableSocketModeStartError';
import { SocketModeOptions } from './SocketModeOptions';

const packageJson = require('../package.json'); // eslint-disable-line import/no-commonjs, @typescript-eslint/no-var-requires

/**
 * An Socket Mode Client allows programs to communicate with the
 * [Slack Platform's Events API](https://api.slack.com/events-api) over a websocket.
 * This object uses the EventEmitter pattern to dispatch incoming events and has a built in send method to
 * acknowledge incoming events over the websocket.
 */
export class SocketModeClient extends EventEmitter {
  /**
   * Whether or not the client is currently connected to the web socket
   */
  public connected: boolean = false;

  /**
   * Whether or not the client has authenticated to the Socket Mode API. This occurs when the connect method
   * completes, and a WebSocket URL is available for the client's connection.
   */
  public authenticated: boolean = false;

  /**
   * Returns true if the underlying WebSocket connection is active.
   */
  public isActive(): boolean {
    this.logger.debug(`Details of isActive() response (connected: ${this.connected}, authenticated: ${this.authenticated}, badConnection: ${this.badConnection})`);
    return this.connected && this.authenticated && !this.badConnection;
  }

  /**
   * The client's websockets
   */
  public websocket?: WebSocket;

  public constructor({
    logger = undefined,
    logLevel = undefined,
    autoReconnectEnabled = true,
    pingPongLoggingEnabled = false,
    clientPingTimeout = 5000,
    serverPingTimeout = 30000,
    appToken = undefined,
    clientOptions = {},
  }: SocketModeOptions = {}) {
    super();
    if (appToken === undefined) {
      throw new Error('Must provide an App-Level Token when initializing a Socket Mode Client');
    }
    this.pingPongLoggingEnabled = pingPongLoggingEnabled;
    this.clientPingTimeoutMillis = clientPingTimeout;
    this.lastPongReceivedTimestamp = undefined;
    this.serverPingTimeoutMillis = serverPingTimeout;
    // Setup the logger
    if (typeof logger !== 'undefined') {
      this.logger = logger;
      if (typeof logLevel !== 'undefined') {
        this.logger.debug('The logLevel given to Socket Mode was ignored as you also gave logger');
      }
    } else {
      this.logger = getLogger(SocketModeClient.loggerName, logLevel ?? LogLevel.INFO, logger);
    }
    this.clientOptions = clientOptions;
    this.webClient = new WebClient('', {
      logger,
      logLevel: this.logger.getLevel(),
      headers: { Authorization: `Bearer ${appToken}` },
      ...clientOptions,
    });
    this.autoReconnectEnabled = autoReconnectEnabled;
    this.stateMachine = Finity.start(this.stateMachineConfig);
    this.logger.debug('The Socket Mode client is successfully initialized');
  }

  /**
   * Begin an Socket Mode session.
   * This method must be called before any messages can be sent or received.
   */
  public start(): Promise<AppsConnectionsOpenResponse> {
    this.logger.debug('Starting a Socket Mode client');
    // Delegate behavior to state machine
    this.stateMachine.handle('start');
    // Return a promise that resolves with the connection information
    return new Promise((resolve, reject) => {
      this.once('authenticated', (result) => {
        this.removeListener('disconnected', reject);
        resolve(result);
      });
      this.once('disconnected', (err) => {
        this.removeListener('authenticated', resolve);
        reject(err);
      });
    });
  }

  /**
   * End a Socket Mode session. After this method is called no messages will be sent or received
   * unless you call start() again later.
   */
  public disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.logger.debug('Manually disconnecting this Socket Mode client');
      // Resolve (or reject) on disconnect
      this.once('disconnected', (err) => {
        if (err instanceof Error) {
          reject(err);
        } else {
          resolve();
        }
      });
      // Delegate behavior to state machine
      this.stateMachine.handle('explicit disconnect');
    });
  }

  // --------------------------------------------
  // Private methods / properties
  // --------------------------------------------

  /**
   * State machine that backs the transition and action behavior
   */
  private stateMachine: StateMachine<string, string>;

  /* eslint-disable @typescript-eslint/indent, newline-per-chained-call */

  private connectingSubmachine: Configuration<string, string> = Finity.configure()
    .global()
      .onStateEnter((state) => {
        this.logger.debug(`Transitioning to state: connecting:${state}`);
      })
    .initialState('authenticating')
      .do(this.retrieveWSSURL.bind(this))
        .onSuccess().transitionTo('authenticated')
        .onFailure()
          .transitionTo('reconnecting').withCondition(this.reconnectingCondition.bind(this))
          .transitionTo('failed')
    .state('authenticated')
      .onEnter(this.configureAuthenticatedWebSocket.bind(this))
      .on('websocket open').transitionTo('handshaking')
    .state('handshaking') // a state in which to wait until the 'server hello' event
    .state('failed')
      .onEnter(this.handleConnectionFailure.bind(this))
  .getConfig();

  private refreshingSubmachine: Configuration<string, string> = Finity.configure()
    .global()
      .onStateEnter((state) => {
        this.logger.debug(`Transitioning to state: refreshing-connection:${state}`);
      })
    .initialState('authenticating')
      .do(this.retrieveWSSURL.bind(this))
        .onSuccess().transitionTo('authenticated')
        .onFailure()
          .transitionTo('reconnecting').withCondition(this.reconnectingCondition.bind(this))
          .transitionTo('failed')
    .state('authenticated')
      .onEnter(this.configureAuthenticatedWebSocket.bind(this))
      .on('websocket open').transitionTo('handshaking')
    .state('handshaking') // a state in which to wait until the 'server hello' event
    .state('failed')
      .onEnter(this.handleConnectionFailure.bind(this))
  .getConfig();

  private connectedSubmachine: Configuration<string, string> = Finity.configure()
    .global()
      .onStateEnter((state) => {
        this.logger.debug(`Transitioning to state: connected:${state}`);
      })
    .initialState('ready')
      .onEnter(() => {
        if (this.badConnection) {
          // arrived here because `server ping timeout` occurred and a new connection was created
          // tear down old connection
          this.tearDownWebSocket();
          this.badConnection = false;
        }
        // Start heartbeat to keep track of the websocket connection continuing to be alive
        this.startPeriodicallySendingPingToSlack();
        this.startMonitoringPingFromSlack();
        // the transition isn't done yet, so we delay the following statement until after the event loop returns
        setImmediate(() => {
          this.emit('ready');
        });
      })
      .on('server disconnect warning')
        .transitionTo('refreshing-connection').withCondition(() => this.autoReconnectEnabled)
      .on('server pings not received')
        .transitionTo('refreshing-connection').withCondition(() => this.autoReconnectEnabled)
      .on('server disconnect old socket')
        .transitionTo('closing-socket')
    .state('refreshing-connection')
      .submachine(this.refreshingSubmachine)
      .on('server hello').transitionTo('ready')
      .on('websocket close')
        .transitionTo('authenticating').withCondition(() => this.autoReconnectEnabled)
        .transitionTo('disconnected').withAction(this.handleDisconnection.bind(this))
      .on('failure').transitionTo('disconnected')
      .on('explicit disconnect').transitionTo('disconnecting')
    .state('closing-socket')
      .do(async () => {
        if (this.serverPingTimeout !== undefined) {
          clearTimeout(this.serverPingTimeout);
        }
        return true;
      })
      .onSuccess().transitionTo('ready')
      .onExit(() => this.tearDownWebSocket())
  .getConfig();

  /**
   * Configuration for the state machine
   */
  private stateMachineConfig: Configuration<string, string> = Finity.configure()
    .global()
      .onStateEnter((state, context) => {
        this.logger.debug(`Transitioning to state: ${state}`);
        if (state === 'disconnected') {
          // Emits a `disconnected` event with a possible error object (might be undefined)
          this.emit(state, context.eventPayload);
        } else {
          // Emits events: `connecting`, `connected`, `disconnecting`, `reconnecting`
          this.emit(state);
        }
      })
    .initialState('disconnected')
      .on('start').transitionTo('connecting')
    .state('connecting')
      .submachine(this.connectingSubmachine)
      .on('server hello')
        .transitionTo('connected')
      .on('websocket close')
        .transitionTo('reconnecting').withCondition(() => this.autoReconnectEnabled)
        .transitionTo('disconnected').withAction(() => {
          // this transition circumvents the 'disconnecting' state (since the websocket is already closed), so we need
          // to execute its onExit behavior here.
          this.tearDownWebSocket();
        })
      .on('failure')
        .transitionTo('disconnected')
      .on('explicit disconnect')
        .transitionTo('disconnecting')
    .state('connected')
      .submachine(this.connectedSubmachine)
      .onEnter(() => {
        this.connected = true;
      })
      .on('server disconnect warning')
        .transitionTo('refreshing-connection').withCondition(() => this.autoReconnectEnabled)
      .on('websocket close')
        .transitionTo('reconnecting').withCondition(() => this.autoReconnectEnabled)
        .transitionTo('disconnected').withAction(() => {
          // this transition circumvents the 'disconnecting' state (since the websocket is already closed), so we need
          // to execute its onExit behavior here.
          this.tearDownWebSocket();
        })
      .on('explicit disconnect')
        .transitionTo('disconnecting')
      .onExit(() => {
        this.connected = false;
        this.authenticated = false;
        if (this.serverPingTimeout !== undefined) {
          clearTimeout(this.serverPingTimeout);
        }
      })
    .state('disconnecting')
      .onEnter(() => {
        // Most of the time, a websocket will exist.
        // The only time it does not is when transitioning from connecting,
        // before the client.start() has finished and the websocket hasn't been set up.
        if (this.websocket !== undefined) {
          this.websocket.close();
        }
      })
      .on('websocket close')
        .transitionTo('disconnected')
      .onExit(() => this.tearDownWebSocket())
    // Reconnecting is just like disconnecting,
    // except that the websocket should already be closed
    // before we enter this state, and that the next state should be connecting.
    .state('reconnecting')
      .do(async () => {
        if (this.serverPingTimeout !== undefined) {
          clearTimeout(this.serverPingTimeout);
        }
        return true;
      })
      .onSuccess().transitionTo('connecting')
      .onExit(() => this.tearDownWebSocket())
  .getConfig();

  /* eslint-enable @typescript-eslint/indent, newline-per-chained-call */

  /**
   * Whether this client will automatically reconnect when (not manually) disconnected
   */
  private autoReconnectEnabled: boolean;

  private secondaryWebsocket?: WebSocket;

  private webClient: WebClient;

  /**
   * The name used to prefix all logging generated from this object
   */
  private static loggerName = 'SocketModeClient';

  /**
   * This object's logger instance
   */
  private logger: Logger;

  /**
   * Enables ping-pong detailed logging if true
   */
  private pingPongLoggingEnabled: boolean;

  /**
   * How long to wait for pings from server before timing out
   */
  private serverPingTimeoutMillis: number;

  /**
   * Reference to the timeout timer we use to listen to pings from the server
   */
  private serverPingTimeout: NodeJS.Timeout | undefined;

  /**
   * How long to wait for pings from server before timing out
  */
  private clientPingTimeoutMillis: number;

  /**
   * Reference to the timeout timer we use to listen to pongs from the server
   */
  private clientPingTimeout: NodeJS.Timeout | undefined;

  /**
   * The last timetamp that this WebSocket client received pong from the server
   */
  private lastPongReceivedTimestamp: number | undefined;

  /**
   * Used to see if a websocket stops sending heartbeats and is deemed bad
   */
  private badConnection: boolean = false;

  /**
   * WebClient options we pass to our WebClient instance
   * We also reuse agent and tls for our websocket connection
   */
  private clientOptions: WebClientOptions;

  /**
   * Method for sending an outgoing message of an arbitrary type over the websocket connection.
   * Primarily used to send acknowledgements back to slack for incoming events
   * @param id the envelope id
   * @param body the message body or string text
   */
  private send(id: string, body = {}): Promise<void> {
    const _body = typeof body === 'string' ? { text: body } : body;
    const message = { envelope_id: id, payload: { ..._body } };

    return new Promise((resolve, reject) => {
      this.logger.debug(`send() method was called in state: ${this.stateMachine.getStateHierarchy()}`);
      if (this.websocket === undefined) {
        this.logger.error('Failed to send a message as the client is not connected');
        reject(sendWhileDisconnectedError());
      } else if (!this.isConnectionReady()) {
        this.logger.error('Failed to send a message as the client is not ready');
        reject(sendWhileNotReadyError());
      } else {
        this.emit('outgoing_message', message);

        const flatMessage = JSON.stringify(message);
        this.logger.debug(`Sending a WebSocket message: ${flatMessage}`);
        this.websocket.send(flatMessage, (error) => {
          if (error !== undefined) {
            this.logger.error(`Failed to send a WebSocket message (error: ${error.message})`);
            return reject(websocketErrorWithOriginal(error));
          }
          return resolve();
        });
      }
    });
  }

  private async retrieveWSSURL(): Promise<AppsConnectionsOpenResponse> {
    try {
      this.logger.debug('Going to retrieve a new WSS URL ...');
      return await this.webClient.apps.connections.open();
    } catch (error) {
      this.logger.error(`Faled to retrieve a new WSS URL for reconnection (error: ${error})`);
      throw error;
    }
  }

  private reconnectingCondition(context: Context<string, string>): boolean {
    const error = context.error as WebAPICallError;
    this.logger.warn(`Failed to start a Socket Mode connection (error: ${error.message})`);

    // Observe this event when the error which causes reconnecting or disconnecting is meaningful
    this.emit('unable_to_socket_mode_start', error);
    let isRecoverable = true;
    if (error.code === APICallErrorCode.PlatformError &&
        (Object.values(UnrecoverableSocketModeStartError) as string[]).includes(error.data.error)) {
      isRecoverable = false;
    } else if (error.code === APICallErrorCode.RequestError) {
      isRecoverable = false;
    } else if (error.code === APICallErrorCode.HTTPError) {
      isRecoverable = false;
    }
    return this.autoReconnectEnabled && isRecoverable;
  }

  private configureAuthenticatedWebSocket(_state: string, context: Context<string, string>) {
    this.authenticated = true;
    this.setupWebSocket(context.result.url);
    setImmediate(() => {
      this.emit('authenticated', context.result);
    });
  }

  private handleConnectionFailure(_state: string, context: Context<string, string>) {
    // dispatch 'failure' on parent machine to transition out of this submachine's states
    this.stateMachine.handle('failure', context.error);
  }

  private handleDisconnection() {
    // This transition circumvents the 'disconnecting' state
    // (since the websocket is already closed), so we need to execute its onExit behavior here.
    this.tearDownWebSocket();
  }

  /**
   * Set up method for the client's websocket instance. This method will attach event listeners.
   */
  private setupWebSocket(url: string): void {
    // initialize the websocket
    const options: WebSocket.ClientOptions = {
      perMessageDeflate: false,
      agent: this.clientOptions.agent,
    };

    let websocket: WebSocket;
    if (this.websocket === undefined) {
      this.websocket = new WebSocket(url, options);
      websocket = this.websocket;
    } else {
      // setup secondary websocket
      // this is used when creating a new connection because the first is about to disconnect
      this.secondaryWebsocket = new WebSocket(url, options);
      websocket = this.secondaryWebsocket;
    }

    // attach event listeners
    websocket.addEventListener('open', (event) => { this.stateMachine.handle('websocket open', event); });
    websocket.addEventListener('close', (event) => { this.stateMachine.handle('websocket close', event); });
    websocket.addEventListener('error', (event) => {
      this.logger.error(`A WebSocket error occurred: ${event.message}`);
      this.emit('error', websocketErrorWithOriginal(event.error));
    });
    websocket.addEventListener('message', this.onWebSocketMessage.bind(this));

    // Confirm websocket connection is still active
    websocket.addEventListener('ping', ((data: Buffer) => {
      if (this.pingPongLoggingEnabled) {
        this.logger.debug(`Received ping from Slack server (data: ${data})`);
      }
      this.startMonitoringPingFromSlack();
      // Since the `addEventListener` method does not accept listener with data arg in TypeScript,
      // we cast this fucntion to any as a workaround
    }) as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    websocket.addEventListener('pong', ((data: Buffer) => {
      if (this.pingPongLoggingEnabled) {
        this.logger.debug(`Received pong from Slack server (data: ${data})`);
      }
      this.lastPongReceivedTimestamp = new Date().getTime();
      // Since the `addEventListener` method does not accept listener with data arg in TypeScript,
      // we cast this fucntion to any as a workaround
    }) as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  /**
   * Tear down method for the client's websocket instance. This method undoes the work in setupWebSocket(url).
   */
  private tearDownWebSocket(): void {
    if (this.clientPingTimeout !== undefined) {
      clearTimeout(this.clientPingTimeout);
    }
    if (this.secondaryWebsocket !== undefined && this.websocket !== undefined) {
      this.logger.debug('Since the secondary WebSocket exists, going to tear down the first and assign second...');
      // currently have two websockets, so tear down the older one
      this.websocket.removeAllListeners('open');
      this.websocket.removeAllListeners('close');
      this.websocket.removeAllListeners('error');
      this.websocket.removeAllListeners('message');
      this.websocket = this.secondaryWebsocket;
      this.secondaryWebsocket = undefined;
    } else if (this.secondaryWebsocket === undefined && this.websocket !== undefined) {
      this.logger.debug('Since only the primary WebSocket exists, going to tear it down...');
      // only one websocket to tear down
      this.websocket.removeAllListeners('open');
      this.websocket.removeAllListeners('close');
      this.websocket.removeAllListeners('error');
      this.websocket.removeAllListeners('message');
      this.websocket = undefined;
    }
    this.logger.debug('Tearing down WebSocket connections finished');
  }

  private startPeriodicallySendingPingToSlack(): void {
    if (this.clientPingTimeout !== undefined) {
      clearTimeout(this.clientPingTimeout);
    }
    // re-init for new monitoring loop
    this.lastPongReceivedTimestamp = undefined;
    let pingAttemptCount = 0;

    if (!this.badConnection) {
      this.clientPingTimeout = setInterval(() => {
        if (this.badConnection || pingAttemptCount > 5) {
          if (this.pingPongLoggingEnabled) {
            this.logger.debug('Checking the client state - the connection is currently inactive');
          }
          this.emit('server pongs not received');
          return;
        }
        const nowMillis = new Date().getTime();
        try {
          const pingMessage = `Ping from client (${nowMillis})`;
          this.websocket?.ping(pingMessage);
          if (this.lastPongReceivedTimestamp === undefined) {
            pingAttemptCount += 1;
          }
          if (this.pingPongLoggingEnabled) {
            this.logger.debug(`Sent ping to Slack: ${pingMessage}`);
          }
        } catch (e) {
          this.logger.error(`Failed to send ping to Slack (error: ${e})`);
          this.badConnection = true;
          this.emit('server pongs not received');
          return;
        }
        if (this.lastPongReceivedTimestamp !== undefined) {
          const millis = nowMillis - this.lastPongReceivedTimestamp;
          if (millis > this.clientPingTimeoutMillis) {
            this.logger.info(`A pong wasn't received from the server before the timeout of ${this.clientPingTimeoutMillis}ms!`);
            this.badConnection = true;
            this.emit('server pongs not received');
          }
        }
      }, this.clientPingTimeoutMillis / 3);
    }
  }

  /**
   * confirms websocket connection is still active
   * fires whenever a ping event is received
   */
  private startMonitoringPingFromSlack(): void {
    if (this.serverPingTimeout !== undefined) {
      clearTimeout(this.serverPingTimeout);
    }

    // Don't start heartbeat if connection is already deemed bad
    if (!this.badConnection) {
      this.serverPingTimeout = setTimeout(() => {
        this.logger.info(`A ping wasn't received from the server before the timeout of ${this.serverPingTimeoutMillis}ms!`);
        if (this.isConnectionReady()) {
          this.badConnection = true;
          // Opens secondary WebSocket and teardown original once that is ready
          this.stateMachine.handle('server pings not received');
        }
      }, this.serverPingTimeoutMillis);
    }
  }

  private isConnectionReady() {
    const currentState = this.stateMachine.getCurrentState();
    const stateHierarchy = this.stateMachine.getStateHierarchy();
    return currentState === 'connected' &&
      stateHierarchy !== undefined &&
      stateHierarchy.length >= 2 &&
      stateHierarchy[1] === 'ready';
  }

  /**
   * `onmessage` handler for the client's websocket. This will parse the payload and dispatch the relevant events for
   * each incoming message.
   */
  protected async onWebSocketMessage({ data }: { data: string }): Promise<void> {
    this.logger.debug(`received a message on the WebSocket: ${data}`);

    // parse message into slack event
    let event: {
      type: string;
      reason: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      payload: { [key: string]: any };
      envelope_id: string;
      retry_attempt?: number; // type: events_api
      retry_reason?: string; // type: events_api
      accepts_response_payload?: boolean; // type: events_api, slash_commands, interactive
    };

    try {
      event = JSON.parse(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (parseError: any) {
      // prevent application from crashing on a bad message, but log an error to bring attention
      this.logger.error(
        `unable to parse incoming websocket message: ${parseError.message}`,
      );
      return;
    }

    // internal event handlers
    if (event.type === 'hello') {
      this.stateMachine.handle('server hello');
      return;
    }

    // open second websocket connection in preparation for the existing websocket disconnecting
    if (event.type === 'disconnect' && event.reason === 'warning') {
      this.logger.debug('disconnect warning, creating second connection');
      this.stateMachine.handle('server disconnect warning');
      return;
    }

    // close primary websocket in favor of secondary websocket, assign secondary to primary
    if (event.type === 'disconnect' && event.reason === 'refresh_requested') {
      this.logger.debug('disconnect refresh requested, closing old websocket');
      this.stateMachine.handle('server disconnect old socket');
      // TODO: instead of using this event to reassign secondaryWebsocket to this.websocket,
      // use the websocket close event
      return;
    }

    // Define Ack
    const ack = async (response: Record<string, unknown>): Promise<void> => {
      this.logger.debug('calling ack', event.type);
      await this.send(event.envelope_id, response);
    };

    // for events_api messages, expose the type of the event
    if (event.type === 'events_api') {
      this.emit(event.payload.event.type, {
        ack,
        envelope_id: event.envelope_id,
        body: event.payload,
        event: event.payload.event,
        retry_num: event.retry_attempt,
        retry_reason: event.retry_reason,
        accepts_response_payload: event.accepts_response_payload,
      });
    } else {
      // emit just ack and body for all other types of messages
      this.emit(event.type, {
        ack,
        envelope_id: event.envelope_id,
        body: event.payload,
        accepts_response_payload: event.accepts_response_payload,
      });
    }

    // emitter for all slack events
    // used in tools like bolt-js
    this.emit('slack_event', {
      ack,
      envelope_id: event.envelope_id,
      type: event.type,
      body: event.payload,
      retry_num: event.retry_attempt,
      retry_reason: event.retry_reason,
      accepts_response_payload: event.accepts_response_payload,
    });
  }
}

/* Instrumentation */
addAppMetadata({ name: packageJson.name, version: packageJson.version });

export default SocketModeClient;
