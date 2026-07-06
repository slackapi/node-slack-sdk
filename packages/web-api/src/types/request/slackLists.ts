import type { RichTextBlock } from '@slack/types';

import type { TokenOverridable } from './common';

// Field type definitions for Slack Lists items:
// https://docs.slack.dev/reference/methods/slackLists.items.create#field-types

/**
 * @description Attachment field with file IDs.
 */
export interface SlackListsItemFieldAttachment {
  column_id: string;
  attachment: string[];
}

/**
 * @description Channel field with channel IDs.
 */
export interface SlackListsItemFieldChannel {
  column_id: string;
  channel: string[];
}

/**
 * @description Checkbox field with boolean value.
 */
export interface SlackListsItemFieldCheckbox {
  column_id: string;
  checkbox: boolean;
}

/**
 * @description Date field in YYYY-MM-DD format.
 */
export interface SlackListsItemFieldDate {
  column_id: string;
  date: string[];
}

/**
 * @description Email field with email addresses.
 */
export interface SlackListsItemFieldEmail {
  column_id: string;
  email: string[];
}

/**
 * @description Link field with URL data.
 */
export interface SlackListsItemFieldLink {
  column_id: string;
  link: Array<{
    original_url: string;
    display_as_url: boolean;
    display_name: string;
  }>;
}

/**
 * @description Message field with message URLs.
 */
export interface SlackListsItemFieldMessage {
  column_id: string;
  message: string[];
}

/**
 * @description Number field with numeric values.
 */
export interface SlackListsItemFieldNumber {
  column_id: string;
  number: number[];
}

/**
 * @description Phone field with phone numbers.
 */
export interface SlackListsItemFieldPhone {
  column_id: string;
  phone: string[];
}

/**
 * @description Rating field with numeric rating values.
 */
export interface SlackListsItemFieldRating {
  column_id: string;
  rating: number[];
}

/**
 * @description Reference field with file references.
 */
export interface SlackListsItemFieldReference {
  column_id: string;
  reference: Array<{
    file: {
      file_id: string;
    };
  }>;
}

/**
 * @description Text field with rich text formatting.
 */
export interface SlackListsItemFieldRichText {
  column_id: string;
  rich_text: RichTextBlock[];
}

/**
 * @description Select field with option IDs.
 */
export interface SlackListsItemFieldSelect {
  column_id: string;
  select: string[];
}

/**
 * @description Timestamp field with Unix timestamps.
 */
export interface SlackListsItemFieldTimestamp {
  column_id: string;
  timestamp: number[];
}

/**
 * @description User field containing user IDs.
 */
export interface SlackListsItemFieldUser {
  column_id: string;
  user: string[];
}

/**
 * @description Union type of all possible Slack Lists item field types.
 */
export type SlackListsItemField =
  | SlackListsItemFieldAttachment
  | SlackListsItemFieldChannel
  | SlackListsItemFieldCheckbox
  | SlackListsItemFieldDate
  | SlackListsItemFieldEmail
  | SlackListsItemFieldLink
  | SlackListsItemFieldMessage
  | SlackListsItemFieldNumber
  | SlackListsItemFieldPhone
  | SlackListsItemFieldRating
  | SlackListsItemFieldReference
  | SlackListsItemFieldRichText
  | SlackListsItemFieldSelect
  | SlackListsItemFieldTimestamp
  | SlackListsItemFieldUser;

/**
 * @description Slack Lists item structure.
 */
export interface SlackListsItem {
  /**
   * @description The unique identifier for the item.
   */
  id: string;
  /**
   * @description The ID of the List this item belongs to.
   */
  list_id: string;
  /**
   * @description Unix timestamp when the item was created.
   */
  date_created: number;
  /**
   * @description User ID of the creator.
   */
  created_by: string;
  /**
   * @description User ID of the last updater.
   */
  updated_by: string;
  /**
   * @description Array of field data for this item.
   */
  fields: SlackListsItemField[];
  /**
   * @description String representation of the last update timestamp.
   */
  updated_timestamp: string;
}

/**
 * @description Slack Lists item with subscription status (used in responses with include_is_subscribed).
 */
export interface SlackListsItemWithSubscription extends SlackListsItem {
  /**
   * @description Whether the user is subscribed to this item.
   */
  is_subscribed?: boolean;
}

/**
 * @description Cell update that includes row_id along with field data.
 * Used for slackLists.items.update to specify which row and column to update.
 */
export type SlackListsItemCellUpdate = SlackListsItemField & {
  /**
   * @description The ID of the row to update.
   */
  row_id: string;
};

// Schema definition types for slackLists.create:
// https://docs.slack.dev/reference/methods/slackLists.create#schema-definition

