import { SlackCLIProcess, SlackCLICommandOptions } from '../cli-process';
import commandError from '../command-error';

/**
 * `slack create`
 * @param opts generic command options to pass to `create`
 * @returns command output
 */
export const create = async function create(appName?: string, opts?: SlackCLICommandOptions): Promise<string> {
  let cmdStr = 'create';
  if (appName) {
    cmdStr += ` ${appName}`;
  }
  const cmd = new SlackCLIProcess(cmdStr, {}, opts);
  try {
    const proc = await cmd.execAsync();
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
}: {
  templateString: string;
  appName?: string;
  branchName?: string;
}): Promise<string> {
  try {
    return await create(appName, {
      '--template': templateString,
      '--branch': branchName,
    });
  } catch (error) {
    throw commandError(error, 'createAppFromTemplate');
  }
};

// TODO: (breaking change): rename properties of this default export to match actual command names
export default {
  createAppFromTemplate,
  createApp: create,
};
