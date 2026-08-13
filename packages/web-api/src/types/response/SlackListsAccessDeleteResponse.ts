import type { WebAPICallResult } from '../../WebClient';

export type SlackListsAccessDeleteResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
};
