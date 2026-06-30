import { basename } from 'node:path';
import { stringify as qsStringify } from 'node:querystring';
import { TextDecoder } from 'node:util';
import zlib from 'node:zlib';

import pQueue from 'p-queue';
import pRetry, { AbortError } from 'p-retry';
import { ChatStreamer, type ChatStreamerOptions } from './chat-stream';
import { SlackError, WebAPIHTTPError, WebAPIPlatformError, WebAPIRateLimitedError, WebAPIRequestError } from './errors';
import { getAllFileUploadsToComplete, getFileUploadJob, getMultipleFileUploadJobs } from './file-upload';
import delay from './helpers';
import { getUserAgent } from './instrument';
import { getLogger, type Logger, LogLevel } from './logger';
import { Methods } from './methods';
import { type RetryOptions, tenRetriesInAboutThirtyMinutes } from './retry-policies';
import type { ChatStartStreamArguments } from './types/request';
import type { CursorPaginationEnabled } from './types/request/common';
import type {
  FilesCompleteUploadExternalArguments,
  FilesGetUploadURLExternalArguments,
  FilesUploadV2Arguments,
  FileUploadV2Job,
} from './types/request/files';
import type {
  AdminAnalyticsMemberDetails,
  AdminAnalyticsPublicChannelDetails,
  AdminAnalyticsPublicChannelMetadataDetails,
  FilesCompleteUploadExternalResponse,
  FilesGetUploadURLExternalResponse,
} from './types/response';

/*
 * Helpers
 */
const defaultFilename = 'Untitled';
const defaultPageSize = 200;
const noopPageReducer: PageReducer = () => undefined;

/*
 * Exported types
 */

export interface WebClientOptions {
  /**
   * The base URL requests are sent to. Often unchanged, but might be set for testing techniques.
   *
   * See {@link https://docs.slack.dev/tools/node-slack-sdk/web-api/#custom-api-url} for more information.
   * @default https://slack.com/api/
   */
  slackApiUrl?: string;
  logger?: Logger;
  logLevel?: LogLevel;
  maxRequestConcurrency?: number;
  retryConfig?: RetryOptions;
  /**
   * A custom `fetch` implementation conforming to the WHATWG Fetch standard.
   * Defaults to `globalThis.fetch`. Use this to configure proxies, TLS, or other transport-level behavior.
   */
  fetch?: FetchFunction;
  timeout?: number;
  rejectRateLimitedCalls?: boolean;
  headers?: Record<string, string>;
  teamId?: string;
  /**
   * Determines if a dynamic method name being an absolute URL overrides the configured slackApiUrl.
   * When set to false, the URL used in Slack API requests will always begin with the slackApiUrl.
   *
   * See {@link https://docs.slack.dev/tools/node-slack-sdk/web-api/#call-a-method} for more details.
   * @default true
   */
  allowAbsoluteUrls?: boolean;
}

export enum WebClientEvent {
  // TODO: safe to rename this to conform to PascalCase enum type naming convention?
  RATE_LIMITED = 'rate_limited',
}

export interface WebAPICallResult {
  ok: boolean;
  response_metadata?: {
    warnings?: string[];
    next_cursor?: string; // is this too specific to be encoded into this type?

    // added from the headers of the http response
    scopes?: string[];
    acceptedScopes?: string[];
    retryAfter?: number;
    // `chat.postMessage` returns an array of error messages (e.g., "messages": ["[ERROR] invalid_keys"])
    messages?: string[];
  };
}

// NOTE: should there be an async predicate?
export type PaginatePredicate = (page: WebAPICallResult) => boolean | undefined | undefined;

// biome-ignore lint/suspicious/noExplicitAny: reduce accumulator can be anything
export type PageReducer<A = any> = (accumulator: A | undefined, page: WebAPICallResult, index: number) => A;

export type PageAccumulator<R extends PageReducer> = R extends (
  accumulator: infer A | undefined,
  page: WebAPICallResult,
  index: number,
) => infer A
  ? A
  : never;

export interface FetchHeaders {
  get(name: string): string | null;
  entries(): Iterable<[string, string]>;
}

export interface FetchResponse {
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly headers: FetchHeaders;
  arrayBuffer(): Promise<ArrayBuffer>;
  json(): Promise<unknown>;
  text(): Promise<string>;
}

export interface FetchRequestInit {
  method?: string;
  headers?: Record<string, string>;
  body?: string | FormData;
  redirect?: 'error' | 'follow' | 'manual';
  signal?: AbortSignal;
}

