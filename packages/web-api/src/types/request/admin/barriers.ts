import { OptionalArgument } from '../../helpers';

import type { CursorPaginationEnabled, TokenOverridable } from '../common';

interface BarrierID {
  /** @description The ID of the barrier. */
  barrier_id: string;
}

// https://api.slack.com/methods/admin.barriers.create
export interface AdminBarriersCreateArguments extends TokenOverridable {
  /** @description A list of {@link https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org IDP Groups} IDs ti associate with the barrier. */
  barriered_from_usergroup_ids: string[];
  /** @description The ID of the primary {@link https://slack.com/help/articles/115001435788-Connect-identity-provider-groups-to-your-Enterprise-Grid-org IDP Group}. */
  primary_usergroup_id: string;
  /**
   * @description What kind of interactions are blocked by this barrier?
   * Currently you must provide all three: `im`, `mpim`, `call`.
   */
  restricted_subjects: ['im', 'mpim', 'call'];
}

// https://api.slack.com/methods/admin.barriers.delete
export interface AdminBarriersDeleteArguments extends BarrierID, TokenOverridable {}

// https://api.slack.com/methods/admin.barriers.list
export type AdminBarriersListArguments = OptionalArgument<TokenOverridable & CursorPaginationEnabled>;

// https://api.slack.com/methods/admin.barriers.update
export interface AdminBarriersUpdateArguments extends AdminBarriersCreateArguments, BarrierID {}
