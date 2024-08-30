export interface CallRejectedEvent {
  type: 'call_rejected';
  call_id: string;
  user_id: string;
  channel_id: string;
  external_unique_id: string;
}
