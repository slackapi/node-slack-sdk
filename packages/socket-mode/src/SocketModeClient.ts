import { EventEmitter } from 'eventemitter3';
import WebSocket from 'ws'; // tslint:disable-line:import-name
import Finity, { StateMachine } from 'finity'; // tslint:disable-line:import-name
import {
  WebClient,
  WebAPICallResult,
  WebAPICallError,
  ErrorCode as APICallErrorCode,
  RetryOptions,
  // TLSOptions,
  addAppMetadata,
  WebClientOptions,
} from '@slack/web-api';

import { KeepAlive } from './KeepAlive';
import { LogLevel, Logger, getLogger } from './logger';
import {
  websocketErrorWithOriginal,
  sendWhileDisconnectedError,
  sendWhileNotReadyError,
} from './errors';

const packageJson = require('../package.json'); // tslint:disable-line:no-require-imports no-var-requires

/**
 * An Socket Mode Client allows programs to communicate with the
 * [Slack Platform's Events API](https://api.slack.com/events-api) over a websocket.
 * This object uses the EventEmitter pattern to dispatch incoming events and has a built in send method to
 * acknowledge incoming events over the websocket.
 */
export class SocketModeClient extends EventEmitter {
  /**
   * Whether or not the client is currently connected to the web socket
   */
  public connected: boolean = false;

  /**
   * Whether or not the client has authenticated to the Socket Mode API. This occurs when the connect method
   * completes, and a WebSocket URL is available for the client's connection.
   */
  public authenticated: boolean = false;

  // public listenerIterator: AsyncGenerator | undefined;

  /**
   * Whether this client will automatically reconnect when (not manually) disconnected
   */
  private autoReconnect: boolean;

  /**
   * The number of milliseconds to wait upon connection for reply messages from the previous connection. The default
   * value is 2 seconds.
   */
  // private replyAckOnReconnectTimeout: number;

  /**
   * State machine that backs the transition and action behavior
   */
  private stateMachine: StateMachine<string, string>;

