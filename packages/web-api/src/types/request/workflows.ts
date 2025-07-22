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

// TODO: breaking change: to be removed after Sep 12 2024
// https://docs.slack.dev/changelog/2023-08-workflow-steps-from-apps-step-back

// https://docs.slack.dev/legacy/legacy-steps-from-apps/legacy-steps-from-apps-workflow_step-object
export interface WorkflowsStepCompletedArguments extends TokenOverridable {
  workflow_step_execute_id: string;
  outputs?: Record<string, unknown>;
}
// https://docs.slack.dev/legacy/legacy-steps-from-apps/legacy-steps-from-apps-workflow_step-object
export interface WorkflowsStepFailedArguments extends TokenOverridable {
  workflow_step_execute_id: string;
  error: {
    message: string;
  };
}
// https://docs.slack.dev/legacy/legacy-steps-from-apps/legacy-steps-from-apps-workflow_step-object
export interface WorkflowsUpdateStepArguments extends TokenOverridable {
  workflow_step_edit_id: string;
  step_image_url?: string;
  step_name?: string;
  inputs?: {
    [name: string]: {
      // biome-ignore lint/suspicious/noExplicitAny: steps from apps inputs are untyped
      value: any;
      skip_variable_replacement?: boolean;
      variables?: {
        // biome-ignore lint/suspicious/noExplicitAny: steps from apps inputs are untyped
        [key: string]: any;
      };
    };
  };
  outputs?: {
    type: string;
    name: string;
    label: string;
  }[];
}
