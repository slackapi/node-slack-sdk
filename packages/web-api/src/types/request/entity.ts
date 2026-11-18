import type {
  EntityActionButton,
  EntityMetadata,
  EntityUserField,
  EntityUserIDField,
  RichTextBlock,
} from '@slack/types';
import type { TokenOverridable } from './common';

interface EntityComment {
  /** @description The comment content. Provide one of `comment.blocks` or `comment.value`. */
  comment:
    | {
        /** @description A rich text block containing the comment content. */
        blocks: RichTextBlock;
        format?: never;
        value?: never;
      }
    | {
        /** @description If set to `"markdown"`, the `comment.value` will be formatted as markdown. */
        format?: 'markdown';
        /**
         * @description Plain or markdown string containing the comment content. This will be used if `blocks` is not
         * present on the comment object.
         */
        value: string;
        blocks?: never;
      };
  /**
   * @description A unique ID sourced from your app and associated with the comment. It will be used if editing a
   * comment.
   */
  id: string;
  /** @description Same User type used in a Work Object's fields. */
  sender: EntityUserIDField | EntityUserField;
  /** @description Epoch timestamp in seconds. */
  timestamp: number;
  /**
   * @description If present and `true`, renders the delete button on that comment. When `true`, `delete_action_id`
   * should also be present, otherwise the delete button will render but do nothing when clicked. Empty strings are not
   * supported.
   */
  can_delete?: boolean;
  /** @description If present and `true`, indicates that the comment is editable in the user's flexpane. */
  can_edit?: boolean;
  /** @description If present and `true`, allows users to reply to this comment in a thread. */
  can_reply?: boolean;
  /** @description Pagination cursor associated with this comment's position in the list. */
  cursor?: string;
  /** @description Epoch timestamp in seconds of the last edit to this comment. */
  last_edit_ts?: number;
  /** @description Epoch timestamp in seconds of the most recent reply in the thread. */
  latest_reply_ts?: number;
  /** @description Number of replies in the thread under this comment. */
  reply_count?: number;
  /** @description Up to two users who have replied to this comment thread. Same User type as `sender`. */
  reply_users?: (EntityUserIDField | EntityUserField)[];
  /** @description The `id` of the parent comment. If present, this comment is a threaded reply. */
  thread_root_id?: string;
  /** @description URL which directs to the comment. */
  url?: string;
}

// https://docs.slack.dev/reference/methods/entity.acknowledgeCommentAction
export interface EntityAcknowledgeCommentActionArguments extends TokenOverridable {
  /** @description A reference to the original user action that initiated the comment mutation. */
  trigger_id: string;
  /** @description The full comment data. Required for edit and post actions. */
  comment?: EntityComment;
  /**
   * @description Error message if the action failed in the app. When present, signals that the mutation could not be
   * completed.
   */
  error?: string;
}

// https://docs.slack.dev/reference/methods/entity.presentComments
export interface EntityPresentCommentsArguments extends TokenOverridable {
  /** @description Array of comments to present to the user. */
  comments: EntityComment[];
  /** @description A reference to the original user action that initiated the request. */
  trigger_id: string;
  /** @description App supplied cursor used for pagination, will be sent in the next request for comments. */
  cursor?: string;
  /** @description Indicates whether the user has permissions to post comments. */
  can_post_comment?: boolean;
  /** @description The block action id that will be sent when a delete request is initiated for a comment. */
  delete_action_id?: string;
  /** @description Set to true (or 1) to indicate that the user must authenticate to see the comments data. */
  user_auth_required?: boolean;
  /** @description A custom URL to which users are directed for authentication if required. */
  user_auth_url?: string;
  /** @description Error response preventing comments data from being returned. */
  error?: EntityPresentDetailsArguments['error'];
}

// https://docs.slack.dev/reference/methods/entity.presentDetails
export type EntityPresentDetailsArguments = TokenOverridable & {
  /**
   * @description Entity metadata to be presented in the flexpane.
   * */
  metadata?: EntityMetadata;
  /**
   * @description A reference to the original user action that initated the request.
   * */
  trigger_id: string;
  /**
   * @description Set user_auth_required to true to indicate that the user must authenticate to view the full
   *  flexpane data. Defaults to false.
   * */
  user_auth_required?: boolean;
  /**
   * @description A custom URL to which users are directed for authentication if required.
   * Example: "https://example.com/onboarding?user_id=xxx"
   * */
  user_auth_url?: string;
  /** @description Error response preventing flexpane data from being returned. */
  error?: {
    /**
     * @description Error status indicating why the entity could not be presented.
     * */
    status: string;
    /**
     * @description If status is 'custom', you can use this field to provide a message to the client.
     * */
    custom_message?: string;
    /**
     * @description String format, eg. 'markdown'.
     * */
    message_format?: string;
    /**
     * @description If status is 'custom', you can use this field to provide a title to the client.
     * */
    custom_title?: string;
    /**
     * @description Set of action buttons to be shown in case of a specific error.
     * */
    actions?: EntityActionButton[];
  };
};