/**
 * @description Choice option for select columns.
 */
export interface SlackListsSchemaColumnChoice {
  /**
   * @description Value for the option.
   */
  value: string;
  /**
   * @description Label of the option to be displayed in the List.
   */
  label: string;
  /**
   * @description Color type.
   */
  color: string;
}

/**
 * @description Default values for specific column types.
 */
export interface SlackListsSchemaColumnDefaultValue {
  /**
   * @description Default user values (encoded user ids) for the people column.
   */
  user?: string[];
  /**
   * @description Default channel values (encoded channel ids) for the channel column.
   */
  channel?: string[];
  /**
   * @description Default select values for the select column. These values should be the same ones used in the choices value.
   * When defining a select column, you can add up to 100 options. However, you can only add up to 50 for a single cell.
   */
  select?: string[];
}

/**
 * @description Column options for configuring various column types.
 */
export interface SlackListsSchemaColumnOptions {
  /**
   * @description Used by select columns to specify options.
   */
  choices?: SlackListsSchemaColumnChoice[];
  /**
   * @description Used by some columns (such as the select column) to specify some options/formatting.
   */
  format?: string;
  /**
   * @description Used by numeric columns to specify number of decimal places.
   */
  precision?: number;
  /**
   * @description Used by date columns to specify the format of the date.
   */
  date_format?: string;
  /**
   * @description The emoji to be displayed e.g., ":smile:". Used by rating and vote columns.
   */
  emoji?: string;
  /**
   * @description The team ID the emoji belongs to. Used by rating columns.
   */
  emoji_team_id?: string;
  /**
   * @description Used by rating columns to specify the maximum rate value.
   */
  max?: number;
  /**
   * @description Default value for some columns.
   */
  default_value_typed?: SlackListsSchemaColumnDefaultValue;
  /**
   * @description Used by people, channel, and canvas columns to specify whether the entity name should be shown. Default is true.
   */
  show_member_name?: boolean;
  /**
   * @description Used by people columns to specify whether the users should be notified when the column is updated.
   */
  notify_users?: boolean;
}

/**
 * @description Column definition for a Slack List.
 */
export interface SlackListsSchemaColumn {
  /**
   * @description Key of the column.
   */
  key: string;
  /**
   * @description Name of the column to be displayed in the List.
   */
  name: string;
  /**
   * @description Type of the column.
   */
  type: string;
  /**
   * @description Whether the column is the primary column.
   * Only one column in the List can be the primary column, and it must be a text column.
   * In addition, you cannot reassign a different column to be the new primary column, even
   * if the new column is also a text column. If you want a new text column to be the primary
   * one, it is recommended to export the List to CSV, modify the order, and then create a
   * new List from the new CSV with the columns reordered.
   */
  is_primary_column?: boolean;
  /**
   * @description Column options.
   */
  options?: SlackListsSchemaColumnOptions;
}

// https://docs.slack.dev/reference/methods/slackLists.access.delete
export interface SlackListsAccessDeleteArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description List of channels you wish to update access for. Can only be used if user_ids is not provided.
   */
  channel_ids?: string[];

  /**
   * @description List of users you wish to update access for. Can only be used if channel_ids is not provided.
   */
  user_ids?: string[];
}

// https://docs.slack.dev/reference/methods/slackLists.access.set
export interface SlackListsAccessSetArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description Desired level of access.
   */
  access_level: string;

  /**
   * @description List of channels you wish to update access for. Can only be used if user_ids is not provided.
   */
  channel_ids?: string[];

  /**
   * @description List of users you wish to update access for. Can only be used if channel_ids is not provided.
   */
  user_ids?: string[];
}

// https://docs.slack.dev/reference/methods/slackLists.create
export interface SlackListsCreateArguments extends TokenOverridable {
  /**
   * @description Name of the List.
   */
  name: string;

  /**
   * @description A rich text description of the List.
   */
  description_blocks?: Array<RichTextBlock>;

  /**
   * @description Column definition for the List.
   * @see {@link https://docs.slack.dev/reference/methods/slackLists.create#schema-definition}
   */
  schema?: SlackListsSchemaColumn[];

  /**
   * @description ID of the List to copy.
   */
  copy_from_list_id?: string;

  /**
   * @description Boolean indicating whether to include records when a List is copied.
   */
  include_copied_list_records?: boolean;

  /**
   * @description Boolean indicating whether the List should be used to track todo tasks.
   */
  todo_mode?: boolean;
}

// https://docs.slack.dev/reference/methods/slackLists.download.get
export interface SlackListsDownloadGetArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description The ID of the recently started job to export the List.
   */
  job_id: string;
}

