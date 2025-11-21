import type { WebAPICallResult } from '../../WebClient';

export type SlackListsDownloadGetResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
  status?: string;
  download_url?: string;
};
