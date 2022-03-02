import { Logger } from '@slack/logger';
import { Installation, InstallationQuery } from '..';

export interface InstallationStore {

  storeInstallation<AuthVersion extends 'v1' | 'v2'>(
    installation: Installation<AuthVersion, boolean>,
    logger?: Logger): Promise<void>;

  fetchInstallation:
  (query: InstallationQuery<boolean>, logger?: Logger) => Promise<Installation<'v1' | 'v2', boolean>>;

  deleteInstallation?:
  (query: InstallationQuery<boolean>, logger?: Logger) => Promise<void>;

}
