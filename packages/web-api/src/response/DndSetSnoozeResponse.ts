/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type DndSetSnoozeResponse = WebAPICallResult & {
  ok?:               boolean;
  error?:            string;
  snooze_enabled?:   boolean;
  snooze_endtime?:   number;
  snooze_remaining?: number;
  needed?:           string;
  provided?:         string;
};
