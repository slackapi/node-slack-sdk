import { SlackCLIProcess } from '../cli-process';

/**
 * `slack version`
 * @returns command output
 */
export const version = async function version(): Promise<string> {
  const cmd = new SlackCLIProcess(['version']);
  const proc = await cmd.execAsync();
  return proc.output;
};

export default {
  version,
};
