import type { WebAPICallResult } from '../../WebClient';

export type AdminConversationsCreateForObjectsResponse = WebAPICallResult & {
  channel_id?: string;
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
  response_metadata?: ResponseMetadata;
};

export interface ResponseMetadata {
  messages?: string[];
}
