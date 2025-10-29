import type { EntityActionButton, EntityMetadata } from '@slack/types';
import type { TokenOverridable } from './common';

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
