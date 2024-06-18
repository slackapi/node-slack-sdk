import { SpawnOptionsWithoutStdio } from 'node:child_process';

import { SlackCLICommandOptions, SlackCLIGlobalOptions, SlackCLIProcess } from '../cli-process';
import commandError from '../command-error';

/**
 * `slack create`
 * @param opts generic command options to pass to `create`
 * @returns command output
 */
export const create = async function create(
  appName?: string, // TODO: bad arg name. it should be app path, because this is effectively how it is used
  globalOpts?: SlackCLIGlobalOptions,
  commandOpts?: SlackCLICommandOptions,
  shellOpts?: SpawnOptionsWithoutStdio,
): Promise<string> {
  // TODO: single object param vs separate params (breaking change)
  let cmdStr = 'create';
  if (appName) {
    cmdStr += ` ${appName}`;
  }
  const cmd = new SlackCLIProcess(cmdStr, globalOpts, commandOpts);
  try {
    const proc = await cmd.execAsync(shellOpts);
    return proc.output;
  } catch (error) {
    throw commandError(error, 'create');
  }
};

// TODO: (breaking change) remove this method
/**
 * `slack create` using a template
 * Creates an app from a specified template string.
 * @param templateString template string (ex: `slack-samples/deno-hello-world`)
 * @param appName desired app name
 * @param branchName the branch to clone (default: `main`)
 * @returns command output
 */
export const createAppFromTemplate = async function createAppFromTemplate({
  templateString,
  appName = '',
  branchName = 'main',
  shellOpts = {},
}: {
  templateString: string;
  appName?: string; // TODO: bad arg name. it should be app path, because this is effectively how it is used
  branchName?: string;
  shellOpts?: SpawnOptionsWithoutStdio;
}): Promise<string> {
  try {
    return await create(appName, {}, {
      '--template': templateString,
      '--branch': branchName,
    }, shellOpts);
  } catch (error) {
    throw commandError(error, 'createAppFromTemplate');
  }
};

// TODO: (breaking change): rename properties of this default export to match actual command names
export default {
  createAppFromTemplate,
  createApp: create,
};
