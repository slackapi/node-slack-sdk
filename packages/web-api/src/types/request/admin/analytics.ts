import type { TokenOverridable } from '../common';

interface Date {
  /**
   * @description Date to retrieve the analytics data for, expressed as `YYYY-MM-DD` in UTC.
   * Required unless `metadata_only` is set to `true`.
   */
  date: string;
}
export interface MemberArgs extends Date {
  /**
   * @description The type of analytics to retrieve. The options are currently limited to
   * `member` (for grid member analytics) and `public_channel` (for public channel analytics).
   */
  type: 'member';
}
interface TypeChannel {
  /**
   * @description The type of analytics to retrieve. The options are currently limited to
   * `member` (for grid member analytics) and `public_channel` (for public channel analytics).
   */
  type: 'public_channel';
}
export interface PublicChannelWithDate extends TypeChannel, Date {
  /**
   * @description Retrieve metadata for the `type` of analytics indicated. Can be used only with `type` set to
   * `public_channel` analytics. Omit the date parameter when using this argument. Defaults to `false`.
   * @see {@link https://docs.slack.dev/reference/methods/admin.analytics.getFile#metadata_only Public channel metadata}.
   */
  metadata_only?: false;
}
export interface PublicChannelWithMetadata extends TypeChannel {
  /**
   * @description Retrieve metadata for the `type` of analytics indicated. Can be used only with `type` set to
   * `public_channel` analytics. Omit the date parameter when using this argument. Defaults to `false`.
   * @see {@link https://docs.slack.dev/reference/methods/admin.analytics.getFile#metadata_only Public channel metadata}.
   */
  metadata_only: true;
}
// when type=public_channel, either date must be provided, or metadata_only must be set to true, but not both
type PublicChannelArgs = PublicChannelWithDate | PublicChannelWithMetadata;

// https://docs.slack.dev/reference/methods/admin.analytics.getFile
export type AdminAnalyticsGetFileArguments = TokenOverridable & (MemberArgs | PublicChannelArgs);
