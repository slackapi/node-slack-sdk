import type { WebAPICallResult } from '../../WebClient';

export type SlackListsItemsUpdateResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
};
