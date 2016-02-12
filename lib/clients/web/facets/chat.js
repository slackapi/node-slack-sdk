/**
 * API Facet to make calls to methods in the chat namespace.
 *
 * This provides functions to call:
 *   - delete: {@link https://api.slack.com/methods/chat.delete|chat.delete}
 *   - postMessage: {@link https://api.slack.com/methods/chat.postMessage|chat.postMessage}
 *   - update: {@link https://api.slack.com/methods/chat.update|chat.update}
 *
 */


function ChatFacet(makeAPICall) {
  this.name = 'chat';
  this.makeAPICall = makeAPICall;
}


/**
 * Deletes a message.
 * @see {@link https://api.slack.com/methods/chat.delete|chat.delete}
 *
 * @param {?} ts Timestamp of the message to be deleted.
 * @param {?} channel Channel containing the message to be deleted.
 * @param {function} optCb Optional callback, if not using promises.
 */
ChatFacet.prototype.delete = function delete_(ts, channel, optCb) {
  var args = {
    ts: ts,
    channel: channel,
  };

  return this.makeAPICall('chat.delete', args, optCb);
};

/**
 * Sends a message to a channel.
 * @see {@link https://api.slack.com/methods/chat.postMessage|chat.postMessage}
 *
 * @param {?} channel Channel, private group, or IM channel to send message to.
 *    Can be an encoded ID, or a name. See below for more details.
 * @param {?} text Text of the message to send. See below for an explanation of formatting.
 * @param {Object=} opts
 * @param {?} opts.username Name of bot.
 * @param {?} opts.as_user Pass true to post the message as the authed user, instead of as a bot
 * @param {?} opts.parse Change how messages are treated. See below.
 * @param {?} opts.link_names Find and link channel names and usernames.
 * @param {?} opts.attachments Structured message attachments.
 * @param {?} opts.unfurl_links Pass true to enable unfurling of primarily text-based content.
 * @param {?} opts.unfurl_media Pass false to disable unfurling of media content.
 * @param {?} opts.icon_url URL to an image to use as the icon for this message
 * @param {?} opts.icon_emoji emoji to use as the icon for this message. Overrides `icon_url`.
 * @param {function} optCb Optional callback, if not using promises.
 */
ChatFacet.prototype.postMessage = function postMessage(channel, text, opts, optCb) {
  var args = {
    channel: channel,
    text: text,
    opts: opts,
  };

  return this.makeAPICall('chat.postMessage', args, optCb);
};

/**
 * Updates a message.
 * @see {@link https://api.slack.com/methods/chat.update|chat.update}
 *
 * @param {?} ts Timestamp of the message to be updated.
 * @param {?} channel Channel containing the message to be updated.
 * @param {?} text New text for the message, using the [default formatting rules](/docs/formatting).
 * @param {Object=} opts
 * @param {?} opts.attachments Structured message attachments.
 * @param {?} opts.parse Change how messages are treated. See below.
 * @param {?} opts.link_names Find and link channel names and usernames.
 * @param {function} optCb Optional callback, if not using promises.
 */
ChatFacet.prototype.update = function update(ts, channel, text, opts, optCb) {
  var args = {
    ts: ts,
    channel: channel,
    text: text,
    opts: opts,
  };

  return this.makeAPICall('chat.update', args, optCb);
};


module.exports = ChatFacet;
