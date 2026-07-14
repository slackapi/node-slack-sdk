import type { OptionalArgument } from '../helpers';
import type { TokenOverridable } from './common';

// https://docs.slack.dev/reference/methods/rtm.connect
export type RTMConnectArguments = OptionalArgument<
  TokenOverridable & {
    /**
     * @description Batch presence deliveries via subscription. Enabling changes the shape of `presence_change` events.
     * @see {@link https://docs.slack.dev/apis/web-api/user-presence-and-status#batching batch presence}.
     */
    batch_presence_aware?: boolean;
    /**
     * @description Only deliver presence events when requested by subscription.
     * @see {@link Only deliver presence events when requested by subscription. presence subscriptions}.
     */
    presence_sub?: boolean;
  }
>;
