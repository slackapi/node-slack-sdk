import { Agent } from 'http';
import objectValues = require('object.values'); // tslint:disable-line:import-name no-require-imports
import EventEmitter = require('eventemitter3'); // tslint:disable-line:import-name no-require-imports
import WebSocket = require('ws'); // tslint:disable-line:import-name no-require-imports
import Finity, { StateMachine } from 'finity'; // tslint:disable-line:import-name
import PQueue = require('p-queue'); // tslint:disable-line:import-name no-require-imports
import PCancelable = require('p-cancelable'); // tslint:disable-line:import-name no-require-imports
import { LogLevel, Logger, LoggingFunc, getLogger, loggerFromLoggingFunc } from './logger';
import { RetryOptions } from './retry-policies';
import { KeepAlive } from './KeepAlive';
import { WebClient, WebAPICallResult, WebAPICallError, ErrorCode, CodedError } from './';
import * as methods from './methods'; // tslint:disable-line:import-name
import { errorWithCode } from './errors';
import { callbackify, TLSOptions } from './util';
const pkg = require('../package.json'); // tslint:disable-line:no-require-imports no-var-requires

/**
 * An RTMClient allows programs to communicate with the {@link https://api.slack.com/rtm|Slack Platform's RTM API}.
 * This object uses the EventEmitter pattern to dispatch incoming events and has several methods for sending outgoing
 * messages.
 */
export class RTMClient extends EventEmitter {
  /**
   * Whether or not the client is currently connected to the RTM API
   */
  public connected: boolean = false;

  /**
   * Whether or not the client has authenticated to the RTM API. This occurs when the connect method
   * completes, and a WebSocket URL is available for the client's connection.
   */
  public authenticated: boolean = false;

  /**
   * The user ID for the connected client.
   */
  public activeUserId?: string;

  /**
   * The team ID for the workspace the client is connected to.
   */
  public activeTeamId?: string;

  /**
   * Internal use web client
   */
  private webClient: WebClient;

  /**
   * An agent used to manage TCP connections for requests. Most commonly used to implement proxy support. See
   * npm packages `tunnel` and `https-proxy-agent` for information on how to construct a proxy agent.
   */
  private agentConfig?: Agent;

  /**
   * Whether this client will automatically reconnect when (not manually) disconnected
   */
  private autoReconnect: boolean;

  /**
   * Use the `rtm.connect` method to connect when true, or the `rtm.start` method when false
   */
  private useRtmConnect: boolean;

  /**
   * The number of milliseconds to wait upon connection for reply messages from the previous connection. The default
   * value is 2 seconds.
   */
  private replyAckOnReconnectTimeout: number;

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
        .onEnter(() => {
          // each client should start out with the outgoing event queue paused
          this.logger.debug('pausing outgoing event queue');
          this.outgoingEventQueue.pause();
          // when a formerly connected client gets disconnected, all outgoing messages whose promises were waiting
          // for a reply from the server should be canceled
          this.awaitingReplyList.forEach(p => p.cancel());
        })
      .state('connecting')
        .submachine(Finity.configure()
          .initialState('authenticating')
            .do(() => {
              // determine which Web API method to use for the connection
              const connectMethod = this.useRtmConnect ? 'rtm.connect' : 'rtm.start';

              return this.webClient.apiCall(connectMethod, this.startOpts !== undefined ? this.startOpts : {})
                .then((result: WebAPICallResult) => {
                  // SEMVER:MAJOR: no longer handling the case where `result.url` is undefined separately from an error.
                  // cannot think of a way this would have been triggered.

                  // capture identity information
                  // TODO: remove type casts
                  this.activeUserId = (result as any).self.id;
                  this.activeTeamId = (result as any).team.id;

                  return result;
                });
            })
              .onSuccess().transitionTo('authenticated')
              .onFailure()
                .transitionTo('reconnecting').withCondition((context) => {
                  const error = context.error as WebAPICallError;

                  this.logger.info(`unable to RTM start: ${error.message}`);

                  // v3 legacy event
                  this.emit('unable_to_rtm_start', error);

                  // NOTE: assume that ReadErrors are recoverable
                  let isRecoverable = true;
                  if (error.code === ErrorCode.PlatformError &&
                      objectValues(UnrecoverableRTMStartError).includes(error.data.error)) {
                    isRecoverable = false;
                  } else if (error.code === ErrorCode.RequestError) {
                    isRecoverable = false;
                  } else if (error.code === ErrorCode.HTTPError) {
                    isRecoverable = false;
                  }

                  return this.autoReconnect && isRecoverable;
                })
                .ignore().withAction(() => {
                  // dispatch 'failure' on parent machine to transition out of this submachine's states
                  this.stateMachine.handle('failure');
                })
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
          .global()
            .onStateEnter((state) => {
              this.logger.debug(`transitioning to state: connecting:${state}`);
            })
        .getConfig())
        .on('server hello').transitionTo('connected')
        .on('failure').transitionTo('disconnected')
      .state('connected')
        .onEnter(() => {
          this.connected = true;
        })
        .submachine(Finity.configure()
          .initialState('resuming')
            // when a reply to the last message sent is received, we assume that the client is "caught up" from its
            // previous connection
            .on('replay finished').transitionTo('ready')
            // when this client is connecting for the first time, or if the last message sent on the previous connection
            // would not get a reply from the server, or if for any other reason we do not receive a reply to the last
            // message sent - after a timeout, we assume that the client is "caught up"
            .onTimeout(this.replyAckOnReconnectTimeout).transitionTo('ready')
            .onExit(() => {
              // once all replay messages are processed, if there are any more messages awaiting a reply message, let
              // them know that there are none expected to arrive.
              this.awaitingReplyList.forEach(p => p.cancel());
            })
          .state('ready')
            .onEnter(() => {
              this.keepAlive.start(this);
              // the transition isn't done yet, so we delay the following statement until after the event loop returns
              setImmediate(() => {
                this.logger.debug('resuming outgoing event queue');
                this.outgoingEventQueue.start();
                this.emit('ready');
              });
            })
          .global()
            .onStateEnter((state) => {
              this.logger.debug(`transitioning to state: connected:${state}`);
            })
        .getConfig())
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

