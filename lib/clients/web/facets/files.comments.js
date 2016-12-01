/**
 * API Facet to make calls to methods in the files.comments namespace.
 *
 * This provides functions to call:
 *   - add: {@link https://api.slack.com/methods/files.comments.add|files.comments.add}
 *   - delete: {@link https://api.slack.com/methods/files.comments.delete|files.comments.delete}
 *   - edit: {@link https://api.slack.com/methods/files.comments.edit|files.comments.edit}
 *
 */


function FilesCommentsFacet(makeAPICall) {
  this.name = 'files.comments';
  this.makeAPICall = makeAPICall;
}


/**
 * Add a comment to an existing file.
 * @see {@link https://api.slack.com/methods/files.comments.add|files.comments.add}
 *
 * @param {?} file - File to add a comment to.
 * @param {?} comment - Text of the comment to add.
 * @param {Object=} opts
 * @param {?} opts.channel - Channel id (encoded) of which location to associate with the new
 *   comment.
 * @param {function=} optCb Optional callback, if not using promises.
 */
FilesCommentsFacet.prototype.add = function add(file, comment, opts, optCb) {
  var requiredArgs = {
    file: file,
    comment: comment
  };

  return this.makeAPICall('files.comments.add', requiredArgs, opts, optCb);
};


/**
 * Deletes an existing comment on a file.
 * @see {@link https://api.slack.com/methods/files.comments.delete|files.comments.delete}
 *
 * @param {?} file - File to delete a comment from.
 * @param {?} id - The comment to delete.
 * @param {function=} optCb Optional callback, if not using promises.
 */
FilesCommentsFacet.prototype.delete = function delete_(file, id, optCb) {
  var requiredArgs = {
    file: file,
    id: id
  };

  return this.makeAPICall('files.comments.delete', requiredArgs, null, optCb);
};


/**
 * Edit an existing file comment.
 * @see {@link https://api.slack.com/methods/files.comments.edit|files.comments.edit}
 *
 * @param {?} file - File containing the comment to edit.
 * @param {?} id - The comment to edit.
 * @param {?} comment - Text of the comment to edit.
 * @param {function=} optCb Optional callback, if not using promises.
 */
FilesCommentsFacet.prototype.edit = function edit(file, id, comment, optCb) {
  var requiredArgs = {
    file: file,
    id: id,
    comment: comment
  };

  return this.makeAPICall('files.comments.edit', requiredArgs, null, optCb);
};


module.exports = FilesCommentsFacet;
