/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type RemindersListResponse = WebAPICallResult & {
  ok?:        boolean;
  reminders?: Reminder[];
  error?:     string;
  needed?:    string;
  provided?:  string;
};

export interface Reminder {
  id?:          string;
  creator?:     string;
  text?:        string;
  user?:        string;
  recurring?:   boolean;
  time?:        number;
  complete_ts?: number;
  channel?:     string;
}