export type FetchFunction = (url: string | URL, init?: FetchRequestInit) => Promise<FetchResponse>;

/**
 * A client for Slack's Web API
 *
 * This client provides an alias for each {@link https://docs.slack.dev/reference/methods|Web API method}. Each method is
 * a convenience wrapper for calling the {@link WebClient#apiCall} method using the method name as the first parameter.
 */
export class WebClient extends Methods {
  /**
   * The base URL for reaching Slack's Web API. Consider changing this value for testing purposes.
   */
  public readonly slackApiUrl: string;

  /**
   * Authentication and authorization token for accessing Slack Web API (usually begins with `xoxp` or `xoxb`)
   */
  public readonly token?: string;

  /**
   * Configuration for retry operations. See {@link https://github.com/tim-kos/node-retry|node-retry} for more details.
   */
  private retryConfig: RetryOptions;

  /**
   * Queue of requests in which a maximum of {@link WebClientOptions.maxRequestConcurrency} can concurrently be
   * in-flight.
   */
  private requestQueue: pQueue;

  /**
   * The fetch function used for HTTP requests
   */
  private fetchFn: FetchFunction;

  /**
   * Request timeout in milliseconds
   */
  private timeout: number;

  /**
   * Default headers sent with every request
   */
  private defaultHeaders: Record<string, string>;

  /**
   * Preference for immediately rejecting API calls which result in a rate-limited response
   */
  private rejectRateLimitedCalls: boolean;

  /**
   * The name used to prefix all logging generated from this object
   */
  private static loggerName = 'WebClient';

  /**
   * This object's logger instance
   */
  private logger: Logger;

  /**
   * This object's teamId value
   */
  private teamId?: string;

  private allowAbsoluteUrls: boolean;

  /**
   * @param token - An API token to authenticate/authorize with Slack (usually start with `xoxp`, `xoxb`)
   * @param {Object} [webClientOptions] - Configuration options.
   */
  public constructor(
    token?: string,
    {
      slackApiUrl = 'https://slack.com/api/',
      logger = undefined,
      logLevel = undefined,
      maxRequestConcurrency = 100,
      retryConfig = tenRetriesInAboutThirtyMinutes,
      fetch = undefined,
      timeout = 0,
      rejectRateLimitedCalls = false,
      headers = {},
      teamId = undefined,
      allowAbsoluteUrls = true,
    }: WebClientOptions = {},
  ) {
    super();

    this.token = token;
    this.slackApiUrl = slackApiUrl;
    if (!this.slackApiUrl.endsWith('/')) {
      this.slackApiUrl += '/';
    }

    this.retryConfig = retryConfig;
    this.requestQueue = new pQueue({ concurrency: maxRequestConcurrency });
    this.rejectRateLimitedCalls = rejectRateLimitedCalls;
    this.teamId = teamId;
    this.allowAbsoluteUrls = allowAbsoluteUrls;

    // Logging
    if (typeof logger !== 'undefined') {
      this.logger = logger;
      if (typeof logLevel !== 'undefined') {
        this.logger.debug('The logLevel given to WebClient was ignored as you also gave logger');
      }
    } else {
      this.logger = getLogger(WebClient.loggerName, logLevel ?? LogLevel.INFO, logger);
    }

    if (this.token && !headers.Authorization) headers.Authorization = `Bearer ${this.token}`;

    this.fetchFn = fetch ?? globalThis.fetch;
    this.timeout = timeout;
    this.defaultHeaders = { 'User-Agent': getUserAgent(), Accept: 'application/json', ...headers };

    this.logger.debug('initialized');
  }

