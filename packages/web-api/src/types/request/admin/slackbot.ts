import type { OptionalArgument } from '../../helpers';

import type { TokenOverridable } from '../common';

// https://docs.slack.dev/reference/methods/admin.slackbot.skills.list
export type AdminSlackbotSkillsListArguments = OptionalArgument<
  TokenOverridable & {
    /** @description Filter by org deployment, independently of publication. */
    auto_enabled_status?: 'all' | 'disabled' | 'enabled';
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
    /** @description Only return skills created by these users. Accepts U or W user IDs. */
    creator_ids?: string[];
    /**
     * @description Continuation from the previous page. Keep all filters and sorting unchanged. Pages can be empty
     * while a continuation remains; continue until next_cursor is empty. Changes during traversal may move results;
     * pagination is not a snapshot.
     */
    cursor?: string;
    /** @description The maximum number of skills to return. Fewer may be returned even when more remain. */
    limit?: number;
    /** @description Filter by publication to the org catalog. */
    publish_status?: 'all' | 'published' | 'unpublished';
    /**
     * @description Sort across the inventory. Name uses case-insensitive ordering. Unedited skills use their creation
     * date for date_updated sorting.
     */
    sort?: 'date_updated' | 'name' | 'usage_count';
    /** @description Sort direction; file ID breaks ties. */
    sort_dir?: 'asc' | 'desc';
  }
>;

// https://docs.slack.dev/reference/methods/admin.slackbot.skills.publish
export interface AdminSlackbotSkillsPublishArguments extends TokenOverridable {
  /** @description One to 50 skill IDs. Successful items are not rolled back if other items fail. */
  skill_ids: string[];
}

// https://docs.slack.dev/reference/methods/admin.slackbot.skills.setAutoEnabled
export interface AdminSlackbotSkillsSetAutoEnabledArguments extends TokenOverridable {
  /** @description Deployment audience. */
  permission_type: 'everyone' | 'named_entities' | 'no_one';
  /** @description Canvas skill to deploy. */
  skill_id: string;
  /**
   * @description One to 100 user groups for named_entities. Duplicates count toward the input limit and are stored
   * once. Omit for other permission types.
   */
  usergroup_ids?: string[];
}

// https://docs.slack.dev/reference/methods/admin.slackbot.skills.unpublish
export interface AdminSlackbotSkillsUnpublishArguments extends TokenOverridable {
  /** @description One to 50 skill IDs. Successful items are not rolled back if other items fail. */
  skill_ids: string[];
}
