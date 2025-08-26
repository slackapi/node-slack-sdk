import fs from 'node:fs';
import path from 'node:path';

import type { ProjectCommandArguments } from '../types/commands/common_arguments';
import logger from '../utils/logger';
import app from './commands/app';
import auth from './commands/auth';
import collaborator from './commands/collaborator';
import { create } from './commands/create';
import datastore from './commands/datastore';
import env from './commands/env';
import externalAuth from './commands/external-auth';
import func from './commands/function';
import manifest from './commands/manifest';
import platform from './commands/platform';
import trigger from './commands/trigger';
import version from './commands/version';

/**
 * Set of functions to spawn and interact with Slack Platform CLI processes and commands
 */
export const SlackCLI = {
  app,
  auth,
  collaborator,
  create,
  datastore,
  env,
  externalAuth,
  function: func,
  manifest,
  platform,
  trigger,
  version,

  /**
   * Delete app and Log out of current team session
   * @param options
   */
  stopSession: async function stopSession(
    args: Partial<ProjectCommandArguments> & {
      /** Should the CLI log out of its session with the team specified by `appTeamID`. Defaults to `true` */
      shouldLogOut?: boolean;
    },
  ): Promise<void> {
    if (args.appPath) {
      // List instances of app installation if app path provided
      const installedAppsOutput = await SlackCLI.app.list({
        ...args,
        appPath: args.appPath, // very dumb https://github.com/microsoft/TypeScript/issues/42384#issuecomment-872906445
      });
      // If app is installed
      if (!installedAppsOutput.includes('This project has no apps')) {
        // Soft app delete
        try {
          await SlackCLI.app.delete({
            ...args,
            appPath: args.appPath, // same crap https://github.com/microsoft/TypeScript/issues/42384#issuecomment-872906445
          });
        } catch (error) {
          logger.warn(`stopSession could not delete app gracefully, continuing. Error: ${error}`);
        }

        // Delete app.json file. Needed for retries. Otherwise asks for collaborator, if old file is present
        fs.rmSync(path.join(args.appPath, '.slack'), {
          force: true,
          recursive: true,
        });
      }
    }

    if (args.shouldLogOut) {
      try {
        await SlackCLI.auth.logout(args);
      } catch (error) {
        logger.warn(`Could not logout gracefully. Error: ${error}`);
      }
    }
  },
};
