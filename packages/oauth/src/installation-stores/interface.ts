import type { Logger } from '@slack/logger';

import type { Installation, InstallationQuery } from '..';

export interface InstallationStore {
  storeInstallation<AuthVersion extends 'v1' | 'v2'>(
    installation: Installation<AuthVersion, boolean>,
    logger?: Logger,
  ): Promise<void>;

  fetchInstallation: (
    query: InstallationQuery<boolean>,
    logger?: Logger,
  ) => Promise<Installation<'v1' | 'v2', boolean>>;

  /**
   * Deletes an installation that matches the given IDs
   * @param query 
   * @param logger 
   * @returns Promise<void>
   */
  deleteInstallation?: (query: InstallationQuery<boolean>, logger?: Logger) => Promise<void>;

  /**
   * Deletes a bot scope installation per workspace / org
   * @param query 
   * @param logger 
   * @returns Promise<void>
   */
  deleteBot?: (query: InstallationQuery<boolean>, logger?: Logger) => Promise<void>;

  /**
   * Deletes all installation data for the given workspace / org
   * @param query 
   * @param logger 
   * @returns Promise<void>
   */
  deleteAll?: (query: InstallationQuery<boolean>, logger?: Logger) => Promise<void>;
}
