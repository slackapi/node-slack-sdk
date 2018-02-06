/**
 * API Facet to make calls to methods in the dialog namespace.
 *
 * This provides functions to call:
 *   - open: {@link https://api.slack.com/methods/dialog.open|dialog.open}
 *
 */

/**
 * @constructor
 */
function DialogFacet(makeAPICall) {
  this.name = 'dialog';
  this.makeAPICall = makeAPICall;
}


/**
 * Opens a dialog corresponding to the trigger.
 * @see {@link https://api.slack.com/methods/dialog.open|dialog.open}
 *
 * @param {?} dialog - The dialog definition, as a JSON-encoded string.
 * @param {?} triggerId - The trigger that this dialog opens in response to.
 * @param {function=} optCb Optional callback, if not using promises.
 */
DialogFacet.prototype.open = function open(dialog, triggerId, optCb) {
  var requiredArgs = {
    dialog: dialog,
    trigger_id: triggerId
  };

  return this.makeAPICall('dialog.open', requiredArgs, null, optCb);
};


module.exports = DialogFacet;
