/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type AdminConversationsGetTeamsResponse = WebAPICallResult & {
  ok?:       boolean;
  team_ids?: string[];
  error?:    string;
  needed?:   string;
  provided?: string;
};
