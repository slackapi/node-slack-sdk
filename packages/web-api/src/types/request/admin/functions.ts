import type { CursorPaginationEnabled, TokenOverridable } from '../common';

// https://api.slack.com/methods/admin.functions.list
export interface AdminFunctionsListArguments extends TokenOverridable, CursorPaginationEnabled {
  /** @description Array of app IDs to get functions for; max 50. */
  app_ids: string[];
  /** @description The team context to retrieve functions from. */
  team_id?: string;
}

// https://api.slack.com/methods/admin.functions.permissions.lookup
export interface AdminFunctionsPermissionsLookupArguments extends TokenOverridable {
  /** @description An array of function IDs to get permissions for. */
  function_ids: [string, ...string[]];
}

// https://api.slack.com/methods/admin.functions.permissions.set
export interface AdminFunctionsPermissionsSetArguments extends TokenOverridable {
  /** @description The function ID to set permissions for. */
  function_id: string;
  /** @description The function visibility. */
  visibility: 'everyone' | 'app_collaborators' | 'named_entities' | 'no_one';
  /** @description List of user IDs to allow for `named_entities` visibility. */
  user_ids?: string[];
}
