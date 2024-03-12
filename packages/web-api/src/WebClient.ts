import { stringify as qsStringify } from 'querystring';
import { Agent } from 'http';
import { basename } from 'path';
import { Readable } from 'stream';
import { SecureContextOptions } from 'tls';

import zlib from 'zlib';
import { TextDecoder } from 'util';
import isStream from 'is-stream';
import pQueue from 'p-queue';
import pRetry, { AbortError } from 'p-retry';
import axios, { AxiosHeaderValue, AxiosInstance, AxiosResponse } from 'axios';
// eslint-disable-next-line @typescript-eslint/naming-convention
import FormData from 'form-data';
import isElectron from 'is-electron';
import {
  AdminAnalyticsMemberDetails,
  AdminAnalyticsPublicChannelDetails,
  AdminAnalyticsPublicChannelMetadataDetails,
  FilesCompleteUploadExternalResponse,
  FilesGetUploadURLExternalResponse,
} from './types/response';
import { CursorPaginationEnabled } from './types/request/common';
import { Methods } from './methods';
import type {
  FilesUploadV2Arguments,
  FileUploadV2Job,
  FilesGetUploadURLExternalArguments,
  FilesCompleteUploadExternalArguments,
} from './types/request/files';
import { getUserAgent } from './instrument';
import {
  requestErrorWithOriginal,
  httpErrorFromResponse,
  platformErrorFromResult,
  rateLimitedErrorWithDelay,
} from './errors';
import { LogLevel, Logger, getLogger } from './logger';
import { RetryOptions, tenRetriesInAboutThirtyMinutes } from './retry-policies';
import delay from './helpers';
import {
  warnIfNotUsingFilesUploadV2,
  getFileUploadJob,
  getMultipleFileUploadJobs,
  getAllFileUploadsToComplete,
} from './file-upload';

/*
 * Helpers
 */
// Props on axios default headers object to ignore when retrieving full list of actual headers sent in any HTTP requests
const axiosHeaderPropsToIgnore = ['delete', 'common', 'get', 'put', 'head', 'post', 'link', 'patch', 'purge', 'unlink', 'options'];
const defaultFilename = 'Untitled';
const defaultPageSize = 200;
const noopPageReducer: PageReducer = () => undefined;

/*
 * Exported types
 */

export interface WebClientOptions {
  slackApiUrl?: string;
  logger?: Logger;
  logLevel?: LogLevel;
  maxRequestConcurrency?: number;
  retryConfig?: RetryOptions;
  agent?: Agent;
  tls?: TLSOptions;
  timeout?: number;
  rejectRateLimitedCalls?: boolean;
  headers?: Record<string, string>;
  teamId?: string;
}

export type TLSOptions = Pick<SecureContextOptions, 'pfx' | 'key' | 'passphrase' | 'cert' | 'ca'>;

export enum WebClientEvent {
  // TODO: safe to rename this to conform to PascalCase enum type naming convention?
  // eslint-disable-next-line @typescript-eslint/naming-convention
  RATE_LIMITED = 'rate_limited',
}

export interface WebAPICallResult {
  ok: boolean;
  error?: string;
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
export interface PaginatePredicate {
  (page: WebAPICallResult): boolean | undefined | void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PageReducer<A = any> {
  (accumulator: A | undefined, page: WebAPICallResult, index: number): A;
}

export type PageAccumulator<R extends PageReducer> =
  R extends (accumulator: (infer A) | undefined, page: WebAPICallResult, index: number) => infer A ? A : never;

/**
 * A client for Slack's Web API
 *
 * This client provides an alias for each {@link https://api.slack.com/methods|Web API method}. Each method is
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
   * Axios HTTP client instance used by this client
   */
  private axios: AxiosInstance;

  /**
   * Configuration for custom TLS handling
   */
  private tlsConfig: TLSOptions;

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

