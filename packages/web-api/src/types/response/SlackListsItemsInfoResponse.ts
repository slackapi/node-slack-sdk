import type { WebAPICallResult } from '../../WebClient';

export type SlackListsItemsInfoResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
};
