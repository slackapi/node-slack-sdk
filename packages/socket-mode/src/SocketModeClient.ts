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

// These enum values are used only in the state machine
enum State {
  Ready = 'ready',
  Connecting = 'connecting',
  Connected = 'connected',
  Handshaking = 'handshaking',
  Authenticating = 'authenticating',
  Authenticated = 'authenticated',
  Reconnecting = 'reconnecting',
  Disconnecting = 'disconnecting',
  Disconnected = 'disconnected',
  ClosingSocket = 'closing-socket',
  Failed = 'failed',
}

// These enum values are used only in the state machine
enum Event {
  Start = 'start',
  Failure = 'failure',
  WebSocketOpen = 'websocket open',
  WebSocketClose = 'websocket close',
  ServerHello = 'server hello',
  ServerDisconnectWarning = 'server disconnect warning',
  ServerDisconnectOldSocket = 'server disconnect old socket',
  ServerPingsNotReceived = 'server pings not received',
  ServerPongsNotReceived = 'server pongs not received',
  ExplicitDisconnect = 'explicit disconnect',
}

/**
 * An Socket Mode Client allows programs to communicate with the
 * [Slack Platform's Events API](https://api.slack.com/events-api) over WebSocket connections.
 * This object uses the EventEmitter pattern to dispatch incoming events
 * and has a built in send method to acknowledge incoming events over the WebSocket connection.
 */
export class SocketModeClient extends EventEmitter {
  /**
   * Whether or not the client is currently connected to the web socket
   */
  public connected: boolean = false;

