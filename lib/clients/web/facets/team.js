/**
 * API Facet to make calls to methods in the team namespace.
 *
 * This provides functions to call:
 *   - accessLogs: {@link https://api.slack.com/methods/team.accessLogs|team.accessLogs}
 *   - info: {@link https://api.slack.com/methods/team.info|team.info}
 *
 */


function TeamFacet(makeAPICall) {
  this.name = 'team';
  this.makeAPICall = makeAPICall;
}


/**
 * Gets the access logs for the current team.
 * @see {@link https://api.slack.com/methods/team.accessLogs|team.accessLogs}
 *
 * @param {function} optCb Optional callback, if not using promises.
 */
TeamFacet.prototype.accessLogs = function accessLogs(optCb) {
  var args = {};

  return this.makeAPICall('team.accessLogs', args, optCb);
};

/**
 * Gets information about the current team.
 * @see {@link https://api.slack.com/methods/team.info|team.info}
 *
 * @param {function} optCb Optional callback, if not using promises.
 */
TeamFacet.prototype.info = function info(optCb) {
  var args = {};

  return this.makeAPICall('team.info', args, optCb);
};


module.exports = TeamFacet;
