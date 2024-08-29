// NOTE: `file_comment_added` and `file_comment_edited` are left out because they are discontinued

export interface FileChangeEvent {
  type: 'file_change';
  file_id: string;
  file: {
    id: string;
  };
}

export interface FileCommentDeletedEvent {
  type: 'file_comment_deleted';
  comment: string; // this is an ID
  file_id: string;
  file: {
    id: string;
  };
}

export interface FileCreatedEvent {
  type: 'file_created';
  file_id: string;
  user_id: string;
  file: {
    id: string;
  };
  event_ts: string;
}

export interface FileDeletedEvent {
  type: 'file_deleted';
  file_id: string;
  channel_ids?: string[];
  event_ts: string;
}

export interface FilePublicEvent {
  type: 'file_public';
  file_id: string;
  user_id: string;
  file: {
    id: string;
  };
  event_ts: string;
}

export interface FileSharedEvent {
  type: 'file_shared';
  file_id: string;
  user_id: string;
  file: {
    id: string;
  };
  channel_id: string;
  event_ts: string;
}

export interface FileUnsharedEvent {
  type: 'file_unshared';
  file_id: string;
  user_id: string;
  file: {
    id: string;
  };
  channel_id: string;
  event_ts: string;
}
