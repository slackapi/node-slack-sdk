/* tslint:disable */
import { WebAPICallResult } from '../WebClient';
export type DndEndSnoozeResponse = WebAPICallResult & {
  ok?:                boolean;
  error?:             string;
  dnd_enabled?:       boolean;
  next_dnd_start_ts?: number;
  next_dnd_end_ts?:   number;
  snooze_enabled?:    boolean;
  needed?:            string;
  provided?:          string;
};
