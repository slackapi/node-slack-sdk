import * as os from 'os';
const packageJson = require('../package.json'); // tslint:disable-line:no-require-imports no-var-requires

/**
 * Replaces occurrences of '/' with ':' in a string, since '/' is meaningful inside User-Agent strings as a separator.
 */
function replaceSlashes(s: string): string {
  return s.replace('/', ':');
}

const baseUserAgent = `${replaceSlashes(packageJson.name)}/${packageJson.version} ` +
                      `node/${process.version.replace('v', '')} ` +
                      `${os.platform()}/${os.release()}`;

// TODO: refactor, shouldn't be a global singleton. that would require app metadata to become an option for all objects
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
