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
import { SlackWebSocket } from './SlackWebSocket';

const packageJson = require('../package.json'); // eslint-disable-line import/no-commonjs, @typescript-eslint/no-var-requires

// These enum values are used only in the state machine
enum State {
  Connecting = 'connecting',
  Connected = 'connected',
  Reconnecting = 'reconnecting',
  Disconnecting = 'disconnecting',
  Disconnected = 'disconnected',
  Failed = 'failed',
}
enum ConnectingState {
  Handshaking = 'handshaking',
  Authenticating = 'authenticating',
  Authenticated = 'authenticated',
  Reconnecting = 'reconnecting',
  Failed = 'failed',
}
enum ConnectedState {
  Preparing = 'preparing',
  Ready = 'ready',
  Failed = 'failed',
}

// These enum values are used only in the state machine
enum Event {
  Start = 'start',
  Failure = 'failure',
  WebSocketOpen = 'websocket open',
  WebSocketClose = 'websocket close',
  ServerHello = 'server hello',
  ServerExplicitDisconnect = 'server explicit disconnect',
  ServerPingsNotReceived = 'server pings not received',
  ServerPongsNotReceived = 'server pongs not received',
  ClientExplicitDisconnect = 'client explicit disconnect',
  UnableToSocketModeStart = 'unable_to_socket_mode_start',
}

/**
 * A Socket Mode Client allows programs to communicate with the
 * [Slack Platform's Events API](https://api.slack.com/events-api) over WebSocket connections.
 * This object uses the EventEmitter pattern to dispatch incoming events
 * and has a built in send method to acknowledge incoming events over the WebSocket connection.
 */
export class SocketModeClient extends EventEmitter {
  /**
   * Whether this client will automatically reconnect when (not manually) disconnected
   */
  private autoReconnectEnabled: boolean;

  /**
   * This class' logger instance
   */
  private logger: Logger;

  /**
   * The name used to prefix all logging generated from this class
   */
  private static loggerName = 'SocketModeClient';

  /**
   * The URL with which to establish a socket connection with Slack
   */
  private wssURL?: string;

  /**
   * The HTTP client used to interact with the Slack API
   */
  private webClient: WebClient;

  /**
   * WebClient options we pass to our WebClient instance
   * We also reuse agent and tls for our WebSocket connection
   */
  private webClientOptions: WebClientOptions;

  /**
   * The underlying WebSocket client instance
   */
  public websocket?: SlackWebSocket;

  // TODO: do we need to keep these?
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
    this.webClientOptions = clientOptions;
    if (this.webClientOptions.retryConfig === undefined) {
      // For faster retries of apps.connections.open API calls for reconnecting
      this.webClientOptions.retryConfig = { retries: 100, factor: 1.3 };
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
    // bind to error, message and close events emitted from the web socket
    this.on('error', (err) => {
      // TODO: what do if error raised by socket?
      throw err;
    });
    this.on('close', () => {
      // TODO: Underlying WebSocket connection was closed, possibly reconnect.
    });
    this.on('message', this.onWebSocketMessage.bind(this));
  }

  /**
   * Retrieves a new WebSocket URL to connect to.
   */
  private async retrieveWSSURL(): Promise<string> { // python equiv: BaseSocketModeClient.issue_new_wss_url
    try {
      this.logger.debug('Going to retrieve a new WSS URL ...');
      const resp = await this.webClient.apps.connections.open({});
      if (!resp.url) {
        const msg = `apps.connections.open did not return a URL! (response: ${resp})`;
        this.logger.error(msg);
        throw new Error(msg);
      }
      return resp.url;
    } catch (error) {
      // TODO: Python catches rate limit errors when interacting with this API: https://github.com/slackapi/python-slack-sdk/blob/main/slack_sdk/socket_mode/client.py#L51
      this.logger.error(`Failed to retrieve a new WSS URL for reconnection (error: ${error})`);
      throw error;
    }
  }

  /**
   * Start a Socket Mode session app.
   * This method must be called before any messages can be sent or received,
   * or to disconnect the client via the `disconnect` method.
   */
  public async start(): Promise<AppsConnectionsOpenResponse> { // python equiv: SocketModeClient.connect
    this.logger.debug('Starting a Socket Mode client ...');
    if (!this.wssURL) {
      this.wssURL = await this.retrieveWSSURL();
    }
    // create a socket connection using SlackWebSocket
    this.websocket = new SlackWebSocket({
      url: this.wssURL,
      client: this, // web socket events relevant to socket mode client will be emitted into the instance of this class
      logLevel: this.logger.getLevel(),
      httpAgent: this.webClientOptions.agent
    });

    // Return a promise that resolves with the connection information
    return new Promise((resolve, reject) => {
      const connectedCallback = (result: any) => {
        this.removeListener(State.Disconnected, disconnectedCallback);
        resolve(result);
      };
      const disconnectedCallback = (err: any) => {
        this.removeListener(State.Connected, connectedCallback);
        reject(err);
      };
      this.once(State.Connected, connectedCallback);
      this.once(State.Disconnected, disconnectedCallback);
      this.websocket.connect();
    });
  }

