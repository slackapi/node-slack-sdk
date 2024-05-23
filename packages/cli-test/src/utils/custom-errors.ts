// TODO: refactor this error class:
// - reuse nodejs error `cause` to encode the 'wrapping' behaviour this class intends to implement https://nodejs.org/api/errors.html#errorcause
// - instead of `name`, consider reusing node error `code` https://nodejs.org/api/errors.html#errorcode
// - review how stack traces present themselves and possibly consider using `captureStackTrace` https://nodejs.org/api/errors.html#errorcapturestacktracetargetobject-constructoropt

/**
 * Custom error class for cli methods
 */
export class CustomError extends Error {
  public name: string;

  public command: string | undefined;

  public additionalInfo: string | undefined;

  /**
   * Inherit and create new instance of default Error class
   * @param message
   * @param name
   * @param stack
   * @param options
   */
  public constructor(
    message: string,
    name: string,
    stack: string | undefined,
    options?: {
      /**
       * Command used
       */
      command?: string;
      /**
       * Any additional info
       */
      additionalInfo?: string;
    },
  ) {
    super(message);
    this.name = name;
    this.stack = stack;
    this.command = options?.command;
    this.additionalInfo = options?.additionalInfo;

    // Set a more readable error message
    this.message = `${this.name}: ${this.command}; ${this.additionalInfo}`;

    // Set the prototype explicitly
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
