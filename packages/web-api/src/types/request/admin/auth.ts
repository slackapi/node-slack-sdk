import type { CursorPaginationEnabled, TokenOverridable } from '../common';

interface EntityIDs {
  /** @description Encoded IDs of the entities interacting with. */
  entity_ids: string[];
}
interface EntityType {
  /** @description The type of entity interacting with the policy. */
  entity_type: 'USER';
}
interface PolicyName {
  /** @description The name of the policy. */
  policy_name: 'email_password';
}

// https://api.slack.com/methods/admin.auth.policy.assignEntities
export interface AdminAuthPolicyAssignEntitiesArguments extends EntityIDs, EntityType, PolicyName, TokenOverridable {}

// https://api.slack.com/methods/admin.auth.policy.getEntities
export interface AdminAuthPolicyGetEntitiesArguments extends Partial<EntityType>, PolicyName, TokenOverridable,
  CursorPaginationEnabled {}

// https://api.slack.com/methods/admin.auth.policy.removeEntities
export interface AdminAuthPolicyRemoveEntitiesArguments extends EntityIDs, EntityType, PolicyName, TokenOverridable {}
