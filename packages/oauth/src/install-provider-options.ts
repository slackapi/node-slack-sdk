import { Logger, LogLevel } from '@slack/logger';
import { WebClientOptions } from '@slack/web-api';
import { StateStore } from './state-stores';
import { InstallationStore } from './stores';

export interface InstallProviderOptions {
  clientId: string;
  clientSecret: string;
  stateStore?: StateStore; // default ClearStateStore
  stateSecret?: string; // required with default ClearStateStore
  stateVerification?: boolean; // default true, disables state verification when false
  installationStore?: InstallationStore; // default MemoryInstallationStore
  authVersion?: 'v1' | 'v2'; // default 'v2'
  logger?: Logger;
  logLevel?: LogLevel;
  clientOptions?: Omit<WebClientOptions, 'logLevel' | 'logger'>;
  authorizationUrl?: string;
}
