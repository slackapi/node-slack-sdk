import { SlackCLI } from '../cli-lib/slack-cli-lib';

/**
 * Verify that `actual` contains `expected` string
 * - throw custom error, if fail
 * @param actual the actual string output from the command
 * @param expected a string that should be found in `actual`
 * @param command the command that was run
 */
export function shouldContainString(actual: string, expected: string, command: string): void {
  if (!actual.includes(expected)) {
    throw SlackCLI.commandError(
      new Error('shouldContainString'),
      'shouldContainString',
      `Could not validate expected output for "${command}".\nExpected: "${expected}"\nActual: "${actual}"`,
    );
  }
}
/**
 * Verify that `actual` contains each item in an array of `expected` strings
 * @param actual the actual string output from the command
 * @param expected a list of strings that should all be found in `actual`
 * @param command the command that was run
 */
export function shouldContainStrings(actual: string, expected: string[], command: string): void {
  expected.forEach((expString) => {
    shouldContainString(actual, expString, command);
  });
}

/**
 * Verify that `actual` does not contain each
 * @param actual
 * @param expected
 * @param command
 */
export function shouldNotContainStrings(
  actual: string | undefined,
  expected: string[],
  command: string,
): void {
  expected.forEach((expString) => {
    if (actual?.includes(expString)) {
      throw SlackCLI.commandError(
        new Error('shouldNotContainStrings'),
        'shouldNotContainStrings',
        `Unexpected output for ${command},\nExpected: "${expString}"\nActual: "${actual}"`,
      );
    }
  });
}
