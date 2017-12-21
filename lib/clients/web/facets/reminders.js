/**
 * API Facet to make calls to methods in the reminders namespace.
 *
 * This provides functions to call:
 *   - add: {@link https://api.slack.com/methods/reminders.add|reminders.add}
 *   - complete: {@link https://api.slack.com/methods/reminders.complete|reminders.complete}
 *   - delete: {@link https://api.slack.com/methods/reminders.delete|reminders.delete}
 *   - info: {@link https://api.slack.com/methods/reminders.info|reminders.info}
 *   - list: {@link https://api.slack.com/methods/reminders.list|reminders.list}
 *
 */

/**
 * @constructor
 */
function RemindersFacet(makeAPICall) {
  this.name = 'reminders';
  this.makeAPICall = makeAPICall;
}


/**
 * Creates a reminder.
 * @see {@link https://api.slack.com/methods/reminders.add|reminders.add}
 *
 * @param {?} text - The content of the reminder
 * @param {?} time - When this reminder should happen: the Unix timestamp (up to five years from
 *   now), the number of seconds until the reminder (if within 24 hours), or a natural language
 *   description (Ex. "in 15 minutes," or "every Thursday")
 * @param {Object=} opts
 * @param {?} opts.user - The user who will receive the reminder. If no user is specified, the
 *   reminder will go to user who created it.
 * @param {function=} optCb Optional callback, if not using promises.
 */
RemindersFacet.prototype.add = function add(text, time, opts, optCb) {
  var requiredArgs = {
    text: text,
    time: time
  };

  return this.makeAPICall('reminders.add', requiredArgs, opts, optCb);
};


/**
 * Marks a reminder as complete.
 * @see {@link https://api.slack.com/methods/reminders.complete|reminders.complete}
 *
 * @param {?} reminder - The ID of the reminder to be marked as complete
 * @param {function=} optCb Optional callback, if not using promises.
 */
RemindersFacet.prototype.complete = function complete(reminder, optCb) {
  var requiredArgs = {
    reminder: reminder
  };

  return this.makeAPICall('reminders.complete', requiredArgs, null, optCb);
};


/**
 * Deletes a reminder.
 * @see {@link https://api.slack.com/methods/reminders.delete|reminders.delete}
 *
 * @param {?} reminder - The ID of the reminder
 * @param {function=} optCb Optional callback, if not using promises.
 */
RemindersFacet.prototype.delete = function delete_(reminder, optCb) {
  var requiredArgs = {
    reminder: reminder
  };

  return this.makeAPICall('reminders.delete', requiredArgs, null, optCb);
};


/**
 * Gets information about a reminder.
 * @see {@link https://api.slack.com/methods/reminders.info|reminders.info}
 *
 * @param {?} reminder - The ID of the reminder
 * @param {function=} optCb Optional callback, if not using promises.
 */
RemindersFacet.prototype.info = function info(reminder, optCb) {
  var requiredArgs = {
    reminder: reminder
  };

  return this.makeAPICall('reminders.info', requiredArgs, null, optCb);
};


/**
 * Lists all reminders created by or for a given user.
 * @see {@link https://api.slack.com/methods/reminders.list|reminders.list}
 *
 * @param {function=} optCb Optional callback, if not using promises.
 */
RemindersFacet.prototype.list = function list(optCb) {
  return this.makeAPICall('reminders.list', null, null, optCb);
};


module.exports = RemindersFacet;
