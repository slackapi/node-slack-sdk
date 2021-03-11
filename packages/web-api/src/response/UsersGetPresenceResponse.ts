/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type UsersGetPresenceResponse = WebAPICallResult & {
  ok?:       boolean;
  presence?: string;
  error?:    string;
  needed?:   string;
  provided?: string;
};
