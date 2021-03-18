/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type WorkflowsStepFailedResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
