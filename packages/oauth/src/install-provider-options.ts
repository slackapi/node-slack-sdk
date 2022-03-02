import { Logger, LogLevel } from '@slack/logger';
import { WebClientOptions } from '@slack/web-api';
import { StateStore } from './state-stores';
import { InstallationStore } from './stores';
import { InstallURLOptions } from './install-url-options';

export interface InstallProviderOptions {

  /**
   * Client ID, which can be found under the Basic Information section of your application on https://api.slack.com/apps
   */
  clientId: string;

  /**
   * Client Secret, which can be found under the Basic Information section of your application on https://api.slack.com/apps
   */
  clientSecret: string;

  /**
   * Manages installation data, which can be called by both the OAuth flow and authorize() in event handling
   */
  installationStore?: InstallationStore; // default MemoryInstallationStore

  /**
   * The slack.com authorize URL
   */
  authorizationUrl?: string;

  /**
   * Stores state issued to authorization server
   * and verifies the value returned at redirection during OAuth flow to prevent CSRF
   */
  stateStore?: StateStore; // default ClearStateStore

  /**
   * The secret value used for generating the state parameter value
   */
  stateSecret?: string; // required with default ClearStateStore

  /**
   * handleCallback() verifies the state parameter if true (default: true)
   */
  stateVerification?: boolean; // default true, disables state verification when false

  /**
   * handleCallback() skips checking browser cookies if true (default: false)
   * Enabling this option is not recommended.
   * This is supposed to be used only for backward-compatibility with v2.4 and olders.
   */
  legacyStateVerification?: boolean;

  /**
   * The cookie name used for setting state parameter value in cookies
   */
  stateCookieName?: string;

  /**
   * The expiration time in seconds for the state parameter value stored via cookies
   */
  stateCookieExpirationSeconds?: number;

  /**
   * The function for rendering the web page for the install path URL
   */
  renderHtmlForInstallPath?: (url: string) => string;

  /**
   * The install path web page rendering will be skipped if true (default: false)
   */
  directInstall?: boolean; // default false, disables rendering "Add to Slack" page for /slack/install when true

  /**
   * The default is "v2" (a.k.a. Granular Bot Permissions), different from "v1" (a.k.a. "Classic Apps").
   * More details here:
   * - https://medium.com/slack-developer-blog/more-precision-less-restrictions-a3550006f9c3
   * - https://api.slack.com/authentication/migration
   */
  authVersion?: 'v1' | 'v2'; // default 'v2'

  /**
   * The initialization options for the OAuth flow
   */
  installUrlOptions?: InstallURLOptions;

  /**
   * @slack/logger logging used in this class
   */
  logger?: Logger;

  /**
   * @slack/logger logging level used in this class
   */
  logLevel?: LogLevel;

  /**
   * The customization options for WebClient
   */
  clientOptions?: Omit<WebClientOptions, 'logLevel' | 'logger'>;

}
