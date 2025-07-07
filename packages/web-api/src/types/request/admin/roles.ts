import type { OptionalArgument } from '../../helpers';

import type { CursorPaginationEnabled, SortDir, TokenOverridable, UserIDs } from '../common';

export interface EntityIDs {
  /**
   * @description List of the entity IDs for which roles will be assigned/listed/removed.
   * These can be Org IDs (E12345), Team IDs (T12345) or Channel IDs (C12345).
   */
  entity_ids: [string, ...string[]];
}

interface RoleID {
  /**
   * @description ID of the role to which users will be assigned/removed.
   * @see {@link https://docs.slack.dev/reference/methods/admin.roles.addAssignments Admin Roles under Usage info}.
   */
  role_id: string;
}

// https://docs.slack.dev/reference/methods/admin.roles.addAssignments
export interface AdminRolesAddAssignmentsArguments extends EntityIDs, RoleID, UserIDs, TokenOverridable {}

// https://docs.slack.dev/reference/methods/admin.roles.listAssignments
export type AdminRolesListAssignmentsArguments = OptionalArgument<
  Partial<EntityIDs> &
    TokenOverridable &
    CursorPaginationEnabled &
    SortDir & {
      /**
       * @description Collection of role ids to scope results by.
       * @see {@link https://docs.slack.dev/reference/methods/admin.roles.addAssignments Admin Roles under Usage info}.
       */
      role_ids?: string[];
    }
>;

// https://docs.slack.dev/reference/methods/admin.roles.removeAssignments
export interface AdminRolesRemoveAssignmentsArguments extends EntityIDs, RoleID, UserIDs, TokenOverridable {}
