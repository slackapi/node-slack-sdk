/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type UsersSetPhotoResponse = WebAPICallResult & {
  ok?:       boolean;
  profile?:  Profile;
  error?:    string;
  needed?:   string;
  provided?: string;
};

export interface Profile {
  image_24?:       string;
  image_32?:       string;
  image_48?:       string;
  image_72?:       string;
  image_192?:      string;
  image_512?:      string;
  image_1024?:     string;
  image_original?: string;
  avatar_hash?:    string;
}