  /**
   * Configuration for the state machine
   */
  private stateMachineConfig = Finity
    .configure()
      .initialState('disconnected')
        .on('start').transitionTo('connecting')
        // .onEnter(() => {})
      .state('connecting')
        .submachine(Finity.configure()
          .initialState('authenticating')
            .do(() => {
              // TODO: change this to apps.connections.open after rename
              return this.webClient.apiCall('relay.connect').then((result: WebAPICallResult) => {
                return result;
              }).catch((error) => {
                console.log(error);
              });
            })
              .onSuccess().transitionTo('authenticated')
              .onFailure()
                .transitionTo('reconnecting').withCondition((context) => {
                  const error = context.error as WebAPICallError;
                  this.logger.info('here');
                  this.logger.info(`unable to Socket Mode start: ${error.message}`);

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

                  return this.autoReconnect && isRecoverable;
                })
                .transitionTo('failed')
          .state('authenticated')
            .onEnter((_state, context) => {
              this.authenticated = true;
              this.setupWebsocket(context.result.url);
              setImmediate(() => {
                this.emit('authenticated', context.result);
              });
            })
            .on('websocket open').transitionTo('handshaking')
          .state('handshaking') // a state in which to wait until the 'server hello' event
          .state('failed')
            .onEnter((_state, context) => {
              // dispatch 'failure' on parent machine to transition out of this submachine's states
              this.stateMachine.handle('failure', context.error);
            })
          .global()
            .onStateEnter((state) => {
              this.logger.debug(`transitioning to state: connecting:${state}`);
            })
        .getConfig())
        .on('server hello').transitionTo('connected')
        .on('websocket close')
          .transitionTo('reconnecting').withCondition(() => this.autoReconnect)
          .transitionTo('disconnected').withAction(() => {
            // this transition circumvents the 'disconnecting' state (since the websocket is already closed), so we need
            // to execute its onExit behavior here.
            this.teardownWebsocket();
          })
        .on('failure').transitionTo('disconnected')
        .on('explicit disconnect').transitionTo('disconnecting')
      .state('connected')
        .onEnter(() => {
          this.connected = true;
        })
        .submachine(Finity.configure()
          .initialState('ready')
            .onEnter(() => {
              // this.keepAlive.start(this);
              // the transition isn't done yet, so we delay the following statement until after the event loop returns
              setImmediate(() => {
                this.emit('ready');
              });
            })
            // tslint:disable-next-line: max-line-length
            .on('server disconnect warning').transitionTo('refreshing-connection').withCondition(() => this.autoReconnect)
            .on('server disconnect old socket').transitionTo('closing-socket')
          .state('refreshing-connection')
            .submachine(Finity.configure()
            .initialState('authenticating')
              .do(() => {

                return this.webClient.apiCall('relay.connect').then((result: WebAPICallResult) => {
                  return result;
                }).catch((error) => {
                  console.log(error);
                });
              })
                .onSuccess().transitionTo('authenticated')
                .onFailure()
                  .transitionTo('authenticating').withCondition((context) => {
                    const error = context.error as WebAPICallError;
                    this.logger.info('here');
                    this.logger.info(`unable to Socket Mode start: ${error.message}`);

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

                    return this.autoReconnect && isRecoverable;
                  })
                  .transitionTo('failed')
            .state('authenticated')
              .onEnter((_state, context) => {
                this.authenticated = true;
                this.setupWebsocket(context.result.url);
                setImmediate(() => {
                  this.emit('authenticated', context.result);
                });
              })
              .on('websocket open').transitionTo('handshaking')
            .state('handshaking') // a state in which to wait until the 'server hello' event
            .state('failed')
              .onEnter((_state, context) => {
                // dispatch 'failure' on parent machine to transition out of this submachine's states
                this.stateMachine.handle('failure', context.error);
              })
            .global()
              .onStateEnter((state) => {
                this.logger.debug(`transitioning to state: refreshing-connection:${state}`);
              })
          .getConfig())
          .on('server hello').transitionTo('ready')
          .on('websocket close')
            .transitionTo('authenticating').withCondition(() => this.autoReconnect)
            .transitionTo('disconnected').withAction(() => {
              // this transition circumvents the 'disconnecting' state (since the websocket is already closed),
              // so we need to execute its onExit behavior here.
              this.teardownWebsocket();
            })
          .on('failure').transitionTo('disconnected')
          .on('explicit disconnect').transitionTo('disconnecting')
          .state('closing-socket')
            .do(() => {
              this.keepAlive.stop();
              return Promise.resolve(true);
            })
            .onSuccess().transitionTo('ready')
            .onExit(() => this.teardownWebsocket())
          .global()
            .onStateEnter((state) => {
              this.logger.debug(`transitioning to state: connected:${state}`);
            })
        .getConfig())
        .on('server disconnect warning').transitionTo('refreshing-connection').withCondition(() => this.autoReconnect)
        .on('websocket close')
          .transitionTo('reconnecting').withCondition(() => this.autoReconnect)
          .transitionTo('disconnected').withAction(() => {
            // this transition circumvents the 'disconnecting' state (since the websocket is already closed), so we need
            // to execute its onExit behavior here.
            this.teardownWebsocket();
          })
        .on('explicit disconnect').transitionTo('disconnecting')
        .onExit(() => {
          this.connected = false;
          this.authenticated = false;

          this.keepAlive.stop();
        })
      .state('disconnecting')
        .onEnter(() => {
          // Most of the time, a websocket will exist. The only time it does not is when transitioning from connecting,
          // before the client.start() has finished and the websocket hasn't been set up.
          if (this.websocket !== undefined) {
            this.websocket.close();
          }
        })
        .on('websocket close').transitionTo('disconnected')
        .onExit(() => this.teardownWebsocket())
      // reconnecting is just like disconnecting, except that the websocket should already be closed before we enter
      // this state, and that the next state should be connecting.
      .state('reconnecting')
        .do(() => {
          this.keepAlive.stop();
          return Promise.resolve(true);
        })
          .onSuccess().transitionTo('connecting')
        .onExit(() => this.teardownWebsocket())
      .global()
        .onStateEnter((state, context) => {
          this.logger.debug(`transitioning to state: ${state}`);
          if (state === 'disconnected') {
            // Emits a `disconnected` event with a possible error object (might be undefined)
            this.emit(state, context.eventPayload);
          } else {
            // Emits events: `connecting`, `connected`, `disconnecting`, `reconnecting`
            this.emit(state);
          }
        })
    .getConfig();

  /**
   * The client's websockets
   */
  private websocket?: WebSocket;
  private secondaryWebsocket?: WebSocket;

  /**
   * The instance of KeepAlive used to monitor this client's connection.
   */
  private keepAlive: KeepAlive;

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
   *
   */
  private clientOptions: WebClientOptions;

