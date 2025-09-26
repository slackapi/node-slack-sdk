import type { EntityMetadata } from '@slack/types';
import type { TokenOverridable } from './common';

// https://api.slack.com/methods/entity.presentDetails
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
    // Error status indicating why the entity could not be presented.
    status: string;
    // If status is 'custom', you can use this field to provide a message to the client.
    custom_message?: string;
    // String format, eg. 'markdown'.
    message_format?: string;
    // If status is 'custom', you can use this field to provide a title to the client.
    custom_title?: string;
    // Set of action buttons to be shown in case of a specific error.
    // biome-ignore lint/complexity/noBannedTypes: Allow Object
    actions?: Object[];
  };
};
