import * as os from 'node:os';
import { basename } from 'node:path';

const packageJson = require('../package.json');

/**
 * Replaces occurrences of '/' with ':' in a string, since '/' is meaningful inside User-Agent strings as a separator.
 */
function replaceSlashes(s: string): string {
  return s.replace('/', ':');
}

const MAX_LATIN1_CODE = 0xFF;

/**
 * Ensures a string is safe for use in HTTP headers by URI-encoding characters outside the Latin-1 (ISO-8859-1) range.
 * Latin-1 characters (code points 0x00–0xFF) are preserved as-is; all others are percent-encoded via encodeURIComponent.
 */
function toLatin1Safe(s: string): string {
  let result = '';
  for (const char of s) {
    result += char.charCodeAt(0) <= MAX_LATIN1_CODE ? char : encodeURIComponent(char);
  }
  return result;
}

// TODO: for the deno build (see the `npm run build:deno` npm run script), we could replace the `os-browserify` npm
// module shim with our own shim leveraging the deno beta compatibility layer for node's `os` module (for more info
// see https://deno.land/std@0.116.0/node/os.ts). At the time of writing this TODO (2021/11/25), this required deno
// v1.16.2 and use of the --unstable flag. Once support for this exists without the --unstable flag, we can improve
// the `os` module deno shim to correctly report operating system from a deno runtime. Until then, the below `os`-
// based code will report "browser/undefined" from a deno runtime.
const baseUserAgent =
  `${replaceSlashes(packageJson.name)}/${packageJson.version} ` +
  `${toLatin1Safe(basename(process.title))}/${process.version.replace('v', '')} ` +
  `${os.platform()}/${os.release()}`;

const appMetadata: { [key: string]: string } = {};

/**
 * Appends the app metadata into the User-Agent value
 * @param appMetadata.name - name of tool to be counted in instrumentation
 * @param appMetadata.version - version of tool to be counted in instrumentation
 */
export function addAppMetadata({ name, version }: { name: string; version: string }): void {
  appMetadata[replaceSlashes(name)] = version;
}

/**
 * Returns the current User-Agent value for instrumentation
 */
export function getUserAgent(): string {
  const appIdentifier = Object.entries(appMetadata)
    .map(([name, version]) => `${name}/${version}`)
    .join(' ');
  // only prepend the appIdentifier when it's not empty
  return (appIdentifier.length > 0 ? `${appIdentifier} ` : '') + baseUserAgent;
}
