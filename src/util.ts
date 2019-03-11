/// <reference lib="esnext.asynciterable" />

import * as os from 'os';
import { Agent } from 'http';
const pkg = require('../package.json'); // tslint:disable-line:no-require-imports no-var-requires

/**
 * Replaces occurrences of '/' with ':' in a string, since '/' is meaningful inside User-Agent strings as a separator.
 */
function replaceSlashes(s: string): string {
  return s.replace('/', ':');
}

const baseUserAgent = `${replaceSlashes(pkg.name)}/${pkg.version} ` +
                      `node/${process.version.replace('v', '')} ` +
                      `${os.platform()}/${os.release()}`;

const appMetadata: { [key: string]: string } = {};

/**
 * Appends the app metadata into the User-Agent value
 * @param appMetadata.name name of tool to be counted in instrumentation
 * @param appMetadata.version version of tool to be counted in instrumentation
 */
export function addAppMetadata({ name, version }: { name: string, version: string }): void {
  appMetadata[replaceSlashes(name)] = version;
}

/**
 * Returns the current User-Agent value for instrumentation
 */
export function getUserAgent(): string {
  const appIdentifier = Object.entries(appMetadata).map(([name, version]) => `${name}/${version}`).join(' ');
  // only prepend the appIdentifier when its not empty
  return ((appIdentifier.length > 0) ? `${appIdentifier} ` : '') + baseUserAgent;
}

/**
 * Build a Promise that will resolve after the specified number of milliseconds.
 * @param ms milliseconds to wait
 * @param value value for eventual resolution
 */
export function delay<T>(ms: number, value?: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

/**
 * Reduce an asynchronous iterable into a single value.
 * @param iterable the async iterable to be reduced
 * @param callbackfn a function that implements one step of the reduction
 * @param initialValue the initial value for the accumulator
 */
export async function awaitAndReduce<T, U>(iterable: AsyncIterable<T>,
                                           callbackfn: (previousValue: U, currentValue: T) => U,
                                           initialValue: U): Promise<U> {
  // TODO: make initialValue optional (overloads or conditional types?)
  let accumulator = initialValue;
  for await (const value of iterable) {
    accumulator = callbackfn(accumulator, value);
  }
  return accumulator;
}

export type AgentOption = Agent | {
  http?: Agent,
  https?: Agent,
} | boolean;

// This interface is a subset of the options in SecureContextOptions from the node lib
// tslint:disable:prefer-array-literal
export interface TLSOptions {
  pfx?: string | Buffer | Array<string | Buffer | Object>;
  key?: string | Buffer | Array<Buffer | Object>;
  passphrase?: string;
  cert?: string | Buffer | Array<string | Buffer>;
  ca?: string | Buffer | Array<string | Buffer>;
}
// tslint:enable:prefer-array-literal

/**
 * Detects whether an object is an Agent
 */
function isAgent(obj: any): obj is Agent {
  // This check is not perfect, but we're borrowing this from a very common library where agent are generated.
  // https://github.com/TooTallNate/node-agent-base/blob/c7ffe87ca4cd996f94ef70b5665c582b88791dca/index.js#L10
  return obj && typeof obj.addRequest === 'function';
}

/**
 * Returns an agent (or false or undefined) for the specific scheme and option passed in
 * @param scheme either 'http' or 'https'
 */
export function agentForScheme(scheme: 'http' | 'https', agentOption?: AgentOption): Agent | boolean | undefined {
  if (agentOption === undefined) {
    return undefined;
  }
  if (typeof agentOption === 'boolean') {
    return agentOption;
  }
  if (isAgent(agentOption)) {
    return agentOption;
  }
  return agentOption[scheme];
}
