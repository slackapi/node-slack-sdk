import { readFileSync } from 'fs';
import { Readable } from 'stream';
import { Logger } from '@slack/logger';
import { errorWithCode, ErrorCode } from './errors';
import {
  FilesCompleteUploadExternalArguments,
  FilesUploadV2Arguments,
  FileUploadV2,
  FileUploadV2Job,
} from './types/request/files';

export async function getFileUploadJob(
  options: FilesUploadV2Arguments | FileUploadV2,
  logger: Logger,
): Promise<FileUploadV2Job> {
  // Validate parameters
  warnIfLegacyFileType(options, logger);
  warnIfChannels(options, logger);
  errorIfChannelsCsv(options);
  const fileName = warnIfMissingOrInvalidFileNameAndDefault(options, logger);
  const fileData = await getFileData(options);
  const fileDataBytesLength = getFileDataLength(fileData);

  const fileUploadJob: Record<string, unknown> = {
    // supplied by user
    alt_text: options.alt_text,
    channel_id: options.channels ?? options.channel_id,
    filename: options.filename ?? fileName,
    initial_comment: options.initial_comment,
    snippet_type: options.snippet_type,
    title: options.title ?? (options.filename ?? fileName), // default title to filename unless otherwise specified
    // calculated
    data: fileData,
    length: fileDataBytesLength,
  };
  if ('thread_ts' in options) {
    fileUploadJob.thread_ts = options.thread_ts;
  }
  if ('token' in options) {
    fileUploadJob.token = options.token;
  }
  if ('content' in options) {
    return {
      content: options.content,
      ...fileUploadJob,
    };
  }
  if ('file' in options) {
    return {
      file: options.file,
      ...fileUploadJob,
    };
  }
  throw errorWithCode(
    new Error('Either a file or content field is required for valid file upload. You must supply one'),
    ErrorCode.FileUploadInvalidArgumentsError,
  );
}

/**
 * Returns an array of files upload entries when `file_uploads` is supplied.
 * **Note**
 * file_uploads should be set when multiple files are intended to be attached to a
 * single message. To support this, we handle options supplied with
 * top level `initial_comment`, `thread_ts`, `channel_id` and `file_uploads` parameters.
 * ```javascript
 * const res = await client.files.uploadV2({
 *   initial_comment: 'Here are the files!',
 *   thread_ts: '1223313423434.131321',
 *   channel_id: 'C12345',
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
 * @param options provided by user
*/
export async function getMultipleFileUploadJobs(
  options: FilesUploadV2Arguments,
  logger: Logger,
): Promise<FileUploadV2Job[]> {
  if ('file_uploads' in options) {
    // go through each file_upload and create a job for it
    return Promise.all(options.file_uploads.map((upload) => {
      // ensure no omitted properties included in files_upload entry
      // these properties are valid only at the top-level, not
      // inside file_uploads.
      const { channel_id, channels, initial_comment, thread_ts } = upload as FileUploadV2;
      if (channel_id || channels || initial_comment || thread_ts) {
        throw errorWithCode(
          new Error(buildInvalidFilesUploadParamError()),
          ErrorCode.FileUploadInvalidArgumentsError,
        );
      }
      // takes any channel_id, initial_comment and thread_ts
      // supplied at the top level.
      const uploadJobArgs: Record<string, unknown> = {
        ...upload,
        channels: options.channels,
        channel_id: options.channel_id,
        initial_comment: options.initial_comment,
      };
      if ('thread_ts' in options) {
        uploadJobArgs.thread_ts = options.thread_ts;
      }
      if ('token' in options) {
        uploadJobArgs.token = options.token;
      }
      if ('content' in upload) {
        return getFileUploadJob({
          content: upload.content,
          ...uploadJobArgs,
        }, logger);
      }
      if ('file' in upload) {
        return getFileUploadJob({
          file: upload.file,
          ...uploadJobArgs,
        }, logger);
      }
      throw errorWithCode(
        new Error('Either a file or content field is required for valid file upload. You must supply one'),
        ErrorCode.FileUploadInvalidArgumentsError,
      );
    }));
  }
  throw new Error(buildFilesUploadMissingMessage());
}

// Helpers to build the FileUploadJob

/**
 * Returns a single file upload's data
 * @param options
 * @returns Binary data representation of file
 */
