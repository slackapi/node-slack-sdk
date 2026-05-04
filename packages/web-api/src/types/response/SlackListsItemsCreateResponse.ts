import type { WebAPICallResult } from '../../WebClient';
import type { SlackListsItem } from '../request/slackLists';

export type SlackListsItemsCreateResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
  item?: SlackListsItem;
};
