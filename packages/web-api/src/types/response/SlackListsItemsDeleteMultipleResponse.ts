import type { WebAPICallResult } from '../../WebClient';

export type SlackListsItemsDeleteMultipleResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
};
