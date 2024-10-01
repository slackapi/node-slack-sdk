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

/**
 * `slack datastore get`
 * @returns command output
 */
export const datastoreGet = async function datastoreGet(
  args: ProjectCommandArguments & Pick<DatastoreCommandArguments, 'datastoreName' | 'primaryKeyValue'>,
): Promise<string> {
  const getQueryObj = {
    datastore: args.datastoreName,
    id: args.primaryKeyValue
  };
  const getQuery = JSON.stringify(getQueryObj);
  const cmd = new SlackCLIProcess(`datastore get '${getQuery}'`, args);
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
    id: args.primaryKeyValue
  };
  const deleteQuery = JSON.stringify(deleteQueryObj);
  const cmd = new SlackCLIProcess(`datastore delete '${deleteQuery}'`, args);
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
    item: args.putItem
  };
  const putQuery = JSON.stringify(putQueryObj);
  const cmd = new SlackCLIProcess(
    `datastore put '${putQuery}'`,
    args,
  );
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
  args: ProjectCommandArguments & Pick<DatastoreCommandArguments, 'datastoreName' | 'queryExpression' | 'queryExpressionValues'>,
): Promise<string> {
  const queryObj = {
    datastore: args.datastoreName,
    expression: args.queryExpression,
    expression_values: args.queryExpressionValues
  };
  const query = JSON.stringify(queryObj);
  const cmd = new SlackCLIProcess(
    `datastore query '${query}'`,
    args,
  );
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
