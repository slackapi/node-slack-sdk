/// <reference types="node" />
import * as util from 'util';
import { Agent } from 'http';
/**
 * For when you need a function that does nothing
 */
export declare function noop(): void;
/**
 * Appends the app metadata into the User-Agent value
 * @param appMetadata
 * @param appMetadata.name name of tool to be counted in instrumentation
 * @param appMetadata.version version of tool to be counted in instrumentation
 */
export declare function addAppMetadata({name, version}: {
    name: string;
    version: string;
}): void;
/**
 * Returns the current User-Agent value for instrumentation
 */
export declare function getUserAgent(): string;
/**
 * The following is a polyfill of Node >= 8.2.0's util.callbackify method. The source is copied (with some
 * modification) from:
 * https://github.com/nodejs/node/blob/bff5d5b8f0c462880ef63a396d8912d5188bbd31/lib/util.js#L1095-L1140
 * The modified parts are denoted using comments starting with `original` and ending with `modified`
 * This could really be made an independent module. It was suggested here: https://github.com/js-n/callbackify/issues/5
 */
export declare const callbackify: typeof util.callbackify;
export declare type AgentOption = Agent | {
    http?: Agent;
    https?: Agent;
} | boolean;
export interface TLSOptions {
    pfx?: string | Buffer | Array<string | Buffer | Object>;
    key?: string | Buffer | Array<Buffer | Object>;
    passphrase?: string;
    cert?: string | Buffer | Array<string | Buffer>;
    ca?: string | Buffer | Array<string | Buffer>;
}
