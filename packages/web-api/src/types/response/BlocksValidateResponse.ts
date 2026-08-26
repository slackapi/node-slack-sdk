import type { WebAPICallResult } from '../../WebClient';

export type BlocksValidateResponse = WebAPICallResult & {
  ok?: boolean;
  error?: string;
  needed?: string;
  provided?: string;
  errors?: Error[];
  response_metadata?: ResponseMetadata;
};

export interface Error {
  code?: string;
  message?: string;
  pointer?: string;
  constraint?: Constraint;
}

export interface Constraint {
  type?: string;
  // expected/got vary by constraint type: a string array for "enum",
  // a number for length/count constraints, or absent (e.g. "all_of").
  expected?: string | number | string[];
  got?: string | number;
}

export interface ResponseMetadata {
  messages?: string[];
}