  /**
   * @param token - An API token to authenticate/authorize with Slack (usually start with `xoxp`, `xoxb`)
   */
  public constructor(token?: string, {
    slackApiUrl = 'https://slack.com/api/',
    logger = undefined,
    logLevel = undefined,
    maxRequestConcurrency = 100,
    retryConfig = tenRetriesInAboutThirtyMinutes,
    agent = undefined,
    tls = undefined,
    timeout = 0,
    rejectRateLimitedCalls = false,
    headers = {},
    teamId = undefined,
  }: WebClientOptions = {}) {
    super();

    this.token = token;
    this.slackApiUrl = slackApiUrl;

    this.retryConfig = retryConfig;
    // eslint-disable-next-line new-cap
    this.requestQueue = new pQueue({ concurrency: maxRequestConcurrency });
    // NOTE: may want to filter the keys to only those acceptable for TLS options
    this.tlsConfig = tls !== undefined ? tls : {};
    this.rejectRateLimitedCalls = rejectRateLimitedCalls;
    this.teamId = teamId;

    // Logging
    if (typeof logger !== 'undefined') {
      this.logger = logger;
      if (typeof logLevel !== 'undefined') {
        this.logger.debug('The logLevel given to WebClient was ignored as you also gave logger');
      }
    } else {
      this.logger = getLogger(WebClient.loggerName, logLevel ?? LogLevel.INFO, logger);
    }

    // eslint-disable-next-line no-param-reassign
    if (this.token && !headers.Authorization) headers.Authorization = `Bearer ${this.token}`;

    this.axios = axios.create({
      timeout,
      baseURL: slackApiUrl,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: isElectron() ? headers : { 'User-Agent': getUserAgent(), ...headers },
      httpAgent: agent,
      httpsAgent: agent,
      transformRequest: [this.serializeApiCallOptions.bind(this)],
      validateStatus: () => true, // all HTTP status codes should result in a resolved promise (as opposed to only 2xx)
      maxRedirects: 0,
      // disabling axios' automatic proxy support:
      // axios would read from envvars to configure a proxy automatically, but it doesn't support TLS destinations.
      // for compatibility with https://api.slack.com, and for a larger set of possible proxies (SOCKS or other
      // protocols), users of this package should use the `agent` option to configure a proxy.
      proxy: false,
    });
    // serializeApiCallOptions will always determine the appropriate content-type
    delete this.axios.defaults.headers.post['Content-Type'];

    this.logger.debug('initialized');
  }

