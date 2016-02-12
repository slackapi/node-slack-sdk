/**
 * API Facet to make calls to methods in the search namespace.
 *
 * This provides functions to call:
 *   - all: {@link https://api.slack.com/methods/search.all|search.all}
 *   - files: {@link https://api.slack.com/methods/search.files|search.files}
 *   - messages: {@link https://api.slack.com/methods/search.messages|search.messages}
 *
 */


function SearchFacet(makeAPICall) {
  this.name = 'search';
  this.makeAPICall = makeAPICall;
}


/**
 * Searches for messages and files matching a query.
 * @see {@link https://api.slack.com/methods/search.all|search.all}
 *
 * @param {?} query Search query. May contains booleans, etc.
 * @param {Object=} opts
 * @param {?} opts.sort Return matches sorted by either `score` or `timestamp`.
 * @param {?} opts.sort_dir Change sort direction to ascending (`asc`) or descending (`desc`).
 * @param {?} opts.highlight Pass a value of `1` to enable query highlight markers (see below).
 * @param {function} optCb Optional callback, if not using promises.
 */
SearchFacet.prototype.all = function all(query, opts, optCb) {
  var args = {
    query: query,
    opts: opts,
  };

  return this.makeAPICall('search.all', args, optCb);
};

/**
 * Searches for files matching a query.
 * @see {@link https://api.slack.com/methods/search.files|search.files}
 *
 * @param {?} query Search query. May contain booleans, etc.
 * @param {Object=} opts
 * @param {?} opts.sort Return matches sorted by either `score` or `timestamp`.
 * @param {?} opts.sort_dir Change sort direction to ascending (`asc`) or descending (`desc`).
 * @param {?} opts.highlight Pass a value of `1` to enable query highlight markers (see below).
 * @param {function} optCb Optional callback, if not using promises.
 */
SearchFacet.prototype.files = function files(query, opts, optCb) {
  var args = {
    query: query,
    opts: opts,
  };

  return this.makeAPICall('search.files', args, optCb);
};

/**
 * Searches for messages matching a query.
 * @see {@link https://api.slack.com/methods/search.messages|search.messages}
 *
 * @param {?} query Search query. May contains booleans, etc.
 * @param {Object=} opts
 * @param {?} opts.sort Return matches sorted by either `score` or `timestamp`.
 * @param {?} opts.sort_dir Change sort direction to ascending (`asc`) or descending (`desc`).
 * @param {?} opts.highlight Pass a value of `1` to enable query highlight markers (see below).
 * @param {function} optCb Optional callback, if not using promises.
 */
SearchFacet.prototype.messages = function messages(query, opts, optCb) {
  var args = {
    query: query,
    opts: opts,
  };

  return this.makeAPICall('search.messages', args, optCb);
};


module.exports = SearchFacet;
