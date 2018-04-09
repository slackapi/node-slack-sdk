/* global Promise */

/**
 * Returns a Promise that resolves or rejects in approximately the specified amount of time with
 * the specified value or error reason.
 * @param {number} ms time in milliseconds in which to resolve or reject
 * @param {*} value value used for resolve
 * @param {string} [rejectionReason] reason used for rejection
 * @returns {Promise<*>} a promise of the value type
 */
function delayed(ms, value, rejectionReason) {
  var error;
  if (rejectionReason) {
    error = new Error(rejectionReason);
  }
  return new Promise(function (resolve, reject) {
    var id = setTimeout(function () {
      clearTimeout(id);
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    }, ms);
  });
}

module.exports.delayed = delayed;
