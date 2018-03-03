import { RTMClient, ErrorCode } from './';
import EventEmitter = require('eventemitter3'); // tslint:disable-line:import-name no-require-imports
import * as pjson from 'pjson';
import { LogLevel, Logger, LoggingFunc, getLogger, loggerFromLoggingFunc } from './logger';
import { errorWithCode } from './errors';

interface KeepAliveOptions {
  logger?: LoggingFunc;
  logLevel?: LogLevel;
  // how long (in ms) to wait before sending a ping message to keep the connection alive
  clientPingTimeout?: number;
  // how long (in ms) to wait for the acknowledgement of a ping message before considering the connection dead
  serverPongTimeout?: number; // NOTE: this must be less than clientPingTimeout
}

export class KeepAlive extends EventEmitter {

  private clientPingTimeout: number;
  private serverPongTimeout: number;

  private client?: RTMClient;
  private pingTimer?: NodeJS.Timer;
  private lastPing?: number; // messageId of the last ping message sent

  private static loggerName = `${pjson.name}:KeepAlive`;
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
    if (logger) {
      this.logger = loggerFromLoggingFunc(KeepAlive.loggerName, logger);
    } else {
      this.logger = getLogger(KeepAlive.loggerName);
    }
    this.logger.setLevel(logLevel);
  }

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

  public stop(): void {
    this.clearPreviousPingTimer();
    this.lastPing = this.client = undefined;
  }

  private clearPreviousPingTimer(): void {
    if (this.pingTimer !== undefined) {
      clearTimeout(this.pingTimer);
      delete this.pingTimer;
    }
  }

  private setPingTimer(): void {
    // if there's already an unacknowledged ping, we don't need to set up a timer for another to be sent
    if (this.lastPing !== undefined) {
      return;
    }

    this.logger.debug('setting ping timer');

    this.clearPreviousPingTimer();
    this.pingTimer = setTimeout(this.sendPing.bind(this), this.clientPingTimeout);
  }

  private sendPing(): void {
    this.logger.debug('ping timer expired');

    if (this.client === undefined) {
      throw errorWithCode(new Error('no client found'), ErrorCode.KeepAliveInconsistentState);
    }

    this.logger.info('sending ping');
    this.lastPing = this.client.send('ping');

    const attemptAcknowledgePong = function (this: KeepAlive, _type: string, event: any): void {
      if (this.client === undefined) {
        throw errorWithCode(new Error('no client found'), ErrorCode.KeepAliveInconsistentState);
      }

      if (this.lastPing !== undefined && event.reply_to !== undefined && event.reply_to >= this.lastPing) {
        // this message is a reply that acks the previous ping, clear the last ping
        this.logger.info('received pong, clearing pong timer');
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

      // no pong received to acknowledge the last ping within the serverPongTimeout,
      // lifecycle of this object is complete until websocket is disconnected and then this.reset() is called; there
      // is a listener set up in the constructor that will do exactly that
      this.logger.debug('pong timer expired');
      this.logger.info('recommend reconnect');
      this.emit('recommend_reconnect');

      // signal that this pong is done being handled
      this.client.off('slack_event', attemptAcknowledgePong);
    }, this.serverPongTimeout);

    this.client.on('slack_event', attemptAcknowledgePong, this);
  }
}
