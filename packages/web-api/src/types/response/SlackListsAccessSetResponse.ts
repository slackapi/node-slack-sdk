import type { WebAPICallResult } from '../../WebClient';

export type SlackListsAccessSetResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
};
