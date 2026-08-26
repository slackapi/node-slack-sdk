import type { Block, KnownBlock, MessageAttachment, View } from '@slack/types';

import type { OptionalArgument } from '../helpers';
import type { TokenOverridable } from './common';

// https://docs.slack.dev/reference/methods/blocks.validate
export type BlocksValidateArguments = OptionalArgument<
  TokenOverridable & {
    /** @description An array of blocks to validate. */
    blocks?: (KnownBlock | Block)[];
    /** @description A message payload to validate. */
    message?: {
      blocks?: (KnownBlock | Block)[];
      attachments?: MessageAttachment[];
    };
    /** @description A view payload to validate. */
    view?: View;
  }
>;
