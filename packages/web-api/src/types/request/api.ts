// https://api.slack.com/methods/api.test
import type { OptionalArgument } from '../helpers';

export type APITestArguments = OptionalArgument<{
  /** @description Error response to return. */
  error?: string;
}>;
