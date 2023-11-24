import type { TokenOverridable } from '../common';

// TODO: breaking changes - potential type improvements:
// - date is required _except_ if metadata_only=true. metadata=true, then we are to omit it (according to docs)
// - metadata_only=true only works with type=public_channel
// https://api.slack.com/methods/admin.analytics.getFile
export interface AdminAnalyticsGetFileArguments extends TokenOverridable {
  type: 'public_channel' | 'member';
  date?: string;
  metadata_only?: boolean;
}
