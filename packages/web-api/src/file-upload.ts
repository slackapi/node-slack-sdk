import { Logger } from '@slack/logger';
import { readFileSync, ReadStream } from 'fs';
import { errorWithCode, ErrorCode } from './errors';
import { FilesUploadV2Arguments, FileUploadV2, FileUploadV2Entry } from './methods';

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
  const fileName = warnIfMissingOrInvalidFileName(options, logger);
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

export const buildLegacyMethodWarning = (method: string): string => `${method} is now a legacy Slack API method.`;
export const buildGeneralFilesUploadWarning = (): string => 'We recommend using files.uploadV2 for files uploads. ' +
  'This can be done with client.files.uploadV2 or via the general Web API utility, client.apiCall(\'files.uploadV2\')';

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

export const buildMissingFileNameWarning = (): string => 'filename is a required field for files.uploadV2. \n For backwards compatibility and ease of migration, ' +
'defaulting the filename. For best experience and consistent unfurl behavior, you' +
' should set the filename property with correct file extension, e.g. image.png, text.txt';
export const buildMissingExtensionWarning = (filename: string): string => `filename supplied '${filename}' may be missing a proper extension. Missing extenions may result in unexpected unfurl behavior when shared`;
export function warnIfMissingOrInvalidFileName(
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

export const buildLegacyFileTypeWarning = (): string => 'filetype is no longer a supported field in files.uploadV2.' +
' \nPlease remove this field. To indicate file type, please do so via the required filename property' +
' using the appropriate file extension, e.g. image.png, text.txt';
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

export const buildFileSizeErrorMsg = (): string => 'There was an issue calculating the size of your file';
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
