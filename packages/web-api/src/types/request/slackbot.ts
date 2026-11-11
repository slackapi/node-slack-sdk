import type { OptionalArgument } from '../helpers';

import type { TokenOverridable } from './common';

export type SlackbotSkillCategory =
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

export interface SlackbotSkillMCPServer {
  app_id?: string;
  server_id?: string;
  service_type: string;
}

interface SkillCanvasID {
  /** @description Canvas the caller owns to turn into a skill. Send exactly one of `instructions` or `canvas_id`. */
  canvas_id: string;
}
interface SkillInstructions {
  /** @description Markdown body of the skill. Send exactly one of `instructions` or `canvas_id`. */
  instructions: string;
}
// Models either canvas_id or instructions - but not both.
type SkillCanvasIDOrInstructions =
  | (SkillCanvasID & { instructions?: never })
  | (SkillInstructions & { canvas_id?: never });

// https://docs.slack.dev/reference/methods/slackbot.skills.create
export type SlackbotSkillsCreateArguments = SkillCanvasIDOrInstructions &
  TokenOverridable & {
    /** @description One of the skill categories. */
    category?: SlackbotSkillCategory;
    /** @description When Slackbot should use the skill. Max 400 characters. */
    description?: string;
    /** @description Human-readable label. Max 255 characters; not unique. */
    display_name: string;
    /** @description Max 200 characters. May contain `{skill}`, which becomes the skill mention. */
    example_prompt?: string;
    /**
     * @description Apps the skill needs, capped at the caller's MCP server limit. Declaring an app doesn't grant
     * access to it.
     */
    mcp_servers?: SlackbotSkillMCPServer[];
  };

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
    /** @description Only return skills in this category. */
    category?: SlackbotSkillCategory;
    /**
     * @description Paginate through collections of data by setting the `cursor` parameter to a `next_cursor`
     * attribute returned by a previous request's `response_metadata`. Must be used with the same `filter` and
     * `category`.
     */
    cursor?: string;
    /**
     * @description `library`: skills enabled for the caller, including auto-enabled skills and skills from skill
     * sets. `owned`: skills the caller created. `catalog`: the organization's official skills.
     */
    filter?: 'catalog' | 'library' | 'owned';
    /** @description The maximum number of skills to return. Fewer may be returned even when more remain. */
    limit?: number;
  }
>;

// https://docs.slack.dev/reference/methods/slackbot.skills.update
export interface SlackbotSkillsUpdateArguments extends TokenOverridable {
  /** @description One of the skill categories. Send an empty string to clear. */
  category?: SlackbotSkillCategory | '';
  /** @description When Slackbot should use the skill. Max 400 characters. Send an empty string to clear. */
  description?: string;
  /** @description Human-readable label. Max 255 characters. */
  display_name?: string;
  /** @description Max 200 characters. May contain `{skill}`. Send an empty string to clear. */
  example_prompt?: string;
  /** @description Markdown that replaces the whole document. */
  instructions?: string;
  /** @description Apps the skill needs. Replaces the whole list; send `[]` to clear. */
  mcp_servers?: SlackbotSkillMCPServer[];
  /** @description Skill to change. */
  skill_id: string;
}
