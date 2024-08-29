export interface DNDUpdatedEvent {
  type: 'dnd_updated';
  user: string;
  dnd_status: {
    dnd_enabled: boolean;
    next_dnd_start_ts: number;
    next_dnd_end_ts: number;
    snooze_enabled: boolean;
    snooze_endtime: number;
    snooze_remaining: number;
  };
  event_ts: string;
}

export interface DNDUpdatedUserEvent {
  type: 'dnd_updated_user';
  user: string;
  dnd_status: {
    dnd_enabled: boolean;
    next_dnd_start_ts: number;
    next_dnd_end_ts: number;
  };
  event_ts: string;
}
