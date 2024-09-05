interface FunctionParams {
  type: string;
  name: string;
  description?: string;
  title?: string;
  is_required: boolean;
}

interface FunctionInputs {
  [key: string]: unknown;
}

export interface FunctionExecutedEvent {
  type: 'function_executed';
  function: {
    id: string;
    callback_id: string;
    title: string;
    description?: string;
    type: string;
    input_parameters: FunctionParams[];
    output_parameters: FunctionParams[];
    app_id: string;
    date_created: number;
    date_updated: number;
    date_deleted: number;
  };
  inputs: FunctionInputs;
  function_execution_id: string;
  workflow_execution_id: string;
  event_ts: string;
  bot_access_token: string;
}
