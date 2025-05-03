import type { EntityMetadata } from '@slack/types';
import type { TokenOverridable } from './common';

// https://api.slack.com/methods/entity.presentDetails
export type EntityPresentDetailsArguments = TokenOverridable & {
  /**
   * @description Eentity metadata that will be presented in the flexpane.
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
    // Accepted values: ["restricted", "internal_error", "not_found", "user_not_authed", "custom"]
    status: string;
    // If status is 'custom', you can use this field to provide a specific message.
    custom_message?: string;
  };
};
