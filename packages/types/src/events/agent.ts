// https://docs.slack.dev/reference/events/agent_session_stopped
export interface AgentSessionStoppedEvent {
  type: 'agent_session_stopped';
  channel: string;
  user: string;
  thread_ts: string;
  streaming_message_ts: string[];
  event_ts: string;
}

// https://docs.slack.dev/reference/events/agent_session_title_changed
export interface AgentSessionTitleChangedEvent {
  type: 'agent_session_title_changed';
  channel: string;
  user: string;
  team_id: string;
  thread_ts: string;
  title: string;
  previous_title?: string;
  event_ts: string;
}
