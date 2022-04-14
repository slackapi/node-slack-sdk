import { WebClientOptions } from '@slack/web-api';
import { LogLevel, Logger } from './logger';

export interface SocketModeOptions {
  appToken?: string; // app level token
  logger?: Logger;
  logLevel?: LogLevel;
  autoReconnectEnabled?: boolean;
  clientPingTimeout?: number;
  clientOptions?: Omit<WebClientOptions, 'logLevel' | 'logger'>;
}
