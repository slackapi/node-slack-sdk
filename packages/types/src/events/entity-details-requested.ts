export interface EntityDetailsRequestedEvent {
  type: 'entity_details_requested';
  user: string;
  external_ref: {
    id: string;
    type?: string;
  };
  trigger_id: string;
  event_ts: string;
}
