import type { ChildProcessWithoutNullStreams } from 'child_process';

export const SlackProduct = {
  FREE: 'FREE',
  PRO: 'PRO',
  BUSINESS_PLUS: 'PLUS',
  ENTERPRISE: 'ENTERPRISE',
  ENTERPRISE_SANDBOX: 'ENTERPRISE_SANDBOX',
  ENTERPRISE_SELECT: 'ENTERPRISE_SELECT',
};

export interface ShellProcess {
  /**
   * Child process object
   */
  process: ChildProcessWithoutNullStreams;
  /**
   * Command output
   */
  output: string;
  /**
   * Process state
   */
  finished: boolean;
  /**
   * Command string
   */
  command: string;
}
