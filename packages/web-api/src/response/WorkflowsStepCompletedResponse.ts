/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type WorkflowsStepCompletedResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
