import { RTMClient, ErrorCode } from './';
import EventEmitter = require('eventemitter3'); // tslint:disable-line:import-name no-require-imports
import { LogLevel, Logger, LoggingFunc, getLogger, loggerFromLoggingFunc } from './logger';
import { errorWithCode } from './errors';
const pkg = require('../package.json'); // tslint:disable-line:no-require-imports no-var-requires

export interface KeepAliveOptions {
  logger?: LoggingFunc;
  logLevel?: LogLevel;
  // how long (in ms) to wait before sending a ping message to keep the connection alive
  clientPingTimeout?: number;
  // how long (in ms) to wait for the acknowledgement of a ping message before considering the connection dead
  serverPongTimeout?: number; // NOTE: this must be less than clientPingTimeout
}

/**
 * An object that monitors activity in an RTMClient and generates ping events in an effort to keep its websocket
 * connection alive. In cases where the websocket connection seems unresponsive, this object emits a
 * `recommend_reconnect` event. That event should be handled by tearing down the websocket connection and
 * opening a new one.
 */
export class KeepAlive extends EventEmitter {

  /**
   * The amount of time in milliseconds to wait after the last outgoing message from the client to generate a ping
   * message.
   */
  private clientPingTimeout: number;
  /**
   * The amount of time in milliseconds to wait after a ping message for the server to respond with a message that
   * replies to that ping (a pong) or some message after that.
   */
  private serverPongTimeout: number;

  /**
   * The RTMClient to monitor.
   */
  private client?: RTMClient;

  /**
   * A timer for when to send the next ping if no other outgoing message is sent.
   */
  private pingTimer?: NodeJS.Timer;

  /**
   * The message ID of the latest ping sent, or undefined is there hasn't been one sent.
   */
  private lastPing?: number;

  /**
   * The name used to prefix all logging generated from this object
   */
  private static loggerName = `${pkg.name}:KeepAlive`;

  /**
   * This object's logger instance
   */
  private logger: Logger;

  constructor({
    clientPingTimeout = 6000,
    serverPongTimeout = 4000,
    logger = undefined,
    logLevel = LogLevel.INFO,
  }: KeepAliveOptions = {}) {
    super();

    this.clientPingTimeout = clientPingTimeout;
    this.serverPongTimeout = serverPongTimeout;

    if (this.serverPongTimeout >= this.clientPingTimeout) {
      throw errorWithCode(
        new Error('client ping timeout must be less than server pong timeout'),
        ErrorCode.KeepAliveConfigError,
      );
    }

    // Logging
    if (logger !== undefined) {
      this.logger = loggerFromLoggingFunc(KeepAlive.loggerName, logger);
    } else {
      this.logger = getLogger(KeepAlive.loggerName);
    }
    this.logger.setLevel(logLevel);
  }

  /**
   * Start monitoring the RTMClient. This method should only be called after the client's websocket is already open.
   * @param client
   */
  public start(client: RTMClient): void {
    if (!client.connected) {
      throw errorWithCode(
        new Error(),
        ErrorCode.KeepAliveClientNotConnected,
      );
    }

    this.client = client;
    this.client.on('outgoing_message', this.setPingTimer, this);
    this.setPingTimer();
  }

  /**
   * Stop monitoring the RTMClient. This method should be called after the `recommend_reconnect` event is emitted and
   * the client's weboscket is closed. In order to start monitoring the client again, start() needs to be called again
   * after that.
   */
  public stop(): void {
    this.clearPreviousPingTimer();
    this.lastPing = this.client = undefined;
  }

  /**
   * Clears the ping timer if its set, otherwise this is a noop.
   */
  private clearPreviousPingTimer(): void {
    if (this.pingTimer !== undefined) {
      clearTimeout(this.pingTimer);
      delete this.pingTimer;
    }
  }

  /**
   * Sets the ping timer (including clearing any previous one).
   */
  private setPingTimer(): void {
    // if there's already an unacknowledged ping, we don't need to set up a timer for another to be sent
    if (this.lastPing !== undefined) {
      return;
    }

    this.logger.debug('setting ping timer');

    this.clearPreviousPingTimer();
    this.pingTimer = setTimeout(this.sendPing.bind(this), this.clientPingTimeout);
  }

  /**
   * Sends a ping and manages the timer to wait for a pong.
   */
  private sendPing(): void {
    try {
      if (this.client === undefined) {
        throw errorWithCode(new Error('no client found'), ErrorCode.KeepAliveInconsistentState);
      }
      this.logger.debug('ping timer expired, sending ping');
      this.client.send('ping')
        .then((messageId) => {
          if (this.client === undefined) {
            throw errorWithCode(new Error('no client found'), ErrorCode.KeepAliveInconsistentState);
          }

          this.lastPing = messageId;

          const attemptAcknowledgePong = function (this: KeepAlive, _type: string, event: any): void {
            if (this.client === undefined) {
              throw errorWithCode(new Error('no client found'), ErrorCode.KeepAliveInconsistentState);
            }

            if (this.lastPing !== undefined && event.reply_to !== undefined && event.reply_to >= this.lastPing) {
              // this message is a reply that acks the previous ping, clear the last ping
              this.logger.debug('received pong, clearing pong timer');
              delete this.lastPing;

              // signal that this pong is done being handled
              clearTimeout(pongTimer);
              this.client.off('slack_event', attemptAcknowledgePong);
            }
          };

          this.logger.debug('setting pong timer');
          const pongTimer = setTimeout(() => {
            if (this.client === undefined) {
              throw errorWithCode(new Error('no client found'), ErrorCode.KeepAliveInconsistentState);
            }

            // no pong received to acknowledge the last ping within the serverPongTimeout
            this.logger.debug('pong timer expired, recommend reconnect');
            this.emit('recommend_reconnect');

            // signal that this pong is done being handled
            this.client.off('slack_event', attemptAcknowledgePong);
          }, this.serverPongTimeout);

          this.client.on('slack_event', attemptAcknowledgePong, this);
        })
        .catch((error) => {
          this.logger.error(`Unhandled error: ${error.message}. Please report to @slack/client package maintainers.`);
        });
    } catch (error) {
      this.logger.error(`Unhandled error: ${error.message}. Please report to @slack/client package maintainers.`);
    }
  }
}
