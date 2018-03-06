import { Agent } from 'http';
import * as pjson from 'pjson';
import objectValues = require('object.values'); // tslint:disable-line:import-name no-require-imports
import EventEmitter = require('eventemitter3'); // tslint:disable-line:import-name no-require-imports
import WebSocket = require('ws'); // tslint:disable-line:import-name no-require-imports
import { LogLevel, Logger, LoggingFunc, getLogger, loggerFromLoggingFunc } from './logger';
import { RetryOptions } from './retry-policies';
import { KeepAlive } from './keep-alive';
import { WebClient, WebAPICallResult, WebAPICallError, ErrorCode, CodedError } from './';
import * as methods from './methods'; // tslint:disable-line:import-name
import { errorWithCode } from './errors';
import Finity, { StateMachine } from 'finity'; // tslint:disable-line:import-name
import { callbackify } from './util';
import PQueue = require('p-queue'); // tslint:disable-line:import-name no-require-imports
import PCancelable = require('p-cancelable'); // tslint:disable-line:import-name no-require-imports

// TODO: document the client event lifecycle (including valid state transitions)
// TODO: type all lifecycle events and their arugments with enums

// SEMVER:MAJOR remove dataStore option, useRtmConnect default value is true
// SEMVER:MAJOR remove socketFn option. use cases such as proxying and TLS configuration are addressed with specifc opts
// SEMVER:MAJOR remove wsPingInternal and maxPongInternal options. replace them with the more descriptive
// clientPingTimeout and serverPongTimeout
// TODO: add tls options
// NOTE: would be interesting to have an experimental flag that turned off all application-level ping/pong handling.
// the python client doesn't do any of that and seems to be able to maintain a reliable connection.
export interface RTMClientOptions {
  slackApiUrl?: string; // SEMVER:MAJOR casing change from previous
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
}

export interface RTMCallResult {
  ts: string;
  reply_to?: number;
  error?: {
    code: number;
    msg: string;
  };
}

// TODO: get a better specification of this
export type RTMCallError = RTMPlatformError | RTMWebsocketError;

export interface RTMPlatformError extends CodedError {
  code: ErrorCode.RTMSendMessagePlatformError;
}

export interface RTMWebsocketError extends CodedError {
  code: ErrorCode.RTMWebsocketError;
  original: Error;
}

function websocketErrorWithOriginal(original: Error): RTMWebsocketError {
  const error = errorWithCode(
    new Error(`Failed to send message on websocket: ${original.message}`),
    ErrorCode.RTMWebsocketError,
  ) as Partial<RTMWebsocketError>;
  error.original = original;
  return (error as RTMWebsocketError);
}

export interface RTMCallResultCallback {
  (error: RTMCallError, result: RTMCallResult): void;
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

// NOTE: hack to express types not found in package. see: https://github.com/nickuraltsev/finity/issues/29
interface HierarchicalStateMachine extends StateMachine<string, string> {
  getStateHierarchy: () => string[];
}

function isHierarchical(machine: StateMachine<string, string>): machine is HierarchicalStateMachine {
  return (<HierarchicalStateMachine>machine).getStateHierarchy !== undefined;
}

// TODO: look for consistency with acronym capitalization (RTM, Rtm, rtm)
// TODO: make as much private as possible
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

  public activeUserId?: string;
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
   * State machine that backs the transition and action behavior
   */
  private stateMachine: StateMachine<string, string>;
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