  /**
   * Generic method for calling a Web API method
   * @param method - the Web API method to call {@link https://docs.slack.dev/reference/methods}
   * @param options - arguments for the Web API method
   */
  public async apiCall(method: string, options: Record<string, unknown> = {}): Promise<WebAPICallResult> {
    this.logger.debug(`apiCall('${method}') start`);

    warnDeprecations(method, this.logger);
    warnIfFallbackIsMissing(method, this.logger, options);
    warnIfThreadTsIsNotString(method, this.logger, options);

    if (typeof options === 'string' || typeof options === 'number' || typeof options === 'boolean') {
      throw new TypeError(`Expected an options argument but instead received a ${typeof options}`);
    }

    // @ts-expect-error insufficient overlap between Record and FilesUploadV2Arguments
    if (method === 'files.uploadV2') return this.filesUploadV2(options as FilesUploadV2Arguments);

    const headers: Record<string, string> = {};
    if (options.token) headers.Authorization = `Bearer ${options.token}`;

    const url = this.deriveRequestUrl(method);
    const response = await this.makeRequest(
      url,
      {
        team_id: this.teamId,
        ...options,
      },
      headers,
    );
    const result = await this.buildResult(response);
    this.logger.debug(`http request result: ${JSON.stringify(result)}`);

    // log warnings in response metadata
    if (result.response_metadata !== undefined && result.response_metadata.warnings !== undefined) {
      result.response_metadata.warnings.forEach(this.logger.warn.bind(this.logger));
    }

    // log warnings and errors in response metadata messages
    // related to https://docs.slack.dev/changelog/2016/09/28/response-metadata-is-on-the-way
    if (result.response_metadata !== undefined && result.response_metadata.messages !== undefined) {
      for (const msg of result.response_metadata.messages) {
        const errReg: RegExp = /\[ERROR\](.*)/;
        const warnReg: RegExp = /\[WARN\](.*)/;
        if (errReg.test(msg)) {
          const errMatch = msg.match(errReg);
          if (errMatch != null) {
            this.logger.error(errMatch[1].trim());
          }
        } else if (warnReg.test(msg)) {
          const warnMatch = msg.match(warnReg);
          if (warnMatch != null) {
            this.logger.warn(warnMatch[1].trim());
          }
        }
      }
    }

    // If result's content is gzip, "ok" property is not returned with successful response
    // TODO: look into simplifying this code block to only check for the second condition
    // if an { ok: false } body applies for all API errors
    if (!result.ok && response.headers.get('content-type') !== 'application/gzip') {
      throw new WebAPIPlatformError(result as WebAPICallResult & { error: string });
    }
    if ('ok' in result && result.ok === false) {
      throw new WebAPIPlatformError(result as WebAPICallResult & { error: string });
    }
    this.logger.debug(`apiCall('${method}') end`);
    return result;
  }

  /**
   * Iterate over the result pages of a cursor-paginated Web API method. This method can return two types of values,
   * depending on which arguments are used. When up to two parameters are used, the return value is an async iterator
   * which can be used as the iterable in a for-await-of loop. When three or four parameters are used, the return
   * value is a promise that resolves at the end of iteration. The third parameter, `shouldStop`, is a function that is
   * called with each `page` and can end iteration by returning `true`. The fourth parameter, `reduce`, is a function
   * that is called with three arguments: `accumulator`, `page`, and `index`. The `accumulator` is a value of any type
   * you choose, but it will contain `undefined` when `reduce` is called for the first time. The `page` argument and
   * `index` arguments are exactly what they say they are. The `reduce` function's return value will be passed in as
   * `accumulator` the next time it's called, and the returned promise will resolve to the last value of `accumulator`.
   *
   * The for-await-of syntax is part of ES2018. It is available natively in Node starting with v10.0.0. You may be able
   * to use it in earlier JavaScript runtimes by transpiling your source with a tool like Babel. However, the
   * transpiled code will likely sacrifice performance.
   * @param method - the cursor-paginated Web API method to call {@link https://docs.slack.dev/apis/web-api/paginationn}
   * @param options - options
   * @param shouldStop - a predicate that is called with each page, and should return true when pagination can end.
   * @param reduce - a callback that can be used to accumulate a value that the return promise is resolved to
   */
  public paginate(method: string, options?: Record<string, unknown>): AsyncIterable<WebAPICallResult>;
  public paginate(method: string, options: Record<string, unknown>, shouldStop: PaginatePredicate): Promise<void>;
  public paginate<R extends PageReducer, A extends PageAccumulator<R>>(
    method: string,
    options: Record<string, unknown>,
    shouldStop: PaginatePredicate,
    reduce?: PageReducer<A>,
  ): Promise<A>;
  public paginate<R extends PageReducer, A extends PageAccumulator<R>>(
    method: string,
    options?: Record<string, unknown>,
    shouldStop?: PaginatePredicate,
    reduce?: PageReducer<A>,
  ): Promise<A> | AsyncIterable<WebAPICallResult> {
    const pageSize = (() => {
      if (options !== undefined && typeof options.limit === 'number') {
        const { limit } = options;
        options.limit = undefined;
        return limit;
      }
      return defaultPageSize;
    })();

    async function* generatePages(this: WebClient): AsyncIterableIterator<WebAPICallResult> {
      // when result is undefined, that signals that the first of potentially many calls has not yet been made
      let result: WebAPICallResult | undefined;
      // paginationOptions stores pagination options not already stored in the options argument
      let paginationOptions: CursorPaginationEnabled | undefined = {
        limit: pageSize,
      };
      if (options !== undefined && options.cursor !== undefined) {
        paginationOptions.cursor = options.cursor as string;
      }

      // NOTE: test for the situation where you're resuming a pagination using and existing cursor

      while (result === undefined || paginationOptions !== undefined) {
        result = await this.apiCall(method, Object.assign(options !== undefined ? options : {}, paginationOptions));
        yield result;
        paginationOptions = paginationOptionsForNextPage(result, pageSize);
      }
    }

    if (shouldStop === undefined) {
      return generatePages.call(this);
    }

    const pageReducer: PageReducer<A> = reduce !== undefined ? reduce : noopPageReducer;
    let index = 0;

    return (async () => {
      // Unroll the first iteration of the iterator
      // This is done primarily because in order to satisfy the type system, we need a variable that is typed as A
      // (shown as accumulator before), but before the first iteration all we have is a variable typed A | undefined.
      // Unrolling the first iteration allows us to deal with undefined as a special case.

      const pageIterator: AsyncIterableIterator<WebAPICallResult> = generatePages.call(this);
      const firstIteratorResult = await pageIterator.next(undefined);
      // Assumption: there will always be at least one result in a paginated API request
      // if (firstIteratorResult.done) { return; }
      const firstPage = firstIteratorResult.value;
      let accumulator: A = pageReducer(undefined, firstPage, index);
      index += 1;
      if (shouldStop(firstPage)) {
        return accumulator;
      }

      // Continue iteration
      for await (const page of pageIterator) {
        accumulator = pageReducer(accumulator, page, index);
        if (shouldStop(page)) {
          return accumulator;
        }
        index += 1;
      }
      return accumulator;
    })();
  }

