import type { AppID, CursorPaginationEnabled, SortDir, TokenOverridable } from '../common';
import { OptionalArgument } from '../../helpers';

interface CollaboratorIDs {
  /** @description Array of collaborators (encoded user IDs) - maximum of 50 items. */
  collaborator_ids: [string, ...string[]];
}

interface WorkflowIDs {
  /** @description Array of workflow IDs - maximum of 50 items. */
  workflow_ids: [string, ...string[]];
}

// https://api.slack.com/methods/admin.workflows.collaborators.add
export interface AdminWorkflowsCollaboratorsAddArguments extends CollaboratorIDs, WorkflowIDs, TokenOverridable {}

// https://api.slack.com/methods/admin.workflows.collaborators.remove
export interface AdminWorkflowsCollaboratorsRemoveArguments extends CollaboratorIDs, WorkflowIDs, TokenOverridable {}

// https://api.slack.com/methods/admin.workflows.permissions.lookup
export interface AdminWorkflowsPermissionsLookupArguments extends WorkflowIDs, TokenOverridable {
  /**
   * @description Maximum number of triggers to fetch for each workflow when determining overall run permissions.
   * Defaults to `100`. Maximum of `1000`.
   */
  max_workflow_triggers?: number;
}

// https://api.slack.com/methods/admin.workflows.search
export type AdminWorkflowsSearchArguments = OptionalArgument<Partial<AppID> & Partial<CollaboratorIDs> & SortDir &
TokenOverridable & CursorPaginationEnabled & {
  /** @description Only include workflows with no collaborators in the result; default is `false`. */
  no_collaborators?: boolean;
  /** @description Number of trigger IDs to fetch for each workflow; default is `0`. */
  num_trigger_ids?: number;
  /** @description A search query to filter for workflow name or description. */
  query?: string;
  /** @description The field used to sort the returned workflows. Currently only `premium_runs` is supported. */
  sort?: 'premium_runs';
  /** @description Source of workflow creation, either from `code` or `workflow_builder`. */
  source?: 'code' | 'workflow_builder';
}>;

// https://api.slack.com/methods/admin.workflows.unpublish
export interface AdminWorkflowsUnpublishArguments extends WorkflowIDs, TokenOverridable {}
