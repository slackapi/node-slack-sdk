import type { WebAPICallResult } from '../../WebClient';

export type SlackListsDownloadStartResponse = WebAPICallResult & {
  channel?: string;
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
  ts?: string;
};
