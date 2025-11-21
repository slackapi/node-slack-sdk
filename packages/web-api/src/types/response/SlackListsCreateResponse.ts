import type { WebAPICallResult } from '../../WebClient';
import type { SlackListsSchemaColumnResponse } from '../request/slackLists';

export type SlackListsCreateResponse = WebAPICallResult & {
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
  list_id?: string;
  list_metadata?: {
    schema?: SlackListsSchemaColumnResponse[];
    subtask_schema?: SlackListsSchemaColumnResponse[];
  };
};