          // clear data that is now stale
          this.activeUserId = this.activeTeamId = undefined;

          this.keepAlive.stop();
          this.outgoingEventQueue.pause();
        })
      .state('disconnecting')
        .onEnter(() => {
          // invariant: websocket exists and is open at the start of this state
          if (this.websocket !== undefined) {
            this.websocket.close();
          } else {
            this.logger.error('Websocket not found when transitioning into disconnecting state. Please report to ' +
              '@slack/client package maintainers.');
          }
        })
        .on('websocket close').transitionTo('disconnected')
        .onExit(() => this.teardownWebsocket())
      // reconnecting is just like disconnecting, except that the websocket should already be closed before we enter
      // this state, and that the next state should be connecting.
      .state('reconnecting')
        .do(() => Promise.resolve(true))
          .onSuccess().transitionTo('connecting')
        .onExit(() => this.teardownWebsocket())
      .global()
        .onStateEnter((state) => {
          this.logger.debug(`transitioning to state: ${state}`);
          // Emits events: `disconnected`, `connecting`, `connected`, 'disconnecting', 'reconnecting'
          this.emit(state);
        })
    .getConfig();

  /**
   * The client's websocket
   */
  private websocket?: WebSocket;

  /**
   * The last message ID used for an outgoing message
   */
  private messageId = 1;

  /**
   * A cache of the options used to start the connection, so that it can be reused during reconnections.
   */
  private startOpts?: methods.RTMConnectArguments | methods.RTMStartArguments;

  /**
   * The instance of KeepAlive used to monitor this client's connection.
   */
  private keepAlive: KeepAlive;

  /**
   * A queue of tasks used to serialize outgoing messages and to allow the client to buffer outgoing messages when
   * its not in the 'ready' state. This queue is paused and resumed as the state machine transitions.
   */
  private outgoingEventQueue = new PQueue({ concurrency: 1 });

  /**
   * A list of cancelable Promises that each represent a caller waiting on the server to acknowledge an outgoing
   * message with a response (an incoming message containing a "reply_to" property with the outgoing message's ID).
   * This list is emptied by canceling all the promises when the client no longer expects to receive any replies from
   * the server (when its disconnected or when its reconnected and doesn't expect replies for past outgoing messages).
   * The list is a sparse array, where the indexes are message IDs for the sent messages.
   */
  private awaitingReplyList: PCancelable.PCancelable<RTMCallResult>[] = [];

  /**
   * Configuration for custom TLS handling
   */
  private tlsConfig: TLSOptions;

  /**
   * The name used to prefix all logging generated from this object
   */
  private static loggerName = `${pkg.name}:RTMClient`;


  /**
   * This object's logger instance
   */
  private logger: Logger;

  constructor(token: string, {
    slackApiUrl = 'https://slack.com/api/',
    logger = undefined,
    logLevel = LogLevel.INFO,
    retryConfig,
    agent = undefined,
    autoReconnect = true,
    useRtmConnect = true,
    clientPingTimeout,
    serverPongTimeout,
    replyAckOnReconnectTimeout = 2000,
    tls = undefined,
  }: RTMClientOptions = {}) {
    super();
    this.webClient = new WebClient(token, {
      slackApiUrl,
      logger,
      logLevel,
      retryConfig,
      agent,
      tls,
      maxRequestConcurrency: 1,
    });

    this.agentConfig = agent;
    this.autoReconnect = autoReconnect;
    this.useRtmConnect = useRtmConnect;
    this.replyAckOnReconnectTimeout = replyAckOnReconnectTimeout;
    // NOTE: may want to filter the keys to only those acceptable for TLS options
    this.tlsConfig = tls !== undefined ? tls : {};

    this.keepAlive = new KeepAlive({
      clientPingTimeout,
      serverPongTimeout,
      logger,
      logLevel,
    });
    this.keepAlive.on('recommend_reconnect', () => {
      if (this.websocket !== undefined) {
        // this will trigger the 'websocket close' event on the state machine, which transitions to clean up
        this.websocket.close();
      }
    }, this);

    // Logging
    if (logger !== undefined) {
      this.logger = loggerFromLoggingFunc(RTMClient.loggerName, logger);
    } else {
      this.logger = getLogger(RTMClient.loggerName);
    }
    this.logger.setLevel(logLevel);

    this.stateMachine = Finity.start(this.stateMachineConfig);

    this.logger.debug('initialized');
  }

  /**
   * Begin an RTM session using the provided options. This method must be called before any messages can
   * be sent or received.
   * @param options
   */
  public start(options: methods.RTMStartArguments | methods.RTMConnectArguments): void {
    // TODO: should this return a Promise<WebAPICallResult>?
    // TODO: make a named interface for the type of `options`. it should end in -Options instead of Arguments.

    this.logger.debug('start()');

    // capture options for potential future reconnects
    this.startOpts = options;

    // delegate behavior to state machine
    this.stateMachine.handle('start');
  }

  /**
   * End an RTM session. After this method is called no messages will be sent or received unless you call
   * start() again later.
   */
  public disconnect(): void {
    // TODO: should this return a Promise<void>?
    this.logger.debug('manual disconnect');

    // delegate behavior to state machine
    this.stateMachine.handle('explicit disconnect');
  }

  /**
   * Send a simple message to a public channel, private channel, DM, or MPDM.
   * @param text The message text.
   * @param conversationId A conversation ID for the destination of this message.
   */
  public sendMessage(text: string, conversationId: string): Promise<RTMCallResult>;
  public sendMessage(text: string, conversationId: string, callback: RTMCallResultCallback): void;
  public sendMessage(text: string,
                     conversationId: string,
                     callback?: RTMCallResultCallback): void | Promise<RTMCallResult> {
    const implementation = () => this.addOutgoingEvent(true, 'message', { text, channel: conversationId });

    // Adapt the interface for callback-based execution or Promise-based execution
    if (callback !== undefined) {
      callbackify(implementation)(callback);
      return;
    }
    return implementation();
  }

  /**
   * Sends a typing indicator to indicate that the user with `activeUserId` is typing.
   * @param conversationId The destination for where the typing indicator should be shown.
   */
  public sendTyping(conversationId: string): Promise<void> {
    // SEMVER:MINOR now returns a Promise, where it used to return void
    // NOTE: should we allow for callback-based execution of this method?
    return this.addOutgoingEvent(false, 'typing', { channel: conversationId });
  }

  /**
   * Subscribes this client to presence changes for only the given `userIds`.
   * @param userIds An array of user IDs whose presence you are interested in. This list will replace the list from any
   * previous calls to this method.
   */
  public subscribePresence(userIds: string[]): Promise<void> {
    // SEMVER:MINOR now returns a Promise, where it used to return void
    // NOTE: should we allow for callback-based execution of this method?
    return this.addOutgoingEvent(false, 'presence_sub', { ids: userIds });
  }

  /**
   * Generic method for sending an outgoing message of an arbitrary type. This method guards the higher-level methods
   * from concern of which state the client is in, because it places all messages into a queue. The tasks on the queue
   * will buffer until the client is in a state where they can be sent.
   *
   * If the awaitReply parameter is set to true, then the returned Promise is resolved with the platform's
   * acknowledgement response. Not all message types will result in an acknowledgement response, so use this carefully.
   * This promise may be rejected with an error containing code=RTMNoReplyReceivedError if the client disconnects or
   * reconnects before recieving the acknowledgement response.
   *
   * If the awaitReply parameter is set to false, then the returned Promise is resolved as soon as the message is sent
   * from the websocket.
   *
   * @param awaitReply whether to wait for an acknowledgement response from the platform before resolving the returned
   * Promise.
   * @param type the message type
   * @param body the message body
   */
  public addOutgoingEvent(awaitReply: true, type: string, body?: {}): Promise<RTMCallResult>;
  public addOutgoingEvent(awaitReply: false, type: string, body?: {}): Promise<void>;
  public addOutgoingEvent(awaitReply: boolean, type: string, body?: {}): Promise<RTMCallResult | void> {
    const awaitReplyTask = (messageId: number) => {
      const replyPromise = new PCancelable<RTMCallResult>((onCancel, resolve, reject) => {
        const eventHandler = (_type: string, event: RTMCallResult) => {
          if (event.reply_to === messageId) {
            this.off('slack_event', eventHandler);
            if (event.error !== undefined) {
              const error = errorWithCode(
                new Error(`An API error occurred: ${event.error.msg}`),
                ErrorCode.RTMSendMessagePlatformError,
              );
              error.data = event;
              return reject(error);
            }
            resolve(event);
          }
        };
        onCancel(() => {
          this.off('slack_event', eventHandler);
          reject(errorWithCode(
            new Error('Message sent but no server acknowledgement was recieved. This may be caused by the client ' +
            'changing connection state rather than any issue with the specific message. Check before resending.'),
            ErrorCode.RTMNoReplyReceivedError,
          ));
        });
        this.on('slack_event', eventHandler);
      });
      this.awaitingReplyList[messageId] = replyPromise;
      return replyPromise;
    };

    const sendTask = (): Promise<RTMCallResult | void> => {
      const sendPromise = this.send(type, body);
      if (awaitReply) {
        return sendPromise.then(awaitReplyTask);
      }
      return sendPromise.then(() => Promise.resolve());
    };

    return this.outgoingEventQueue.add(sendTask);
  }

  /**
   * Generic method for sending an outgoing message of an arbitrary type. The main difference between this method and
   * addOutgoingEvent() is that this method does not use a queue so it can only be used while the client is ready
   * to send messages (in the 'ready' substate of the 'connected' state). It returns a Promise for the message ID of the
   * sent message. This is an internal ID and generally shouldn't be used as an identifier for messages (for that,
   * there is `ts` on messages once the server acknowledges it).
   * @param type the message type
   * @param body the message body
   */
  public send(type: string, body = {}): Promise<number> {
    const message = Object.assign({}, body, {
      type,
      id: this.nextMessageId(),
    });

    return new Promise((resolve, reject) => {
      this.logger.debug(`send() in state: ${this.stateMachine.getStateHierarchy()}`);
      if (this.websocket === undefined) {
        this.logger.error('cannot send message when client is not connected');
        reject(errorWithCode(
          new Error('cannot send message when client is not connected'),
          ErrorCode.RTMSendWhileDisconnectedError,
        ));
      } else if (!(this.stateMachine.getCurrentState() === 'connected' &&
                 this.stateMachine.getStateHierarchy()[1] === 'ready')) {
        this.logger.error('cannot send message when client is not ready');
        reject(errorWithCode(
          new Error('cannot send message when client is not ready'),
          ErrorCode.RTMSendWhileNotReadyError,
        ));
      } else {
        // NOTE: future feature request: middleware pipeline to process the message before its sent
        this.emit('outgoing_message', message);

        const flatMessage = JSON.stringify(message);
        this.logger.debug(`sending message on websocket: ${flatMessage}`);

        this.websocket.send(flatMessage, (error) => {
          if (error !== undefined) {
            this.logger.error(`failed to send message on websocket: ${error.message}`);
            return reject(websocketErrorWithOriginal(error));
          }
          resolve(message.id);
        });
      }
    });
  }

  /**
   * Atomically increments and returns a message ID for the next message.
   */
  private nextMessageId(): number {
    return this.messageId++; // tslint:disable-line:no-increment-decrement
  }

  /**
   * Set up method for the client's websocket instance. This method will attach event listeners.
   * @param url
   */
  private setupWebsocket(url: string): void {
    // initialize the websocket
    const options: WebSocket.ClientOptions = Object.assign({
      perMessageDeflate: false,
    }, this.tlsConfig);
    if (this.agentConfig !== undefined) {
      options.agent = this.agentConfig;
    }
    this.websocket = new WebSocket(url, options);

    // attach event listeners
    this.websocket.addEventListener('open', event => this.stateMachine.handle('websocket open', event));
    this.websocket.addEventListener('close', event => this.stateMachine.handle('websocket close', event));
    this.websocket.addEventListener('error', (event) => {
      this.logger.error(`A websocket error occurred: ${event.message}`);
      this.emit('error', websocketErrorWithOriginal(event.error));
    });
    this.websocket.addEventListener('message', this.onWebsocketMessage.bind(this));
  }

  /**
   * Tear down method for the client's websocket instance. This method undoes the work in setupWebsocket(url).
   */
  private teardownWebsocket(): void {
    if (this.websocket !== undefined) {
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
   * @param websocketMessage
   */
  private onWebsocketMessage({ data }: { data: string }): void {
    // v3 legacy
    this.emit('raw_message', data);

    this.logger.debug(`received message on websocket: ${data}`);

    // parse message into slack event
    let event;
    try {
      event = JSON.parse(data);
    } catch (parseError) {
      // prevent application from crashing on a bad message, but log an error to bring attention
      this.logger.error(`unable to parse incoming websocket message: ${parseError.message}\n` +
        `    message contents: "${data}"`);
      return;
    }

    // internal event handlers
    if (event.type === 'hello') {
      this.stateMachine.handle('server hello');
    }
    if (event.type === 'team_migration_started') {
      if (this.websocket !== undefined) {
        // this will trigger the 'websocket close' event on the state machine, which transitions to clean up
        this.websocket.close();
      }
    }

    if (this.stateMachine.getCurrentState() === 'connected' &&
        this.stateMachine.getStateHierarchy()[1] === 'resuming' &&
        event.reply_to !== undefined && event.reply_to === this.messageId) {
      this.stateMachine.handle('replay finished');
    }

    // emit for event handlers
    this.emit('slack_event', event.type, event);
    this.emit(event.type, event);
    if (event.subtype !== undefined) {
      this.emit(`${event.type}::${event.subtype}`, event);
    }
  }
}

export default RTMClient;

/*
 * Exported types
 */

// NOTE: add an experimental flag to turn off KeepAlive
export interface RTMClientOptions {
  slackApiUrl?: string;
  logger?: LoggingFunc;
  logLevel?: LogLevel;
  retryConfig?: RetryOptions;
  agent?: Agent;
  autoReconnect?: boolean; // this is a simple yes or no. there is no limit to the number or reconnections. a simple
                           // number is probably the wrong idea since reconnections can happen for uncontrollable
                           // yet normal reasons such as team migrations and the keep-alive algorithm.
  useRtmConnect?: boolean;
  clientPingTimeout?: number;
  serverPongTimeout?: number;
  replyAckOnReconnectTimeout?: number;
  tls?: TLSOptions;
}

export interface RTMCallResult {
  ts: string;
  reply_to?: number;
  error?: {
    code: number;
    msg: string;
  };
}

export interface RTMCallResultCallback {
  (error: RTMCallError, result: RTMCallResult): void;
}

export type RTMCallError = RTMPlatformError | RTMWebsocketError;

export interface RTMPlatformError extends CodedError {
  code: ErrorCode.RTMSendMessagePlatformError;
}

export interface RTMWebsocketError extends CodedError {
  code: ErrorCode.RTMWebsocketError;
  original: Error;
}

/*
 * Helpers
 */

 /**
  * A factory to create RTMWebsocketError objects.
  * @param original
  */
function websocketErrorWithOriginal(original: Error): RTMWebsocketError {
  const error = errorWithCode(
    new Error(`Failed to send message on websocket: ${original.message}`),
    ErrorCode.RTMWebsocketError,
  ) as Partial<RTMWebsocketError>;
  error.original = original;
  return (error as RTMWebsocketError);
}

// NOTE: there may be a better way to add metadata to an error about being "unrecoverable" than to keep an
// independent enum
enum UnrecoverableRTMStartError {
  NotAuthed = 'not_authed',
  InvalidAuth = 'invalid_auth',
  AccountInactive = 'account_inactive',
  UserRemovedFromTeam = 'user_removed_from_team',
  TeamDisabled = 'team_disabled',
}
