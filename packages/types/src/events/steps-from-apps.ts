export interface WorkflowDeletedEvent {
  type: 'workflow_deleted';
  workflow_id: string;
  workflow_draft_configuration: {
    version_id: string;
    app_steps: {
      app_id: string;
      workflow_step_id: string;
      callback_id: string;
    }[];
  };
  event_ts: string;
}

export interface WorkflowPublishedEvent {
  type: 'workflow_published';
  workflow_id: string;
  workflow_published_configuration: {
    version_id: string;
    app_steps: {
      app_id: string;
      workflow_step_id: string;
      callback_id: string;
    }[];
  };
  event_ts: string;
}

export interface WorkflowUnpublishedEvent {
  type: 'workflow_unpublished';
  workflow_id: string;
  workflow_draft_configuration: {
    version_id: string;
    app_steps: {
      app_id: string;
      workflow_step_id: string;
      callback_id: string;
    }[];
  };
  event_ts: string;
}

export interface WorkflowStepDeletedEvent {
  type: 'workflow_step_deleted';
  workflow_id: string;
  workflow_draft_configuration: {
    version_id: string;
    app_steps: {
      app_id: string;
      workflow_step_id: string;
      callback_id: string;
    }[];
  };
  workflow_published_configuration?: {
    version_id: string;
    app_steps: {
      app_id: string;
      workflow_step_id: string;
      callback_id: string;
    }[];
  };
  event_ts: string;
}

export interface WorkflowStepExecuteEvent {
  type: 'workflow_step_execute';
  callback_id: string;
  workflow_step: {
    workflow_step_execute_id: string;
    workflow_id: string;
    workflow_instance_id: string;
    step_id: string;
    inputs: {
      [key: string]: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any;
      };
    };
    outputs: {
      name: string;
      type: string;
      label: string;
    }[];
  };
  event_ts: string;
}
