import type { ProjectCommandArguments } from '../../types/commands/common_arguments';
import { SlackCLIProcess } from '../cli-process';

export interface DatastoreCommandArguments {
  /** @description datastore name */
  datastoreName: string;
  /** @description datastore get primary key value*/
  primaryKeyValue: string;
  /** @description datastore put [item details] */
  putItem: object;
  /** @description datastore query [expression] */
  queryExpression: string;
  /** @description datastore query [expression expression_values] */
  queryExpressionValues: object;
}

function escapeJSON(obj: Record<string, unknown>): string {
  return `"${JSON.stringify(obj).replace(/"/g, '\\"')}"`;
}

/**
 * `slack datastore get`
 * @returns command output
 */
export const datastoreGet = async function datastoreGet(
  args: ProjectCommandArguments & Pick<DatastoreCommandArguments, 'datastoreName' | 'primaryKeyValue'>,
): Promise<string> {
  const getQueryObj = {
    datastore: args.datastoreName,
    id: args.primaryKeyValue,
  };
  const cmd = new SlackCLIProcess(['datastore', 'get', escapeJSON(getQueryObj)], args);
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
  args: ProjectCommandArguments & Pick<DatastoreCommandArguments, 'datastoreName' | 'primaryKeyValue'>,
): Promise<string> {
  const deleteQueryObj = {
    datastore: args.datastoreName,
    id: args.primaryKeyValue,
  };
  const cmd = new SlackCLIProcess(['datastore', 'delete', escapeJSON(deleteQueryObj)], args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack datastore put`
 * @returns command output
 */
export const datastorePut = async function datastorePut(
  args: ProjectCommandArguments & Pick<DatastoreCommandArguments, 'datastoreName' | 'putItem'>,
): Promise<string> {
  const putQueryObj = {
    datastore: args.datastoreName,
    item: args.putItem,
  };
  const cmd = new SlackCLIProcess(['datastore', 'put', escapeJSON(putQueryObj)], args);
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
  args: ProjectCommandArguments &
    Pick<DatastoreCommandArguments, 'datastoreName' | 'queryExpression' | 'queryExpressionValues'>,
): Promise<string> {
  const queryObj = {
    datastore: args.datastoreName,
    expression: args.queryExpression,
    expression_values: args.queryExpressionValues,
  };
  const cmd = new SlackCLIProcess(['datastore', 'query', escapeJSON(queryObj)], args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

export default {
  datastoreGet,
  datastoreDelete,
  datastorePut,
  datastoreQuery,
};
