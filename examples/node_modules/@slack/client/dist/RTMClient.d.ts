/// <reference types="node" />
import { Agent } from 'http';
import EventEmitter = require('eventemitter3');
import { LogLevel, LoggingFunc } from './logger';
import { RetryOptions } from './retry-policies';
import { ErrorCode, CodedError } from './';
import * as methods from './methods';
import { TLSOptions } from './util';
/**
 * An RTMClient allows programs to communicate with the {@link https://api.slack.com/rtm|Slack Platform's RTM API}.
 * This object uses the EventEmitter pattern to dispatch incoming events and has several methods for sending outgoing
 * messages.
 */
export declare class RTMClient extends EventEmitter {
    /**
     * Whether or not the client is currently connected to the RTM API
     */
    connected: boolean;
    /**
     * Whether or not the client has authenticated to the RTM API. This occurs when the connect method
     * completes, and a WebSocket URL is available for the client's connection.
     */
    authenticated: boolean;
    /**
     * The user ID for the connected client.
     */
    activeUserId?: string;
    /**
     * The team ID for the workspace the client is connected to.
     */
    activeTeamId?: string;
    /**
     * Internal use web client
     */
    private webClient;
    /**
     * An agent used to manage TCP connections for requests. Most commonly used to implement proxy support. See
     * npm packages `tunnel` and `https-proxy-agent` for information on how to construct a proxy agent.
     */
    private agentConfig?;
    /**
     * Whether this client will automatically reconnect when (not manually) disconnected
     */
    private autoReconnect;
    /**
     * Use the `rtm.connect` method to connect when true, or the `rtm.start` method when false
     */
    private useRtmConnect;
    /**
     * The number of milliseconds to wait upon connection for reply messages from the previous connection. The default
     * value is 2 seconds.
     */
    private replyAckOnReconnectTimeout;
    /**
     * State machine that backs the transition and action behavior
     */
    private stateMachine;
    /**
     * Configuration for the state machine
     */
    private stateMachineConfig;
    /**
     * The client's websocket
     */
    private websocket?;
    /**
     * The last message ID used for an outgoing message
     */
    private messageId;
    /**
     * A cache of the options used to start the connection, so that it can be reused during reconnections.
     */
    private startOpts?;
    /**
     * The instance of KeepAlive used to monitor this client's connection.
     */
    private keepAlive;
    /**
     * A queue of tasks used to serialize outgoing messages and to allow the client to buffer outgoing messages when
     * its not in the 'ready' state. This queue is paused and resumed as the state machine transitions.
     */
    private outgoingEventQueue;
    /**
     * A list of cancelable Promises that each represent a caller waiting on the server to acknowledge an outgoing
     * message with a response (an incoming message containing a "reply_to" property with the outgoing message's ID).
     * This list is emptied by canceling all the promises when the client no longer expects to receive any replies from
     * the server (when its disconnected or when its reconnected and doesn't expect replies for past outgoing messages).
     * The list is a sparse array, where the indexes are message IDs for the sent messages.
     */
    private awaitingReplyList;
    /**
     * Configuration for custom TLS handling
     */
    private tlsConfig;
    /**
     * The name used to prefix all logging generated from this object
     */
    private static loggerName;
    /**
     * This object's logger instance
     */
    private logger;
    constructor(token: string, {slackApiUrl, logger, logLevel, retryConfig, agent, autoReconnect, useRtmConnect, clientPingTimeout, serverPongTimeout, replyAckOnReconnectTimeout, tls}?: RTMClientOptions);
    /**
     * Begin an RTM session using the provided options. This method must be called before any messages can
     * be sent or received.
     * @param options
     */
    start(options: methods.RTMStartArguments | methods.RTMConnectArguments): void;
    /**
     * End an RTM session. After this method is called no messages will be sent or received unless you call
     * start() again later.
     */
    disconnect(): void;
    /**
     * Send a simple message to a public channel, private channel, DM, or MPDM.
     * @param text The message text.
     * @param conversationId A conversation ID for the destination of this message.
     */
    sendMessage(text: string, conversationId: string): Promise<RTMCallResult>;
    sendMessage(text: string, conversationId: string, callback: RTMCallResultCallback): void;
    /**
     * Sends a typing indicator to indicate that the user with `activeUserId` is typing.
     * @param conversationId The destination for where the typing indicator should be shown.
     */
    sendTyping(conversationId: string): Promise<void>;
    /**
     * Subscribes this client to presence changes for only the given `userIds`.
     * @param userIds An array of user IDs whose presence you are interested in. This list will replace the list from any
     * previous calls to this method.
     */
    subscribePresence(userIds: string[]): Promise<void>;
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
    addOutgoingEvent(awaitReply: true, type: string, body?: {}): Promise<RTMCallResult>;
    addOutgoingEvent(awaitReply: false, type: string, body?: {}): Promise<void>;
    /**
     * Generic method for sending an outgoing message of an arbitrary type. The main difference between this method and
     * addOutgoingEvent() is that this method does not use a queue so it can only be used while the client is ready
     * to send messages (in the 'ready' substate of the 'connected' state). It returns a Promise for the message ID of the
     * sent message. This is an internal ID and generally shouldn't be used as an identifier for messages (for that,
     * there is `ts` on messages once the server acknowledges it).
     * @param type the message type
     * @param body the message body
     */
    send(type: string, body?: {}): Promise<number>;
    /**
     * Atomically increments and returns a message ID for the next message.
     */
    private nextMessageId();
    /**
     * Set up method for the client's websocket instance. This method will attach event listeners.
     * @param url
     */
    private setupWebsocket(url);
    /**
     * Tear down method for the client's websocket instance. This method undoes the work in setupWebsocket(url).
     */
    private teardownWebsocket();
    /**
     * `onmessage` handler for the client's websocket. This will parse the payload and dispatch the relevant events for
     * each incoming message.
     * @param websocketMessage
     */
    private onWebsocketMessage({data});
}
export default RTMClient;
export interface RTMClientOptions {
    slackApiUrl?: string;
    logger?: LoggingFunc;
    logLevel?: LogLevel;
    retryConfig?: RetryOptions;
    agent?: Agent;
    autoReconnect?: boolean;
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
export declare type RTMCallError = RTMPlatformError | RTMWebsocketError;
export interface RTMPlatformError extends CodedError {
    code: ErrorCode.RTMSendMessagePlatformError;
}
export interface RTMWebsocketError extends CodedError {
    code: ErrorCode.RTMWebsocketError;
    original: Error;
}