  /**
   * Whether or not the client has authenticated to the Socket Mode API.
   * This occurs when the connect method completes,
   * and a WebSocket URL is available for the client's connection.
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
   * The underlying WebSocket client instance
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
    if (this.clientOptions.retryConfig === undefined) {
      // For faster retries of apps.connections.open API calls for reconnecting
      this.clientOptions.retryConfig = { retries: 100, factor: 1.3 };
    }
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
   * Begin a Socket Mode session.
   * This method must be called before any messages can be sent or received.
   */
  public start(): Promise<AppsConnectionsOpenResponse> {
    this.logger.debug('Starting a Socket Mode client');
    // Delegate behavior to state machine
    this.stateMachine.handle(Event.Start);
    // Return a promise that resolves with the connection information
    return new Promise((resolve, reject) => {
      this.once(State.Authenticated, (result) => {
        this.removeListener(State.Disconnected, reject);
        resolve(result);
      });
      this.once(State.Disconnected, (err) => {
        this.removeListener(State.Authenticated, resolve);
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
      this.once(State.Disconnected, (err) => {
        if (err instanceof Error) {
          reject(err);
        } else {
          resolve();
        }
      });
      // Delegate behavior to state machine
      this.stateMachine.handle(Event.ExplicitDisconnect);
    });
  }

  // --------------------------------------------
  // Private methods / properties
  // --------------------------------------------

  /**
   * State machine that backs the transition and action behavior
   */
  private stateMachine: StateMachine<State, Event>;

  /* eslint-disable @typescript-eslint/indent, newline-per-chained-call */

  private connectingStateMachine: Configuration<State, Event> = Finity.configure<State, Event>()
    .global()
      .onStateEnter((state) => {
        this.logger.debug(`Transitioning to state: ${State.Connecting}:${state}`);
      })
    .initialState(State.Authenticating)
      .do(this.retrieveWSSURL.bind(this))
        .onSuccess().transitionTo(State.Authenticated)
        .onFailure()
          .transitionTo(State.Reconnecting).withCondition(this.reconnectingCondition.bind(this))
          .transitionTo(State.Failed)
    .state(State.Authenticated)
      .onEnter(this.configureAuthenticatedWebSocket.bind(this))
      .on(Event.WebSocketOpen).transitionTo(State.Handshaking)
    .state(State.Handshaking) // a state in which to wait until the Event.ServerHello event
    .state(State.Failed)
      .onEnter(this.handleConnectionFailure.bind(this))
  .getConfig();

  private connectedStateMachine: Configuration<State, Event> = Finity.configure<State, Event>()
    .global()
      .onStateEnter((state) => {
        this.logger.debug(`Transitioning to state: ${State.Connected}:${state}`);
      })
    .initialState(State.Ready)
      .onEnter(() => {
        if (this.badConnection) {
          // The state arrived here because Event.ServerPingTimeout occurred
          // and a new connection was created.
          // Tearing down the old connection.
          this.tearDownWebSocket();
          this.badConnection = false;
        }
        // Start heartbeat to keep track of the WebSocket connection continuing to be alive
        // Proactively verifying the connection health by sending ping from this client side
        this.startPeriodicallySendingPingToSlack();
        // Reactively verifying the connection health by checking the interval of ping from Slack
        this.startMonitoringPingFromSlack();
        // The transition isn't done yet, so we delay the following statement until after the event loop returns
        setImmediate(() => {
          this.emit(State.Ready);
        });
      })
    .state(State.ClosingSocket)
      .onEnter(() => {
        this.logger.debug('Closing the current connection...');
      })
      .do(async () => this.tearDownHeartBeatJobs())
        .onSuccess().transitionTo(State.Ready)
        .onExit(() => this.tearDownWebSocket())
  .getConfig();

  /**
   * Configuration for the state machine
   */
  private stateMachineConfig: Configuration<State, Event> = Finity.configure<State, Event>()
    .global()
      .onStateEnter((state, context) => {
        this.logger.debug(`Transitioning to state: ${state}`);
        if (state === State.Disconnected) {
          // Emits a `disconnected` event with a possible error object (might be undefined)
          this.emit(state, context.eventPayload);
        } else {
          // Emits events: `connecting`, `connected`, `disconnecting`, `reconnecting`
          this.emit(state);
        }
      })
    .initialState(State.Disconnected)
      .on(Event.Start)
        .transitionTo(State.Connecting)
    .state(State.Connecting)
      .submachine(this.connectingStateMachine)
      .on(Event.ServerHello)
        .transitionTo(State.Connected)
      .on(Event.WebSocketClose)
        .transitionTo(State.Reconnecting).withCondition(() => this.autoReconnectEnabled)
        .transitionTo(State.Disconnected).withAction(this.handleDisconnection.bind(this))
      .on(Event.Failure)
        .transitionTo(State.Disconnected)
      .on(Event.ExplicitDisconnect)
        .transitionTo(State.Disconnecting)
    .state(State.Connected)
      .onEnter(() => {
        this.connected = true;
      })
      .submachine(this.connectedStateMachine)
      .on(Event.ServerDisconnectWarning)
        .transitionTo(State.Reconnecting).withCondition(() => this.autoReconnectEnabled)
      .on(Event.WebSocketClose)
        .transitionTo(State.Reconnecting).withCondition(() => this.autoReconnectEnabled)
        .transitionTo(State.Disconnected).withAction(this.handleDisconnection.bind(this))
      .on(Event.ExplicitDisconnect)
        .transitionTo(State.Disconnecting)
      .on(Event.ServerDisconnectWarning)
        .transitionTo(State.Reconnecting).withCondition(() => this.autoReconnectEnabled)
      .on(Event.ServerPingsNotReceived)
        .transitionTo(State.Reconnecting).withCondition(() => this.autoReconnectEnabled)
      .on(Event.ServerPongsNotReceived)
        .transitionTo(State.Reconnecting).withCondition(() => this.autoReconnectEnabled)
      .on(Event.ServerDisconnectOldSocket)
        .transitionTo(State.ClosingSocket)
      .onExit(() => {
        this.connected = false;
        this.authenticated = false;
        this.tearDownHeartBeatJobs();
      })
    .state(State.Disconnecting)
      .onEnter(() => {
        // Most of the time, a WebSocket will exist.
        // The only time it does not is when transitioning from connecting,
        // before the client.start() has finished and the WebSocket hasn't been set up.
        if (this.websocket !== undefined) {
          this.websocket.close();
        }
      })
      .on(Event.WebSocketClose)
        .transitionTo(State.Disconnected)
      .onExit(() => this.tearDownWebSocket())
    .state(State.Reconnecting)
      .onEnter(() => {
        this.logger.debug('Reconnecting to Slack ...');
      })
      .do(async () => {
        this.badConnection = true;
        this.tearDownHeartBeatJobs();
      })
        .onSuccess().transitionTo(State.Connecting)
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
   * Used to see if a WebSocket stops sending heartbeats and is deemed bad
   */
  private badConnection: boolean = false;

  /**
   * WebClient options we pass to our WebClient instance
   * We also reuse agent and tls for our WebSocket connection
   */
  private clientOptions: WebClientOptions;

  /**
   * Method for sending an outgoing message of an arbitrary type over the WebSocket connection.
   * Primarily used to send acknowledgements back to slack for incoming events
   * @param id the envelope id
   * @param body the message body or string text
   */
  private send(id: string, body = {}): Promise<void> {
    const _body = typeof body === 'string' ? { text: body } : body;
    const message = { envelope_id: id, payload: { ..._body } };

    return new Promise((resolve, reject) => {
      this.logger.debug(`send() method was called in state: ${this.stateMachine.getCurrentState()}, state hierarchy: ${this.stateMachine.getStateHierarchy()}`);
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
      this.emit(State.Authenticated, context.result);
    });
  }

  private handleConnectionFailure(_state: string, context: Context<string, string>) {
    // dispatch 'failure' on parent machine to transition out of this submachine's states
    this.stateMachine.handle(Event.Failure, context.error);
  }

  private handleDisconnection() {
    // This transition circumvents the 'disconnecting' state
    // (since the websocket is already closed), so we need to execute its onExit behavior here.
    this.tearDownWebSocket();
  }

  /**
   * Set up method for the client's WebSocket instance. This method will attach event listeners.
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
    websocket.addEventListener('open', (event) => {
      this.stateMachine.handle(Event.WebSocketOpen, event);
    });
    websocket.addEventListener('close', (event) => {
      this.stateMachine.handle(Event.WebSocketClose, event);
    });
    websocket.addEventListener('error', (event) => {
      this.logger.error(`A WebSocket error occurred: ${event.message}`);
      this.emit('error', websocketErrorWithOriginal(event.error));
    });
    websocket.addEventListener('message', this.onWebSocketMessage.bind(this));

    // Confirm WebSocket connection is still active
    websocket.addEventListener('ping', ((data: Buffer) => {
      if (this.pingPongLoggingEnabled) {
        this.logger.debug(`Received ping from Slack server (data: ${data})`);
      }
      this.startMonitoringPingFromSlack();
      // Since the `addEventListener` method does not accept listener with data arg in TypeScript,
      // we cast this function to any as a workaround
    }) as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    websocket.addEventListener('pong', ((data: Buffer) => {
      if (this.pingPongLoggingEnabled) {
        this.logger.debug(`Received pong from Slack server (data: ${data})`);
      }
      this.lastPongReceivedTimestamp = new Date().getTime();
      // Since the `addEventListener` method does not accept listener with data arg in TypeScript,
      // we cast this function to any as a workaround
    }) as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  /**
   * Tear down the currently working heartbeat jobs.
   */
  private tearDownHeartBeatJobs() {
    if (this.serverPingTimeout !== undefined) {
      clearTimeout(this.serverPingTimeout);
    }
    if (this.clientPingTimeout !== undefined) {
      clearTimeout(this.clientPingTimeout);
    }
  }

  /**
   * Tear down method for the client's WebSocket instance.
   * This method undoes the work in setupWebSocket(url).
   */
  private tearDownWebSocket(): void {
    if (this.secondaryWebsocket !== undefined && this.websocket !== undefined) {
      this.logger.debug('Since the secondary WebSocket exists, going to tear down the first and assign second...');
      // currently have two WebSocket objects, so tear down the older one
      this.websocket.removeAllListeners('open');
      this.websocket.removeAllListeners('close');
      this.websocket.removeAllListeners('error');
      this.websocket.removeAllListeners('message');
      this.websocket.close();
      this.websocket = this.secondaryWebsocket;
      this.secondaryWebsocket = undefined;
    } else if (this.secondaryWebsocket === undefined && this.websocket !== undefined) {
      this.logger.debug('Since only the primary WebSocket exists, going to tear it down...');
      // only one WebSocket to tear down
      this.websocket.removeAllListeners('open');
      this.websocket.removeAllListeners('close');
      this.websocket.removeAllListeners('error');
      this.websocket.removeAllListeners('message');
      this.websocket.close();
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
        const nowMillis = new Date().getTime();
        try {
          const pingMessage = `Ping from client (${nowMillis})`;
          this.websocket?.ping(pingMessage);
          if (this.lastPongReceivedTimestamp === undefined) {
            pingAttemptCount += 1;
          } else {
            pingAttemptCount = 0;
          }
          if (this.pingPongLoggingEnabled) {
            this.logger.debug(`Sent ping to Slack: ${pingMessage}`);
          }
        } catch (e) {
          this.logger.error(`Failed to send ping to Slack (error: ${e})`);
          this.handlePingPongErrorReconnection();
          return;
        }
        let isInvalid: boolean = pingAttemptCount > 5;
        if (this.lastPongReceivedTimestamp !== undefined) {
          const millis = nowMillis - this.lastPongReceivedTimestamp;
          isInvalid = millis > this.clientPingTimeoutMillis;
        }
        if (isInvalid) {
          this.logger.info(`A pong wasn't received from the server before the timeout of ${this.clientPingTimeoutMillis}ms!`);
          this.handlePingPongErrorReconnection();
        }
      }, this.clientPingTimeoutMillis / 3);
    }
  }

