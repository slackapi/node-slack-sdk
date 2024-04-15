import { Logger, LogLevel } from './logger';
import { WebClient } from '@slack/web-api';

export default class BaseSocketModeClient {
  public logger: Logger;

  public webClient: WebClient;

  private appToken: string;

  private wssURI: string;

  private messageQueue: [];

  private messageListeners: [];

  private socketModeRequestListeners: [];

  private messageProcesser: () => void;
}
