import { SlackCLIProcess } from '../cli-process';
import commandError from '../command-error';

export default {
  /**
   * `slack deploy`
   */
  deploy: async function deploy({
    appPath,
    teamFlag,
    hideTriggers = true,
    orgWorkspaceGrantFlag,
  }: {
    /**
     * Path to app
     */
    appPath: string;
    /**
     * workspace or organization name or ID to deploy the app to
     */
    teamFlag: string;
    /**
     * hides output and prompts related to triggers. Defaults to `true`.
     */
    hideTriggers?: boolean;
    /**
     * Org workspace ID, or the string `all` to request access to all workspaces in the org,
     * to request grant access to in AAA scenarios
     */
    orgWorkspaceGrantFlag?: string;
  }): Promise<string> {
    const cmd = new SlackCLIProcess('deploy', { team: teamFlag }, {
      '--hide-triggers': hideTriggers,
      '--org-workspace-grant': orgWorkspaceGrantFlag,
    });
    try {
      const proc = await cmd.execAsync({
        cwd: appPath,
      });
      return proc.output;
    } catch (error) {
      throw commandError(error, 'deploy');
    }
  },
};