// https://docs.slack.dev/reference/methods/slackLists.download.start
export interface SlackListsDownloadStartArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description Boolean indicating whether to include archived items.
   */
  include_archived?: boolean;
}

// https://docs.slack.dev/reference/methods/slackLists.items.create
export interface SlackListsItemsCreateArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description ID of the record to make a copy of.
   */
  duplicated_item_id?: string;

  /**
   * @description ID of the parent record for this subtask.
   */
  parent_item_id?: string;

  /**
   * @description Initial item data.
   */
  initial_fields?: SlackListsItemField[];
}

// https://docs.slack.dev/reference/methods/slackLists.items.delete
export interface SlackListsItemsDeleteArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description ID of item to delete.
   */
  id: string;
}

// https://docs.slack.dev/reference/methods/slackLists.items.deleteMultiple
export interface SlackListsItemsDeleteMultipleArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description IDs of the items to delete.
   */
  ids: string[];
}

// https://docs.slack.dev/reference/methods/slackLists.items.info
export interface SlackListsItemsInfoArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description ID of item to delete.
   */
  id: string;

  /**
   * @description Set to true to include is_subscribed data for the returned List row.
   */
  include_is_subscribed?: boolean;
}

// https://docs.slack.dev/reference/methods/slackLists.items.list
export interface SlackListsItemsListArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description The maximum number of records to return.
   */
  limit?: number;

  /**
   * @description Next cursor for pagination.
   */
  cursor?: string;

  /**
   * @description Boolean indicating whether archived items or normal items should be returned.
   */
  archived?: boolean;
}

// https://docs.slack.dev/reference/methods/slackLists.items.update
export interface SlackListsItemsUpdateArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description Cells to update. Each cell includes the row_id, column_id, and field value.
   */
  cells: SlackListsItemCellUpdate[];
}

// https://docs.slack.dev/reference/methods/slackLists.update
export interface SlackListsUpdateArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  id: string;

  /**
   * @description Name of the List.
   */
  name?: string;

  /**
   * @description A rich text description of the List.
   */
  description_blocks?: Array<RichTextBlock>;

  /**
   * @description Boolean indicating whether the List should be used to track todo tasks.
   */
  todo_mode?: boolean;
}

// Response-only types for Slack Lists
// These types are used in API responses and include additional metadata

/**
 * @description A Slack List file object with complete metadata.
 */
export interface SlackList {
  /**
   * @description The unique identifier for the list.
   */
  id: string;
  /**
   * @description Unix timestamp when the list was created.
   */
  created: number;
  /**
   * @description Unix timestamp of the list.
   */
  timestamp: number;
  /**
   * @description The name of the list file.
   */
  name: string;
  /**
   * @description The display title of the list.
   */
  title: string;
  /**
   * @description The MIME type of the list.
   */
  mimetype: string;
  /**
   * @description The file type.
   */
  filetype: string;
  /**
   * @description Human-readable file type.
   */
  pretty_type: string;
  /**
   * @description User ID of the list owner.
   */
  user: string;
  /**
   * @description Team ID of the user.
   */
  user_team: string;
  /**
   * @description Whether the list is editable.
   */
  editable: boolean;
  /**
   * @description Size of the list in bytes.
   */
  size: number;
  /**
   * @description The mode of the list.
   */
  mode: string;
  /**
   * @description Whether the list is external.
   */
  is_external: boolean;
  /**
   * @description External type if applicable.
   */
  external_type: string;
  /**
   * @description Whether the list is public.
   */
  is_public: boolean;
  /**
   * @description Whether the public URL has been shared.
   */
  public_url_shared: boolean;
  /**
   * @description Whether to display as a bot.
   */
  display_as_bot: boolean;
  /**
   * @description Username if applicable.
   */
  username: string;
  /**
   * @description List metadata including schema and views.
   */
  list_metadata: SlackListsMetadata;
  /**
   * @description Limits and counts for the list.
   */
  list_limits: SlackListsLimits;
  /**
   * @description Private URL for the list.
   */
  url_private: string;
  /**
   * @description Private download URL.
   */
  url_private_download: string;
  /**
   * @description Permalink to the list.
   */
  permalink: string;
  /**
   * @description Public permalink.
   */
  permalink_public: string;
  /**
   * @description User ID of the last editor.
   */
  last_editor: string;
  /**
   * @description CSV download URL.
   */
  list_csv_download_url: string;
  /**
   * @description Unix timestamp of last update.
   */
  updated: number;
  /**
   * @description Whether the list is starred.
   */
  is_starred: boolean;
  /**
   * @description Whether shares were skipped.
   */
  skipped_shares: boolean;
  /**
   * @description Array of team IDs the list is shared with.
   */
  teams_shared_with: string[];
  /**
   * @description Whether restricted sharing is enabled.
   */
  is_restricted_sharing_enabled: boolean;
  /**
   * @description Whether the list has a rich preview.
   */
  has_rich_preview: boolean;
  /**
   * @description File access level.
   */
  file_access: string;
  /**
   * @description Access level.
   */
  access: string;
  /**
   * @description Organization or workspace access level.
   */
  org_or_workspace_access: string;
  /**
   * @description Whether the list is AI suggested.
   */
  is_ai_suggested: boolean;
}

