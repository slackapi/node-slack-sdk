export interface EntityDetailsRequestedEvent {
  type: 'entity_details_requested';
  user: string;
  trigger_id: string;
  link: {
    url: string;
    domain: string;
  };
  entity_url: string;
  app_unfurl_url?: string;
  user_locale: string;
  event_ts: string;
  external_ref?: {
    id: string;
    type?: string;
  };
  message_ts?: string;
  thread_ts?: string;
  channel?: string;
}
