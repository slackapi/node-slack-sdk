import { Agent } from 'http';
import * as pjson from 'pjson';
import objectValues = require('object.values'); // tslint:disable-line:import-name no-require-imports
import EventEmitter = require('eventemitter3'); // tslint:disable-line:import-name no-require-imports
import WebSocket = require('ws'); // tslint:disable-line:import-name no-require-imports
import { LogLevel, Logger, LoggingFunc, getLogger, loggerFromLoggingFunc } from './logger';
import { RetryOptions } from './retry-policies';
// import { KeepAlive } from './keep-alive';
import { WebClient, WebAPICallResult, WebAPICallError, ErrorCode } from './';
import * as methods from './methods'; // tslint:disable-line:import-name
import { errorWithCode } from './errors';
import Finity, { StateMachine } from 'finity'; // tslint:disable-line:import-name

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
  autoReconnect?: boolean;
  useRtmConnect?: boolean;
  clientPingTimeout?: number;
  serverPongTimeout?: number;
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
   * Configuration for websocket keep-alive functionality
   */
  private clientPingTimeout?: number;
  private serverPongTimeout?: number;

  /**
   * State machine that backs the transition and action behavior
   */
  private stateMachine: StateMachine<string, string>;
  private stateMachineConfig = Finity
    .configure()
      .initialState('disconnected')
        .on('start').transitionTo('connecting')
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
                .internalTransition().withCondition((context) => {
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
              // TODO: think about when websocket should be torn down
              this.setupWebsocket(context.result.url);
            })
            .on('websocket open').transitionTo('introducing')
          .state('introducing')
          .global()
            .onStateEnter((state) => {
              this.logger.debug(`transitioning to state: connecting:${state}`);
              // TODO: think about whether to emit these substate events
            })
        .getConfig())
        .on('server hello').transitionTo('connected')
        .on('failure').transitionTo('disconnected')
      .state('connected')
        .onExit(() => {
          // clear captured data that is now stale
          // TODO: should these really be cleared if transitioning back to 'connecting' because of reconnecting?
          this.activeUserId = this.activeTeamId = undefined;
        })
      .global()
        .onStateEnter((state) => {
          this.logger.debug(`transitioning to state: ${state}`);
          // Emits events: `disconnected`, `connecting`, `connected`
          this.emit(state);
        })
    .getConfig();

  /**
   * Private state
   */
  // TODO: clear websocket property when it is closed
  private websocket?: WebSocket;
  private messageId = 1;
  private startOpts?: methods.RTMConnectArguments | methods.RTMStartArguments;
  // private keepAlive: KeepAlive;

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
    this.clientPingTimeout = clientPingTimeout;
    this.serverPongTimeout = serverPongTimeout;
    // TODO: make sure reset is called at the right time during reconnection
    // TODO: make sure dispose is called when manually disconnecting (or no autoreconnect)
    // maybe dispose any old keepalives on entry to disconnected state and re-initialize a new instance on entry to
    // connecting state. this would require storing the timeout config
    // this.keepAlive = new KeepAlive(this, {
    //   clientPingTimeout,
    //   serverPongTimeout,
    //   logger,
    //   logLevel,
    // });

    // Logging
    if (logger) {
      this.logger = loggerFromLoggingFunc(RTMClient.loggerName, logger);
    } else {
      this.logger = getLogger(RTMClient.loggerName);
    }
    this.logger.setLevel(logLevel);

    this.logger.debug('initialized');

    this.stateMachine = Finity.start(this.stateMachineConfig);
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

  // this is a low-level message sending API. you typically will want to use something higher level like sendMessage()
  // which will return a promise that resolves when the sent message is acknowledged. this method will return the
  // internal message ID. that value is an implementation detail and only valid for the lifetime of the connection.
  // SEMVER:MAJOR the method signature is completely different. it used to take an optional callback and return an
  // optional promise. that is now only available with higher level methods.
  public send(type: string, body = {}): number {
    const message = Object.assign({}, body, {
      type,
      id: this.nextMessageId(),
    });

    if (this.websocket === undefined) {
      this.logger.error('cannot send message when client is not connected');
      throw errorWithCode(
        new Error('cannot send message when client is not connected'),
        ErrorCode.RTMSendWhileDisconnectedError,
      );
    } else {
      // NOTE: it would be cool if in the future there was a middleware pipeline to process the message before its sent
      this.emit('outgoing_message', message);

      const flatMessage = JSON.stringify(message);
      this.logger.debug(`sending message on websocket: ${flatMessage}`);

      this.websocket.send(flatMessage, (error) => {
        // TODO: how does this interact with replies and promise resolution? if an error occurs, this is the only time
        // we will hear about it, so its our only chance to reject the promise.
        if (error) {
          this.logger.error(`failed to send message on websocket: ${error.message}`);
        }
      });
      return message.id;
    }
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
    // this.websocket.addEventListener('close', event => this.stateMachine.handle('websocket close', event));
    this.websocket.addEventListener('error', (event) => {
      this.logger.error(`A websocket error occurred: ${event.message}`);
    });
    this.websocket.addEventListener('message', this.onWebsocketMessage.bind(this));
  }

  private onWebsocketMessage({ data }: { data: string }): void {
    // v3 legacy
    this.emit('raw_message', data);

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

    // emit for external event handlers
    this.emit('slack_event', event.type, event);
    this.emit(event.type, event);
    // TODO: if this is a message with a subtype, emit that specifically
  }
}
