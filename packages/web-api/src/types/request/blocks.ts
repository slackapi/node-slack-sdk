import type { OptionalArgument } from '../helpers';
import type { TokenOverridable } from './common';

// https://docs.slack.dev/reference/methods/blocks.validate
export type BlocksValidateArguments = OptionalArgument<
  TokenOverridable & {
    /** @description A JSON-encoded string of an array of blocks to validate. */
    blocks?: string;
    /** @description A JSON-encoded string of a message payload to validate. */
    message?: string;
    /** @description A JSON-encoded string of a view payload to validate. */
    view?: string;
  }
>;
