/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type UsersDeletePhotoResponse = WebAPICallResult & {
  ok?:       boolean;
  error?:    string;
  needed?:   string;
  provided?: string;
};
