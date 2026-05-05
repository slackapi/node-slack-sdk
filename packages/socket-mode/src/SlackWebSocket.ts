import { channel } from 'node:diagnostics_channel';

import type { EventEmitter } from 'eventemitter3';
import { CloseEvent, type Dispatcher, ErrorEvent, MessageEvent, ping, WebSocket } from 'undici';

import { websocketErrorWithOriginal } from './errors';
import log, { type Logger, LogLevel } from './logger';

export const WS_READY_STATES = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];

interface PingPongMessage {
  websocket: WebSocket;
  payload: Buffer;
}

function isPingPongMessage(message: unknown): message is PingPongMessage {
  if (typeof message !== 'object' || message === null) {
    return false;
  }
  if (!('websocket' in message && message.websocket instanceof WebSocket)) {
    return false;
  }
  if (!('payload' in message && Buffer.isBuffer(message.payload))) {
    return false;
  }
  return true;
}

export interface SlackWebSocketOptions {
  /** @description The Slack WebSocket URL to connect to. */
  url: string;
  /** @description An instance of EventEmitter where socket-related events can be emitted to. */
  client: EventEmitter;
  /** @description A LogLevel at which this class should log to. */
  logLevel?: LogLevel;
  /** @description A Logger instance used to log activity to. */
  logger?: Logger;
  /** @description Delay between this client sending a `ping` message, in milliseconds. */
  pingInterval?: number;
  /** @description An undici Dispatcher used to establish the WebSocket connection (e.g. ProxyAgent). */
  dispatcher?: Dispatcher;
  /** @description Whether this WebSocket should DEBUG log ping and pong events. `false` by default. */
  pingPongLoggingEnabled?: boolean;
  /**
   * @description How many milliseconds to wait between ping events from the server before deeming the connection
   * stale. Defaults to 30,000.
   */
  serverPingTimeoutMS: number;
  /**
   * @description How many milliseconds to wait for a pong response after sending a ping before deeming the connection
   * stale. Defaults to 5,000.
   */
  clientPingTimeoutMS: number;
}

/**
 * Encapsulates the Slack-specific details around establishing a WebSocket connection with the Slack backend.
 * Manages the ping/pong heartbeat of the connection.
 */
export class SlackWebSocket {
  // python equiv: Connection
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

  private openHandler: (() => void) | null = null;
  private errorHandler: ((event: Event) => void) | null = null;
  private messageHandler: ((event: Event) => void) | null = null;
  private closeHandler: ((event: Event) => void) | null = null;

  private pingHandler: ((message: unknown) => void) | null = null;
  private pongHandler: ((message: unknown) => void) | null = null;

  private static pingChannel = channel('undici:websocket:ping');
  private static pongChannel = channel('undici:websocket:pong');

