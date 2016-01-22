/**
 * API client events.
 */

module.exports.WEB = {
  RATE_LIMITED: 'rate_limited',
};

module.exports.RTM = {
  CONNECTING: 'connecting',
  AUTHENTICATED: 'authenticated',
  FAILED_AUTHENTICATION: 'failed_auth',
  RTM_CONNECTION_OPENED: 'open',
  WS_OPENING: 'ws_opening',
  WS_OPENED: 'ws_opened',
  WS_CLOSE: 'ws_close',
  WS_ERROR: 'ws_error',
  ATTEMPTING_RECONNECT: 'attempting_reconnect',
  RAW_MESSAGE: 'raw_message',
};
