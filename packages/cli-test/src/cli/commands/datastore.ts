import type { ProjectCommandArguments } from '../../types/commands/common_arguments';
import { SlackCLIProcess } from '../cli-process';

export interface DatastoreCommandArguments {
  /** @description datastore get <query> */
  getQuery: string;
  /** @description datastore put [item details] */
  putDetails: string;
  /** @description datastore query [expression] */
  queryExpression: string;
  /** @description datastore delete <query> */
  deleteQuery: string;
}

/**
 * `slack datastore put`
 * @returns command output
 */
export const datastorePut = async function datastorePut(
  args: ProjectCommandArguments & Pick<DatastoreCommandArguments, 'putDetails'>,
): Promise<string> {
  const cmd = new SlackCLIProcess(
    `datastore put '${args.putDetails}'`,
    args,
  );
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack datastore get`
 * @returns command output
 */
export const datastoreGet = async function datastoreGet(
  args: ProjectCommandArguments & Pick<DatastoreCommandArguments, 'getQuery'>,
): Promise<string> {
  const cmd = new SlackCLIProcess(`datastore get '${args.getQuery}'`, args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack datastore delete`
 * @returns command output
 */
export const datastoreDelete = async function datastoreDelete(
  args: ProjectCommandArguments & Pick<DatastoreCommandArguments, 'deleteQuery'>,
): Promise<string> {
  const cmd = new SlackCLIProcess(`datastore delete '${args.deleteQuery}'`, args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack datastore query`
 * @returns command output
 */
export const datastoreQuery = async function datastoreQuery(
  args: ProjectCommandArguments & Pick<DatastoreCommandArguments, 'queryExpression'>,
): Promise<string> {
  const cmd = new SlackCLIProcess(
    `datastore query '${args.queryExpression}'`,
    args,
  );
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

export default {
  datastorePut,
  datastoreGet,
  datastoreDelete,
  datastoreQuery,
};
