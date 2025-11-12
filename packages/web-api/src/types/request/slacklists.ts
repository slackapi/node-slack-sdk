import type { RichTextBlock } from '@slack/types';

import type { TokenOverridable } from './common';

// https://docs.slack.dev/reference/methods/slackLists.create
export interface SlackListsCreateArguments extends TokenOverridable {
  name: string;
  description_blocks?: Array<RichTextBlock>;
  schema?: Array<Record<string, unknown>>;
  copy_from_list_id?: string;
  include_copied_list_records?: boolean;
  todo_mode?: boolean;
}
