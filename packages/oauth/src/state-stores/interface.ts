import { InstallURLOptions } from '../install-url-options';

/**
 * The data structure represented by the state parameter.
 */
export interface StateObj {

  /**
   * The timestamp that the state object was generated.
   */
  now: Date;

  /**
   * The passed InstallURLOptions object when generating this state parameter.
   */
  installOptions: InstallURLOptions;
  random?: string | number;
}

/**
 * Generates state parameter value in the OAuth flow.
 * While the state parameter value works for the CSRF protection purpose,
 * it can transfer the given InstallURLOptions value to the Redirect URL handler
 * (Redirect URL: the default path is "/slack/oauth_redirect")
 */
export interface StateStore {

  /**
   * Generates a valid state parameter value, which can be decoded as a StateObj object
   * by the verifyStateParam() method. This value may be stored on the server-side with expiration.
   * The InstallProvider verifies if this value is set in the installer's browser session.
   */
  generateStateParam: (installOptions: InstallURLOptions, now: Date) => Promise<string>;

  /**
   * Verifies the given state string value by trying to decode the value and
   * build the passed InstallURLOptions object from the data.
   * This method verifies if the state value is not too old to detect replay attacks.
   * If the value is invalid, this method can throw InvalidStateError exception.
   */
  verifyStateParam: (now: Date, state: string) => Promise<InstallURLOptions>;
}
