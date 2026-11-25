import type { OptionalArgument } from '../helpers';

import type { TokenOverridable } from './common';

// https://docs.slack.dev/reference/methods/slackbot.skillSets.create
export interface SlackbotSkillSetsCreateArguments extends TokenOverridable {
  /** @description Human-readable label, 1 to 255 characters. Not unique. */
  display_name: string;
  /** @description What the skill set is for. Max 2,000 characters. */
  description?: string;
}

// https://docs.slack.dev/reference/methods/slackbot.skillSets.delete
export interface SlackbotSkillSetsDeleteArguments extends TokenOverridable {
  /** @description Skill set to delete. */
  skill_set_id: string;
}

// https://docs.slack.dev/reference/methods/slackbot.skillSets.info
export interface SlackbotSkillSetsInfoArguments extends TokenOverridable {
  /** @description Skill set to fetch. */
  skill_set_id: string;
}

// https://docs.slack.dev/reference/methods/slackbot.skillSets.items.add
export interface SlackbotSkillSetsItemsAddArguments extends TokenOverridable {
  /** @description Skill set to add the skills to. */
  skill_set_id: string;
  /**
   * @description One to 20 canvas skill IDs. Each distinct ID is processed once, in the order it first appears.
   * Successful items are not rolled back if other items fail.
   */
  skill_ids: string[];
}

// https://docs.slack.dev/reference/methods/slackbot.skillSets.items.remove
export interface SlackbotSkillSetsItemsRemoveArguments extends TokenOverridable {
  /** @description Skill set to remove the skills from. */
  skill_set_id: string;
  /**
   * @description One to 20 skill IDs. Each distinct ID is processed once. Successful items are not rolled back if
   * other items fail.
   */
  skill_ids: string[];
}

// https://docs.slack.dev/reference/methods/slackbot.skillSets.library.add
export interface SlackbotSkillSetsLibraryAddArguments extends TokenOverridable {
  /** @description Skill set to add to the caller's library. */
  skill_set_id: string;
}

// https://docs.slack.dev/reference/methods/slackbot.skillSets.library.remove
export interface SlackbotSkillSetsLibraryRemoveArguments extends TokenOverridable {
  /** @description Skill set to remove from the caller's library. */
  skill_set_id: string;
}

// https://docs.slack.dev/reference/methods/slackbot.skillSets.list
export type SlackbotSkillSetsListArguments = OptionalArgument<
  TokenOverridable & {
    /**
     * @description `library`: skill sets in the caller's library. `owned`: skill sets the caller created.
     * `editable`: skill sets the caller can edit. `accessible`: skill sets the caller can view. Defaults to `library`.
     */
    filter?: 'accessible' | 'editable' | 'library' | 'owned';
    /**
     * @description Paginate through collections of data by setting the `cursor` parameter to a `next_cursor`
     * attribute returned by a previous request's `response_metadata`. Must be used with the same `filter`.
     */
    cursor?: string;
    /**
     * @description The maximum number of skill sets to return, between 1 and 200. Defaults to 100. Fewer may be
     * returned even when more remain.
     */
    limit?: number;
  }
>;

// https://docs.slack.dev/reference/methods/slackbot.skillSets.update
export interface SlackbotSkillSetsUpdateArguments extends TokenOverridable {
  /** @description Skill set to change. */
  skill_set_id: string;
  /** @description Human-readable label, 1 to 255 characters. Not unique. */
  display_name?: string;
  /** @description What the skill set is for. Max 2,000 characters. Send an empty string to clear. */
  description?: string;
}

