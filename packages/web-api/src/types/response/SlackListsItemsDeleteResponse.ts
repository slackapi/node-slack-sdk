import type { WebAPICallResult } from '../../WebClient';

export type SlackListsItemsDeleteResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
};
