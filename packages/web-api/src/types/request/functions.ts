import type { TokenOverridable } from './common';

interface ExecutionID {
  function_execution_id: string;
}

// https://api.slack.com/methods/functions.completeError
export interface FunctionsCompleteErrorArguments extends ExecutionID, TokenOverridable {
  error: string;
}

// https://api.slack.com/methods/functions.completeSuccess
export interface FunctionsCompleteSuccessArguments extends ExecutionID, TokenOverridable {
  outputs: Record<string, unknown>;
}
