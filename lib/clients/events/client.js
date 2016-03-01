/**
 * API client events.
 */

module.exports.WEB = {
  RATE_LIMITED: 'rate_limited'
};

module.exports.RTM = {
  CONNECTING: 'connecting',                     // the rtm.start API call has been made, but the
                                                // response has not come back

  AUTHENTICATED: 'authenticated',               // rtm.start returned successfully with a websocket
                                                // URL to connect to

  WS_OPENING: 'ws_opening',                     // the underlying websocket connection is being
                                                // opened

  WS_OPENED: 'ws_opened',                       // the underlying websocket connection has opened
                                                // and messages can be received from the remote

  RTM_CONNECTION_OPENED: 'open',                // the remote server has acked the socket and sent a
                                                // `hello` message, the connection is now live and
                                                // can be used to send messages

  DISCONNECT: 'disconnect',                     // the RTM client has disconnected and will not try
                                                // to reconnect again automatically

  UNABLE_TO_RTM_START: 'unable_to_rtm_start',   // the rtm.start API call failed in some way, this
                                                // may be recoverable

  WS_CLOSE: 'ws_close',                         // the underlying websocket connection was closed. A
                                                // reconnect may be attempted after this

  WS_ERROR: 'ws_error',                         // the underlying websocket connection threw an
                                                // an error

  ATTEMPTING_RECONNECT: 'attempting_reconnect', // the client is attempting to initiate a reconnect

  RAW_MESSAGE: 'raw_message'                    // a message was received from the RTM API. This
                                                // will also contain the raw message payload that
                                                // was sent from Slack
};