// https://docs.slack.dev/reference/methods/slackbot.skills.create
export interface SlackbotSkillsCreateArguments extends TokenOverridable {
  /** @description Human-readable label. Max 255 characters; not unique. */
  display_name: string;
  /** @description Markdown body of the skill. Send exactly one of `instructions` or `canvas_id`. */
  instructions?: string;
  /** @description Canvas the caller owns to turn into a skill. Send exactly one of `instructions` or `canvas_id`. */
  canvas_id?: string;
  /** @description When Slackbot should use the skill. Max 400 characters. */
  description?: string;
  /** @description One of the skill categories. */
  category?:
    | 'communication'
    | 'customer_support'
    | 'data_and_analytics'
    | 'engineering'
    | 'other'
    | 'product_management'
    | 'productivity'
    | 'professional_development'
    | 'project_management'
    | 'sales'
    | 'system'
    | 'team_management';
  /** @description Max 200 characters. May contain `{skill}`, which becomes the skill mention. */
  example_prompt?: string;
  /**
   * @description Apps the skill needs, capped at the caller's MCP server limit. Declaring an app doesn't grant
   * access to it.
   */
  mcp_servers?: {
    service_type: string;
    app_id?: string;
    server_id?: string;
  }[];
}
// https://docs.slack.dev/reference/methods/slackbot.skills.delete
export interface SlackbotSkillsDeleteArguments extends TokenOverridable {
  /** @description Skill to delete. */
  skill_id: string;
}

// https://docs.slack.dev/reference/methods/slackbot.skills.info
export interface SlackbotSkillsInfoArguments extends TokenOverridable {
  /** @description Skill to fetch: a canvas file ID or a `builtin:` reference. */
  skill_id: string;
}

// https://docs.slack.dev/reference/methods/slackbot.skills.library.add
export interface SlackbotSkillsLibraryAddArguments extends TokenOverridable {
  /** @description Skill to turn on for the caller. */
  skill_id: string;
}

// https://docs.slack.dev/reference/methods/slackbot.skills.library.remove
export interface SlackbotSkillsLibraryRemoveArguments extends TokenOverridable {
  /** @description Skill to turn off for the caller. */
  skill_id: string;
}

// https://docs.slack.dev/reference/methods/slackbot.skills.list
export type SlackbotSkillsListArguments = OptionalArgument<
  TokenOverridable & {
    /**
     * @description `library`: skills enabled for the caller, including auto-enabled skills and skills from skill
     * sets. `owned`: skills the caller created. `catalog`: the organization's official skills.
     */
    filter?: 'catalog' | 'library' | 'owned';
    /** @description Only return skills in this category. */
    category?:
      | 'communication'
      | 'customer_support'
      | 'data_and_analytics'
      | 'engineering'
      | 'other'
      | 'product_management'
      | 'productivity'
      | 'professional_development'
      | 'project_management'
      | 'sales'
      | 'system'
      | 'team_management';
    /**
     * @description Paginate through collections of data by setting the `cursor` parameter to a `next_cursor`
     * attribute returned by a previous request's `response_metadata`. Must be used with the same `filter` and
     * `category`.
     */
    cursor?: string;
    /** @description The maximum number of skills to return. Fewer may be returned even when more remain. */
    limit?: number;
  }
>;

// https://docs.slack.dev/reference/methods/slackbot.skills.update
export interface SlackbotSkillsUpdateArguments extends TokenOverridable {
  /** @description Skill to change. */
  skill_id: string;
  /** @description Human-readable label. Max 255 characters. */
  display_name?: string;
  /** @description Markdown that replaces the whole document. */
  instructions?: string;
  /** @description When Slackbot should use the skill. Max 400 characters. Send an empty string to clear. */
  description?: string;
  /** @description One of the skill categories. Send an empty string to clear. */
  category?:
    | 'communication'
    | 'customer_support'
    | 'data_and_analytics'
    | 'engineering'
    | 'other'
    | 'product_management'
    | 'productivity'
    | 'professional_development'
    | 'project_management'
    | 'sales'
    | 'system'
    | 'team_management'
    | '';
  /** @description Max 200 characters. May contain `{skill}`. Send an empty string to clear. */
  example_prompt?: string;
  /** @description Apps the skill needs. Replaces the whole list; send `[]` to clear. */
  mcp_servers?: {
    service_type: string;
    app_id?: string;
    server_id?: string;
  }[];
}
