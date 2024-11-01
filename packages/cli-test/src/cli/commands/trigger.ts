import type {
  ChannelAccessChangeArguments,
  GroupAccessChangeArguments,
  InfoArgument,
  OrganizationAccessChangeArguments,
  ProjectCommandArguments,
  UserAccessChangeArguments,
  WorkspaceGrantArgument,
} from '../../types/commands/common_arguments';
import { type SlackCLICommandOptions, SlackCLIProcess } from '../cli-process';

type AccessChangeArguments = {
  info?: boolean;
} & (
  | GroupAccessChangeArguments
  | UserAccessChangeArguments
  | ChannelAccessChangeArguments
  | OrganizationAccessChangeArguments
);

export interface TriggerIdArgument {
  /** @description ID of the trigger being targeted. */
  triggerId: string;
}

type TriggerAccessArguments = TriggerIdArgument & (AccessChangeArguments | InfoArgument);

/**
 * Sets grant or revoke on a set of command options based on what is provided in an arguments list.
 * @param args - trigger access method arguments
 * @param cmdOpts - command-level options to provide to SlackCLIProcess
 * @return void
 */
function setAccessType(args: Parameters<typeof access>[0], cmdOpts: SlackCLICommandOptions) {
  if ('grant' in args && args.grant) {
    cmdOpts['--grant'] = true;
  } else if ('revoke' in args && args.revoke) {
    cmdOpts['--revoke'] = true;
  } else {
    throw new Error('When granting or revoking trigger access, you must specify one of `grant` or `revoke` as `true`.');
  }
}

/**
 * `slack trigger access`
 * @returns command output
 */
export const access = async function triggerAccess(
  args: ProjectCommandArguments & TriggerAccessArguments,
): Promise<string> {
  const cmdOpts: SlackCLICommandOptions = {
    '--trigger-id': args.triggerId,
  };
  if ('info' in args && args.info) {
    cmdOpts['--info'] = true;
  } else if ('appCollaborators' in args && args.appCollaborators) {
    cmdOpts['--app-collaborators'] = true;
  } else if ('everyone' in args && args.everyone) {
    cmdOpts['--everyone'] = true;
  } else if ('users' in args) {
    cmdOpts['--users'] = args.users.join(',');
    setAccessType(args, cmdOpts);
  } else if ('channels' in args) {
    cmdOpts['--channels'] = args.channels.join(',');
    setAccessType(args, cmdOpts);
  } else if ('organizations' in args) {
    cmdOpts['--organizations'] = args.organizations.join(',');
    setAccessType(args, cmdOpts);
  } else {
    throw new Error('When setting trigger access, you must specify a target for whom to give access to.');
  }
  const cmd = new SlackCLIProcess(['trigger', 'access'], args, cmdOpts);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

export interface CreateFromArguments {
  /** @description Trigger description. */
  description?: string;
  /** @description Trigger title. */
  title: string;
  /** @description Workflow callback ID for the trigger to trip. */
  workflow: string;
  /**
   * @description When `true`, adds an `interactivity` parameter to the trigger with the name specified
   * by `interactivityName`.
   */
  interactivity?: boolean;
  /** @description Specifies the name of the interactivity parameter to use. Defaults to `interactivity`. */
  interactivityName?: string;
}

export interface CreateFromFile {
  /** @description Path to a file containing a trigger definition. Overrides any other arguments provided. */
  triggerDef: string;
}

type CreateArguments = WorkspaceGrantArgument & (CreateFromArguments | CreateFromFile);

/**
 * `slack trigger create`
 * @returns command output
 */
export const create = async function triggerCreate(args: ProjectCommandArguments & CreateArguments): Promise<string> {
  const cmdOpts: SlackCLICommandOptions = {
    '--org-workspace-grant': args.orgWorkspaceGrantFlag,
  };
  if ('triggerDef' in args) {
    cmdOpts['--trigger-def'] = args.triggerDef;
  } else {
    cmdOpts['--workflow'] = args.workflow;
    cmdOpts['--title'] = args.title;
    if ('description' in args) {
      cmdOpts['--description'] = args.description;
    }
    if ('interactivity' in args && args.interactivity) {
      cmdOpts['--interactivity'] = true;
      if ('interactivityName' in args && args.interactivityName) {
        cmdOpts['--interactivity-name'] = args.interactivityName;
      }
    }
  }
  const cmd = new SlackCLIProcess(['trigger', 'create'], args, cmdOpts);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack trigger delete`
 * @returns command output
 */
export const del = async function triggerDelete(args: ProjectCommandArguments & TriggerIdArgument): Promise<string> {
  const cmd = new SlackCLIProcess(['trigger', 'delete'], args, {
    '--trigger-id': args.triggerId,
  });
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack trigger info`
 * @returns command output
 */
export const info = async function triggerInfo(args: ProjectCommandArguments & TriggerIdArgument): Promise<string> {
  const cmd = new SlackCLIProcess(['trigger', 'info'], args, {
    '--trigger-id': args.triggerId,
  });
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack trigger list`
 * @returns command output
 */
export const list = async function triggerList(
  args: ProjectCommandArguments & {
    /** @description Limit the number of triggers to show. Defaults to `4`. */
    limit?: number;
    /**
     * @description Only display triggers of the given type, can be one of:
     * `all`, `shortcut`, `event`, `scheduled`, `webhook` and `external`. Defaults to `all`.
     */
    type?: 'all' | 'shortcut' | 'event' | 'scheduled' | 'webhook' | 'external';
  },
): Promise<string> {
  const cmdOpts: SlackCLICommandOptions = {};
  if (args.limit) {
    cmdOpts['--limit'] = args.limit;
  }
  if (args.type) {
    cmdOpts['--type'] = args.type;
  }
  const cmd = new SlackCLIProcess(['trigger', 'list'], args, cmdOpts);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack trigger update`
 * @returns command output
 */
export const update = async function triggerUpdate(
  args: ProjectCommandArguments & TriggerIdArgument & (Partial<CreateFromArguments> | CreateFromFile),
): Promise<string> {
  const cmdOpts: SlackCLICommandOptions = {
    '--trigger-id': args.triggerId,
  };
  if ('triggerDef' in args) {
    cmdOpts['--trigger-def'] = args.triggerDef;
  } else {
    if ('workflow' in args) {
      cmdOpts['--workflow'] = args.workflow;
    }
    if ('title' in args) {
      cmdOpts['--title'] = args.title;
    }
    if ('description' in args) {
      cmdOpts['--description'] = args.description;
    }
    if ('interactivity' in args) {
      cmdOpts['--interactivity'] = args.interactivity;
    }
    if ('interactivityName' in args) {
      cmdOpts['--interactivity-name'] = args.interactivityName;
    }
  }
  const cmd = new SlackCLIProcess(['trigger', 'update'], args, cmdOpts);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

export default {
  access,
  create,
  delete: del,
  info,
  list,
  update,
};
