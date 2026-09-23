import type { Block, KnownBlock } from '@slack/types';

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

// https://docs.slack.dev/reference/methods/agents.conversations.create
export interface AgentsConversationsCreateArguments extends TokenOverridable {
  /**
   * @description Encoded team ID to create the channel in. Required for org tokens when `origin_channel_id` is not
   * provided. When omitted, the workspace is derived from the token.
   */
  team_id?: string;
  /**
   * @description An opaque identifier for the agent session. When provided, the call is idempotent: if a channel already
   * exists for this `session_id`, it is returned instead of creating a new one.
   */
  session_id?: string;
  /**
   * @description A friendly display name for the code channel. Optional when `origin_channel_id` and `origin_message_ts`
   * are provided — in that case the channel name is derived from the origin message.
   */
  name: string;
  /** @description Create a private channel instead of a public one. */
  is_private?: boolean;
  /**
   * @description The channel ID where the agent session was initiated from. Must be provided together with
   * `origin_message_ts`. The channel must be accessible to the calling app.
   */
  origin_channel_id?: string;
  /**
   * @description The message timestamp in the origin channel that started the agent session. Must be provided together
   * with `origin_channel_id`.
   */
  origin_message_ts?: string;
}

// https://docs.slack.dev/reference/methods/agents.conversations.archive
export interface AgentsConversationsArchiveArguments extends TokenOverridable {
  /** @description ID of the code channel to archive. */
  channel_id: string;
  /**
   * @description Timestamp of a message in the code channel to share back as a thread reply on the origin message.
   * Requires the channel to have an `origin_link`.
   */
  summary_message_ts?: string;
}

// https://docs.slack.dev/reference/methods/agents.conversations.setProperties
export interface AgentsConversationsSetPropertiesArguments extends TokenOverridable {
  /** @description ID of the code channel to update. */
  channel_id: string;
  /** @description New display title for the agent session. */
  title?: string;
  /** @description New status for the agent session. */
  status?: string;
  /** @description Code channel properties to set. Only provided fields are updated. */
  code_channel?: Record<string, unknown>;
  /** @description Agent resource properties to set. Only provided fields are updated. */
  agent_resource?: Record<string, unknown>;
}

// https://docs.slack.dev/reference/methods/agents.conversations.setView
export interface AgentsConversationsSetViewArguments extends TokenOverridable {
  /** @description ID of the code channel to render the view in. */
  channel_id: string;
  /**
   * @description The kind of view to create or update. Defaults to `html`. Determines which other arguments are
   * required: `html` and `diff` require `content`, `block_kit` requires `blocks`, `canvas` requires `canvas_id`,
   * `pull_request` requires `pr_url`.
   */
  type?: string;
  /**
   * @description Agent-assigned stable identity for the view (e.g. the source file path on the agent's machine). Used as
   * the upsert key: calls with the same `view_key` update the existing view.
   */
  view_key?: string;
  /**
   * @description View content. For `html`, a full self-contained HTML document; for `diff`, raw unified diff text.
   * Capped at 1,000,000 bytes — larger content returns an error.
   */
  content?: string;
  /** @description Block Kit blocks to render in the view tab. Required when `type` is `block_kit`; ignored otherwise. */
  blocks?: (KnownBlock | Block)[];
  /** @description Encoded ID of the canvas to attach as the view. Required when `type` is `canvas`; ignored otherwise. */
  canvas_id?: string;
  /**
   * @description For canvas views: access level granted to the channel for the canvas tab. Defaults to `write`. Use
   * `comment` to grant channel members comment access.
   */
  access_level?: string;
  /**
   * @description For canvas views: hash of the canvas-derived markdown the agent last wrote, recorded so the agent can
   * later detect human edits to the canvas.
   */
  agent_content_hash?: string;
  /** @description For pull_request views: the pull request's URL. Required when `type` is `pull_request`; ignored otherwise. */
  pr_url?: string;
  /** @description For diff views: base branch name for display purposes. */
  base_branch?: string;
  /** @description For diff views: head branch name for display purposes. */
  head_branch?: string;
  /**
   * @description Display label for the view tab. Preferred over the legacy `label` argument (`name` wins if both are
   * supplied). Defaults to the last path segment of `view_key`.
   */
  name?: string;
  /**
   * @description Deprecated alias for `name`. Display label for the view tab. Defaults to the last path segment of
   * `view_key`, stripped of any `.html`/`.htm` extension.
   */
  label?: string;
  /**
   * @description Content-Security-Policy domain declarations for the view. Domains are validated server-side
   * (https-only, no private/internal hosts) and persisted with the view.
   */
  csp?: Record<string, unknown>;
}

// https://docs.slack.dev/reference/methods/agents.conversations.setCommands
export interface AgentsConversationsSetCommandsArguments extends TokenOverridable {
  /** @description ID of the code channel to register commands for. */
  channel_id: string;
  /**
   * @description Full set of commands to register for the calling agent in this channel, replacing that agent's
   * previously registered set. Pass an empty array to clear the agent's commands.
   */
  commands: Record<string, unknown>[];
}

// https://docs.slack.dev/reference/methods/agents.conversations.listViews
export interface AgentsConversationsListViewsArguments extends TokenOverridable {
  /** @description ID of the code channel to list views for. */
  channel_id: string;
}

// https://docs.slack.dev/reference/methods/agents.conversations.removeView
export interface AgentsConversationsRemoveViewArguments extends TokenOverridable {
  /** @description ID of the code channel to remove the view from. */
  channel_id: string;
  /** @description Agent-assigned key of the view to remove. Provide exactly one of `view_key` or `view_id`. */
  view_key?: string;
  /** @description Encoded channel tab ID of the view to remove. Provide exactly one of `view_key` or `view_id`. */
  view_id?: string;
}

// https://docs.slack.dev/reference/methods/agents.conversations.getCanvas
export interface AgentsConversationsGetCanvasArguments extends TokenOverridable {
  /** @description ID of the agent session channel the canvas belongs to. */
  channel: string;
  /** @description Encoded ID of the canvas to fetch. */
  canvas_id: string;
  /** @description Format to render the canvas content in. Defaults to `markdown`. */
  content_format?: string;
  /** @description Whether to include resolved comment threads in the response. Defaults to `false`. */
  include_resolved?: boolean;
}

// https://docs.slack.dev/reference/methods/agents.conversations.setCanvasContent
export interface AgentsConversationsSetCanvasContentArguments extends TokenOverridable {
  /** @description ID of the agent session channel the canvas is attached to. */
  channel: string;
  /** @description Encoded ID of the canvas whose content to replace. */
  canvas_id: string;
  /**
   * @description The full new canvas content as markdown. The server diffs this against the current content and applies
   * only the changed sections.
   */
  content: string;
}
