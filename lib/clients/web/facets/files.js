/**
 * API Facet to make calls to methods in the files namespace.
 *
 * This provides functions to call:
 *   - delete: {@link https://api.slack.com/methods/files.delete|files.delete}
 *   - info: {@link https://api.slack.com/methods/files.info|files.info}
 *   - list: {@link https://api.slack.com/methods/files.list|files.list}
 *   - revokePublicURL: {@link https://api.slack.com/methods/files.revokePublicURL|files.revokePublicURL}
 *   - sharedPublicURL: {@link https://api.slack.com/methods/files.sharedPublicURL|files.sharedPublicURL}
 *   - upload: {@link https://api.slack.com/methods/files.upload|files.upload}
 *
 */


function FilesFacet(makeAPICall) {
  this.name = 'files';
  this.makeAPICall = makeAPICall;
}


/**
 * Deletes a file.
 * @see {@link https://api.slack.com/methods/files.delete|files.delete}
 *
 * @param {?} file - ID of file to delete.
 * @param {function=} optCb Optional callback, if not using promises.
 */
FilesFacet.prototype.delete = function delete_(file, optCb) {
  var requiredArgs = {
    file: file
  };

  return this.makeAPICall('files.delete', requiredArgs, null, optCb);
};


/**
 * Gets information about a team file.
 * @see {@link https://api.slack.com/methods/files.info|files.info}
 *
 * @param {?} file - Specify a file by providing its ID.
 * @param {Object=} opts


 * @param {function=} optCb Optional callback, if not using promises.
 */
FilesFacet.prototype.info = function info(file, opts, optCb) {
  var requiredArgs = {
    file: file
  };

  return this.makeAPICall('files.info', requiredArgs, opts, optCb);
};


/**
 * Lists & filters team files.
 * @see {@link https://api.slack.com/methods/files.list|files.list}
 *
 * @param {Object=} opts
 * @param {?} opts.user - Filter files created by a single user.
 * @param {?} opts.channel - Filter files appearing in a specific channel, indicated by its ID.
 * @param {?} opts.ts_from - Filter files created after this timestamp (inclusive).
 * @param {?} opts.ts_to - Filter files created before this timestamp (inclusive).
 * @param {?} opts.types - Filter files by type:
 *
 *   * `all` - All files
 *   * `spaces` - Posts
 *   * `snippets` - Snippets
 *   * `images` - Image files
 *   * `gdocs` - Google docs
 *   * `zips` - Zip files
 *   * `pdfs` - PDF files
 *
 *   You can pass multiple values in the types argument, like `types=spaces,snippets`.The default
 *   value is `all`, which does not filter the list.


 * @param {function=} optCb Optional callback, if not using promises.
 */
FilesFacet.prototype.list = function list(opts, optCb) {
  return this.makeAPICall('files.list', null, opts, optCb);
};


/**
 * Revokes public/external sharing access for a file
 * @see {@link https://api.slack.com/methods/files.revokePublicURL|files.revokePublicURL}
 *
 * @param {?} file - File to revoke
 * @param {function=} optCb Optional callback, if not using promises.
 */
FilesFacet.prototype.revokePublicURL = function revokePublicURL(file, optCb) {
  var requiredArgs = {
    file: file
  };

  return this.makeAPICall('files.revokePublicURL', requiredArgs, null, optCb);
};


/**
 * Enables a file for public/external sharing.
 * @see {@link https://api.slack.com/methods/files.sharedPublicURL|files.sharedPublicURL}
 *
 * @param {?} file - File to share
 * @param {function=} optCb Optional callback, if not using promises.
 */
FilesFacet.prototype.sharedPublicURL = function sharedPublicURL(file, optCb) {
  var requiredArgs = {
    file: file
  };

  return this.makeAPICall('files.sharedPublicURL', requiredArgs, null, optCb);
};


/**
 * Uploads or creates a file.
 * @see {@link https://api.slack.com/methods/files.upload|files.upload}
 *
 * @param {?} filename - Filename of file.
 * @param {Object=} opts
 * @param {?} opts.file - File contents via `multipart/form-data`. If omitting this parameter, you
 *   must submit `content`.
 * @param {?} opts.content - File contents via a POST variable. If omitting this parameter, you
 *   must provide a `file`.
 * @param {?} opts.filetype - A [file type](/types/file#file_types) identifier.
 * @param {?} opts.title - Title of file.
 * @param {?} opts.initial_comment - Initial comment to add to file.
 * @param {?} opts.channels - Comma-separated list of channel names or IDs where the file will be
 *   shared.
 * @param {function=} optCb Optional callback, if not using promises.
 */
FilesFacet.prototype.upload = function upload(filename, opts, optCb) {
  var requiredArgs = {
    filename: filename
  };

  return this.makeAPICall('files.upload', requiredArgs, opts, optCb);
};


module.exports = FilesFacet;
