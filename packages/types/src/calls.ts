// These types represent users in Slack Calls, which is an API for showing 3rd party calls within the Slack client.
// More information on the API guide for Calls: https://api.slack.com/apis/calls
// and on User objects for use with Calls: https://api.slack.com/apis/calls#users

/**
 * @description For use in representing {@link https://api.slack.com/apis/calls#users users in a Slack Call}.
 */
export type CallUser = CallUserSlack | CallUserExternal;

export interface CallUserSlack {
  /**
   * @description The Slack encoded user ID, e.g. U1234ABCD. Set this if you have it or know it, otherwise, set
   * `external_id` and `display_name`.
   */
  slack_id: string;
}

export interface CallUserExternal {
  /**
   * @description A unique ID created by your app to represent your users.
   */
  external_id: string;
  /**
   * @description Name of the user to be displayed in the Call block in a message.
   */
  display_name: string;
  /**
   * @description URL to an avatar image of the user.
   */
  avatar_url?: string;
}
