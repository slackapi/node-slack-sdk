import { InstallURLOptions } from '../install-url-options';

// State object structure
export interface StateObj {
  now: Date;
  installOptions: InstallURLOptions;
  random?: string | number;
}

export interface StateStore {
  // Returned Promise resolves for a string which can be used as an
  // OAuth state param.
  // TODO: Revisit design. Does installOptions need to be encoded in state if metadata is static?
  generateStateParam: (installOptions: InstallURLOptions, now: Date) => Promise<string>;

  // Returned Promise resolves for InstallURLOptions that were stored in the state
  // param. The Promise rejects with a CodedError when the state is invalid.
  verifyStateParam: (now: Date, state: string) => Promise<InstallURLOptions>;
}
