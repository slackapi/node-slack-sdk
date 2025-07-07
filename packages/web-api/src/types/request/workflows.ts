import type { TokenOverridable } from './common';

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
