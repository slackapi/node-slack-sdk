import { IncomingMessage, ServerResponse } from 'http';
import { InstallURLOptions } from './install-url-options';

/**
 * Customizable callbacks that are supposed to be called
 * inside InstallProvider#handleInstallPath() method.
 */
export interface InstallPathOptions {

  /**
   * Customize the response headers and body data for
   * additional user-specific data handling such as acccount mapping and activity tracking.
   *
   * When this method returns false, the InstallProvider skips
   * the following operations including the redirection to Slack authorize URL.
   * You can set false when the visiting user is not eligible to proceed with the Slack app installation flow.
   *
   * Also, when returning false, this method is responsible for calling the response#end() method
   * to build a complete HTTP response for end-users.
   */
  beforeRedirection?: (
    request: IncomingMessage,
    response: ServerResponse,
    options?: InstallURLOptions,
  ) => Promise<boolean>;
}