  /**
   * Stream markdown text into a conversation.
   *
   * @description The "chatStream" method starts a new chat stream in a conversation that can be appended to. After appending an entire message, the stream can be stopped with concluding arguments such as "blocks" for gathering feedback.
   *
   * The "markdown_text" content is appended to a buffer before being sent to the recipient, with a default buffer size of "256" characters. Setting the "buffer_size" value to a smaller number sends more frequent updates for the same amount of characters, but might reach rate limits more often.
   *
   * @example
   * const streamer = client.chatStream({
   *   channel: "C0123456789",
   *   thread_ts: "1700000001.123456",
   *   recipient_team_id: "T0123456789",
   *   recipient_user_id: "U0123456789",
   * });
   * await streamer.append({
   *   markdown_text: "**hello wo",
   * });
   * await streamer.append({
   *   markdown_text: "rld!**",
   * });
   * await streamer.stop();
   *
   * @see {@link https://docs.slack.dev/reference/methods/chat.startStream}
   * @see {@link https://docs.slack.dev/reference/methods/chat.appendStream}
   * @see {@link https://docs.slack.dev/reference/methods/chat.stopStream}
   */
  public chatStream(params: Omit<ChatStartStreamArguments & ChatStreamerOptions, 'markdown_text'>): ChatStreamer {
    const { buffer_size, ...args } = params;
    const options: ChatStreamerOptions = {
      buffer_size,
    };
    return new ChatStreamer(this, this.logger, args, options);
  }

  /**
   * This wrapper method provides an easy way to upload files using the following endpoints:
   *
   * **#1**: For each file submitted with this method, submit filenames
   * and file metadata to {@link https://docs.slack.dev/reference/methods/files.getuploadurlexternal files.getUploadURLExternal} to request a URL to
   * which to send the file data to and an id for the file
   *
   * **#2**: for each returned file `upload_url`, upload corresponding file to
   * URLs returned from step 1 (e.g. https://files.slack.com/upload/v1/...\")
   *
   * **#3**: Complete uploads {@link https://docs.slack.dev/reference/methods/files.completeuploadexternal files.completeUploadExternal}
   * @param options
   */
  public async filesUploadV2(
    options: FilesUploadV2Arguments,
  ): Promise<WebAPICallResult & { files: FilesCompleteUploadExternalResponse[] }> {
    this.logger.debug('files.uploadV2() start');
    // 1
    const fileUploads = await this.getAllFileUploads(options);
    const fileUploadsURLRes = await this.fetchAllUploadURLExternal(fileUploads);
    // set the upload_url and file_id returned from Slack
    fileUploadsURLRes.forEach((res, idx) => {
      fileUploads[idx].upload_url = res.upload_url;
      fileUploads[idx].file_id = res.file_id;
    });

    // 2
    await this.postFileUploadsToExternalURL(fileUploads, options);

    // 3
    const completion = await this.completeFileUploads(fileUploads);

    return { ok: true, files: completion };
  }

