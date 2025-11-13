import type { WebAPICallResult } from '../../WebClient';

export type SlackListsDownloadGetResponse = WebAPICallResult & {
  channel?: string;
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
  ts?: string;
};
