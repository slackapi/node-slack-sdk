import { LogLevel, Logger, getLogger } from './logger';
import { websocketErrorWithOriginal } from './errors';
import WebSocket from 'ws';
import { Agent } from 'http';
import { EventEmitter } from 'eventemitter3';

// Maps ws `readyState` to human readable labels https://github.com/websockets/ws/blob/HEAD/doc/ws.md#ready-state-constants
const WS_READY_STATES = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];

export interface SlackWebSocketOptions {
  /** @description The Slack WebSocket URL to connect to. */
  url: string;
  /** @description An instance of EventEmitter where socket-related events can be emitted to. */
  client: EventEmitter;
  /** @description A Logger instance used to log activity to. */
  logLevel?: LogLevel;
  /** @description Delay between this client sending a `ping` message, in milliseconds. */
  pingInterval?: number;
  /** @description The HTTP Agent to use when establishing a WebSocket connection. */
  httpAgent?: Agent;
}

/**
 * Encapsulates the Slack-specific details around establishing a WebSocket connection with the Slack backend.
 */
export class SlackWebSocket { // python equiv: Connection
  private static loggerName = 'SlackWebSocket';
  private url: SlackWebSocketOptions["url"]; 
  private pingInterval: SlackWebSocketOptions["pingInterval"];
  private httpAgent: SlackWebSocketOptions["httpAgent"];
  private client: SlackWebSocketOptions["client"];

  private logger: Logger;
  private websocket: WebSocket | null;

  public constructor({
    url,
    client,
    logLevel = LogLevel.INFO,
    httpAgent,
    pingInterval = 5000,
  }: SlackWebSocketOptions) {
    this.url = url;
    this.client = client;
    this.logger = getLogger(SlackWebSocket.loggerName, logLevel);
    this.httpAgent = httpAgent;
    this.pingInterval = pingInterval;
    this.websocket = null;
  }

  /**
   * Establishes a connection with the Slack backend
   */
  public connect() {
    const options: WebSocket.ClientOptions = {
      perMessageDeflate: false,
      agent: this.httpAgent,
    };

    const ws = new WebSocket(this.url, options);

    ws.addEventListener('open', (_event) => {
      this.logger.debug('WebSocket open event received (connection established)');
      this.websocket = ws;
    });
    ws.addEventListener('error', (event) => {
      this.logger.error(`WebSocket error occurred: ${event.message}`);
      this.client.emit('error', websocketErrorWithOriginal(event.error));
    });
    ws.on('message', this.client.emit);
    ws.on('close', (code: number, data: Buffer) => {
      this.logger.debug(`WebSocket close event received (code: ${code}, reason: ${data.toString()})`);
      this.client.emit('close', code, data);
    });

    // Confirm WebSocket connection is still active
    ws.on('ping', (data) => {
      if (this.pingPongLoggingEnabled) {
        this.logger.debug(`WebSocket received ping from Slack server (data: ${data.toString()})`);
      }
      this.startMonitoringPingFromSlack();
      // Since the `addEventListener` method does not accept listener with data arg in TypeScript,
      // we cast this function to any as a workaround
    });

    ws.on('pong', (data) => {
      if (this.pingPongLoggingEnabled) {
        this.logger.debug(`WebSocket received pong from Slack server (data: ${data.toString()})`);
      }
      this.lastPongReceivedTimestamp = new Date().getTime();
      // Since the `addEventListener` method does not accept listener with data arg in TypeScript,
      // we cast this function to any as a workaround
    });
  }

  public disconnect() {
    if (this.websocket) {
      this.websocket.removeAllListeners();
      this.websocket = null;
    }
  }

  /**
   * Returns true if the underlying WebSocket connection is active.
   */
  public isActive(): boolean { // python equiv: SocketModeClient.is_connected
    if (!this.websocket) {
      this.logger.debug(`isActive() response: websocket not instantiated!`);
      return false;
    }
    this.logger.debug(`isActive() response: websocket ready state is ${WS_READY_STATES[this.websocket.readyState]}`);
    return this.websocket.readyState === 1; // readyState=1 is "OPEN"
  }
}