  private handlePingPongErrorReconnection() {
    try {
      this.stateMachine.handle(Event.ServerPongsNotReceived);
    } catch (e) {
      this.logger.debug(`Failed to reconnect to Slack (error: ${e})`);
    }
  }

  /**
   * Confirms WebSocket connection is still active
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
          this.stateMachine.handle(Event.ServerPingsNotReceived);
        }
      }, this.serverPingTimeoutMillis);
    }
  }

  private isConnectionReady() {
    const currentState = this.stateMachine.getCurrentState();
    const stateHierarchy = this.stateMachine.getStateHierarchy();
    return currentState === State.Connected &&
      stateHierarchy !== undefined &&
      stateHierarchy.length >= 2 &&
      stateHierarchy[1] === State.Ready;
  }

  /**
   * `onmessage` handler for the client's WebSocket.
   * This will parse the payload and dispatch the relevant events for each incoming message.
   */
  protected async onWebSocketMessage({ data }: { data: string }): Promise<void> {
    this.logger.debug(`Received a message on the WebSocket: ${data}`);

    // Parse message into slack event
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
      // Prevent application from crashing on a bad message, but log an error to bring attention
      this.logger.error(
        `Unable to parse an incoming WebSocket message: ${parseError.message}`,
      );
      return;
    }

