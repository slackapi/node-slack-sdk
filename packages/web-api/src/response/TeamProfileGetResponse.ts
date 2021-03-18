/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type TeamProfileGetResponse = WebAPICallResult & {
  ok?:       boolean;
  profile?:  Profile;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface Profile {
  fields?: Field[];
}

export interface Field {
  id?:         string;
  ordering?:   number;
  field_name?: string;
  label?:      string;
  hint?:       string;
  type?:       string;
  is_hidden?:  boolean;
}