export async function getFileData(options: FilesUploadV2Arguments | FileUploadV2): Promise<Buffer> {
  errorIfInvalidOrMissingFileData(options);

  if ('file' in options) {
    const { file } = options;
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

    // try to handle as Readable
    const data = await getFileDataAsStream(file as Readable);
    if (data) return data;
  }
  if ('content' in options) return Buffer.from(options.content);

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

export async function getFileDataAsStream(readable: Readable): Promise<Buffer> {
  const chunks: Uint8Array[] = [];

  return new Promise((resolve, reject) => {
    readable.on('readable', () => {
      let chunk: Buffer;
      /* eslint-disable no-cond-assign */
      while ((chunk = readable.read()) !== null) {
        chunks.push(chunk);
      }
    });
    readable.on('end', () => {
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
 * based on combination of channel_id, thread_ts, initial_comment.
 * {@link https://api.slack.com/methods/files.completeUploadExternal files.completeUploadExternal} allows for multiple
 * files to be uploaded with a message (`initial_comment`), and as a threaded message (`thread_ts`)
 * In order to be grouped together, file uploads must have like properties.
 * @param fileUploads
 * @returns
 */
export function getAllFileUploadsToComplete(fileUploads: FileUploadV2Job[]):
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
        };
        if (thread_ts) {
          toComplete[compareString].thread_ts = upload.thread_ts;
        }
        if ('token' in upload) {
          toComplete[compareString].token = upload.token;
        }
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

// Validation
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
 * `channels` param is supported but only when a single channel is specified.
 * @param options
 * @param logger
 */
export function warnIfChannels(options: FilesUploadV2Arguments | FileUploadV2, logger: Logger): void {
  if (options.channels) logger.warn(buildChannelsWarning());
}

/**
 * v1 files.upload supported `channels` parameter provided as a comma-separated
 * string of values, e.g. 'C1234,C5678'. V2 no longer supports this csv value.
 * You may still supply `channels` with a single channel string value e.g. 'C1234'
 * but it is highly encouraged to supply `channel_id` instead.
 * @param options
 */
export function errorIfChannelsCsv(options: FilesUploadV2Arguments | FileUploadV2): void {
  const channels = options.channels ? options.channels.split(',') : [];
  if (channels.length > 1) {
    throw errorWithCode(
      new Error(buildMultipleChannelsErrorMsg()),
      ErrorCode.FileUploadInvalidArgumentsError,
    );
  }
}

/**
 * Checks for either a file or content property and errors if missing
 * @param options
 */
export function errorIfInvalidOrMissingFileData(options: FilesUploadV2Arguments | FileUploadV2): void {
  const hasFile = 'file' in options;
  const hasContent = 'content' in options;

  if (!(hasFile || hasContent) || (hasFile && hasContent)) {
    throw errorWithCode(
      new Error('Either a file or content field is required for valid file upload. You cannot supply both'),
      ErrorCode.FileUploadInvalidArgumentsError,
    );
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  if ('file' in options) {
    const { file } = options;
    if (file && !(typeof file === 'string' || Buffer.isBuffer(file) || (file as any) instanceof Readable)) {
      throw errorWithCode(
        new Error('file must be a valid string path, buffer or Readable'),
        ErrorCode.FileUploadInvalidArgumentsError,
      );
    }
  }
  if ('content' in options && options.content && typeof options.content !== 'string') {
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
 * `filetype` param is no longer supported and will be ignored
 * @param options
 * @param logger
 */
export function warnIfLegacyFileType(options: FilesUploadV2Arguments | FileUploadV2, logger: Logger): void {
  if (options.filetype) {
    logger.warn(buildLegacyFileTypeWarning());
  }
}

// Validation message utilities

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
  return `${method} may cause some issues like timeouts for relatively large files.`;
}

export function buildGeneralFilesUploadWarning(): string {
  return 'Our latest recommendation is to use client.files.uploadV2() method, ' +
    'which is mostly compatible and much stabler, instead.';
}

export function buildFilesUploadMissingMessage(): string {
  return 'Something went wrong with processing file_uploads';
}

export function buildChannelsWarning(): string {
  return 'Although the \'channels\' parameter is still supported for smoother migration from legacy files.upload, ' +
    'we recommend using the new channel_id parameter with a single str value instead (e.g. \'C12345\').';
}

export function buildMultipleChannelsErrorMsg(): string {
  return 'Sharing files with multiple channels is no longer supported in v2. Share files in each channel separately instead.';
}

export function buildInvalidFilesUploadParamError(): string {
  return 'You may supply file_uploads only for a single channel, comment, thread respectively. ' +
  'Therefore, please supply any channel_id, initial_comment, thread_ts in the top-layer.';
}
