import type { CursorPaginationEnabled, OptionalTeamAssignable, TokenOverridable } from '../common';

interface InviteRequestID {
  /** @description ID of the request to invite. */
  invite_request_id: string;
}

// https://docs.slack.dev/reference/methods/admin.inviteRequests.approve
export interface AdminInviteRequestsApproveArguments
  extends InviteRequestID,
    Required<OptionalTeamAssignable>,
    TokenOverridable {}

// https://docs.slack.dev/reference/methods/admin.inviteRequests.approved.list
export interface AdminInviteRequestsApprovedListArguments
  extends Required<OptionalTeamAssignable>,
    TokenOverridable,
    CursorPaginationEnabled {}

// https://docs.slack.dev/reference/methods/admin.inviteRequests.denied.list
export interface AdminInviteRequestsDeniedListArguments
  extends Required<OptionalTeamAssignable>,
    TokenOverridable,
    CursorPaginationEnabled {}

// https://docs.slack.dev/reference/methods/admin.inviteRequests.deny
export interface AdminInviteRequestsDenyArguments
  extends InviteRequestID,
    Required<OptionalTeamAssignable>,
    TokenOverridable {}

// https://docs.slack.dev/reference/methods/admin.inviteRequests.list
export interface AdminInviteRequestsListArguments
  extends Required<OptionalTeamAssignable>,
    TokenOverridable,
    CursorPaginationEnabled {}
