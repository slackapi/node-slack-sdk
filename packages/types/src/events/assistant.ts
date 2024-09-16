export interface AssistantThreadStartedEvent {
  type: "assistant_thread_started";
  assistant_thread: {
      user_id: string;
      context: { 
        channel_id: string; 
        team_id: string; 
        enterprise_id: string;
      };
      channel_id: string;
      thread_ts: string;
  };
  event_ts: string;
}

export interface AssistantThreadContextChangedEvent {
  type: "assistant_thread_context_changed";
  assistant_thread: {
    user_id: string;
    context: { 
      channel_id: string; 
      team_id: string; 
      enterprise_id: string;
    };
    channel_id: string;
    thread_ts: string;
  };
  event_ts: string;
}