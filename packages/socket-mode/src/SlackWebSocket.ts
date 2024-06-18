import { Agent } from 'http';

import { EventEmitter } from 'eventemitter3';
import { WebSocket, ClientOptions as WebSocketClientOptions } from 'ws';

import { websocketErrorWithOriginal } from './errors';
import log, { LogLevel, Logger } from './logger';

// Maps ws `readyState` to human readable labels https://github.com/websockets/ws/blob/HEAD/doc/ws.md#ready-state-constants
export const WS_READY_STATES = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];

export interface SlackWebSocketOptions {
  /** @description The Slack WebSocket URL to connect to. */
  url: string;
  /** @description An instance of EventEmitter where socket-related events can be emitted to. */
  client: EventEmitter;
  /** @description A LogLevel at which this class should log to. */
  logLevel?: LogLevel;
  /** @description A Logger instance used to log activity to. */
  logger?: Logger,
  /** @description Delay between this client sending a `ping` message, in milliseconds. */
  pingInterval?: number;
  /** @description The HTTP Agent to use when establishing a WebSocket connection. */
  httpAgent?: Agent;
  /** @description Whether this WebSocket should DEBUG log ping and pong events. `false` by default. */
  pingPongLoggingEnabled?: boolean;
  /**
   * @description How many milliseconds to wait between ping events from the server before deeming the connection
   * stale. Defaults to 30,000.
   */
  serverPingTimeoutMS: number;
  /**
   * @description How many milliseconds to wait between ping events from the server before deeming the connection
   * stale. Defaults to 5,000.
   */
  clientPingTimeoutMS: number;
}

/**
 * Encapsulates the Slack-specific details around establishing a WebSocket connection with the Slack backend.
 * Manages the ping/pong heartbeat of the connection.
 */
export class SlackWebSocket { // python equiv: Connection
  private static loggerName = 'SlackWebSocket';

  private options: SlackWebSocketOptions;

  private logger: Logger;

  private websocket: WebSocket | null;

  /**
   * The last timetamp that this WebSocket received pong from the server
   */
  private lastPongReceivedTimestamp: number | undefined;

  /**
   * Sentinel checking if Slack sent us a close frame or not, in order to be able
   * to terminate underlying socket gracefully.
   */
  private closeFrameReceived: boolean;

  /**
   * Reference to the timeout timer we use to listen to pings from the server
   */
  private serverPingTimeout: NodeJS.Timeout | undefined;

  /**
   * Reference to the timeout timer we use to listen to pongs from the server
   */
  private clientPingTimeout: NodeJS.Timeout | undefined;

  public constructor({
    url,
    client,
    httpAgent,
    logger,
    logLevel = LogLevel.INFO,
    pingInterval = 5000,
    pingPongLoggingEnabled = false,
    serverPingTimeoutMS = 30000,
    clientPingTimeoutMS = 5000,
  }: SlackWebSocketOptions) {
    this.options = {
      url,
      client,
      httpAgent,
      logLevel,
      pingInterval,
      pingPongLoggingEnabled,
      serverPingTimeoutMS,
      clientPingTimeoutMS,
    };
    if (logger) {
      this.logger = logger;
    } else {
      this.logger = log.getLogger(SlackWebSocket.loggerName, logLevel);
    }
    this.websocket = null;
    this.closeFrameReceived = false;
  }

  /**
   * Establishes a connection with the Slack backend
   */
  public connect(): void {
    this.logger.debug('Initiating new WebSocket connection.');
    const options: WebSocketClientOptions = {
      perMessageDeflate: false,
      agent: this.options.httpAgent,
    };

    const ws = new WebSocket(this.options.url, options);

    ws.addEventListener('open', (_event) => {
      this.logger.debug('WebSocket open event received (connection established)!');
      this.websocket = ws;
      this.monitorPingToSlack();
    });
    ws.addEventListener('error', (event) => {
      this.logger.error(`WebSocket error occurred: ${event.message}`);
      this.disconnect();
      this.options.client.emit('error', websocketErrorWithOriginal(event.error));
    });
    ws.on('message', (msg, isBinary) => {
      this.options.client.emit('message', msg, isBinary);
    });
    ws.on('close', (code: number, data: Buffer) => {
      this.logger.debug(`WebSocket close frame received (code: ${code}, reason: ${data.toString()})`);
      this.closeFrameReceived = true;
      this.disconnect();
    });

    // Confirm WebSocket connection is still active
    ws.on('ping', (data) => {
      // Note that ws' `autoPong` option is true by default, so no need to respond to ping.
      // see https://github.com/websockets/ws/blob/2aa0405a5e96754b296fef6bd6ebdfb2f11967fc/doc/ws.md#new-websocketaddress-protocols-options
      if (this.options.pingPongLoggingEnabled) {
        this.logger.debug(`WebSocket received ping from Slack server (data: ${data.toString()})`);
      }
      this.monitorPingFromSlack();
    });

    ws.on('pong', (data) => {
      if (this.options.pingPongLoggingEnabled) {
        this.logger.debug(`WebSocket received pong from Slack server (data: ${data.toString()})`);
      }
      this.lastPongReceivedTimestamp = new Date().getTime();
    });
  }

