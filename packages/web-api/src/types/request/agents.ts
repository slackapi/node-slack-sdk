import type { TokenOverridable } from './common';

// https://docs.slack.dev/reference/methods/agents.sessions.rename
export interface AgentsSessionsRenameArguments extends TokenOverridable {
  /** @description ID of the channel containing the agent session. */
  channel_id: string;
  /** @description New title for the agent session (1-200 characters). For a session channel, this also renames the channel. */
  title: string;
  /**
   * @description Timestamp of the thread root message the session is scoped to. Required for thread-based sessions in
   * regular channels and DMs. Must be omitted for session channels.
   */
  thread_ts?: string;
}

// https://docs.slack.dev/reference/methods/agents.sessions.setStatus
export interface AgentsSessionsSetStatusArguments extends TokenOverridable {
  /** @description ID of the channel containing the agent session. */
  channel_id: string;
  /** @description The lifecycle status to set. Acceptable values: `active`, `processing`, `suspended`, `closed`. */
  status: string;
  /**
   * @description Timestamp of the thread root message the session is scoped to. Required for thread-based sessions in
   * regular channels and DMs. Must be omitted for session channels.
   */
  thread_ts?: string;
  /**
   * @description Title for the agent session (max 200 characters). Only used when creating a new session; ignored if
   * the session already exists. To rename an existing session, use `agents.sessions.rename`.
   */
  title?: string;
  /**
   * @description The user who initiated the session. Only used when creating a new session; ignored if the session
   * already exists. Must be a member of the channel.
   */
  initiator_user_id?: string;
  /**
   * @description Emoji to use as the agent's icon. Takes priority over `icon_url`. Remains in effect until you clear it
   * (pass `null`) or set a new value. Requires the `chat:write.customize` scope.
   * @example :chart_with_upwards_trend:
   */
  icon_emoji?: string;
  /**
   * @description URL to an image to use as the agent's icon. Remains in effect until you clear it (pass `null`) or set
   * a new value. Requires the `chat:write.customize` scope.
   * @example http://lorempixel.com/48/48
   */
  icon_url?: string;
  /**
   * @description Display name override for the agent (max 200 characters). Remains in effect until you clear it (pass
   * `null`) or set a new value. Requires the `chat:write.customize` scope.
   * @example My Bot
   */
  username?: string;
}
