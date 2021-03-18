/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type ApiTestResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  args?:     Args;
  needed?:   string;
  provided?: string;
};

export interface Args {
  error?: string;
  foo?:   string;
}