  /**
   * For each file submitted with this method, submits filenames
   * and file metadata to files.getUploadURLExternal to request a URL to
   * which to send the file data to and an id for the file
   * @param fileUploads
   */
  private async fetchAllUploadURLExternal(
    fileUploads: FileUploadV2Job[],
  ): Promise<Array<FilesGetUploadURLExternalResponse>> {
    return Promise.all(
      fileUploads.map((upload: FileUploadV2Job) => {
        const options = {
          filename: upload.filename,
          length: upload.length,
          alt_text: upload.alt_text,
          snippet_type: upload.snippet_type,
        } as FilesGetUploadURLExternalArguments;
        if ('token' in upload) {
          options.token = upload.token;
        }

        return this.files.getUploadURLExternal(options);
      }),
    );
  }

  /**
   * Complete uploads.
   * @param fileUploads
   * @returns
   */
  private async completeFileUploads(fileUploads: FileUploadV2Job[]): Promise<FilesCompleteUploadExternalResponse[]> {
    const toComplete: FilesCompleteUploadExternalArguments[] = Object.values(getAllFileUploadsToComplete(fileUploads));
    return Promise.all(toComplete.map((job) => this.files.completeUploadExternal(job)));
  }

  /**
   * for each returned file upload URL, upload corresponding file
   * @param fileUploads
   * @returns
   */
  private async postFileUploadsToExternalURL(
    fileUploads: FileUploadV2Job[],
    options: FilesUploadV2Arguments,
  ): Promise<Array<FilesGetUploadURLExternalResponse>> {
    return Promise.all(
      fileUploads.map(async (upload: FileUploadV2Job) => {
        const { upload_url, file_id, filename, data } = upload;
        // either file or content will be defined
        const body = data;

        // try to post to external url
        if (upload_url) {
          const headers: Record<string, string> = {};
          if (options.token) headers.Authorization = `Bearer ${options.token}`;

          const uploadRes = await this.makeRequest(
            upload_url,
            {
              body,
            },
            headers,
          );
          if (uploadRes.status !== 200) {
            return Promise.reject(Error(`Failed to upload file (id:${file_id}, filename: ${filename})`));
          }
          const responseBody = await uploadRes.text();
          const returnData = { ok: true, body: responseBody } as WebAPICallResult;
          return Promise.resolve(returnData);
        }
        return Promise.reject(Error(`No upload url found for file (id: ${file_id}, filename: ${filename}`));
      }),
    );
  }

  /**
   * @param options All file uploads arguments
   * @returns An array of file upload entries
   */
  private async getAllFileUploads(options: FilesUploadV2Arguments): Promise<FileUploadV2Job[]> {
    let fileUploads: FileUploadV2Job[] = [];

    // add single file data to uploads if file or content exists at the top level
    if ('file' in options || 'content' in options) {
      fileUploads.push(await getFileUploadJob(options, this.logger));
    }

    // add multiple files data when file_uploads is supplied
    if ('file_uploads' in options) {
      fileUploads = fileUploads.concat(await getMultipleFileUploadJobs(options, this.logger));
    }
    return fileUploads;
  }

