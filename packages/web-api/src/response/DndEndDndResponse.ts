/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type DndEndDndResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
