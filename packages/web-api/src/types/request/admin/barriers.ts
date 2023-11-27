import type { CursorPaginationEnabled, TokenOverridable } from '../common';

// https://api.slack.com/methods/admin.barriers.create
export interface AdminBarriersCreateArguments extends TokenOverridable {
  barriered_from_usergroup_ids: string[];
  primary_usergroup_id: string;
  restricted_subjects: string[]; // TODO: this should always be ['im','mpim','call'] according to the docs
}
// https://api.slack.com/methods/admin.barriers.delete
export interface AdminBarriersDeleteArguments extends TokenOverridable {
  barrier_id: string;
}
// https://api.slack.com/methods/admin.barriers.list
export interface AdminBarriersListArguments extends TokenOverridable, CursorPaginationEnabled { }

// https://api.slack.com/methods/admin.barriers.update
export interface AdminBarriersUpdateArguments extends TokenOverridable {
  barrier_id: string;
  barriered_from_usergroup_ids: string[];
  primary_usergroup_id: string;
  restricted_subjects: string[]; // TODO: this should always be ['im','mpim','call'] according to the docs
}

