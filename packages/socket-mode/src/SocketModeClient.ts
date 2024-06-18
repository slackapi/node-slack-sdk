import {
  ErrorCode as APICallErrorCode,
  AppsConnectionsOpenResponse,
  WebAPICallError,
  WebClient,
  WebClientOptions,
  addAppMetadata,
} from '@slack/web-api';
import { EventEmitter } from 'eventemitter3';
import WebSocket from 'ws';

import {
  sendWhileDisconnectedError,
  sendWhileNotReadyError,
  websocketErrorWithOriginal,
} from './errors';
import log, { LogLevel, Logger } from './logger';
import { SlackWebSocket, WS_READY_STATES } from './SlackWebSocket';
import { SocketModeOptions } from './SocketModeOptions';
import { UnrecoverableSocketModeStartError } from './UnrecoverableSocketModeStartError';
import packageJson from '../package.json';

// Lifecycle events as described in the README
enum State {
  Connecting = 'connecting',
  Connected = 'connected',
  Reconnecting = 'reconnecting',
  Disconnecting = 'disconnecting',
  Disconnected = 'disconnected',
  Authenticated = 'authenticated',
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
   * This class' logging instance
   */
  private logger: Logger;

  /**
   * The name used to prefix all logging generated from this class
   */
  private static loggerName = 'SocketModeClient';

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

  /**
   * Enables ping-pong detailed logging if true
   */
  private pingPongLoggingEnabled: boolean;

  /**
   * How long to wait for pings from server before timing out
   */
  private serverPingTimeoutMS: number;

  /**
   * How long to wait for pongs from server before timing out
  */
  private clientPingTimeoutMS: number;

  /**
   * Internal count for managing the reconnection state
   */
  private numOfConsecutiveReconnectionFailures: number = 0;

  private customLoggerProvided: boolean = false;

  /**
   * Sentinel tracking if user invoked `disconnect()`; for enforcing shutting down of client
   * even if `autoReconnectEnabled` is `true`.
   */
  private shuttingDown: boolean = false;

  public constructor({
    logger = undefined,
    logLevel = undefined,
    autoReconnectEnabled = true,
    pingPongLoggingEnabled = false,
    clientPingTimeout = 5000,
    serverPingTimeout = 30000,
    appToken = '',
    clientOptions = {},
  }: SocketModeOptions = { appToken: '' }) {
    super();
    if (!appToken) {
      throw new Error('Must provide an App-Level Token when initializing a Socket Mode Client');
    }
    this.pingPongLoggingEnabled = pingPongLoggingEnabled;
    this.clientPingTimeoutMS = clientPingTimeout;
    this.serverPingTimeoutMS = serverPingTimeout;
    // Setup the logger
    if (typeof logger !== 'undefined') {
      this.customLoggerProvided = true;
      this.logger = logger;
      if (typeof logLevel !== 'undefined') {
        this.logger.debug('The logLevel given to Socket Mode was ignored as you also gave logger');
      }
    } else {
      this.logger = log.getLogger(SocketModeClient.loggerName, logLevel ?? LogLevel.INFO, logger);
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

    // bind to error, message and close events emitted from the web socket
    this.on('error', (err) => {
      this.logger.error(`WebSocket error! ${err}`);
    });
    this.on('close', () => {
      // Underlying WebSocket connection was closed, possibly reconnect.
      if (!this.shuttingDown && this.autoReconnectEnabled) {
        this.delayReconnectAttempt(this.start);
      } else {
        // If reconnect is disabled or user explicitly called `disconnect()`, emit a disconnected state.
        this.emit(State.Disconnected);
      }
    });
    this.on('message', this.onWebSocketMessage.bind(this));
    this.logger.debug('The Socket Mode client has successfully initialized');
  }

  // PUBLIC METHODS

  /**
   * Start a Socket Mode session app.
   * This method must be called before any messages can be sent or received,
   * or to disconnect the client via the `disconnect` method.
   */
  public async start(): Promise<AppsConnectionsOpenResponse> { // python equiv: SocketModeClient.connect
    this.shuttingDown = false;
    this.logger.debug('Starting Socket Mode session ...');
    // create a socket connection using SlackWebSocket
    this.websocket = new SlackWebSocket({
      url: await this.retrieveWSSURL(),
      // web socket events relevant to this client will be emitted into the instance of this class
      // see bottom of constructor for where we bind to these events
      client: this,
      logLevel: this.logger.getLevel(),
      logger: this.customLoggerProvided ? this.logger : undefined,
      httpAgent: this.webClientOptions.agent,
      clientPingTimeoutMS: this.clientPingTimeoutMS,
      serverPingTimeoutMS: this.serverPingTimeoutMS,
      pingPongLoggingEnabled: this.pingPongLoggingEnabled,
    });

    // Return a promise that resolves with the connection information
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let connectedCallback = (_res: any) => {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let disconnectedCallback = (_err: any) => {};
      connectedCallback = (result) => {
        this.removeListener(State.Disconnected, disconnectedCallback);
        resolve(result);
      };
      disconnectedCallback = (err) => {
        this.removeListener(State.Connected, connectedCallback);
        reject(err);
      };
      this.once(State.Connected, connectedCallback);
      this.once(State.Disconnected, disconnectedCallback);
      this.emit(State.Connecting);
      this.websocket?.connect();
    });
  }

