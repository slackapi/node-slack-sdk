/** 
 * @module @slack/client/dist/KeepAlive
 */

/**
 * An object that monitors activity in an RTMClient and generates ping events in an effort to keep its websocket
 * connection alive. In cases where the websocket connection seems unresponsive, this object emits a
 * `recommend_reconnect` event. That event should be handled by tearing down the websocket connection and
 * opening a new one.
 * @extends EventEmitter
 */
export class KeepAlive {
  /**
   * Start monitoring the RTMClient. This method should only be called after the client's websocket is already open.
   * @param {module:@slack/client.RTMClient} client
   * @function module:@slack/client/dist/KeepAlive.KeepAlive#start
   */
  start() {}

  /**
   * Stop monitoring the RTMClient. This method should be called after the `recommend_reconnect` event is emitted and
   * the client's weboscket is closed. In order to start monitoring the client again, start() needs to be called again
   * after that.
   * @function module:@slack/client/dist/KeepAlive.KeepAlive#stop
   */
  stop() {}
}

/**
 * @interface module:@slack/client/dist/KeepAlive.KeepAliveOptions
 * @property {module:@slack/client.LoggingFunc} [logger]
 * @property {module:@slack/client/dist/logger.LogLevel} [logLevel]
 * @property {number} [clientPingTimeout]
 * @property {number} [serverPongTimeout]
 */
export class KeepAliveOptions {
}