  constructor({
    logger = undefined,
    logLevel = LogLevel.INFO,
    autoReconnect = true,
    clientPingTimeout,
    serverPongTimeout,
    token = undefined,
    clientOptions = {},
    // retryConfig,
  }: SocketModeOptions = {}) {
    super();

    if (token === undefined) {
      throw new Error('Must provide an App Level Token when initalizing a Socket Mode Client');
    }

    // Setup the logger
    if (typeof logger !== 'undefined') {
      this.logger = logger;
      if (typeof logLevel !== 'undefined') {
        this.logger.debug('The logLevel given to Socket Mode was ignored as you also gave logger');
      }
    } else {
      this.logger = getLogger(SocketModeClient.loggerName, logLevel, logger);
    }

    this.clientOptions = clientOptions;

    this.webClient = new WebClient('', {
      logLevel: this.logger.getLevel(),
      headers: { Authorization: `Bearer ${token}` },
      ...clientOptions,
    });

    this.autoReconnect = autoReconnect;

    this.keepAlive = new KeepAlive({
      clientPingTimeout,
      serverPongTimeout,
      logger,
      logLevel,
    });
    // this.keepAlive.on(
    //   'recommend_reconnect',
    //   () => {
    //     console.log('recommend_reconnect');
    //     if (this.websocket !== undefined) {
    //       // this will trigger the 'websocket close' event on the state machine, which transitions to clean up
    //       this.websocket.close();

    //       // if the websocket actually is no longer connected, the eventual 'websocket close' event will take a long
    //    // time, because it won't fire until the close handshake completes. in the meantime, stop the keep alive so we
    //       // don't send pings on a dead connection.
    //       this.keepAlive.stop();
    //     }
    //   },
    //   this,
    // );

    this.stateMachine = Finity.start(this.stateMachineConfig);

    this.logger.debug('initialized');
  }

  /**
   * Begin an Socket Mode session. This method must be called before any messages can
   * be sent or received.
   */
  public start(): Promise<WebAPICallResult> {
    this.logger.debug('start()');

    // delegate behavior to state machine
    this.stateMachine.handle('start');

    // return a promise that resolves with the connection information
    return new Promise((resolve, reject) => {
      this.once('authenticated', (result) => {
        this.removeListener('disconnected', reject);
        resolve(result);
      });
      this.once('disconnected', (err) => {
        this.removeListener('authenticated', resolve);
        reject(err);
      });
    });
  }

  /**
   * End a Socket Mode session. After this method is called no messages will be sent or received unless you call
   * start() again later.
   */
  public disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.logger.debug('manual disconnect');

      // resolve (or reject) on disconnect
      this.once('disconnected', (err) => {
        if (err instanceof Error) {
          reject(err);
        } else {
          resolve();
        }
      });

