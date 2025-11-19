import type { WebAPICallResult } from '../../WebClient';

export type SlackListsDownloadStartResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
};
