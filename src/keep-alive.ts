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

// TODO: come up with a better name
export class KeepAlive extends EventEmitter {

  private client: RTMClient;
  private clientPingTimeout: number;
  private serverPongTimeout: number;

  private pingTimer?: NodeJS.Timer;
  private lastPing?: number; // messageId of the last ping message sent

  private static loggerName = `${pjson.name}:KeepAlive`;
  private logger: Logger;

  constructor(client: RTMClient, {
    clientPingTimeout = 6000,
    serverPongTimeout = 4000,
    logger = undefined,
    logLevel = LogLevel.INFO,
  }: KeepAliveOptions = {}) {
    super();

    this.client = client;
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

    // Initialization
    this.client.on('hello', this.setPingTimer, this);
    this.client.on('outgoing_message', this.setPingTimer, this);
    this.client.on('ws_close', this.reset, this);
  }

  public reset(): void {
    delete this.lastPing;
    this.clearPreviousPingTimer();
  }

  public dispose(): void {
    this.reset();
    delete this.client;
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
    this.logger.info('sending ping');
    this.lastPing = this.client.send('ping');

    const attemptAcknowledgePong = function (this: KeepAlive, data: string): void {
      let event;
      try {
        event = JSON.parse(data);
      } catch (parseError) {
        this.logger.error('a raw message could not be parsed');
      }

      if (this.lastPing !== undefined && event.reply_to !== undefined && event.reply_to >= this.lastPing) {
        // this message is a pong which acknowledged the previous ping, clear its state
        this.logger.info('received pong');
        delete this.lastPing;

        // signal that this pong is done being handled
        clearTimeout(pongTimer);
        this.client.off('raw_message', attemptAcknowledgePong);
      }
    };

    // TODO: implement an event for only reply messages?
    this.client.on('raw_message', attemptAcknowledgePong, this);
    const pongTimer = setTimeout(() => {
      // no pong received to acknowledge the last ping within the serverPongTimeout,
      // lifecycle of this object is complete until reset() is called
      this.logger.debug('pong timer expired');
      this.logger.info('recommend reconnect');
      this.emit('recommend_reconnect');

      // signal that this pong is done being handled
      this.client.off('raw_message', attemptAcknowledgePong);
    }, this.serverPongTimeout);
  }
}
