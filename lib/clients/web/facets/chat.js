/**
 * API Facet to make calls to methods in the chat namespace.
 *
 * This provides functions to call:
 *   - delete: {@link https://api.slack.com/methods/chat.delete|chat.delete}
 *   - meMessage: {@link https://api.slack.com/methods/chat.meMessage|chat.meMessage}
 *   - postEphemeral: {@link https://api.slack.com/methods/chat.postEphemeral|chat.postEphemeral}
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
 * @param {?} ts - Timestamp of the message to be deleted.
 * @param {?} channel - Channel containing the message to be deleted.
 * @param {Object=} opts
 * @param {?} opts.as_user - Pass true to delete the message as the authed user. [Bot
 *   users](/bot-users) in this context are considered authed users.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChatFacet.prototype.delete = function delete_(ts, channel, opts, optCb) {
  var requiredArgs = {
    ts: ts,
    channel: channel
  };

  return this.makeAPICall('chat.delete', requiredArgs, opts, optCb);
};


/**
 * Share a me message into a channel.
 * @see {@link https://api.slack.com/methods/chat.meMessage|chat.meMessage}
 *
 * @param {?} channel - Channel to send message to. Can be a public channel, private group or IM
 *   channel. Can be an encoded ID, or a name.
 * @param {?} text - Text of the message to send.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChatFacet.prototype.meMessage = function meMessage(channel, text, optCb) {
  var requiredArgs = {
    channel: channel,
    text: text
  };

  return this.makeAPICall('chat.meMessage', requiredArgs, null, optCb);
};


/**
 * Sends an ephemeral message to a user in a channel.
 * @see {@link https://api.slack.com/methods/chat.postEphemeral|chat.postEphemeral}
 *
 * @param {?} channel - Channel, private group, or IM channel to send message to. Can be an
 *   encoded ID, or a name. See [below](#channels) for more details.
 * @param {?} text - Text of the message to send. See below for an explanation of
 *   [formatting](#formatting). This field is usually required, unless you're providing only
 *   `attachments` instead.
* @param {?} user - `id` of the user who will receive the ephemeral message.
 *   The user should be in the channel specified by the `channel` argument.
 * @param {Object=} opts
 * @param {?} opts.parse - Change how messages are treated. Defaults to `none`. See
 *   [below](#formatting).
 * @param {?} opts.link_names - Find and link channel names and usernames.
 * @param {?} opts.attachments - Structured message attachments.
 * @param {?} opts.as_user - Pass true to post the message as the authed user, instead of as a
 *   bot. Defaults to false. See [authorship](#authorship) below.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChatFacet.prototype.postEphemeral = function postEphemeral(channel, text, user, opts, optCb) {
  var requiredArgs = {
    channel: channel,
    text: text,
    user: user
  };

  return this.makeAPICall('chat.postEphemeral', requiredArgs, opts, optCb);
};

/**
 * Sends a message to a channel.
 * @see {@link https://api.slack.com/methods/chat.postMessage|chat.postMessage}
 *
 * @param {?} channel - Channel, private group, or IM channel to send message to. Can be an
 *   encoded ID, or a name. See [below](#channels) for more details.
 * @param {?} text - Text of the message to send. See below for an explanation of
 *   [formatting](#formatting). This field is usually required, unless you're providing only
 *   `attachments` instead.
 * @param {Object=} opts
 * @param {?} opts.parse - Change how messages are treated. Defaults to `none`. See
 *   [below](#formatting).
 * @param {?} opts.link_names - Find and link channel names and usernames.
 * @param {?} opts.attachments - Structured message attachments.
 * @param {?} opts.unfurl_links - Pass true to enable unfurling of primarily text-based content.
 * @param {?} opts.unfurl_media - Pass false to disable unfurling of media content.
 * @param {?} opts.username - Set your bot's user name. Must be used in conjunction with `as_user`
 *   set to false, otherwise ignored. See [authorship](#authorship) below.
 * @param {?} opts.as_user - Pass true to post the message as the authed user, instead of as a
 *   bot. Defaults to false. See [authorship](#authorship) below.
 * @param {?} opts.icon_url - URL to an image to use as the icon for this message. Must be used in
 *   conjunction with `as_user` set to false, otherwise ignored. See [authorship](#authorship)
 *   below.
 * @param {?} opts.icon_emoji - emoji to use as the icon for this message. Overrides `icon_url`.
 *   Must be used in conjunction with `as_user` set to false, otherwise ignored. See
 *   [authorship](#authorship) below.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChatFacet.prototype.postMessage = function postMessage(channel, text, opts, optCb) {
  var requiredArgs = {
    channel: channel,
    text: text
  };

  return this.makeAPICall('chat.postMessage', requiredArgs, opts, optCb);
};


/**
 * Updates a message.
 * @see {@link https://api.slack.com/methods/chat.update|chat.update}
 *
 * @param {?} ts - Timestamp of the message to be updated.
 * @param {?} channel - Channel containing the message to be updated.
 * @param {?} text - New text for the message, using the [default formatting
 *   rules](/docs/formatting).
 * @param {Object=} opts
 * @param {?} opts.attachments - Structured message attachments.
 * @param {?} opts.parse - Change how messages are treated. Defaults to `client`, unlike
 *   `chat.postMessage`. See [below](#formatting).
 * @param {?} opts.link_names - Find and link channel names and usernames. Defaults to `none`.
 *   This parameter should be used in conjunction with `parse`. To set `link_names` to `1`, specify
 *   a `parse` mode of `full`.
 * @param {?} opts.as_user - Pass true to update the message as the authed user. [Bot
 *   users](/bot-users) in this context are considered authed users.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChatFacet.prototype.update = function update(ts, channel, text, opts, optCb) {
  var requiredArgs = {
    ts: ts,
    channel: channel,
    text: text
  };

  return this.makeAPICall('chat.update', requiredArgs, opts, optCb);
};

/**
 * Unfurl a URL within a message by defining its message attachment.
 * @see {@link https://api.slack.com/methods/chat.unfurl|chat.unfurl}
 *
 * @param {?} ts - Timestamp of the message to be updated.
 * @param {?} channel - Channel of the message to be updated.
 * @param {string} unfurls - a map of URLs to structured message attachments
 * @param {Object=} opts
 * @param {?} opts.user_auth_required - Pass true to require user authorization.
 * @param {function=} optCb Optional callback, if not using promises.
 */
ChatFacet.prototype.unfurl = function unfurl(ts, channel, unfurls, opts, optCb) {
  var requiredArgs = {
    ts: ts,
    channel: channel,
    unfurls: unfurls
  };

  return this.makeAPICall('chat.unfurl', requiredArgs, opts, optCb);
};

module.exports = ChatFacet;
