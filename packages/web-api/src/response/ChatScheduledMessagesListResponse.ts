/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ChatScheduledMessagesListResponse = WebAPICallResult & {
  ok?:                 boolean;
  scheduled_messages?: ScheduledMessage[];
  response_metadata?:  ResponseMetadata;
  error?:              string;
  needed?:             string;
  provided?:           string;
};

export interface ResponseMetadata {
  next_cursor?: string;
}

export interface ScheduledMessage {
  id?:           string;
  channel_id?:   string;
  post_at?:      number;
  date_created?: number;
  text?:         string;
}
