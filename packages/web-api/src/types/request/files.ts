import type { Stream } from 'node:stream';
import type {
  CursorPaginationEnabled,
  OptionalTeamAssignable,
  TokenOverridable,
  TraditionalPagingEnabled,
} from './common';
import type { FilesGetUploadURLExternalResponse } from '../response/index';
import type { ExcludeFromUnion } from '../helpers';

interface FileArgument {
  /** @description Encoded file ID. */
  file: string;
}
interface ExternalIDArgument {
  /** @description Creator defined GUID for the file. */
  external_id: string;
}
interface ChannelsArgument {
  /**
   * @description Comma-seperated list of channel IDs where the file will be shared. If not specified the file will
   * be private.
   */
  channels?: string;
}
interface FileType {
  /**
   * @description A file type identifier.
   * @see {@link https://api.slack.com/types/file#file_types File types} for a complete list of supported file types.
   */
  filetype?: string;
}
interface FileUploadComplete {
  /** @description Encoded file ID. */
  id: string;
  /** @description File title. */
  title?: string;
}

interface FileChannelDestinationArgument {
  /** @description Channel ID where the file will be shared. If not specified the file will be private. */
  channel_id?: string;
  thread_ts?: never;
}
interface FileThreadDestinationArgument {
  /** @description Channel ID where the file will be shared as a thread reply. */
  channel_id: string;
  /** @description Provide another message's `ts` value to upload this file as a reply. */
  thread_ts: string;
}
// Some file APIs allow you to upload a file to a channel as its own message, or to a thread as a reply.
type FileDestinationArgument = FileChannelDestinationArgument | FileThreadDestinationArgument;
// Exact same as the above `FileDestinationArgument`, but with a `channels` property instead of `channel_id`.
interface FileChannelDestinationArgumentChannels extends ChannelsArgument {
  thread_ts?: never;
}
interface FileThreadDestinationArgumentChannels extends Required<ChannelsArgument> {
  /** @description Provide another message's `ts` value to upload this file as a reply. */
  thread_ts: string;
}
// Some file APIs allow you to upload a file to a channel as its own message, or to a thread as a reply.
type FileDestinationArgumentChannels = FileChannelDestinationArgumentChannels | FileThreadDestinationArgumentChannels;

// https://api.slack.com/methods/files.completeUploadExternal
export type FilesCompleteUploadExternalArguments = FileDestinationArgument & TokenOverridable & {
  /** @description Array of file IDs and their corresponding (optional) titles. */
  files: [FileUploadComplete, ...FileUploadComplete[]];
  /** @description The message text introducing the file in the specified channel. */
  initial_comment?: string;
};

// https://api.slack.com/methods/files.delete
export interface FilesDeleteArguments extends FileArgument, TokenOverridable {}

// https://api.slack.com/methods/files.getUploadURLExternal
export interface FilesGetUploadURLExternalArguments extends TokenOverridable {
  /** @description Name of the file being uploaded. */
  filename: string;
  /** @description Size in bytes of the file being uploaded. */
  length: number;
  /** @description Description of image for screen-reader. */
  alt_text?: string;
  /** @description Syntax type of the snippet being uploaded. E.g. `python`. */
  snippet_type?: string;
}
// https://api.slack.com/methods/files.info
export interface FilesInfoArguments extends FileArgument, TokenOverridable, CursorPaginationEnabled,
  TraditionalPagingEnabled {}
// https://api.slack.com/methods/files.list
export interface FilesListArguments extends TokenOverridable, TraditionalPagingEnabled, OptionalTeamAssignable {
  /** @description Filter files appearing in a specific channel, indicated by its ID. */
  channel?: string;
  /**
   * @description Show truncated file info for files hidden due to being too old, and the team who owns the file
   * being over the file limit.
   */
  show_files_hidden_by_limit?: boolean;
  /** @description Filter files created after this timestamp (inclusive). */
  ts_from?: string;
  /** @description Filter files created before this timestamp (inclusive). */
  ts_to?: string;
  /**
   * @description Filter files by type. Pass multiple values for `types` argument by comma-seperating the values.
   * The default value is `all`, which does not filter the list.
   * Available types are `all`, `spaces`, `snippets`, `images`, `gdocs`, `zips` and `pdfs`.
   */
  types?: string;
  /** @description Filter files created by a single user. */
  user?: string;
}
// https://api.slack.com/methods/files.revokePublicURL
export interface FilesRevokePublicURLArguments extends FileArgument, TokenOverridable {}
// https://api.slack.com/methods/files.sharedPublicURL
export interface FilesSharedPublicURLArguments extends FileArgument, TokenOverridable {}

