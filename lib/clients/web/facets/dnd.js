/**
 * API Facet to make calls to methods in the dnd namespace.
 *
 * This provides functions to call:
 *   - endDnd: {@link https://api.slack.com/methods/dnd.endDnd|dnd.endDnd}
 *   - endSnooze: {@link https://api.slack.com/methods/dnd.endSnooze|dnd.endSnooze}
 *   - info: {@link https://api.slack.com/methods/dnd.info|dnd.info}
 *   - setSnooze: {@link https://api.slack.com/methods/dnd.setSnooze|dnd.setSnooze}
 *   - teamInfo: {@link https://api.slack.com/methods/dnd.teamInfo|dnd.teamInfo}
 *
 */


function DndFacet(makeAPICall) {
  this.name = 'dnd';
  this.makeAPICall = makeAPICall;
}


/**
 * Ends the current user's Do Not Disturb session immediately.
 * @see {@link https://api.slack.com/methods/dnd.endDnd|dnd.endDnd}
 *
 * @param {function=} optCb Optional callback, if not using promises.
 */
DndFacet.prototype.endDnd = function endDnd(optCb) {
  return this.makeAPICall('dnd.endDnd', null, null, optCb);
};


/**
 * Ends the current user's snooze mode immediately.
 * @see {@link https://api.slack.com/methods/dnd.endSnooze|dnd.endSnooze}
 *
 * @param {function=} optCb Optional callback, if not using promises.
 */
DndFacet.prototype.endSnooze = function endSnooze(optCb) {
  return this.makeAPICall('dnd.endSnooze', null, null, optCb);
};


/**
 * Retrieves a user's current Do Not Disturb status.
 * @see {@link https://api.slack.com/methods/dnd.info|dnd.info}
 *
 * @param {Object=} opts
 * @param {?} opts.user - User to fetch status for (defaults to current user)
 * @param {function=} optCb Optional callback, if not using promises.
 */
DndFacet.prototype.info = function info(opts, optCb) {
  return this.makeAPICall('dnd.info', null, opts, optCb);
};


/**
 * Turns on Do Not Disturb mode for the current user, or changes its duration.
 * @see {@link https://api.slack.com/methods/dnd.setSnooze|dnd.setSnooze}
 *
 * @param {?} num_minutes - Number of minutes, from now, to snooze until.
 * @param {function=} optCb Optional callback, if not using promises.
 */
DndFacet.prototype.setSnooze = function setSnooze(numMinutes, optCb) {
  var requiredArgs = {
    num_minutes: numMinutes
  };

  return this.makeAPICall('dnd.setSnooze', requiredArgs, null, optCb);
};


/**
 * Retrieves the Do Not Disturb status for users on a team.
 * @see {@link https://api.slack.com/methods/dnd.teamInfo|dnd.teamInfo}
 *
 * @param {Object=} opts
 * @param {?} opts.users - Comma-separated list of users to fetch Do Not Disturb status for
 * @param {function=} optCb Optional callback, if not using promises.
 */
DndFacet.prototype.teamInfo = function teamInfo(opts, optCb) {
  return this.makeAPICall('dnd.teamInfo', null, opts, optCb);
};


module.exports = DndFacet;