  /**
   * Low-level function to make a single API request. handles queuing, retries, and http-level errors
   */
  private async makeRequest(
    url: string,
    body: Record<string, unknown>,
    headers: Record<string, string> = {},
  ): Promise<FetchResponse> {
    const task = () =>
      this.requestQueue.add(async () => {
        // apps.event.authorizations.list will reject HTTP requests that send token in the body
        // TODO: consider applying this change to all methods - though that will require thorough integration testing
        if (url.endsWith('/apps.event.authorizations.list')) {
          body.token = undefined;
        }

        const { serializedBody, contentHeaders } = this.serializeBody(body);
        const allHeaders: Record<string, string> = { ...this.defaultHeaders, ...contentHeaders, ...headers };

        this.logger.debug(`http request url: ${url}`);
        this.logger.debug(`http request body: ${JSON.stringify(redact(body))}`);
        this.logger.debug(`http request headers: ${JSON.stringify(redact(allHeaders))}`);

        const controller = new AbortController();
        const timer = this.timeout > 0 ? setTimeout(() => controller.abort(), this.timeout) : undefined;
        const signal = timer ? controller.signal : undefined;

        try {
          const response = await this.fetchFn(url, {
            method: 'POST',
            headers: allHeaders,
            body: serializedBody,
            redirect: 'error',
            ...(signal ? { signal } : {}),
          });
          this.logger.debug('http response received');

          if (response.status === 429) {
            const retrySec = parseRetryHeaders(response);
            if (retrySec !== undefined) {
              this.emit(WebClientEvent.RATE_LIMITED, retrySec, { url, body });
              if (this.rejectRateLimitedCalls) {
                throw new AbortError(new WebAPIRateLimitedError(retrySec));
              }
              this.logger.info(`API Call failed due to rate limiting. Will retry in ${retrySec} seconds.`);
              // pause the request queue and then delay the rejection by the amount of time in the retry header
              this.requestQueue.pause();
              // NOTE: if there was a way to introspect the current RetryOperation and know what the next timeout
              // would be, then we could subtract that time from the following delay, knowing that the next
              // attempt still wouldn't occur until after the rate-limit header has specified. An even better
              // solution would be to subtract the time from only the timeout of this next attempt of the
              // RetryOperation. This would result in staying paused for the entire duration specified in the
              // header, yet this operation not having to pay the timeout cost in addition to that.
              await delay(retrySec * 1000);
              // resume the request queue and throw a non-abort error to signal a retry
              this.requestQueue.start();
              // TODO: We may want to have more detailed info such as team_id, params except tokens, and so on.
              throw new Error(`A rate limit was exceeded (url: ${url}, retry-after: ${retrySec})`);
            }
            // TODO: turn this into some CodedError
            throw new AbortError(
              new Error(
                `Retry header did not contain a valid timeout (url: ${url}, retry-after header: ${response.headers.get('retry-after')})`,
              ),
            );
          }

          // Slack's Web API doesn't use meaningful status codes besides 429 and 200
          if (response.status !== 200) {
            const responseBody = await response.text();
            throw new WebAPIHTTPError(
              response.status,
              response.statusText,
              Object.fromEntries(response.headers.entries()),
              responseBody,
            );
          }

          return response;
        } catch (error) {
          if (error instanceof AbortError) {
            throw error;
          }
          if (error instanceof SlackError) {
            throw error;
          }
          const message = error instanceof Error ? error.message : String(error);
          this.logger.warn('http request failed', message);
          throw new WebAPIRequestError(error instanceof Error ? error : new Error(String(error)));
        } finally {
          if (timer) clearTimeout(timer);
        }
      });
    return pRetry(task, this.retryConfig) as Promise<FetchResponse>;
  }

  /**
   * Get the complete request URL for the provided URL.
   * @param url - The resource to POST to. Either a Slack API method or absolute URL.
   */
  private deriveRequestUrl(url: string): string {
    const isAbsoluteURL = url.startsWith('https://') || url.startsWith('http://');
    if (isAbsoluteURL && this.allowAbsoluteUrls) {
      return url;
    }
    return `${this.slackApiUrl}${url}`;
  }

  /**
   * Transforms a key-value object into a serialized body suitable for fetch.
   * Flattens complex objects into JSON-encoded strings, detects binary content,
   * and returns either a FormData (for binary uploads) or a URL-encoded string,
   * along with any content-type headers that should be set.
   */
  private serializeBody(data: Record<string, unknown>): {
    serializedBody: FormData | string;
    contentHeaders: Record<string, string>;
  } {
    let containsBinaryData = false;
    // biome-ignore lint/suspicious/noExplicitAny: HTTP request data can be anything
    const flattened = Object.entries(data).map<[string, any] | []>(([key, value]) => {
      if (value === undefined || value === null) {
        return [];
      }

      let serializedValue = value;

      if (Buffer.isBuffer(value)) {
        containsBinaryData = true;
      } else if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
        // if value is anything other than string, number, boolean, binary data, a Stream, or a Buffer, then encode it
        // as a JSON string.
        serializedValue = JSON.stringify(value);
      }

      return [key, serializedValue];
    });

    // A body with binary content should be serialized as multipart/form-data
    if (containsBinaryData) {
      this.logger.debug('Request arguments contain binary data');
      const form = new FormData();
      for (const [key, value] of flattened) {
        if (key === undefined || value === undefined) continue;
        if (Buffer.isBuffer(value)) {
          const streamOrBuffer = value as Buffer & { name?: string; path?: string };
          let filename = defaultFilename;
          if (typeof streamOrBuffer.name === 'string') {
            filename = basename(streamOrBuffer.name);
          } else if (typeof streamOrBuffer.path === 'string') {
            filename = basename(streamOrBuffer.path);
          }
          form.append(key, new Blob([new Uint8Array(value)]), filename);
        } else {
          form.append(key, String(value));
        }
      }
      // Do not set Content-Type — fetch auto-generates the multipart boundary
      return { serializedBody: form, contentHeaders: {} };
    }

