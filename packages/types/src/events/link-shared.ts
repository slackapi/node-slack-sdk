export interface LinkSharedEvent {
  type: 'link_shared';
  channel: string;
  is_bot_user_member: boolean;
  user: string;
  message_ts: string;
  thread_ts?: string;
  links: {
    domain: string;
    url: string;
  }[];
  unfurl_id?: string;
  source?: string;
  event_ts: string;
}