  /**
   * End a Socket Mode session. After this method is called no messages will be sent or received
   * unless you call start() again later.
   */
  public disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.logger.debug('Manually disconnecting this Socket Mode client');
      // TODO: will listening to this state for promise resolution still work?
      // Resolve (or reject) on disconnect
      this.once(State.Disconnected, (err) => {
        if (err instanceof Error) {
          reject(err);
        } else {
          resolve();
        }
      });
      this.websocket.disconnect();
    });
  }

  /**
   * `onmessage` handler for the client's WebSocket.
   * This will parse the payload and dispatch the relevant events for each incoming message.
   */
  protected async onWebSocketMessage(data: WebSocket.RawData, isBinary: boolean): Promise<void> {
    if (isBinary) {
      this.logger.debug(`Unexpected binary message received, ignoring.`);
      return;
    }
    const payload = data.toString();
    this.logger.debug(`Received a message on the WebSocket: ${payload}`);

    // Parse message into slack event
    let event: {
      type: string;
      reason: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      payload: Record<string, any>;
      envelope_id: string;
      retry_attempt?: number; // type: events_api
      retry_reason?: string; // type: events_api
      accepts_response_payload?: boolean; // type: events_api, slash_commands, interactive
    };

    try {
      event = JSON.parse(payload);
    } catch (parseError) {
      // Prevent application from crashing on a bad message, but log an error to bring attention
      this.logger.debug(
        `Unable to parse an incoming WebSocket message (will ignore): ${parseError}, ${payload}`,
      );
      return;
    }

    // Internal event handlers
    if (event.type === 'hello') {
      // TODO: we are now fully ready - what do?
      this.stateMachine.handle(Event.ServerHello);
      return;
    }

    // Open the second WebSocket connection in preparation for the existing WebSocket disconnecting
    if (event.type === 'disconnect') {
      this.logger.debug(`Received "${event.type}" (${event.reason}) message - disonnecting.`);
      this.websocket.disconnect();
      return;
    }

    // Define Ack
    const ack = async (response: Record<string, unknown>): Promise<void> => {
      if (this.logger.getLevel() === LogLevel.DEBUG) {
        this.logger.debug(`Calling ack() - type: ${event.type}, envelope_id: ${event.envelope_id}, data: ${JSON.stringify(response)}`);
      }
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

  // --------------------------------------------
  // Private methods / properties
  // --------------------------------------------

  /**
   * State machine that backs the transition and action behavior
   */
  private stateMachine: StateMachine<State, Event>;

  /**
   * Internal count for managing the reconnection state
   */
  private numOfConsecutiveReconnectionFailures: number = 0;

  /* eslint-disable @typescript-eslint/indent, newline-per-chained-call */
  private connectingStateMachineConfig: Configuration<ConnectingState, Event> = Finity
    .configure<ConnectingState, Event>()
    .global()
      .onStateEnter((state) => {
        this.logger.debug(`Transitioning to state: ${State.Connecting}:${state}`);
      })
    .initialState(ConnectingState.Authenticating)
      .do(this.retrieveWSSURL.bind(this))
        .onSuccess().transitionTo(ConnectingState.Authenticated)
        .onFailure()
          .transitionTo(ConnectingState.Reconnecting).withCondition(this.reconnectingCondition.bind(this))
          .transitionTo(ConnectingState.Failed)
    .state(ConnectingState.Reconnecting)
      .do(() => new Promise((res, _rej) => {
        this.numOfConsecutiveReconnectionFailures += 1;
        const millisBeforeRetry = this.clientPingTimeoutMillis * this.numOfConsecutiveReconnectionFailures;
        this.logger.debug(`Before trying to reconnect, this client will wait for ${millisBeforeRetry} milliseconds`);
        setTimeout(() => {
          this.logger.debug('Resolving reconnecting state to continue with reconnect...');
          res(true);
        }, millisBeforeRetry);
      }))
      .onSuccess().transitionTo(ConnectingState.Authenticating)
      .onFailure().transitionTo(ConnectingState.Failed)
    .state(ConnectingState.Authenticated)
      .onEnter(this.configureAuthenticatedWebSocket.bind(this))
      .on(Event.WebSocketOpen).transitionTo(ConnectingState.Handshaking)
    .state(ConnectingState.Handshaking) // a state in which to wait until the Event.ServerHello event
    .state(ConnectingState.Failed)
      .onEnter(this.handleConnectionFailure.bind(this))
  .getConfig();

  private connectedStateMachineConfig: Configuration<ConnectedState, Event> = Finity.configure<ConnectedState, Event>()
    .global()
      .onStateEnter((state) => {
        this.logger.debug(`Transitioning to state: ${State.Connected}:${state}`);
      })
    .initialState(ConnectedState.Preparing)
      .do(async () => {
        if (this.isSwitchingConnection) {
          this.switchWebSocketConnection();
          this.badConnection = false;
        }
        // Start heartbeat to keep track of the WebSocket connection continuing to be alive
        // Proactively verifying the connection health by sending ping from this client side
        this.startPeriodicallySendingPingToSlack();
        // Reactively verifying the connection health by checking the interval of ping from Slack
        this.startMonitoringPingFromSlack();
      })
      .onSuccess().transitionTo(ConnectedState.Ready)
      .onFailure().transitionTo(ConnectedState.Failed)
    .state(ConnectedState.Failed)
      .onEnter(this.handleConnectionFailure.bind(this))
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
      .on(Event.ClientExplicitDisconnect)
        .transitionTo(State.Disconnected)
    .state(State.Connecting)
      .onEnter(() => {
        this.logger.info('Going to establish a new connection to Slack ...');
      })
      .submachine(this.connectingStateMachineConfig)
      .on(Event.ServerHello)
        .transitionTo(State.Connected)
      .on(Event.WebSocketClose)
        .transitionTo(State.Reconnecting).withCondition(this.autoReconnectCondition.bind(this))
        .transitionTo(State.Disconnecting)
      .on(Event.ClientExplicitDisconnect)
        .transitionTo(State.Disconnecting)
      .on(Event.Failure)
        .transitionTo(State.Disconnected)
      .on(Event.WebSocketOpen)
        // If submachine not `authenticated` ignore event
        .ignore()
    .state(State.Connected)
      .onEnter(() => {
        this.connected = true;
        this.logger.info('Now connected to Slack');
      })
      .submachine(this.connectedStateMachineConfig)
      .on(Event.WebSocketClose)
        .transitionTo(State.Reconnecting)
          .withCondition(this.autoReconnectCondition.bind(this))
          .withAction(() => this.markCurrentWebSocketAsInactive())
        .transitionTo(State.Disconnecting)
      .on(Event.ClientExplicitDisconnect)
        .transitionTo(State.Disconnecting)
        .withAction(() => this.markCurrentWebSocketAsInactive())
      .on(Event.ServerPingsNotReceived)
        .transitionTo(State.Reconnecting).withCondition(this.autoReconnectCondition.bind(this))
        .transitionTo(State.Disconnecting)
      .on(Event.ServerPongsNotReceived)
        .transitionTo(State.Reconnecting).withCondition(this.autoReconnectCondition.bind(this))
        .transitionTo(State.Disconnecting)
      .on(Event.ServerExplicitDisconnect)
        .transitionTo(State.Reconnecting).withCondition(this.autoReconnectCondition.bind(this))
        .transitionTo(State.Disconnecting)
      .onExit(() => {
        this.terminateActiveHeartBeatJobs();
      })
    .state(State.Reconnecting)
      .onEnter(() => {
        this.logger.info('Reconnecting to Slack ...');
      })
      .do(async () => {
        this.isSwitchingConnection = true;
      })
        .onSuccess().transitionTo(State.Connecting)
        .onFailure().transitionTo(State.Failed)
    .state(State.Disconnecting)
      .onEnter(() => {
        this.logger.info('Disconnecting ...');
      })
      .do(async () => {
        this.terminateActiveHeartBeatJobs();
        this.terminateAllConnections();
        this.logger.info('Disconnected from Slack');
      })
        .onSuccess().transitionTo(State.Disconnected)
        .onFailure().transitionTo(State.Failed)
  .getConfig();

  /* eslint-enable @typescript-eslint/indent, newline-per-chained-call */

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
          if (error !== undefined && error !== null) {
            this.logger.error(`Failed to send a WebSocket message (error: ${error.message})`);
            return reject(websocketErrorWithOriginal(error));
          }
          return resolve();
        });
      }
    });
  }

  private autoReconnectCondition(): boolean {
    return this.autoReconnectEnabled;
  }

  private reconnectingCondition(context: Context<string, string>): boolean {
    const error = context.error as WebAPICallError;
    this.logger.warn(`Failed to start a Socket Mode connection (error: ${error.message})`);

    // Observe this event when the error which causes reconnecting or disconnecting is meaningful
    this.emit(Event.UnableToSocketModeStart, error);
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
    this.numOfConsecutiveReconnectionFailures = 0; // Reset the failure count
    this.authenticated = true;
    this.setupWebSocket(context.result.url);
    setImmediate(() => {
      this.emit(ConnectingState.Authenticated, context.result);
    });
  }

  private handleConnectionFailure(_state: string, context: Context<string, string>) {
    this.logger.error(`The internal logic unexpectedly failed (error: ${context.error})`);
    // Terminate everything, just in case
    this.terminateActiveHeartBeatJobs();
    this.terminateAllConnections();
    // dispatch 'failure' on parent machine to transition out of this submachine's states
    this.stateMachine.handle(Event.Failure, context.error);
  }

  private markCurrentWebSocketAsInactive(): void {
    this.badConnection = true;
    this.connected = false;
    this.authenticated = false;
  }
}

/* Instrumentation */
addAppMetadata({ name: packageJson.name, version: packageJson.version });

export default SocketModeClient;