    // Internal event handlers
    if (event.type === 'hello') {
      this.stateMachine.handle(Event.ServerHello);
      return;
    }

    // Open the second WebSocket connection in preparation for the existing WebSocket disconnecting
    if (event.type === 'disconnect' && event.reason === 'warning') {
      this.logger.debug('Received "disconnect" (warning) message - creating the second connection');
      this.stateMachine.handle(Event.ServerDisconnectWarning);
      return;
    }

    // Close the primary WebSocket in favor of secondary WebSocket, assign secondary to primary
    if (event.type === 'disconnect' && event.reason === 'refresh_requested') {
      this.logger.debug('Received "disconnect" (refresh requested) message - closing the old WebSocket connection');
      this.stateMachine.handle(Event.ServerDisconnectOldSocket);
      // TODO: instead of using this event to reassign secondaryWebsocket to this.websocket,
      // use the WebSocket close event
      return;
    }

    // Define Ack
    const ack = async (response: Record<string, unknown>): Promise<void> => {
      this.logger.debug(`Calling ack() - type: ${event.type}, envelope_id: ${event.envelope_id}, data: ${response}`);
      await this.send(event.envelope_id, response);
    };

    // For events_api messages, expose the type of the event
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
      // Emit just ack and body for all other types of messages
      this.emit(event.type, {
        ack,
        envelope_id: event.envelope_id,
        body: event.payload,
        accepts_response_payload: event.accepts_response_payload,
      });
    }

    // Emitter for all slack events
    // (this can be used in tools like bolt-js)
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
