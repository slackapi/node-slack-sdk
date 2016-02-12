/**
 * API Facet to make calls to methods in the files namespace.
 *
 * This provides functions to call:
 *   - delete: {@link https://api.slack.com/methods/files.delete|files.delete}
 *   - info: {@link https://api.slack.com/methods/files.info|files.info}
 *   - list: {@link https://api.slack.com/methods/files.list|files.list}
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
 * @param {?} file ID of file to delete.
 * @param {function} optCb Optional callback, if not using promises.
 */
FilesFacet.prototype.delete = function delete_(file, optCb) {
  var args = {
    file: file,
  };

  return this.makeAPICall('files.delete', args, optCb);
};

/**
 * Gets information about a team file.
 * @see {@link https://api.slack.com/methods/files.info|files.info}
 *
 * @param {?} file File to fetch info for
 * @param {function} optCb Optional callback, if not using promises.
 */
FilesFacet.prototype.info = function info(file, optCb) {
  var args = {
    file: file,
  };

  return this.makeAPICall('files.info', args, optCb);
};

/**
 * Lists & filters team files.
 * @see {@link https://api.slack.com/methods/files.list|files.list}
 *
 * @param {Object=} opts
 * @param {?} opts.user Filter files created by a single user.
 * @param {?} opts.ts_from Filter files created after this timestamp (inclusive).
 * @param {?} opts.ts_to Filter files created before this timestamp (inclusive).
 * @param {?} opts.types Filter files by type:
   - `all` - All files
   - `posts` - Posts
   - `snippets` - Snippets
   - `images` - Image files
   - `gdocs` - Google docs
   - `zips` - Zip files
   - `pdfs` - PDF files

 * You can pass multiple values in the types argument, like `types=posts,snippets`.
 * The default value is `all`, which does not filter the list.
 *
 * @param {function} optCb Optional callback, if not using promises.
 */
FilesFacet.prototype.list = function list(opts, optCb) {
  var args = {
    opts: opts,
  };

  return this.makeAPICall('files.list', args, optCb);
};

/**
 * Uploads or creates a file.
 * @see {@link https://api.slack.com/methods/files.upload|files.upload}
 *
 * @param {Object=} opts
 * @param {?} opts.file File contents via `multipart/form-data`.
 * @param {?} opts.content File contents via a POST var.
 * @param {?} opts.filetype Slack-internal file type identifier.
 * @param {?} opts.filename Filename of file.
 * @param {?} opts.title Title of file.
 * @param {?} opts.initial_comment Initial comment to add to file.
 * @param {?} opts.channels Comma separated list of channels to share the file into.
 * @param {function} optCb Optional callback, if not using promises.
 */
FilesFacet.prototype.upload = function upload(opts, optCb) {
  var args = {
    opts: opts,
  };

  return this.makeAPICall('files.upload', args, optCb);
};


module.exports = FilesFacet;
