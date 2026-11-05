import type { TokenOverridable } from './common';

// https://docs.slack.dev/reference/methods/workflows.featured.add
export interface WorkflowsFeaturedAddArguments extends TokenOverridable {
  /**
   * @description Channel to add featured workflow in.
   */
  channel_id: string;
  /**
   * @description Comma-separated array of trigger IDs to add; max 15
   * @example ["Ft012345", "Ft012346"]
   */
  trigger_ids: string[];
}

// https://docs.slack.dev/reference/methods/workflows.featured.list
export interface WorkflowsFeaturedListArguments extends TokenOverridable {
  /**
   * @description Comma-separated array of channel IDs to list featured workflows for.
   * @example ["C012345678", "C987654321"]
   */
  channel_ids: string[];
}

// https://docs.slack.dev/reference/methods/workflows.featured.remove
export interface WorkflowsFeaturedRemoveArguments extends TokenOverridable {
  /**
   * @description Channel to remove featured workflow from.
   */
  channel_id: string;
  /**
   * @description Comma-separated array of trigger IDs to remove; max 15
   * @example ["Ft012345", "Ft012346"]
   */
  trigger_ids: string[];
}

// https://docs.slack.dev/reference/methods/workflows.featured.set
export interface WorkflowsFeaturedSetArguments extends TokenOverridable {
  /**
   * @description Channel to set featured workflow in.
   */
  channel_id: string;
  /**
   * @description Comma-separated array of trigger IDs that will replace any existing featured workflows in the channel; max 15
   * @example ["Ft012345", "Ft012346"]
   */
  trigger_ids: string[];
}
