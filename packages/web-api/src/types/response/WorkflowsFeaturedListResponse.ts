import type { WebAPICallResult } from '../../WebClient';

export type WorkflowsFeaturedListResponse = WebAPICallResult & {
  featured_workflows: {
    channel_id: string;
    triggers: {
      id: string;
      title: string;
    }[];
  }[];
};
