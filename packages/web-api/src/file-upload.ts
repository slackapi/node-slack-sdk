import { Logger } from '@slack/logger';
import { readFileSync, ReadStream } from 'fs';
import { errorWithCode, ErrorCode } from './errors';
import { FilesCompleteUploadExternalArguments, FilesUploadV2Arguments, FileUploadV2, FileUploadV2Entry } from './methods';

/**
 * Returns a fileUploadEntry used internally to store state of the file upload
 * @param options Options provided by user
 * @param channelId optional channel id to share file with, omitted, channel is private
 * @returns
*/
export async function getFileUpload(
  options: FilesUploadV2Arguments | FileUploadV2,
  logger: Logger, channelId?: string,
): Promise<FileUploadV2Entry> {
  warnIfLegacyFileType(options, logger);
  const fileName = warnIfMissingOrInvalidFileNameAndDefault(options, logger);
  const fileData = await getFileData(options);
  const fileDataBytesLength = getFileDataLength(fileData);

  const fileUploadEntry = {
    // supplied by user
    alt_text: options.alt_text,
    channel_id: channelId,
    content: options.content,
    file: options.file,
    filename: options.filename ?? fileName,
    initial_comment: options.initial_comment,
    snippet_type: options.snippet_type,
    thread_ts: options.thread_ts,
    title: options.title ?? (options.filename ?? fileName),
    // calculated
    data: fileData,
    length: fileDataBytesLength,
  };
  return fileUploadEntry;
}

/**
 * Returns an array of files upload entries when `file_uploads` is supplied.
 * **Note**
 * file_uploads can be set as options that are intended to be attached to a
 * single message. To support this, we will handle options supplied either
 * in both following patterns:
 * ### Pattern 1
 * Top level `initial_comment`, `thread_ts`, `channel_id`
 * ```javascript
 * const res = await client.files.uploadV2({
 *   initial_comment: 'Here are the files!',
 *   thread_ts: '1223313423434.131321',
 *   channel_id: 'C123',
 *   file_uploads: [
 *     {
 *       file: './test/fixtures/test-txt.txt',
 *       filename: 'test-txt.txt',
 *     },
 *     {
 *       file: './test/fixtures/test-png.png',
 *       filename: 'test-png.png',
 *     },
 *   ],
 * });
 * ```
 * ### Pattern 2
 * Nested `initial_comment`, `thread_ts`, `channel_id`
 * ```javascript
 * const res = await client.files.uploadV2({
 *   file_uploads: [
 *     {
 *       file: './test/fixtures/test-txt.txt',
 *       filename: 'test-txt.txt',
 *       initial_comment: 'Here are the files!',
 *       thread_ts: '1223313423434.131321',
 *       channel_id: 'C123',
 *     },
 *     {
 *       file: './test/fixtures/test-png.png',
 *       filename: 'test-png.png',
 *       initial_comment: 'Here are the files!',
 *       thread_ts: '1223313423434.131321',
 *       channels: 'C123',
 *     },
 *   ],
 * });
 * ```
 * @param options provided by user
*/
export async function getMultipleFileUploads(
  options: FilesUploadV2Arguments,
  logger: Logger,
): Promise<FileUploadV2Entry[]> {
  if (options.file_uploads) {
    return Promise.all(options.file_uploads.map((upload) => {
      const modifiedUpload = {
        ...upload,
      };
      // if channel_id, initial_comment, thread_ts is missing, assume the top level option
      modifiedUpload.channel_id = upload.channel_id ?? options.channel_id;
      modifiedUpload.initial_comment = upload.initial_comment ?? options.initial_comment;
      modifiedUpload.thread_ts = upload.thread_ts ?? options.thread_ts;
      return getFileUpload(modifiedUpload, logger, modifiedUpload.channel_id);
    }));
  }
  throw new Error(buildFilesUploadMissingMessage());
}

/**
 * Advise to use the files.uploadV2 method over legacy files.upload method and over
 * lower-level utilities.
 * @param method
 * @param logger
*/
export function warnIfNotUsingFilesUploadV2(method: string, logger: Logger): void {
  const targetMethods = ['files.upload'];
  const isTargetMethod = targetMethods.includes(method);
  if (method === 'files.upload') logger.warn(buildLegacyMethodWarning(method));
  if (isTargetMethod) logger.info(buildGeneralFilesUploadWarning());
}

/**
 * Checks for either a file or content property and errors if missing
 * @param options
 */
