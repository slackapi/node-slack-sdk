import type { WebAPICallResult } from '../../WebClient';

export type SlackListsItemsListResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
};
