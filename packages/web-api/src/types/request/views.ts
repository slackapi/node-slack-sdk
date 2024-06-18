import { View } from '@slack/types';

import { TokenOverridable } from './common';

interface BaseViewsArguments {
  /** @description A {@link https://api.slack.com/reference/surfaces/views view payload}. */
  view: View;
}

interface ViewTriggerId {
  /**
   * @description An access token originating from a user interaction in the Slack client.
   * One of `trigger_id` or `interactivity_pointer` is required to interact with views.
   */
  trigger_id: string;
}
interface ViewInteractivityPointer {
  /**
   * @description An access token originating from a user interaction in the Slack client.
   * One of `trigger_id` or `interactivity_pointer` is required to interact with views.
   */
  interactivity_pointer: string;
}

// https://api.slack.com/methods/views.open
export type ViewsOpenArguments = BaseViewsArguments & TokenOverridable & (ViewTriggerId | ViewInteractivityPointer);

// https://api.slack.com/methods/views.push
export type ViewsPushArguments = BaseViewsArguments & TokenOverridable & (ViewTriggerId | ViewInteractivityPointer);

interface ViewHash {
  /**
   * @description A string that represents view state to protect against possible race conditions.
   * @see {@link https://api.slack.com/surfaces/modals#handling_race_conditions Avoiding race conditions when using views}.
   */
  hash?: string;
}

// https://api.slack.com/methods/views.publish
export interface ViewsPublishArguments extends BaseViewsArguments, TokenOverridable, ViewHash {
  /** @description ID of the user you want publish a view to. */
  user_id: string;
}

interface ViewExternalId {
  /**
   * @description A unique identifier of the view set by the developer. Must be unique for all views on a team.
   * Max length of 255 characters. Either `view_id` or `external_id` is required.
   */
  external_id: string;
}
interface ViewViewId {
  /**
   * @description A unique identifier of the view to be updated. Either `view_id` or `external_id` is required.
   */
  view_id: string;
}

// https://api.slack.com/methods/views.update
export type ViewsUpdateArguments = BaseViewsArguments & TokenOverridable & (ViewExternalId | ViewViewId) & ViewHash;
