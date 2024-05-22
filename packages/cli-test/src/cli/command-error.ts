import { CustomError } from '../utils/custom-errors';

// TODO: this error wrapper should maybe look at official node docs for how to extend errors
// https://nodejs.org/api/errors.html#errors
/**
 * Error handler for Lib
 * @param error error object to wrap
 * @param command command used
 * @param additionalInfo any extra info
 * @returns The wrapped CustomError object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function commandError(error: any, command: string, additionalInfo?: string): CustomError {
  // Specify error name, if it's a generic Error
  if (error.name) {
    // eslint-disable-next-line no-param-reassign
    error.name = error.name.toString() === 'Error' ? 'commandError' : 'Error';
  }

  // Create new error and return it
  const newError = new CustomError(error.message, error.name, error.stack, {
    command,
    additionalInfo,
  });
  return newError;
}