export function errorIfInvalidOrMissingFileData(options: FilesUploadV2Arguments | FileUploadV2): void {
  const { file, content } = options;

  if (!(file || content) || (file && content)) {
    throw errorWithCode(
      new Error('Either a file or content field is required for valid file upload. You cannot supply both'),
      ErrorCode.FileUploadInvalidArgumentsError,
    );
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  if (file && !(typeof file === 'string' || Buffer.isBuffer(file) || (file as any) instanceof ReadStream)) {
    throw errorWithCode(
      new Error('file must be a valid string path, buffer or ReadStream'),
      ErrorCode.FileUploadInvalidArgumentsError,
    );
  }
  if (content && typeof content !== 'string') {
    throw errorWithCode(
      new Error('content must be a string'),
      ErrorCode.FileUploadInvalidArgumentsError,
    );
  }
}

/**
 * @param options
 * @param logger
 * @returns filename if it exists
 */
export function warnIfMissingOrInvalidFileNameAndDefault(
  options: FilesUploadV2Arguments | FileUploadV2,
  logger: Logger,
): string {
  const DEFAULT_FILETYPE = 'txt';
  const DEFAULT_FILENAME = `file.${options.filetype ?? DEFAULT_FILETYPE}`;
  const { filename } = options;
  if (!filename) {
    // Filename was an optional property in legacy method
    logger.warn(buildMissingFileNameWarning());
    return DEFAULT_FILENAME;
  }
  if (filename.split('.').length < 2) {
    // likely filename is missing extension
    logger.warn(buildMissingExtensionWarning(filename));
  }
  return filename;
}

/**
 * @param options
 * @param logger
 */
export function warnIfLegacyFileType(options: FilesUploadV2Arguments | FileUploadV2, logger: Logger): void {
  if (options.filetype) {
    logger.warn(buildLegacyFileTypeWarning());
  }
}

/**
 * Returns a single file upload's data
 * @param options
 * @returns Binary data representation of file
 */
export async function getFileData(options: FilesUploadV2Arguments | FileUploadV2): Promise<Buffer> {
  errorIfInvalidOrMissingFileData(options);

  const { file, content } = options;
  if (file) {
    // try to handle as buffer
    if (Buffer.isBuffer(file)) return file;

    // try to handle as filepath
    if (typeof file === 'string') {
      // try to read file as if the string was a file path
      try {
        const dataBuffer = readFileSync(file);
        return dataBuffer;
      } catch (error) {
        throw errorWithCode(
          new Error(`Unable to resolve file data for ${file}. Please supply a filepath string, or binary data Buffer or String directly.`),
          ErrorCode.FileUploadInvalidArgumentsError,
        );
      }
    }

    // try to handle as ReadStream
    const data = await getFileDataAsStream(file as ReadStream);
    if (data) return data;
  }
  if (content) return Buffer.from(content);

  // general catch-all error
  throw errorWithCode(
    new Error('There was an issue getting the file data for the file or content supplied'),
    ErrorCode.FileUploadReadFileDataError,
  );
}

export function getFileDataLength(data: Buffer): number {
  if (data) {
    return Buffer.byteLength(data, 'utf8');
  }
  throw errorWithCode(
    new Error(buildFileSizeErrorMsg()),
    ErrorCode.FileUploadReadFileDataError,
  );
}

export async function getFileDataAsStream(readable: ReadStream): Promise<Buffer> {
  const chunks: Uint8Array[] = [];

  return new Promise((resolve, reject) => {
    readable.on('readable', () => {
      let chunk: Buffer;
      /* eslint-disable no-cond-assign */
      while ((chunk = readable.read()) !== null) {
        chunks.push(chunk);
      }
      if (chunks.length > 0) {
        const content = Buffer.concat(chunks);
        resolve(content);
      } else {
        reject(Error('No data in supplied file'));
      }
    });
  });
}

/**
 * Filters through all fileUploads and groups them into jobs for completion
 * based on combination of channel_id, thread_ts, initial_comment if supplied
 * 
 * https://api.slack.com/methods/files.completeUploadExternal allows for multiple
 * files to be uploaded with a message (`initial_comment`), and as a threaded message (`thread_ts`)
 * 
 * In order to be grouped together, file uploads must have like properties.
 * @param fileUploads 
 * @returns 
 */
export function getAllFileUploadsToComplete(fileUploads: FileUploadV2Entry[]):
Record<string, FilesCompleteUploadExternalArguments> {
  const toComplete: Record<string, FilesCompleteUploadExternalArguments> = {};
  fileUploads.forEach((upload) => {
    const { channel_id, thread_ts, initial_comment, file_id, title } = upload;
    if (file_id) {
      const compareString = `:::${channel_id}:::${thread_ts}:::${initial_comment}`;
      if (!Object.prototype.hasOwnProperty.call(toComplete, compareString)) {
        toComplete[compareString] = {
          files: [{ id: file_id, title }],
          channel_id,
          initial_comment,
          thread_ts,
        };
      } else {
        toComplete[compareString].files.push({
          id: file_id,
          title,
        });
      }
    } else {
      throw new Error(buildMissingFileIdError());
    }
  });
  return toComplete;
}

/* Error and warning message utils */
export function buildMissingFileIdError(): string {
  return 'Missing required file id for file upload completion';
}

export function buildFileSizeErrorMsg(): string {
  return 'There was an issue calculating the size of your file';
}

export function buildLegacyFileTypeWarning(): string {
  return 'filetype is no longer a supported field in files.uploadV2.' +
    ' \nPlease remove this field. To indicate file type, please do so via the required filename property' +
    ' using the appropriate file extension, e.g. image.png, text.txt';
}

export function buildMissingFileNameWarning(): string {
  return 'filename is a required field for files.uploadV2. \n For backwards compatibility and ease of migration, ' +
    'defaulting the filename. For best experience and consistent unfurl behavior, you' +
    ' should set the filename property with correct file extension, e.g. image.png, text.txt';
}

export function buildMissingExtensionWarning(filename: string): string {
  return `filename supplied '${filename}' may be missing a proper extension. Missing extenions may result in unexpected unfurl behavior when shared`;
}

export function buildLegacyMethodWarning(method: string): string {
  return `${method} is now a legacy Slack API method.`;
}

export function buildGeneralFilesUploadWarning(): string {
  return 'We recommend using files.uploadV2 for files uploads. ' +
  'This can be done with client.files.uploadV2 or via the general Web API utility, client.apiCall(\'files.uploadV2\')';
}

export function buildFilesUploadMissingMessage(): string {
  return 'Something went wrong with processing file_uploads';
}
