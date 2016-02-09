/**
 * API client events.
 */

module.exports.WEB = {
  RATE_LIMITED: 'rate_limited',
};

module.exports.RTM = {
  CONNECTING: 'connecting',
  AUTHENTICATED: 'authenticated',
  DISCONNECT: 'disconnect',
  UNABLE_TO_RTM_START: 'unable_to_rtm_start',
  RTM_CONNECTION_OPENED: 'open',
  WS_OPENING: 'ws_opening',
  WS_OPENED: 'ws_opened',
  WS_CLOSE: 'ws_close',
  WS_ERROR: 'ws_error',
  ATTEMPTING_RECONNECT: 'attempting_reconnect',
  RAW_MESSAGE: 'raw_message',
};