export interface FileUploadStringContents {
  /** @description File contents. If omitted, you must provide the `file` argument. */
  content: string;
}
export interface FileUploadBinaryContents {
  /**
   * @description File contents as a `Buffer` or `Stream`.
   * If providing a `string`, this parameter will be interpreted as a _path_ to a file, which will be read from disk
   * before uploading. If omitted, you must provide the `content` argument.
   */
  file: Buffer | Stream | string;
}
// File upload contents can be provided using either `content` or `file` arguments - and one of these is required.
type FileUploadContents = FileUploadStringContents | FileUploadBinaryContents;

type FileUpload = FileUploadContents & FileDestinationArgumentChannels & FileType & {
  /** @description Name of the file. */
  filename?: string;
  /** @description The message text introducing the file in specified channel(s). */
  initial_comment?: string;
  /** @description File title. */
  title?: string;
};
// https://api.slack.com/methods/files.upload
export type FilesUploadArguments = FileUpload & TokenOverridable;

export type FileUploadV2 = FileUpload & {
  /** @description Description of image for screen-reader. */
  alt_text?: string;
  /** @description Channel ID where the file will be shared. If not specified the file will be private. */
  channel_id?: string;
  /** @description Syntax type of the snippet being uploaded. E.g. `python`. */
  snippet_type?: string;
};

interface FilesUploadV2ArgumentsMultipleFiles {
  file_uploads: ExcludeFromUnion<FileUploadV2, 'channel_id' | 'channels' | 'initial_comment' | 'thread_ts'>[];
}

// https://slack.dev/node-slack-sdk/web-api#upload-a-file
export type FilesUploadV2Arguments = TokenOverridable & (
  | FileUploadV2
  | (Omit<FileUploadV2, 'file' | 'content'> & FilesUploadV2ArgumentsMultipleFiles)
);

// Helper type intended for internal use in filesUploadV2 client method
// Includes additional metadata required to complete a single file upload job
export type FileUploadV2Job = FileUploadV2 & TokenOverridable &
Pick<FilesGetUploadURLExternalResponse, 'file_id' | 'upload_url' | 'error'> & {
  length?: number;
  data?: Buffer;
};

// https://api.slack.com/methods/files.comments.delete
export interface FilesCommentsDeleteArguments extends FileArgument, TokenOverridable {
  /** @description The ID of the comment to delete. */
  id: string;
}
interface SharedFile {
  /** @description Title of the file being shared. */
  title: string;
  /** @description URL of the remote file. */
  external_url: string;
  /** @description Preview of the document. */
  preview_image?: Buffer | Stream;
  /**
   * @description A text file (txt, pdf, doc, etc.) containing textual search terms that are used to improve discovery
   * of the remote file.
   */
  indexable_file_contents?: Buffer | Stream;
}

// https://api.slack.com/methods/files.remote.add
export interface FilesRemoteAddArguments extends SharedFile, FileType, ExternalIDArgument, TokenOverridable {}
// Either the encoded file ID or the external ID must be used as an argument.
type FileOrExternalID = (FileArgument & { external_id?: never; }) | (ExternalIDArgument & { file?: never; });
// https://api.slack.com/methods/files.remote.info
export type FilesRemoteInfoArguments = FileOrExternalID & TokenOverridable;
// https://api.slack.com/methods/files.remote.list
export interface FilesRemoteListArguments extends TokenOverridable, CursorPaginationEnabled {
  /** @description Filter files appearing in a specific channel, indicated by its ID. */
  channel?: string;
  /** @description Filter files created after this timestamp (inclusive). */
  ts_from?: string;
  /** @description Filter files created before this timestamp (inclusive). */
  ts_to?: string;
}
// https://api.slack.com/methods/files.remote.remove
export type FilesRemoteRemoveArguments = FileOrExternalID & TokenOverridable;
// https://api.slack.com/methods/files.remote.share
export type FilesRemoteShareArguments = Required<ChannelsArgument> & FileOrExternalID & TokenOverridable;
// https://api.slack.com/methods/files.remote.update
export type FilesRemoteUpdateArguments = Partial<SharedFile> & FileOrExternalID & FileType & TokenOverridable;