/**
 * @description Source information for how the list was created.
 */
export interface SlackListsCreationSource {
  /**
   * @description The type of creation source (e.g., "copy_from_list").
   */
  type: string;
  /**
   * @description Reference ID for the source.
   */
  reference_id: string;
}

/**
 * @description Limits and counts for various list resources.
 */
export interface SlackListsLimits {
  /**
   * @description Whether the list has exceeded the maximum row count.
   */
  over_row_maximum: boolean;
  /**
   * @description The maximum number of rows allowed.
   */
  row_count_limit: number;
  /**
   * @description The current number of rows.
   */
  row_count: number;
  /**
   * @description The number of archived rows.
   */
  archived_row_count: number;
  /**
   * @description Whether the list has exceeded the maximum column count.
   */
  over_column_maximum: boolean;
  /**
   * @description The current number of columns.
   */
  column_count: number;
  /**
   * @description The maximum number of columns allowed.
   */
  column_count_limit: number;
  /**
   * @description Whether the list has exceeded the maximum view count.
   */
  over_view_maximum: boolean;
  /**
   * @description The current number of views.
   */
  view_count: number;
  /**
   * @description The maximum number of views allowed.
   */
  view_count_limit: number;
  /**
   * @description The maximum number of attachments per cell.
   */
  max_attachments_per_cell: number;
}

/**
 * @description Metadata for a Slack List including schema, views, and configuration.
 */
export interface SlackListsMetadata {
  /**
   * @description Array of column definitions with IDs.
   */
  schema: SlackListsSchemaColumnResponse[];
  /**
   * @description Array of view configurations.
   */
  views: SlackListsView[];
  /**
   * @description Array of integrations.
   */
  integrations: unknown[];
  /**
   * @description Icon for the list.
   */
  icon: string;
  /**
   * @description Text description of the list.
   */
  description: string;
  /**
   * @description Rich text blocks describing the list.
   */
  description_blocks: RichTextBlock[];
  /**
   * @description Whether the list is in trial mode.
   */
  is_trial: boolean;
  /**
   * @description Array of column definitions for subtasks.
   */
  subtask_schema: SlackListsSchemaColumnResponse[];
  /**
   * @description Information about how the list was created.
   */
  creation_source?: SlackListsCreationSource;
  /**
   * @description Whether the list is in todo mode.
   */
  todo_mode: boolean;
  /**
   * @description The default view.
   */
  default_view: string;
}

/**
 * @description Column definition returned in responses, includes all schema properties plus an id.
 */
export interface SlackListsSchemaColumnResponse extends SlackListsSchemaColumn {
  /**
   * @description The unique identifier for the column.
   */
  id: string;
}

/**
 * @description A view configuration for a Slack List.
 */
export interface SlackListsView {
  /**
   * @description The unique identifier for the view.
   */
  id: string;
  /**
   * @description The name of the view.
   */
  name: string;
  /**
   * @description The type of view (e.g., "table", "record").
   */
  type: string;
  /**
   * @description Whether the view is locked from editing.
   */
  is_locked: boolean;
  /**
   * @description The position of the view.
   */
  position: string;
  /**
   * @description Array of column configurations for this view.
   */
  columns: SlackListsViewColumn[];
  /**
   * @description Unix timestamp when the view was created.
   */
  date_created: number;
  /**
   * @description User ID of the creator.
   */
  created_by: string;
  /**
   * @description Whether to stick the column to the left.
   */
  stick_column_left: boolean;
  /**
   * @description Whether this is the "all items" view.
   */
  is_all_items_view: boolean;
  /**
   * @description The default view key.
   */
  default_view_key?: string;
  /**
   * @description Whether to show completed items.
   */
  show_completed_items?: boolean;
}

/**
 * @description Column visibility and position in a view.
 */
export interface SlackListsViewColumn {
  /**
   * @description Whether the column is visible in this view.
   */
  visible: boolean;
  /**
   * @description The column key.
   */
  key: string;
  /**
   * @description The column ID.
   */
  id: string;
  /**
   * @description The position of the column in the view.
   */
  position: string;
}