    // Otherwise, serialize as url-encoded key-value pairs
    // biome-ignore lint/suspicious/noExplicitAny: form values can be anything
    const initialValue: { [key: string]: any } = {};
    const encoded = qsStringify(
      flattened.reduce((accumulator, [key, value]) => {
        if (key !== undefined && value !== undefined) {
          accumulator[key] = value;
        }
        return accumulator;
      }, initialValue),
    );
    return {
      serializedBody: encoded,
      contentHeaders: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };
  }

  /**
   * Processes an HTTP response into a WebAPICallResult by performing JSON parsing on the body and merging relevant
   * HTTP headers into the object.
   * @param response - an http response
   */
  private async buildResult(response: FetchResponse): Promise<WebAPICallResult> {
    const contentType = response.headers.get('content-type');
    const isGzipResponse = contentType === 'application/gzip';

    // biome-ignore lint/suspicious/noExplicitAny: HTTP response data can be anything
    let data: any;

    // admin.analytics.getFile returns a gzip binary response that can be unzipped
    if (isGzipResponse) {
      try {
        const buffer = Buffer.from(await response.arrayBuffer());
        const unzippedData = await new Promise((resolve, reject) => {
          zlib.unzip(buffer, (err, buf) => {
            if (err) {
              return reject(err);
            }
            return resolve(buf.toString().split('\n'));
          });
        });
        const fileData: Array<
          AdminAnalyticsMemberDetails | AdminAnalyticsPublicChannelDetails | AdminAnalyticsPublicChannelMetadataDetails
        > = [];
        if (Array.isArray(unzippedData)) {
          for (const dataset of unzippedData) {
            if (dataset && dataset.length > 0) {
              fileData.push(JSON.parse(dataset));
            }
          }
        }
        data = { file_data: fileData };
      } catch (err) {
        data = { ok: false, error: err };
      }
    } else if (!isGzipResponse && response.url.endsWith('/admin.analytics.getFile')) {
      // if it isn't a Gzip response but is from the admin.analytics.getFile request,
      // decode the ArrayBuffer to JSON read the error
      const buffer = await response.arrayBuffer();
      data = JSON.parse(new TextDecoder().decode(buffer));
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch (_) {
        // failed to parse the response body as JSON
        data = { ok: false, error: text };
      }
    }

    if (data.response_metadata === undefined) {
      data.response_metadata = {};
    }

    // add scopes metadata from headers
    const oauthScopes = response.headers.get('x-oauth-scopes');
    if (oauthScopes !== null) {
      data.response_metadata.scopes = oauthScopes.trim().split(/\s*,\s*/);
    }
    const acceptedOauthScopes = response.headers.get('x-accepted-oauth-scopes');
    if (acceptedOauthScopes !== null) {
      data.response_metadata.acceptedScopes = acceptedOauthScopes.trim().split(/\s*,\s*/);
    }

    // add retry metadata from headers
    const retrySec = parseRetryHeaders(response);
    if (retrySec !== undefined) {
      data.response_metadata.retryAfter = retrySec;
    }

    return data;
  }
}

export default WebClient;

/**
 * Determines an appropriate set of cursor pagination options for the next request to a paginated API method.
 * @param previousResult - the result of the last request, where the next cursor might be found.
 * @param pageSize - the maximum number of additional items to fetch in the next request.
 */
function paginationOptionsForNextPage(
  previousResult: WebAPICallResult | undefined,
  pageSize: number,
): CursorPaginationEnabled | undefined {
  if (
    previousResult !== undefined &&
    previousResult.response_metadata !== undefined &&
    previousResult.response_metadata.next_cursor !== undefined &&
    previousResult.response_metadata.next_cursor !== ''
  ) {
    return {
      limit: pageSize,
      cursor: previousResult.response_metadata.next_cursor as string,
    };
  }
  return undefined;
}

/**
 * Extract the amount of time (in seconds) the platform has recommended this client wait before sending another request
 * from a rate-limited HTTP response (statusCode = 429).
 */
function parseRetryHeaders(response: FetchResponse): number | undefined {
  const retryAfterHeader = response.headers.get('retry-after');
  if (retryAfterHeader !== null) {
    const retryAfter = Number.parseInt(retryAfterHeader, 10);

    if (!Number.isNaN(retryAfter)) {
      return retryAfter;
    }
  }
  return undefined;
}

/**
 * Log a warning when using a deprecated method
 * @param method api method being called
 * @param logger instance of web clients logger
 */
