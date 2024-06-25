import * as fs from 'node:fs';
import * as path from 'node:path';

import appCommands from './commands/app';
import authCommands from './commands/auth';
import collaboratorCommands from './commands/collaborator';
import createCommands from './commands/create';
import envCommands from './commands/env';
import externalAuthCommands from './commands/external-auth';
import functionCommands from './commands/function';
import manifestCommands from './commands/manifest';
import platformCommands from './commands/platform';
import triggerCommands from './commands/trigger';
import logger from '../utils/logger';

/**
 * Set of functions to spawn and interact with Slack Platform CLI processes and commands
 */
export const SlackCLI = {
  ...appCommands,
  app: {
    delete: appCommands.workspaceDelete,
    install: appCommands.workspaceInstall,
    list: appCommands.workspaceList,
  },
  ...authCommands,
  auth: authCommands,
  ...collaboratorCommands, // TODO: (breaking change) remove, mimic same 'namespacing' as the actual CLI
  collaborators: {
    add: collaboratorCommands.collaboratorsAdd,
    list: collaboratorCommands.collaboratorsList,
    remove: collaboratorCommands.collaboratorsRemove,
  },
  ...createCommands,
  ...envCommands, // TODO: (breaking change) remove, mimic same 'namespacing' as the actual CLI
  env: {
    add: envCommands.envAdd,
    list: envCommands.envList,
    remove: envCommands.envRemove,
  },
  ...externalAuthCommands,
  ...functionCommands,
  function: {
    access: functionCommands.functionAccess,
  },
  ...manifestCommands, // TODO: (breaking change) remove, mimic same 'namespacing' as the actual CLI
  manifest: {
    validate: manifestCommands.manifestValidate,
  },
  ...platformCommands,
  platform: platformCommands,
  ...triggerCommands, // TODO: (breaking change) remove, mimic same 'namespacing' as the actual CLI
  trigger: {
    access: triggerCommands.triggerAccess,
    create: triggerCommands.triggerCreate,
    delete: triggerCommands.triggerDelete,
    info: triggerCommands.triggerInfo,
    list: triggerCommands.triggerList,
    update: triggerCommands.triggerUpdate,
  },

  /**
   * Delete app and Log out of all sessions
   * @param options
   */
  stopSession: async function stopSession({
    appPath,
    appTeamID,
    isLocalApp,
    qa,
  }: {
    // TODO: (breaking change) model these types better, if appPath isn't provided then appTeamId
    // and isLocalApp are not needed either
    /** Path to app. If not provided, will not interact with any app */
    appPath?: string;
    /** Team domain or ID where app is installed */
    appTeamID: string;
    isLocalApp?: boolean;
    qa?: boolean;
  }): Promise<void> {
    // TODO: perhaps appPath does not exist, should guard against that.
    if (appPath) {
      // List instances of app installation if app path provided
      const installedAppsOutput = await SlackCLI.app.list(appPath, { qa });
      // If app is installed
      if (!installedAppsOutput.includes('This project has no apps')) {
        // Soft app delete
        try {
          await SlackCLI.app.delete(appPath, appTeamID, { isLocalApp, qa });
        } catch (error) {
          logger.warn(`stopSession could not delete app gracefully, continuing. Error: ${error}`);
        }

        // Delete app.json file. Needed for retries. Otherwise asks for collaborator, if old file is present
        fs.rmSync(path.join(appPath, '.slack'), {
          force: true,
          recursive: true,
        });
      }
    }

    // Log out if logged in
    try {
      await SlackCLI.logout({ allWorkspaces: true, qa });
    } catch (error) {
      // TODO: maybe should error instead? this seems pretty bad
      logger.warn(`Could not logout gracefully. Error: ${error}`);
    }
  },
};