  /**
   * End a Socket Mode session. After this method is called no messages will be sent or received
   * unless you call start() again later.
   */
  public disconnect(): Promise<void> {
    this.shuttingDown = true;
    this.logger.debug('Manually disconnecting this Socket Mode client');
    this.emit(State.Disconnecting);
    return new Promise((resolve, _reject) => {
      if (!this.websocket) {
        this.emit(State.Disconnected);
        resolve();
      } else {
        // Resolve (or reject) on disconnect
        this.once(State.Disconnected, resolve);
        this.websocket?.disconnect();
      }
    });
  }

  // PRIVATE/PROTECTED METHODS

  /**
   * Initiates a reconnect, taking into account configurable delays and number of reconnect attempts and failures.
   * Accepts a callback to invoke after any calculated delays.
   */
  private delayReconnectAttempt<T>(cb: () => Promise<T>): Promise<T> {
    this.numOfConsecutiveReconnectionFailures += 1;
    const msBeforeRetry = this.clientPingTimeoutMS * this.numOfConsecutiveReconnectionFailures;
    this.logger.debug(`Before trying to reconnect, this client will wait for ${msBeforeRetry} milliseconds`);
    return new Promise((res, _rej) => {
      setTimeout(() => {
        this.logger.debug('Continuing with reconnect...');
        this.emit(State.Reconnecting);
        cb.apply(this).then(res);
      }, msBeforeRetry);
    });
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
      this.numOfConsecutiveReconnectionFailures = 0;
      this.emit(State.Authenticated, resp);
      return resp.url;
    } catch (error) {
      // TODO: Python catches rate limit errors when interacting with this API: https://github.com/slackapi/python-slack-sdk/blob/main/slack_sdk/socket_mode/client.py#L51
      this.logger.error(`Failed to retrieve a new WSS URL (error: ${error})`);
      const err = error as WebAPICallError;
      let isRecoverable = true;
      if (err.code === APICallErrorCode.PlatformError &&
          (Object.values(UnrecoverableSocketModeStartError) as string[]).includes(err.data.error)) {
        isRecoverable = false;
      } else if (err.code === APICallErrorCode.RequestError) {
        isRecoverable = false;
      } else if (err.code === APICallErrorCode.HTTPError) {
        isRecoverable = false;
      }
      if (this.autoReconnectEnabled && isRecoverable) {
        return await this.delayReconnectAttempt(this.retrieveWSSURL);
      }
      throw error;
    }
  }

  /**
   * `onmessage` handler for the client's WebSocket.
   * This will parse the payload and dispatch the application-relevant events for each incoming message.
   * Mediates:
   * - raising the State.Connected event (when Slack sends a type:hello message)
   * - disconnecting the underlying socket (when Slack sends a type:disconnect message)
   */
  protected async onWebSocketMessage(data: WebSocket.RawData, isBinary: boolean): Promise<void> {
    if (isBinary) {
      this.logger.debug('Unexpected binary message received, ignoring.');
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

    // Slack has finalized the handshake with a hello message; we are good to go.
    if (event.type === 'hello') {
      this.emit(State.Connected);
      return;
    }

    // Slack is recycling the pod handling the connection (or otherwise requires the client to reconnect)
    if (event.type === 'disconnect') {
      this.logger.debug(`Received "${event.type}" (${event.reason}) message - disconnecting.${this.autoReconnectEnabled ? ' Will reconnect.' : ''}`);
      this.websocket?.disconnect();
      return;
    }

    // Define Ack, a helper method for acknowledging events incoming from Slack
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
      const wsState = this.websocket?.readyState;
      this.logger.debug(`send() method was called (WebSocket state: ${wsState ? WS_READY_STATES[wsState] : 'uninitialized'})`);
      if (this.websocket === undefined) {
        this.logger.error('Failed to send a message as the client is not connected');
        reject(sendWhileDisconnectedError());
      } else if (!this.websocket.isActive()) {
        this.logger.error('Failed to send a message as the client has no active connection');
        reject(sendWhileNotReadyError());
      } else {
        this.emit('outgoing_message', message);

        const flatMessage = JSON.stringify(message);
        this.logger.debug(`Sending a WebSocket message: ${flatMessage}`);
        this.websocket.send(flatMessage, (error) => {
          if (error) {
            this.logger.error(`Failed to send a WebSocket message (error: ${error})`);
            return reject(websocketErrorWithOriginal(error));
          }
          return resolve();
        });
      }
    });
  }
}

/* Instrumentation */
addAppMetadata({ name: packageJson.name, version: packageJson.version });

export default SocketModeClient;
