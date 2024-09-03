import type { ProjectCommandArguments } from '../../types/commands/common_arguments';
import { type SlackCLICommandOptions, SlackCLIProcess } from '../cli-process';

export interface ExternalAuthCommandArguments {
  /** @description the OAuth Provider key to target. */
  provider: string;
  /** @description the OAuth Provider's client secret. */
  secret: string;
  /**
   * @description Remove all tokens? If `provider` is not specified, removes all tokens for all providers,
   * otherwise removes all tokens for the specified provider. Defaults to `false.`
   */
  all?: boolean;
}

/**
 * `slack external-auth add`
 * @returns command output
 */
export const add = async function externalAuthAdd(
  args: ProjectCommandArguments & Pick<ExternalAuthCommandArguments, 'provider'>,
): Promise<string> {
  const cmd = new SlackCLIProcess('external-auth add', args, {
    '--provider': args.provider,
  });
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack external-auth add-secret`
 * @returns command output
 */
export const addSecret = async function extAuthAddSecret(
  args: ProjectCommandArguments & Omit<ExternalAuthCommandArguments, 'all'>,
): Promise<string> {
  const cmd = new SlackCLIProcess('external-auth add-secret', args, {
    '--provider': args.provider,
    '--secret': args.secret,
  });
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack external-auth remove`
 * @returns command output
 */
export const remove = async function extAuthRemove(
  args: ProjectCommandArguments & Omit<ExternalAuthCommandArguments, 'secret'>,
): Promise<string> {
  const cmdOpts: SlackCLICommandOptions = {
    '--provider': args.provider,
  };
  if (args.all) {
    cmdOpts['--all'] = true;
  }
  const cmd = new SlackCLIProcess('external-auth remove', args, cmdOpts);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack external-auth select-auth`
 * @returns command output
 */
export const selectAuth = async function extAuthSelectAuth(
  args: ProjectCommandArguments &
    Pick<ExternalAuthCommandArguments, 'provider'> & {
      /** @description specifies an external account identifier, e.g. an email address. */
      externalAccount?: string;
      /** @description specifies a workflow to set selected developer account. */
      workflow?: string;
    },
): Promise<string> {
  const cmdOpts: SlackCLICommandOptions = {
    '--provider': args.provider,
  };
  if (args.externalAccount) {
    cmdOpts['--external-account'] = args.externalAccount;
  }
  if (args.workflow) {
    cmdOpts['--workflow'] = args.workflow;
  }
  const cmd = new SlackCLIProcess('external-auth select-auth', args, cmdOpts);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

export default {
  add,
  addSecret,
  remove,
  selectAuth,
};
