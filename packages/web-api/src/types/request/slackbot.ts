import type { TokenOverridable } from './common';

// https://docs.slack.dev/reference/methods/slackbot.skills.create
export type SlackbotSkillsCreateArguments = TokenOverridable & {
  /** @description Human-readable label. Max 255 characters; not unique. */
  display_name: string;
} & (
    | {
        /** @description Markdown body of the skill. Send exactly one of `instructions` or `canvas_id`. */
        instructions: string;
        canvas_id?: never;
      }
    | {
        instructions?: never;
        /** @description Canvas the caller owns to turn into a skill. Send exactly one of `instructions` or `canvas_id`. */
        canvas_id: string;
      }
  ) & {
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
    mcp_servers?: { service_type: string; app_id?: string; server_id?: string }[];
  };
