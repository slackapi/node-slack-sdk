/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type FilesCommentsAddResponse = WebAPICallResult & {
  ok?:         boolean;
  error?:      string;
  req_method?: string;
  needed?:     string;
  provided?:   string;
};
