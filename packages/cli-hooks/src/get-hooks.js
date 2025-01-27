#!/usr/bin/env node

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { SUPPORTED_NAMED_PROTOCOLS } from './protocols.js';

/**
 * Implementation of the get-hooks script hook required by the Slack CLI.
 * Printed as an object containing features provided by the SDK.
 */

if (fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(getHooks()));
}

/**
 * Standardized communication format between the SDK and CLI regarding hooks.
 * @typedef SDKInterface
 * @property {Record<string, string>} hooks - Commands available in the package.
 * @property {SDKConfig} config - Settings for SDK and CLI communication.
 * @property {string} runtime - Target runtime that app functions execute in.
 */

/**
 * Additional configurations provided to the CLI about the SDK.
 * @typedef SDKConfig
 * @property {string[]} protocol-version - Named CLI protocols used by the SDK.
 * @property {SDKConfigWatch} [watch] - Settings for file watching features.
 * @property {boolean} [sdk-managed-connection-enabled] -
 *   If the SDK or CLI manages websocket connections for run command executions.
 */

/**
 * Information about the files to watch for specific changes.
 * @typedef SDKConfigWatch
 * @property {string} filter-regex - Regex pattern for finding filtered files.
 * @property {string[]} paths - Specific locations to begin searching for files.
 */

/**
 * Contains available hooks and other configurations available to the SDK.
 * @returns {SDKInterface} Information about the hooks currently supported.
 */
export default function getHooks() {
  // NODE_NO_WARNINGS=1 silences node process warnings. These warnings can occur
  // on some node version (e.g. v23.2.0) and cause invalid JSON hook responses.
  return {
    hooks: {
      doctor: 'NODE_NO_WARNINGS=1 npx -q --no-install -p @slack/cli-hooks slack-cli-doctor',
      'check-update': 'NODE_NO_WARNINGS=1 npx -q --no-install -p @slack/cli-hooks slack-cli-check-update',
      'get-manifest': 'NODE_NO_WARNINGS=1 npx -q --no-install -p @slack/cli-hooks slack-cli-get-manifest',
      start: 'npx -q --no-install -p @slack/cli-hooks slack-cli-start',
    },
    config: {
      watch: {
        'filter-regex': '^manifest\\.json$',
        paths: ['.'],
      },
      'protocol-version': SUPPORTED_NAMED_PROTOCOLS,
      'sdk-managed-connection-enabled': true,
    },
    runtime: 'node',
  };
}
