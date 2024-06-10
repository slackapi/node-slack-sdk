// https://api.slack.com/methods/api.test
import { OptionalArgument } from '../helpers';

export type APITestArguments = OptionalArgument<{
  /** @description Error response to return. */
  error?: string;
}>;
