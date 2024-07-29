import { SlackCLIProcess } from '../cli-process';

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
  const proc = await cmd.execAsync({
    cwd: appPath,
  });
  return proc.output;
};

// TODO: (breaking change): rename properties of this default export to match actual command names
export default {
  manifestValidate: validate,
};