  public constructor({
    url,
    client,
    dispatcher,
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
      dispatcher,
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

    this.websocket = new WebSocket(this.options.url, { dispatcher: this.options.dispatcher });

    this.openHandler = () => {
      this.logger.debug('WebSocket open event received (connection established)!');
      this.monitorPingToSlack();
    };
    this.websocket.addEventListener('open', this.openHandler);

    this.errorHandler = (event: Event) => {
      if (!(event instanceof ErrorEvent)) {
        this.logger.warn(`Expected ErrorEvent but received ${event.constructor.name} (type: ${event.type})`);
        return;
      }
      this.logger.error(`WebSocket error occurred: ${event.message}`);
      this.disconnect();
      this.options.client.emit('error', websocketErrorWithOriginal(event.error ?? new Error(event.message)));
    };
    this.websocket.addEventListener('error', this.errorHandler);

    this.messageHandler = (event: Event) => {
      if (!(event instanceof MessageEvent)) {
        this.logger.warn(`Expected MessageEvent but received ${event.constructor.name} (type: ${event.type})`);
        return;
      }
      const isBinary = typeof event.data !== 'string';
      this.options.client.emit('ws_message', event.data, isBinary);
    };
    this.websocket.addEventListener('message', this.messageHandler);

    this.closeHandler = (event: Event) => {
      if (!(event instanceof CloseEvent)) {
        this.logger.warn(`Expected CloseEvent but received ${event.constructor.name} (type: ${event.type})`);
        return;
      }
      this.logger.debug(`WebSocket close frame received (code: ${event.code}, reason: ${event.reason})`);
      this.closeFrameReceived = true;
      this.disconnect();
    };
    this.websocket.addEventListener('close', this.closeHandler);

    // Subscribe to undici diagnostics_channel for WebSocket ping/pong frame events.
    // These channels fire for ALL undici WebSocket instances, so we filter by matching instance.
    this.pingHandler = (message: unknown) => {
      if (!isPingPongMessage(message)) {
        this.logger.warn('Received unexpected ping diagnostics message format');
        return;
      }
      if (message.websocket !== this.websocket) return;
      if (this.options.pingPongLoggingEnabled) {
        this.logger.debug(`WebSocket received ping from Slack server (data: ${message.payload?.toString()})`);
      }
      this.monitorPingFromSlack();
    };
    SlackWebSocket.pingChannel.subscribe(this.pingHandler);

    this.pongHandler = (message: unknown) => {
      if (!isPingPongMessage(message)) {
        this.logger.warn('Received unexpected pong diagnostics message format');
        return;
      }
      if (message.websocket !== this.websocket) return;
      if (this.options.pingPongLoggingEnabled) {
        this.logger.debug(`WebSocket received pong from Slack server (data: ${message.payload?.toString()})`);
      }
      this.lastPongReceivedTimestamp = Date.now();
    };
    SlackWebSocket.pongChannel.subscribe(this.pongHandler);
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
        this.cleanup();
      } else if (this.websocket.readyState === WebSocket.CLOSING) {
        // A close frame was already sent but the peer hasn't responded. Force-terminate rather than
        // waiting for the ws library's closeTimeout (~30s) while the ping monitor logs repeated warnings.
        this.logger.debug('Terminating WebSocket (close frame sent but no response, force-terminating).');
        this.cleanup();
      } else {
        // If we haven't received a close frame yet, then we send one to the peer, expecting to receive a close frame
        // in response.
        this.logger.debug('Sending close frame (status=1000).');
        this.websocket.close(1000); // 1000 = Normal Closure
      }
    } else {
      this.logger.debug('WebSocket already disconnected, flushing remainder.');
      this.cleanup();
    }
  }

  /**
   * Clean up any underlying intervals, timeouts and the WebSocket.
   */
  private cleanup(): void {
    if (this.websocket) {
      if (this.openHandler) this.websocket.removeEventListener('open', this.openHandler);
      if (this.errorHandler) this.websocket.removeEventListener('error', this.errorHandler);
      if (this.messageHandler) this.websocket.removeEventListener('message', this.messageHandler);
      if (this.closeHandler) this.websocket.removeEventListener('close', this.closeHandler);
    }
    this.openHandler = null;
    this.errorHandler = null;
    this.messageHandler = null;
    this.closeHandler = null;
    if (this.pingHandler) SlackWebSocket.pingChannel.unsubscribe(this.pingHandler);
    if (this.pongHandler) SlackWebSocket.pongChannel.unsubscribe(this.pongHandler);
    this.pingHandler = null;
    this.pongHandler = null;
    this.websocket = null;
    clearTimeout(this.serverPingTimeout);
    clearInterval(this.clientPingTimeout);
    // Emit event back to client letting it know connection has closed (in case it needs to reconnect if
    // reconnecting is enabled)
    this.options.client.emit('close');
  }

  /**
   * Returns true if the underlying WebSocket connection is active, meaning the underlying
   */
  public isActive(): boolean {
    // python equiv: SocketModeClient.is_connected
    if (!this.websocket) {
      this.logger.debug('isActive(): websocket not instantiated!');
      return false;
    }
    this.logger.debug(`isActive(): websocket ready state is ${WS_READY_STATES[this.websocket.readyState]}`);
    return this.websocket.readyState === WebSocket.OPEN;
  }

  /**
   * Retrieve the underlying WebSocket readyState. Returns `undefined` if the WebSocket has not been instantiated,
   * otherwise will return a number between 0 and 3 inclusive representing the ready states.
   */
  public get readyState(): number | undefined {
    return this.websocket?.readyState;
  }

  /**
   * Sends data via the underlying WebSocket. Accepts an errorback argument.
   */
  public send(data: string, cb: (err: Error | undefined) => void): void {
    try {
      this.websocket?.send(data);
      cb(undefined);
    } catch (err) {
      cb(err as Error);
    }
  }

  /**
   * Confirms WebSocket connection is still active; fires whenever a ping event is received
   * If we don't receive another ping from the peer before the timeout, we initiate closing the connection.
   */
  private monitorPingFromSlack(): void {
    clearTimeout(this.serverPingTimeout);
    this.serverPingTimeout = setTimeout(() => {
      this.logger.warn(
        `A ping wasn't received from the server before the timeout of ${this.options.serverPingTimeoutMS}ms!`,
      );
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
      const now = Date.now();
      try {
        const pingMessage = `Ping from client (${now})`;
        if (!this.websocket) {
          this.logger.error('WebSocket not available, skipping ping.');
          return;
        }
        ping(this.websocket, Buffer.from(pingMessage));
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
        this.logger.warn(
          `A pong wasn't received from the server before the timeout of ${this.options.clientPingTimeoutMS}ms!`,
        );
        this.disconnect();
      }
    }, this.options.clientPingTimeoutMS / 3);
    this.logger.debug('Started monitoring pings to and pongs from Slack.');
  }
}