      // delegate behavior to state machine
      this.stateMachine.handle('explicit disconnect');
    });
  }

  /**
   * Method for sending an outgoing message of an arbitrary type over the websocket connection.
   * Primarily used to send acknowledgements back to slack for incoming events
   * @param id the envelope id
   * @param body the message body
   */
  // TODO: rename relay_id to envelope_id
  public send(id: string, body = {}): Promise<void> {
    const message = { relay_id: id, ...body };

    return new Promise((resolve, reject) => {
      this.logger.debug(`send() in state: ${this.stateMachine.getStateHierarchy()}`);
      if (this.websocket === undefined) {
        this.logger.error('cannot send message when client is not connected');
        reject(sendWhileDisconnectedError());
      } else if (!(this.stateMachine.getCurrentState() === 'connected' &&
                 this.stateMachine.getStateHierarchy()[1] === 'ready')) {
        this.logger.error('cannot send message when client is not ready');
        reject(sendWhileNotReadyError());
      } else {
        this.emit('outgoing_message', message);

        const flatMessage = JSON.stringify(message);
        this.logger.debug(`sending message on websocket: ${flatMessage}`);

        this.websocket.send(flatMessage, (error) => {
          if (error !== undefined) {
            this.logger.error(`failed to send message on websocket: ${error.message}`);
            return reject(websocketErrorWithOriginal(error));
          }
          resolve();
        });
      }
    });
  }

  /**
   * Set up method for the client's websocket instance. This method will attach event listeners.
   */
  private setupWebsocket(url: string): void {
    // initialize the websocket
    const options: WebSocket.ClientOptions = {
      perMessageDeflate: false,
      ...this.clientOptions.tls,
      ...this.clientOptions.agent,
    };

    let websocket;
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
    websocket.addEventListener('open', event => this.stateMachine.handle('websocket open', event));
    websocket.addEventListener('close', event => this.stateMachine.handle('websocket close', event));
    websocket.addEventListener('error', (event) => {
      this.logger.error(`A websocket error occurred: ${event.message}`);
      this.emit('error', websocketErrorWithOriginal(event.error));
    });
    websocket.addEventListener('message', this.onWebsocketMessage.bind(this));
  }

  /**
   * Tear down method for the client's websocket instance. This method undoes the work in setupWebsocket(url).
   */
  private teardownWebsocket(): void {
    if (this.secondaryWebsocket !== undefined && this.websocket !== undefined) {
      console.log('secondary websocket exists, tear down first and assign second');
      // currently have two websockets, so tear down the older one
      this.websocket.removeAllListeners('open');
      this.websocket.removeAllListeners('close');
      this.websocket.removeAllListeners('error');
      this.websocket.removeAllListeners('message');
      this.websocket = this.secondaryWebsocket;
      this.secondaryWebsocket = undefined;
    } else if (this.secondaryWebsocket === undefined && this.websocket !== undefined) {
      console.log('only primary websocket exists, tear it down');
      // only one websocket to tear down
      this.websocket.removeAllListeners('open');
      this.websocket.removeAllListeners('close');
      this.websocket.removeAllListeners('error');
      this.websocket.removeAllListeners('message');
      this.websocket = undefined;
    }
  }

  /**
   * `onmessage` handler for the client's websocket. This will parse the payload and dispatch the relevant events for
   * each incoming message.
   */
  private async onWebsocketMessage({ data }: { data: string }): Promise<void> {
    this.logger.debug(`received message on websocket: ${data}`);

    // parse message into slack event
    // TODO: rename relay_id to envelope_id
    let event: {
      type: string;
      reason: string;
      payload: {[key: string]: any};
      relay_id: string;
    };

    try {
      event = JSON.parse(data);
    } catch (parseError) {
      // prevent application from crashing on a bad message, but log an error to bring attention
      this.logger.error(
        `unable to parse incoming websocket message: ${parseError.message}\n    message contents: "${data}"`,
      );
      return;
    }

    // internal event handlers
    if (event.type === 'hello') {
      this.stateMachine.handle('server hello');
      return;
    }

    // open second websocket connection in preparation for the existing websocket disconnecting
    if (event.type === 'disconnect' && event.reason === 'warning') {
      console.log('disconnect warning, creating second connection');
      this.stateMachine.handle('server disconnect warning');
      return;
    }

    // close primary websocket in favor of secondary websocket, assign secondary to primary
    if (event.type === 'disconnect' && event.reason === 'refresh_requested') {
      console.log('disconnect refresh requested, closing old websocket');
      this.stateMachine.handle('server disconnect old socket');
      // TODO: instead of using this event to reassign secondaryWebsocet to this.websocket,
      // use the websocket close event
      return;
    }

    // Define Ack
    const ack = async (response: object): Promise<void> => {
      this.logger.debug('calling ack', event.type);
      // TODO: rename `relay_id` to `envelope_id` after rename
      await this.send(event.relay_id, response);
    };

    // for events_api messages, expose the type of the event
    if (event.type === 'events_api') {
      this.emit(event.payload.event.type, { ack, body: event.payload, event: event.payload.event });
    } else {
      // emit just ack and body for all other types of messages
      this.emit(event.type, { ack, body: event.payload });
    }

    // emitter for all slack events
    // used in tools like bolt-js
    this.emit('slack_event', { ack, type: event.type, body: event.payload });

    // lifecycle events + slack events
    // is eventemitter the wrong interface for slack events?
    // separate these two, use eventemitter for lifecycle events
    // use asyncInterators (for/await/of loop) to express slack events
    // for await event of relayClient.listen { // deal with each individual event }
    // library sends out data one time, no multiple listeners
    // dev has to call ack function, not return promise
    // this.listenerIterator = something(event);

    // for await (const event of this.listenerIterator) {
    //   console.log(event);
    // }
  }
}

// test for async iterables
// async function* something(event: Event) {
//   console.log('something');
//   let i = 0;
//   while (i < 1) {
//     // await something?
//     yield event;
//     i++;
//   }
// }

// interface Event {
//   type: string;
//   reason: string;
//   payload: {[key: string]: any};
//   relay_id: string; subtype: undefined;
// }

/* Instrumentation */
addAppMetadata({ name: packageJson.name, version: packageJson.version });

export default SocketModeClient;

/*
 * Exported types
 */

export interface SocketModeOptions {
  token?: string; // app level token
  logger?: Logger;
  logLevel?: LogLevel;
  retryConfig?: RetryOptions;
  autoReconnect?: boolean; // this is a simple yes or no. there is no limit to the number or reconnections. a simple
                           // number is probably the wrong idea since reconnections can happen for uncontrollable
                           // yet normal reasons such as team migrations and the keep-alive algorithm.
  clientPingTimeout?: number;
  serverPongTimeout?: number;
  clientOptions?: Omit<WebClientOptions, 'logLevel' | 'logger'>;
}

// NOTE: there may be a better way to add metadata to an error about being "unrecoverable" than to keep an
// independent enum, probably a Set (this isn't used as a type).
enum UnrecoverableSocketModeStartError {
  NotAuthed = 'not_authed',
  InvalidAuth = 'invalid_auth',
  AccountInactive = 'account_inactive',
  UserRemovedFromTeam = 'user_removed_from_team',
  TeamDisabled = 'team_disabled',
}
