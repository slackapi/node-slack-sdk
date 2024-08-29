export interface InviteRequestedEvent {
  type: 'invite_requested';
  invite_request: {
    id: string;
    email: string;
    date_created: number;
    requester_ids: string[];
    channel_ids: string[];
    invite_type: 'restricted' | 'ultra_restricted' | 'full_member';
    real_name: string;
    date_expire: number;
    request_reason: string;
    team: {
      id: string;
      name: string;
      domain: string;
    };
  };
}
