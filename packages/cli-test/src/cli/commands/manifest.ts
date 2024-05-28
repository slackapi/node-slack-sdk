import { SlackCLIProcess } from '../cli-process';
import commandError from '../command-error';

/**
 * `slack manifest validate`
 * @param appPath path to app
 * @returns command output
 */
export const validate = async function manifestValidate(
  appPath: string,
  options?: { qa?: boolean },
): Promise<string> {
  // TODO: breaking change, separate params vs single-param-object
  const cmd = new SlackCLIProcess('manifest validate', options);
  try {
    const proc = await cmd.execAsync({
      cwd: appPath,
    });
    return proc.output;
  } catch (error) {
    throw commandError(error, 'manifestValidate');
  }
};

// TODO: (breaking change): rename properties of this default export to match actual command names
export default {
  manifestValidate: validate,
};
