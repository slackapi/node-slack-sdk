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
  OPENED_RTM_CONNECTION: 'open',
  OPENING_WEBSOCKET: 'opening_ws',
  OPENED_WEBSOCKET: 'opened_ws',
  WS_CLOSE: 'ws_close',
  WS_ERROR: 'ws_error',
  ATTEMPTING_RECONNECT: 'attempting_reconnect',
  RAW_MESSAGE: 'raw_message',
};
