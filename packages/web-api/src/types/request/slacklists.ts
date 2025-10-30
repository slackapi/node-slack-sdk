import type { Block, KnownBlock } from '@slack/types';

import type { TokenOverridable } from './common';

export interface SlackListsCreateArguments extends TokenOverridable {
  name: string;
  description_blocks?: Array<Record<string, Block | KnownBlock>>;
  schema?: Array<Record<string, Block | KnownBlock>>;
  copy_from_list_id?: string;
  include_copied_list_records?: boolean;
  todo_mode?: boolean;
}
