import type { ChildProcessWithoutNullStreams } from 'child_process';

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