  /**
   * Disconnects the WebSocket connection with Slack, if connected.
   */
  public disconnect(): void {
    if (this.websocket) {
      // Disconnecting a WebSocket involves a close frame handshake so we check if we've already received a close frame.
      // If so, we can terminate the underlying socket connection and let the client know.
      if (this.closeFrameReceived) {
        this.logger.debug('Terminating WebSocket (close frame received).');
        this.terminate();
      } else {
        // If we haven't received a close frame yet, then we send one to the peer, expecting to receive a close frame
        // in response.
        this.logger.debug('Sending close frame (status=1000).');
        this.websocket.close(1000); // send a close frame, 1000=Normal Closure
      }
    } else {
      this.logger.debug('WebSocket already disconnected, flushing remainder.');
      this.terminate();
    }
  }

  /**
   * Clean up any underlying intervals, timeouts and the WebSocket.
   */
  private terminate(): void {
    this.websocket?.removeAllListeners();
    this.websocket?.terminate();
    this.websocket = null;
    clearTimeout(this.serverPingTimeout);
    clearInterval(this.clientPingTimeout);
    // Emit event back to client letting it know connection has closed (in case it needs to reconnect if
    // reconnecting is enabled)
    this.options.client.emit('close');
  }

  /**
   * Returns true if the underlying WebSocket connection is active, meaning the underlying
   * {@link https://github.com/websockets/ws/blob/master/doc/ws.md#ready-state-constants WebSocket ready state is "OPEN"}.
   */
  public isActive(): boolean { // python equiv: SocketModeClient.is_connected
    if (!this.websocket) {
      this.logger.debug('isActive(): websocket not instantiated!');
      return false;
    }
    this.logger.debug(`isActive(): websocket ready state is ${WS_READY_STATES[this.websocket.readyState]}`);
    return this.websocket.readyState === 1; // readyState=1 is "OPEN"
  }

  /**
   * Retrieve the underlying WebSocket readyState. Returns `undefined` if the WebSocket has not been instantiated,
   * otherwise will return a number between 0 and 3 inclusive representing the ready states.
   * The ready state constants are documented in the {@link https://github.com/websockets/ws/blob/master/doc/ws.md#ready-state-constants `ws` API docs }
   */
  public get readyState(): number | undefined {
    return this.websocket?.readyState;
  }

  /**
   * Sends data via the underlying WebSocket. Accepts an errorback argument.
   */
  public send(data: string, cb: ((err: Error | undefined) => void)): void {
    return this.websocket?.send(data, cb);
  }

  /**
   * Confirms WebSocket connection is still active; fires whenever a ping event is received
   * If we don't receive another ping from the peer before the timeout, we initiate closing the connection.
   */
  private monitorPingFromSlack(): void {
    clearTimeout(this.serverPingTimeout);
    this.serverPingTimeout = setTimeout(() => {
      this.logger.warn(`A ping wasn't received from the server before the timeout of ${this.options.serverPingTimeoutMS}ms!`);
      this.disconnect();
    }, this.options.serverPingTimeoutMS);
  }

  /**
   * Monitors WebSocket connection health; sends a ping to peer, and expects a pong within a certain timeframe.
   * If that expectation is not met, we disconnect the websocket.
   */
  private monitorPingToSlack(): void {
    this.lastPongReceivedTimestamp = undefined;
    let pingAttemptCount = 0;
    clearInterval(this.clientPingTimeout);
    this.clientPingTimeout = setInterval(() => {
      const now = new Date().getTime();
      try {
        const pingMessage = `Ping from client (${now})`;
        this.websocket?.ping(pingMessage);
        if (this.lastPongReceivedTimestamp === undefined) {
          pingAttemptCount += 1;
        } else {
          // if lastPongReceivedTimestamp is defined, then the server has responded to pings at some point in the past
          pingAttemptCount = 0;
        }
        if (this.options.pingPongLoggingEnabled) {
          this.logger.debug(`Sent ping to Slack: ${pingMessage}`);
        }
      } catch (e) {
        this.logger.error(`Failed to send ping to Slack (error: ${e})`);
        this.disconnect();
        return;
      }
      // default invalid state is: sent > 3 pings to the server and it never responded with a pong
      let isInvalid: boolean = pingAttemptCount > 3;
      if (this.lastPongReceivedTimestamp !== undefined) {
        // secondary invalid state is: if we did receive a pong from the server,
        // has the elapsed time since the last pong exceeded the client ping timeout
        const millis = now - this.lastPongReceivedTimestamp;
        isInvalid = millis > this.options.clientPingTimeoutMS;
      }
      if (isInvalid) {
        this.logger.warn(`A pong wasn't received from the server before the timeout of ${this.options.clientPingTimeoutMS}ms!`);
        this.disconnect();
      }
    }, this.options.clientPingTimeoutMS / 3);
    this.logger.debug('Started monitoring pings to and pongs from Slack.');
  }
}