function warnDeprecations(method: string, logger: Logger): void {
  const deprecatedMethods = ['oauth.access'];

  const isDeprecated = deprecatedMethods.some((depMethod) => {
    const re = new RegExp(`^${depMethod}`);
    return re.test(method);
  });

  if (isDeprecated) {
    logger.warn(
      `${method} is deprecated. Please check on https://docs.slack.dev/reference/methods for an alternative.`,
    );
  }
}

/**
 * Log a warning when using chat.postMessage without text argument or attachments with fallback argument
 * @param method api method being called
 * @param logger instance of we clients logger
 * @param options arguments for the Web API method
 */
function warnIfFallbackIsMissing(method: string, logger: Logger, options?: Record<string, unknown>): void {
  const targetMethods = ['chat.postEphemeral', 'chat.postMessage', 'chat.scheduleMessage'];
  const isTargetMethod = targetMethods.includes(method);

  const hasAttachments = (args: Record<string, unknown>) => Array.isArray(args.attachments) && args.attachments.length;

  const missingAttachmentFallbackDetected = (args: Record<string, unknown>) =>
    Array.isArray(args.attachments) &&
    args.attachments.some((attachment) => !attachment.fallback || attachment.fallback.trim() === '');

  const isEmptyText = (args: Record<string, unknown>) =>
    (args.text === undefined || args.text === null || args.text === '') &&
    (args.markdown_text === undefined || args.markdown === null || args.markdown_text === '');

  const buildMissingTextWarning = () =>
    `The top-level \`text\` argument is missing in the request payload for a ${method} call - It's a best practice to always provide a \`text\` argument when posting a message. The \`text\` is used in places where the content cannot be rendered such as: system push notifications, assistive technology such as screen readers, etc.`;

  const buildMissingFallbackWarning = () =>
    `Additionally, the attachment-level \`fallback\` argument is missing in the request payload for a ${method} call - To avoid this warning, it is recommended to always provide a top-level \`text\` argument when posting a message. Alternatively, you can provide an attachment-level \`fallback\` argument, though this is now considered a legacy field (see https://docs.slack.dev/legacy/legacy-messaging/legacy-secondary-message-attachments for more details).`;
  if (isTargetMethod && typeof options === 'object') {
    if (hasAttachments(options)) {
      if (missingAttachmentFallbackDetected(options) && isEmptyText(options)) {
        logger.warn(buildMissingTextWarning());
        logger.warn(buildMissingFallbackWarning());
      }
    } else if (isEmptyText(options)) {
      logger.warn(buildMissingTextWarning());
    }
  }
}

/**
 * Log a warning when thread_ts is not a string
 * @param method api method being called
 * @param logger instance of web clients logger
 * @param options arguments for the Web API method
 */
function warnIfThreadTsIsNotString(method: string, logger: Logger, options?: Record<string, unknown>): void {
  const targetMethods = ['chat.postEphemeral', 'chat.postMessage', 'chat.scheduleMessage'];
  const isTargetMethod = targetMethods.includes(method);

  if (isTargetMethod && options?.thread_ts !== undefined && typeof options?.thread_ts !== 'string') {
    logger.warn(buildThreadTsWarningMessage(method));
  }
}

export function buildThreadTsWarningMessage(method: string): string {
  return `The given thread_ts value in the request payload for a ${method} call is a float value. We highly recommend using a string value instead.`;
}

/**
 * Takes an object and redacts specific items
 * @param body
 * @returns
 */
function redact(body: Record<string, unknown>): Record<string, unknown> {
  // biome-ignore lint/suspicious/noExplicitAny: objects can be anything
  const flattened = Object.entries(body).map<[string, any] | []>(([key, value]) => {
    // no value provided
    if (value === undefined || value === null) {
      return [];
    }

    let serializedValue = value;

    // redact possible tokens
    if (key.match(/.*token.*/) !== null || key.match(/[Aa]uthorization/)) {
      serializedValue = '[[REDACTED]]';
    }

    // when value is buffer we can avoid logging it
    if (Buffer.isBuffer(value)) {
      serializedValue = '[[BINARY VALUE OMITTED]]';
    } else if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
      serializedValue = JSON.stringify(value);
    }
    return [key, serializedValue];
  });

  // return as object
  const initialValue: { [key: string]: unknown } = {};
  return flattened.reduce((accumulator, [key, value]) => {
    if (key !== undefined && value !== undefined) {
      accumulator[key] = value;
    }
    return accumulator;
  }, initialValue);
}
