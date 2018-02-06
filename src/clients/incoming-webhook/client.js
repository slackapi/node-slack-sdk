var requestsTransport = require('../transports/request').requestTransport;
var isString = require('lodash').isString;
var isObject = require('lodash').isObject;
var noop = require('lodash').noop;

/**
 *
 * @param {String} slackUrl
 * @param {object?} defaults
 * @param {string} defaults.username The default username to use when sending a webhook.
 *      If no username is specified, the one chosen when creating the webhook will be used.
 * @param {string} defaults.iconEmoji The default emoji to use when sending a webhook.
 *      If no iconEmoji is specified, the one chosen when creating the webhook will be used.
 * @param {string} defaults.channel The default channel to use when sending a webhook.
 *      If no channel is specified, the one chosen when creating the webhook will be used.
 * @param {string} defaults.text The default text to use when sending a webhook.
 * @param {string} defaults.linkNames The default setting for the link_names format option to use when sending a webhook.
 *      If no value is specified, the one chosen when creating the webhook will be used.
 * @constructor
 */
function IncomingWebhook(slackUrl, defaults) {
  var _defaults = defaults || {};

  if (!slackUrl) {
    throw new Error('Slack url is required');
  }

  this._slackUrl = slackUrl;
  this.defaults = {
    username: _defaults.username,
    iconEmoji: _defaults.iconEmoji,
    iconUrl: _defaults.iconUrl,
    channel: _defaults.channel,
    linkNames: _defaults.linkNames,
    text: _defaults.text
  };

  this._transport = _defaults._transport || requestsTransport;
}


/**
 * Sends a message via an incoming webhook
 * @param {String|Object} message The message to send. Can be text or an object that
 *     overrides the defaults in initialization.
 * @param {Function=} optCb
 */
IncomingWebhook.prototype.send = function send(message, cb) {
  var data = this._formatData(message);
  var _cb = cb || noop;

  this._transport({
    url: this._slackUrl,
    body: data
  }, _cb);
};


/**
 * Formats the data to be delivered to the transport
 * @private
 */
IncomingWebhook.prototype._formatData = function _formatData(message) {
  var data = {
    username: this.defaults.username,
    icon_emoji: this.defaults.iconEmoji,
    icon_url: this.defaults.iconUrl,
    channel: this.defaults.channel,
    link_names: this.defaults.linkNames,
    text: this.defaults.text
  };

  if (isString(message)) {
    data.text = message;
  } else if (isObject(message)) {
    if (message.text) data.text = message.text;
    if (message.username) data.username = message.username;
    if (message.iconEmoji) data.icon_emoji = message.iconEmoji;
    if (message.iconUrl) data.icon_url = message.iconUrl;
    if (message.channel) data.channel = message.channel;
    if (message.linkNames) data.link_names = message.linkNames;
    if (message.attachments) data.attachments = message.attachments;
    if (message.unfurl_links) data.unfurl_links = message.unfurl_links;
    if (message.unfurl_media) data.unfurl_media = message.unfurl_media;
  }

  return data;
};


module.exports = IncomingWebhook;
