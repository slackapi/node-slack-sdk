/* eslint-disable no-multi-spaces,max-len */
import type { WebAPICallResult } from '../../WebClient';

export type AdminAnalyticsGetFileResponse = WebAPICallResult & {
  file_data?: (
    | AdminAnalyticsMemberDetails
    | AdminAnalyticsPublicChannelDetails
    | AdminAnalyticsPublicChannelMetadataDetails
  )[];
  error?: string;
  needed?: string;
  ok?: boolean;
  provided?: string;
  response_metadata?: ResponseMetadata;
};

export interface ResponseMetadata {
  messages?: string[];
}

export interface AdminAnalyticsMemberDetails {
  enterprise_id: string;
  team_id: string;
  date: string;
  user_id: string;
  email_address: string;
  is_guest: boolean;
  is_billable_seat: boolean;
  is_active: boolean;
  is_active_ios: boolean;
  is_active_android: boolean;
  is_active_desktop: boolean;
  reactions_added_count: number;
  messages_posted_count: number;
  channel_messages_posted_count: number;
  files_added_count: number;
  is_active_apps: boolean;
  is_active_workflows: boolean;
  is_active_slack_connect: boolean;
  total_calls_count: number;
  slack_calls_count: number;
  slack_huddles_count: number;
  search_count: number;
  date_claimed: number;
}

export interface AdminAnalyticsPublicChannelDetails {
  enterprise_id: string;
  originating_team: AdminAnalyticsOriginatingTeamDetails;
  channel_id: string;
  date_created: number;
  date_last_active: number;
  total_members_count: number;
  full_members_count: number;
  guest_member_count: number;
  messages_posted_count: number;
  messages_posted_by_members_count: number;
  members_who_viewed_count: number;
  members_who_posted_count: number;
  reactions_added_count: number;
  visibility: string;
  channel_type: string;
  is_shared_externally: boolean;
  shared_with: AdminAnalyticsSharedWithDetails[];
  externally_shared_with_organizations: AdminAnalyticsExternallySharedWithOrganizationsDetails[];
  date: string;
}

export interface AdminAnalyticsPublicChannelMetadataDetails {
  channel_id: string;
  name: string;
  topic: string;
  description: string;
  date: string;
}

export interface AdminAnalyticsOriginatingTeamDetails {
  team_id: string;
  name: string;
}

export interface AdminAnalyticsSharedWithDetails {
  team_id: string;
  name: string;
}

export interface AdminAnalyticsExternallySharedWithOrganizationsDetails {
  name: string;
  domain: string;
}
