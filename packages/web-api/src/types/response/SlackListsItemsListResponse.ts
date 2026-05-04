import type { WebAPICallResult } from '../../WebClient';
import type { SlackListsItem } from '../request/slackLists';

export type SlackListsItemsListResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
  items?: Array<SlackListsItem>;
  response_metadata?: {
    next_cursor?: string;
  };
};