              return this.webClient.apiCall(connectMethod, this.startOpts || {})
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
              this.setupWebsocket(context.result.url);
            })
            .on('websocket open').transitionTo('handshaking')
          .state('handshaking') // a state in which to wait until the 'server hello' event
          .global()
            .onStateEnter((state) => {
              this.logger.debug(`transitioning to state: connecting:${state}`);
              // TODO: think about whether to emit these substate events
              // at the very least, the RTM start data needs to be emitted somewhere
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
            // message sent - after a timeout of 2 seconds, we assume that the client is "caught up"
            // NOTE: 2 seconds is arbitrary, we could potentially make this configurable.
            .onTimeout(2000).transitionTo('ready')
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
              });
            })
          .global()
            .onStateEnter((state) => {
              this.logger.debug(`transitioning to state: connected:${state}`);
              // TODO: think about whether to emit these substate events
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
            // TODO: turn this into a codederror
            throw new Error('websocket not found');
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
   * Private state
   */
  private websocket?: WebSocket;
  private messageId = 1;
  private startOpts?: methods.RTMConnectArguments | methods.RTMStartArguments;
  private keepAlive: KeepAlive;

  // the outgoingEventQueue is used to serialize outgoing messages and to allow the client to buffer messages to send
  // before its in the 'ready' state. this queue is paused and resumed as the state machine transitions.
  private outgoingEventQueue = new PQueue({ concurrency: 1 });

  // the awaitingReplyList is a list of cancelable promises that each represent a caller waiting on the server to
  // acknowledge the outgoing message with a response. this list is emptied by canceling all the promises when the
  // client no longer expects to receive the reply message from the server. this may mean the message was received by
  // the server, but we cannot garauntee that fact.
  private awaitingReplyList: PCancelable.PCancelable<RTMCallResult>[] = [];

  /**
   * Logging
   */
  private static loggerName = `${pjson.name}:RTMClient`;
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
  }: RTMClientOptions = {}) {
    super();
    this.webClient = new WebClient(token, {
      slackApiUrl,
      logger,
      logLevel,
      retryConfig,
      agent,
      maxRequestConcurrency: 1,
    });

    this.agentConfig = agent;
    this.autoReconnect = autoReconnect;
    this.useRtmConnect = useRtmConnect;

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
    if (logger) {
      this.logger = loggerFromLoggingFunc(RTMClient.loggerName, logger);
    } else {
      this.logger = getLogger(RTMClient.loggerName);
    }
    this.logger.setLevel(logLevel);

    this.stateMachine = Finity.start(this.stateMachineConfig);

    this.logger.debug('initialized');
  }

  // TODO: should this return a promise for the WebAPICallResult?
  // TODO: make a named interface for the argument type, and call it Options instead of Arguments
  public start(options: methods.RTMStartArguments | methods.RTMConnectArguments): void {
    this.logger.debug('attempting connection');

    // capture options for potential future reconnects
    this.startOpts = options;

    // delegate behavior to state machine
    this.stateMachine.handle('start');
  }

  // TODO: should this return a promise?
  public disconnect(): void {
    this.logger.debug('manual disconnect');

    // delegate behavior to state machine
    this.stateMachine.handle('explicit disconnect');
  }

  public sendMessage(text: string, channelId?: string): Promise<RTMCallResult>;
  public sendMessage(text: string, channelId: string, callback: RTMCallResultCallback): void;
  public sendMessage(text: string,
                     channelId?: string,
                     callback?: RTMCallResultCallback): void | Promise<RTMCallResult> {
    const implementation = () => this.addOutgoingEvent(true, 'message', { text, channel: channelId });

    // Adapt the interface for callback-based execution or Promise-based execution
    if (callback) {
      callbackify(implementation)(callback);
      return;
    }
    return implementation();
  }

  // SEMVER:MAJOR updateMessage is gone. use a WebClient directly if you require this behavior

  // SEMVER:MINOR now returns a Promise, where it used to return void
  // NOTE: should we allow for callback-based execution of this method?
  public sendTyping(channelId: string): Promise<void> {
    return this.addOutgoingEvent(false, 'typing', { channel: channelId });
  }

  // SEMVER:MINOR now returns a Promise, where it used to return void
  // NOTE: should we allow for callback-based execution of this method?
  public subscribePresence(userIds: string[]): Promise<void> {
    return this.addOutgoingEvent(false, 'presence_sub', { ids: userIds });
  }

  // this method "guards" the high-level methods from having to worry about which state the client is in by indirecting
  // every outgoing message through a queue. this allows the client to cancel outgoing messages when disconnected, and
  // to resume messages that are pending a reply based on replay.
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

  // this is a low-level message sending API. you typically will want to use something higher level like sendMessage()
  // which will return a promise that resolves when the sent message is acknowledged. this method will return the
  // internal message ID. that value is an implementation detail and only valid for the lifetime of the connection.
  // SEMVER:MAJOR the method signature is completely different. it used to take an optional callback and return an
  // optional promise. that is now only available with higher level methods.
  // SEMVER:MAJOR this method used to only take one argument, but in this version the type argument is explicit and
  // required
  public send(type: string, body = {}): Promise<number> {
    const message = Object.assign({}, body, {
      type,
      id: this.nextMessageId(),
    });

    return new Promise((resolve, reject) => {
      this.logger.debug(`send() in state: ${(this.stateMachine as HierarchicalStateMachine).getStateHierarchy()}`);
      if (this.websocket === undefined) {
        this.logger.error('cannot send message when client is not connected');
        reject(errorWithCode(
          new Error('cannot send message when client is not connected'),
          ErrorCode.RTMSendWhileDisconnectedError,
        ));
      } else if (!(this.stateMachine.getCurrentState() === 'connected' &&
                 isHierarchical(this.stateMachine) && this.stateMachine.getStateHierarchy()[1] === 'ready')) {
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
          if (error) {
            this.logger.error(`failed to send message on websocket: ${error.message}`);
            return reject(websocketErrorWithOriginal(error));
          }
          resolve(message.id);
        });
      }
    });
  }

  // atomically increments and returns the last message ID
  private nextMessageId(): number {
    return this.messageId++; // tslint:disable-line:no-increment-decrement
  }

  private setupWebsocket(url: string): void {
    // initialize the websocket
    const options: WebSocket.ClientOptions = {
      perMessageDeflate: false,
    };
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

  private teardownWebsocket(): void {
    if (this.websocket !== undefined) {
      this.websocket.removeAllListeners('open');
      this.websocket.removeAllListeners('close');
      this.websocket.removeAllListeners('error');
      this.websocket.removeAllListeners('message');
      this.websocket = undefined;
    }
  }

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

    if (this.stateMachine.getCurrentState() === 'connected' &&
        isHierarchical(this.stateMachine) && this.stateMachine.getStateHierarchy()[1] === 'resuming' &&
        event.reply_to !== undefined && event.reply_to === this.messageId) {
      this.stateMachine.handle('replay finished');
    }

    // emit for event handlers
    this.emit('slack_event', event.type, event);
    this.emit(event.type, event);
    // TODO: if this is a message with a subtype, emit that specifically
  }
}
