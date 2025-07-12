import type { TokenOverridable } from './common';

interface ExecutionID {
  function_execution_id: string;
}

// https://docs.slack.dev/reference/methods/functions.completeError
export interface FunctionsCompleteErrorArguments extends ExecutionID, TokenOverridable {
  error: string;
}

// https://docs.slack.dev/reference/methods/functions.completeSuccess
export interface FunctionsCompleteSuccessArguments extends ExecutionID, TokenOverridable {
  outputs: Record<string, unknown>;
}
