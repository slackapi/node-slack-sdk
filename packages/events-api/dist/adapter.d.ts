/// <reference types="node" />
import { EventEmitter } from 'events';
import * as http from 'http';
import { RequestListener } from 'http';
import { RequestHandler } from 'express';
/**
 * An adapter for Slack's Events API.
 */
export declare class SlackEventAdapter extends EventEmitter {
    /**
     * The token used to authenticate signed requests from Slack's Events API.
     */
    readonly signingSecret: string;
    /**
     * Whether to include the API event bodies in adapter event listeners.
     */
    includeBody: boolean;
    /**
     * Whether to include request headers in adapter event listeners.
     */
    includeHeaders: boolean;
    /**
     * When `true` prevents the adapter from responding by itself and leaves that up to listeners.
     */
    waitForResponse: boolean;
    /**
     * The HTTP server this adapter might be running, created in {@link start}.
     */
    private server?;
    /**
     * @param signingSecret - The token used to authenticate signed requests from Slack's Events API.
     * @param opts.includeBody - Whether to include the API event bodies in adapter event listeners.
     * @param opts.includeHeaders - Whether to include request headers in adapter event listeners.
     * @param opts.waitForResponse - When `true` prevents the adapter from responding by itself and leaves that up to
     *   listeners.
     */
    constructor(signingSecret: string, { includeBody, includeHeaders, waitForResponse, }?: EventAdapterOptions);
    /**
     * Creates an HTTP server to listen for event payloads.
     */
    createServer(): Promise<http.Server>;
    /**
     * Starts a server on the specified port.
     *
     * @param port - The port number to listen on.
     * @returns The {@link http.Server | server}.
     */
    start(port: number): Promise<http.Server>;
    /**
     * Stops the server started by {@link start}.
     */
    stop(): Promise<void>;
    /**
     * Returns a middleware-compatible adapter.
     */
    expressMiddleware(): RequestHandler;
    /**
     * Creates a request listener.
     */
    requestListener(): RequestListener;
}
/**
 * Options when constructing {@link SlackEventAdapter}. See {@link SlackEventAdapter}'s fields for more information on
 * what each option does.
 */
export interface EventAdapterOptions {
    includeBody?: boolean;
    includeHeaders?: boolean;
    waitForResponse?: boolean;
}
/**
 * @alias module:adapter
 */
export default SlackEventAdapter;
//# sourceMappingURL=adapter.d.ts.map