  /**
   * Generic method for calling a Web API method
   * @param method - the Web API method to call {@link https://api.slack.com/methods}
   * @param options - options
   */
  public async apiCall(method: string, options: Record<string, unknown> = {}): Promise<WebAPICallResult> {
    this.logger.debug(`apiCall('${method}') start`);

    warnDeprecations(method, this.logger);
    warnIfFallbackIsMissing(method, this.logger, options);
    warnIfThreadTsIsNotString(method, this.logger, options);

    if (typeof options === 'string' || typeof options === 'number' || typeof options === 'boolean') {
      throw new TypeError(`Expected an options argument but instead received a ${typeof options}`);
    }

    warnIfNotUsingFilesUploadV2(method, this.logger);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (method === 'files.uploadV2') return this.filesUploadV2(options);

    const headers: Record<string, string> = {};
    if (options.token) headers.Authorization = `Bearer ${options.token}`;

    const response = await this.makeRequest(method, {
      team_id: this.teamId,
      ...options,
    }, headers);
    const result = await this.buildResult(response);
    this.logger.debug(`http request result: ${JSON.stringify(result)}`);

    // log warnings in response metadata
    if (result.response_metadata !== undefined && result.response_metadata.warnings !== undefined) {
      result.response_metadata.warnings.forEach(this.logger.warn.bind(this.logger));
    }

    // log warnings and errors in response metadata messages
    // related to https://api.slack.com/changelog/2016-09-28-response-metadata-is-on-the-way
    if (result.response_metadata !== undefined && result.response_metadata.messages !== undefined) {
      result.response_metadata.messages.forEach((msg) => {
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
      });
    }

    // If result's content is gzip, "ok" property is not returned with successful response
    // TODO: look into simplifying this code block to only check for the second condition
    // if an { ok: false } body applies for all API errors
    if (!result.ok && (response.headers['content-type'] !== 'application/gzip')) {
      throw platformErrorFromResult(result as (WebAPICallResult & { error: string; }));
    } else if ('ok' in result && result.ok === false) {
      throw platformErrorFromResult(result as (WebAPICallResult & { error: string; }));
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
   * `accumulator` the next time its called, and the returned promise will resolve to the last value of `accumulator`.
   *
   * The for-await-of syntax is part of ES2018. It is available natively in Node starting with v10.0.0. You may be able
   * to use it in earlier JavaScript runtimes by transpiling your source with a tool like Babel. However, the
   * transpiled code will likely sacrifice performance.
   * @param method - the cursor-paginated Web API method to call {@link https://api.slack.com/docs/pagination}
   * @param options - options
   * @param shouldStop - a predicate that is called with each page, and should return true when pagination can end.
   * @param reduce - a callback that can be used to accumulate a value that the return promise is resolved to
   */
  public paginate(method: string, options?: Record<string, unknown>): AsyncIterable<WebAPICallResult>;
  public paginate(
    method: string,
    options: Record<string, unknown>,
    shouldStop: PaginatePredicate,
  ): Promise<void>;
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
  ): (Promise<A> | AsyncIterable<WebAPICallResult>) {
    const pageSize = (() => {
      if (options !== undefined && typeof options.limit === 'number') {
        const { limit } = options;
        // eslint-disable-next-line no-param-reassign
        delete options.limit;
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
        // eslint-disable-next-line no-await-in-loop
        result = await this.apiCall(method, Object.assign(options !== undefined ? options : {}, paginationOptions));
        yield result;
        paginationOptions = paginationOptionsForNextPage(result, pageSize);
      }
    }

    if (shouldStop === undefined) {
      return generatePages.call(this);
    }

    const pageReducer: PageReducer<A> = (reduce !== undefined) ? reduce : noopPageReducer;
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
      // eslint-disable-next-line no-restricted-syntax
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
   * This wrapper method provides an easy way to upload files using the following endpoints:
   *
   * **#1**: For each file submitted with this method, submit filenames
   * and file metadata to {@link https://api.slack.com/methods/files.getUploadURLExternal files.getUploadURLExternal} to request a URL to
   * which to send the file data to and an id for the file
   *
   * **#2**: for each returned file `upload_url`, upload corresponding file to
   * URLs returned from step 1 (e.g. https://files.slack.com/upload/v1/...\")
   *
   * **#3**: Complete uploads {@link https://api.slack.com/methods/files.completeUploadExternal files.completeUploadExternal}
   * @param options
   */
  public async filesUploadV2(options: FilesUploadV2Arguments): Promise<
  WebAPICallResult & { files: FilesCompleteUploadExternalResponse[] }
  > {
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
  private async fetchAllUploadURLExternal(fileUploads: FileUploadV2Job[]):
  Promise<Array<FilesGetUploadURLExternalResponse>> {
    return Promise.all(fileUploads.map((upload: FileUploadV2Job) => {
      /* eslint-disable @typescript-eslint/consistent-type-assertions */
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
    }));
  }

  /**
   * Complete uploads.
   * @param fileUploads
   * @returns
   */
  private async completeFileUploads(fileUploads: FileUploadV2Job[]):
  Promise<Array<FilesCompleteUploadExternalResponse>> {
    const toComplete: FilesCompleteUploadExternalArguments[] = Object.values(getAllFileUploadsToComplete(fileUploads));
    return Promise.all(
      toComplete.map((job: FilesCompleteUploadExternalArguments) => this.files.completeUploadExternal(job)),
    );
  }

  /**
   * for each returned file upload URL, upload corresponding file
   * @param fileUploads
   * @returns
   */
  private async postFileUploadsToExternalURL(fileUploads: FileUploadV2Job[], options: FilesUploadV2Arguments)
    : Promise<Array<FilesGetUploadURLExternalResponse>> {
    return Promise.all(fileUploads.map(async (upload: FileUploadV2Job) => {
      const { upload_url, file_id, filename, data } = upload;
      // either file or content will be defined
      const body = data;

      // try to post to external url
      if (upload_url) {
        const headers: Record<string, string> = {};
        if (options.token) headers.Authorization = `Bearer ${options.token}`;

        const uploadRes = await this.makeRequest(upload_url, {
          body,
        }, headers);
        if (uploadRes.status !== 200) {
          return Promise.reject(Error(`Failed to upload file (id:${file_id}, filename: ${filename})`));
        }
        const returnData = { ok: true, body: uploadRes.data } as WebAPICallResult;
        return Promise.resolve(returnData);
      }
      return Promise.reject(Error(`No upload url found for file (id: ${file_id}, filename: ${filename}`));
    }));
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
  ): Promise<AxiosResponse> {
    // TODO: better input types - remove any
    const task = () => this.requestQueue.add(async () => {
      const requestURL = (url.startsWith('https' || 'http')) ? url : `${this.axios.getUri() + url}`;

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const config: any = {
          headers,
          ...this.tlsConfig,
        };
        // admin.analytics.getFile returns a binary response
        // To be able to parse it, it should be read as an ArrayBuffer
        if (url.endsWith('admin.analytics.getFile')) {
          config.responseType = 'arraybuffer';
        }
        // apps.event.authorizations.list will reject HTTP requests that send token in the body
        // TODO: consider applying this change to all methods - though that will require thorough integration testing
        if (url.endsWith('apps.event.authorizations.list')) {
          // eslint-disable-next-line no-param-reassign
          delete body.token;
        }
        this.logger.debug(`http request url: ${requestURL}`);
        this.logger.debug(`http request body: ${JSON.stringify(redact(body))}`);
        // compile all headers - some set by default under the hood by axios - that will be sent along
        let allHeaders: Record<string, AxiosHeaderValue | undefined> = Object.keys(this.axios.defaults.headers)
          .reduce((acc, cur) => {
            if (!axiosHeaderPropsToIgnore.includes(cur)) {
              acc[cur] = this.axios.defaults.headers[cur];
            }
            return acc;
          }, {} as Record<string, AxiosHeaderValue | undefined>);

        allHeaders = {
          ...this.axios.defaults.headers.common,
          ...allHeaders,
          ...headers,
        };
        this.logger.debug(`http request headers: ${JSON.stringify(redact(allHeaders))}`);
        const response = await this.axios.post(url, body, config);
        this.logger.debug('http response received');

        if (response.status === 429) {
          const retrySec = parseRetryHeaders(response);
          if (retrySec !== undefined) {
            this.emit(WebClientEvent.RATE_LIMITED, retrySec, { url, body });
            if (this.rejectRateLimitedCalls) {
              throw new AbortError(rateLimitedErrorWithDelay(retrySec));
            }
            this.logger.info(`API Call failed due to rate limiting. Will retry in ${retrySec} seconds.`);
            // pause the request queue and then delay the rejection by the amount of time in the retry header
            this.requestQueue.pause();
            // NOTE: if there was a way to introspect the current RetryOperation and know what the next timeout
            // would be, then we could subtract that time from the following delay, knowing that it the next
            // attempt still wouldn't occur until after the rate-limit header has specified. an even better
            // solution would be to subtract the time from only the timeout of this next attempt of the
            // RetryOperation. this would result in the staying paused for the entire duration specified in the
            // header, yet this operation not having to pay the timeout cost in addition to that.
            await delay(retrySec * 1000);
            // resume the request queue and throw a non-abort error to signal a retry
            this.requestQueue.start();
            // TODO: We may want to have more detailed info such as team_id, params except tokens, and so on.
            throw new Error(`A rate limit was exceeded (url: ${url}, retry-after: ${retrySec})`);
          } else {
            // TODO: turn this into some CodedError
            throw new AbortError(new Error(`Retry header did not contain a valid timeout (url: ${url}, retry-after header: ${response.headers['retry-after']})`));
          }
        }

        // Slack's Web API doesn't use meaningful status codes besides 429 and 200
        if (response.status !== 200) {
          throw httpErrorFromResponse(response);
        }

        return response;
      } catch (error) {
        // To make this compatible with tsd, casting here instead of `catch (error: any)`
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const e = error as any;
        this.logger.warn('http request failed', e.message);
        if (e.request) {
          throw requestErrorWithOriginal(e);
        }
        throw error;
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return pRetry(task, this.retryConfig) as Promise<AxiosResponse<any, any>>;
  }

  /**
   * Transforms options (a simple key-value object) into an acceptable value for a body. This can be either
   * a string, used when posting with a content-type of url-encoded. Or, it can be a readable stream, used
   * when the options contain a binary (a stream or a buffer) and the upload should be done with content-type
   * multipart/form-data.
   * @param options - arguments for the Web API method
   * @param headers - a mutable object representing the HTTP headers for the outgoing request
   */
  private serializeApiCallOptions(options: Record<string, unknown>, headers?: Record<string, string>): string |
  Readable {
    // The following operation both flattens complex objects into a JSON-encoded strings and searches the values for
    // binary content
    let containsBinaryData: boolean = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flattened = Object.entries(options).map<[string, any] | []>(([key, value]) => {
      if (value === undefined || value === null) {
        return [];
      }

      let serializedValue = value;

      if (Buffer.isBuffer(value) || isStream(value)) {
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
      const form = flattened.reduce(
        (frm, [key, value]) => {
          if (Buffer.isBuffer(value) || isStream(value)) {
            const opts: FormData.AppendOptions = {};
            opts.filename = (() => {
              // attempt to find filename from `value`. adapted from:
              // https://github.com/form-data/form-data/blob/028c21e0f93c5fefa46a7bbf1ba753e4f627ab7a/lib/form_data.js#L227-L230
              // formidable and the browser add a name property
              // fs- and request- streams have path property
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const streamOrBuffer: any = (value as any);
              if (typeof streamOrBuffer.name === 'string') {
                return basename(streamOrBuffer.name);
              }
              if (typeof streamOrBuffer.path === 'string') {
                return basename(streamOrBuffer.path);
              }
              return defaultFilename;
            })();
            frm.append(key as string, value, opts);
          } else if (key !== undefined && value !== undefined) {
            frm.append(key, value);
          }
          return frm;
        },
        new FormData(),
      );
      if (headers) {
        // Copying FormData-generated headers into headers param
        // not reassigning to headers param since it is passed by reference and behaves as an inout param
        Object.entries(form.getHeaders()).forEach(([header, value]) => {
          // eslint-disable-next-line no-param-reassign
          headers[header] = value;
        });
      }
      return form;
    }

    // Otherwise, a simple key-value object is returned
    // eslint-disable-next-line no-param-reassign
    if (headers) headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const initialValue: { [key: string]: any; } = {};
    return qsStringify(flattened.reduce(
      (accumulator, [key, value]) => {
        if (key !== undefined && value !== undefined) {
          accumulator[key] = value;
        }
        return accumulator;
      },
      initialValue,
    ));
  }

  /**
   * Processes an HTTP response into a WebAPICallResult by performing JSON parsing on the body and merging relevant
   * HTTP headers into the object.
   * @param response - an http response
   */
  // eslint-disable-next-line class-methods-use-this
  private async buildResult(response: AxiosResponse): Promise<WebAPICallResult> {
    let { data } = response;
    const isGzipResponse = response.headers['content-type'] === 'application/gzip';

    // Check for GZIP response - if so, it is a successful response from admin.analytics.getFile
    if (isGzipResponse) {
      // admin.analytics.getFile will return a Buffer that can be unzipped
      try {
        const unzippedData = await new Promise((resolve, reject) => {
          zlib.unzip(data, (err, buf) => {
            if (err) {
              return reject(err);
            }
            return resolve(buf.toString().split('\n'));
          });
        }).then((res) => res)
          .catch((err) => {
            throw err;
          });
        const fileData: Array<AdminAnalyticsMemberDetails |
        AdminAnalyticsPublicChannelDetails |
        AdminAnalyticsPublicChannelMetadataDetails> = [];
        if (Array.isArray(unzippedData)) {
          unzippedData.forEach((dataset) => {
            if (dataset && dataset.length > 0) {
              fileData.push(JSON.parse(dataset));
            }
          });
        }
        data = { file_data: fileData };
      } catch (err) {
        data = { ok: false, error: err };
      }
    } else if (!isGzipResponse && response.request.path === '/api/admin.analytics.getFile') {
      // if it isn't a Gzip response but is from the admin.analytics.getFile request,
      // decode the ArrayBuffer to JSON read the error
      data = JSON.parse(new TextDecoder().decode(data));
    }

    if (typeof data === 'string') {
      // response.data can be a string, not an object for some reason
      try {
        data = JSON.parse(data);
      } catch (_) {
        // failed to parse the string value as JSON data
        data = { ok: false, error: data };
      }
    }

    if (data.response_metadata === undefined) {
      data.response_metadata = {};
    }

    // add scopes metadata from headers
    if (response.headers['x-oauth-scopes'] !== undefined) {
      data.response_metadata.scopes = (response.headers['x-oauth-scopes'] as string).trim().split(/\s*,\s*/);
    }
    if (response.headers['x-accepted-oauth-scopes'] !== undefined) {
      data.response_metadata.acceptedScopes = (response.headers['x-accepted-oauth-scopes'] as string).trim().split(/\s*,\s*/);
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
function parseRetryHeaders(response: AxiosResponse): number | undefined {
  if (response.headers['retry-after'] !== undefined) {
    const retryAfter = parseInt((response.headers['retry-after'] as string), 10);

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
  const deprecatedMethods = ['workflows.'];

  const isDeprecated = deprecatedMethods.some((depMethod) => {
    const re = new RegExp(`^${depMethod}`);
    return re.test(method);
  });

  if (isDeprecated) {
    logger.warn(`${method} is deprecated. Please check on https://api.slack.com/methods for an alternative.`);
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

  const missingAttachmentFallbackDetected = (args: Record<string, unknown>) => Array.isArray(args.attachments) &&
    args.attachments.some((attachment) => !attachment.fallback || attachment.fallback.trim() === '');

  const isEmptyText = (args: Record<string, unknown>) => args.text === undefined || args.text === null || args.text === '';

  const buildMissingTextWarning = () => `The top-level \`text\` argument is missing in the request payload for a ${method} call - ` +
    'It\'s a best practice to always provide a `text` argument when posting a message. ' +
    'The `text` is used in places where the content cannot be rendered such as: ' +
    'system push notifications, assistive technology such as screen readers, etc.';

  const buildMissingFallbackWarning = () => `Additionally, the attachment-level \`fallback\` argument is missing in the request payload for a ${method} call - ` +
    'To avoid this warning, it is recommended to always provide a top-level `text` argument when posting a message. ' +
    'Alternatively, you can provide an attachment-level `fallback` argument, though this is now considered a legacy field (see https://api.slack.com/reference/messaging/attachments#legacy_fields for more details).';
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
  const targetMethods = ['chat.postEphemeral', 'chat.postMessage', 'chat.scheduleMessage', 'files.upload'];
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    // when value is buffer or stream we can avoid logging it
    if (Buffer.isBuffer(value) || isStream(value)) {
      serializedValue = '[[BINARY VALUE OMITTED]]';
    } else if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
      serializedValue = JSON.stringify(value);
    }
    return [key, serializedValue];
  });

  // return as object
  const initialValue: { [key: string]: unknown; } = {};
  return flattened.reduce(
    (accumulator, [key, value]) => {
      if (key !== undefined && value !== undefined) {
        accumulator[key] = value;
      }
      return accumulator;
    },
    initialValue,
  );
}
