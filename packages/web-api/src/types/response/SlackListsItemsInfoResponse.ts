import type { WebAPICallResult } from '../../WebClient';
import type { SlackList, SlackListsItem, SlackListsItemWithSubscription } from '../request/slackLists';

export type SlackListsItemsInfoResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
  list?: SlackList;
  record?: SlackListsItemWithSubscription;
  subtasks?: SlackListsItem[];
};
