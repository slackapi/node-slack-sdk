import type { WebAPICallResult } from '../../WebClient';

export type SlackListsUpdateResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
};
