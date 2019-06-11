import EventEmitter from 'events'; // tslint:disable-line
import http, { IncomingMessage, ServerResponse } from 'http';
import debugFactory from 'debug'; // tslint:disable-line
import { createHTTPHandler } from './http-handler';

const debug = debugFactory('@slack/events-api:adapter');

/**
 * An adapter for Slack's Events API.
 */
export class SlackEventAdapter extends EventEmitter {
  /**
   * The token used to authenticate signed requests from Slack's Events API.
   */
  public readonly signingSecret: string;

  /**
   * Whether to include the API event bodies in adapter event consumers.
   */
  public includeBody: boolean;

  /**
   * Whether to include request headers in adapter event consumers.
   */
  public includeHeaders: boolean;

  /**
   * When `true`, prevents the adapter from responding by itself and leaves that up to consumers.
   */
  public waitForResponse: boolean;

  /**
   * The HTTP server this adapter might be running, created in {@link start}.
   */
  private server?: http.Server;

  /**
   * @param signingSecret - The token used to authenticate signed requests from Slack's Events API.
   * @param opts.includeBody - TODO:
   * @param opts.includeHeaders - TODO:
   * @param opts.waitForResponse - TODO:
   */
  constructor(
    signingSecret: string | String,
    {
      includeBody = false,
      includeHeaders = false,
      waitForResponse = false,
    }: EventAdapterOptions = {},
  ) {
    if (typeof signingSecret !== 'string' && !(signingSecret instanceof String)) {
      throw new TypeError('SlackEventAdapter needs a signing secret');
    }

    super();

    this.signingSecret = signingSecret as string;
    this.includeBody = includeBody;
    this.includeHeaders = includeHeaders;
    this.waitForResponse = waitForResponse;

    debug('adapter instantiated - options: %o', {
      includeBody,
      includeHeaders,
      waitForResponse,
    });
  }

  /**
   * Creates an HTTP server to listen for event payloads.
   *
   * @param path - (UNUSED) The path to listen on.
   */
  public createServer(path: string = '/slack/events'): Promise<http.Server> {
    // TODO: options (like https)
    // NOTE: this is a workaround for a shortcoming of the System.import() tranform
    return Promise.resolve().then(() => {
      debug('server created - path: %s', path);

      return http.createServer(this.requestListener());
    });
  }

  /**
   * Starts a server on the specified port.
   *
   * @param port - The port number to listen on.
   * @returns The {@link http.Server | server}.
   */
  public start(port: number): Promise<http.Server> {
    return this.createServer()
      .then(server => new Promise((resolve, reject) => {
        this.server = server;
        server.on('error', reject);
        server.listen(port, () => resolve(server));
        debug('server started - port: %s', port);
      }));
  }

  /**
   * Stops the server started by {@link start}.
   */
  public stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.server !== undefined) {
        this.server.close((error) => {
          delete this.server;
          if (error !== undefined) {
            reject(error);
          } else {
            resolve();
          }
        });
      } else {
        reject(new Error('SlackEventAdapter cannot stop when it did not start a server'));
      }
    });
  }

  /**
   * Returns a middleware-compatible adapter.
   * @param middlewareOptions - (UNUSED)
   */
  public expressMiddleware(
    middlewareOptions: object = {},
  ): (req: IncomingMessage, res: ServerResponse, next: () => void) => void {
    const requestListener = this.requestListener(middlewareOptions);
    return (req, res, _next) => {
      requestListener(req, res);
    };
  }

  /**
   * Creates a request listener.
   *
   * @param middlewareOptions - (UNUSED)
   */
  public requestListener(_middlewareOptions = {}): (req: IncomingMessage, res: ServerResponse) => void {
    return createHTTPHandler(this);
  }
}

/**
 * Options when constructing {@link SlackEventAdapter}. See {@link SlackEventAdapter}'s fields for more information on
 * what each option does.
 */
export interface EventAdapterOptions {
  includeBody?: boolean;
  includeHeaders?: boolean;
  waitForResponse?: boolean;
}

/**
 * @alias module:adapter
 */
export default SlackEventAdapter;
