import type { TokenOverridable } from './common';
import type { CallUser } from '@slack/types';

interface ID {
  /** @description `id` returned when registering the call using the `calls.add` method. */
  id: string;
}
interface Users {
  /**
   * @description The list of users to add/remove to/from the Call.
   * @see {@link https://api.slack.com/apis/calls#users Using the Calls API: a note on Users}.
   */
  users: CallUser[];
}
interface CallDetails {
  /** @description The URL required for a client to join the Call. */
  join_url: string;
  /**
   * @description When supplied, available Slack clients will attempt to directly launch the 3rd-party Call
   * with this URL.
   */
  desktop_app_join_url?: string;
  /** @description The name of the Call. */
  title?: string;
}

// https://api.slack.com/methods/calls.add
export interface CallsAddArguments extends Partial<Users>, CallDetails, TokenOverridable {
  /**
   * @description An ID supplied by the 3rd-party Call provider. It must be unique across all Calls from that service.
   */
  external_unique_id: string;
  /**
   * @description ID of the user who created this Call. When this method is called with a user token,
   * this field is optional and defaults to the authed user of the token. Otherwise, the field is required.
   */
  created_by?: string;
  /** @description Unix timestamp of the call start time. */
  date_start?: number;
  /**
   * @description An optional, human-readable ID supplied by the 3rd-party Call provider.
   * If supplied, this ID will be displayed in the Call object.
   */
  external_display_id?: string;
}

// https://api.slack.com/methods/calls.end
export interface CallsEndArguments extends ID, TokenOverridable {
  /** @description Call duration in seconds. */
  duration?: number;
}

// https://api.slack.com/methods/calls.info
export interface CallsInfoArguments extends ID, TokenOverridable {}

// https://api.slack.com/methods/calls.update
export interface CallsUpdateArguments extends ID, Partial<CallDetails>, TokenOverridable {}

// https://api.slack.com/methods/calls.participants.add
export interface CallsParticipantsAddArguments extends ID, Users, TokenOverridable {}

// https://api.slack.com/methods/calls.participants.remove
export interface CallsParticipantsRemoveArguments extends ID, Users, TokenOverridable {}
