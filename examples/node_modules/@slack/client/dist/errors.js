"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A dictionary of codes for errors produced by this package
 */
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["TestError"] = "slackclient_test";
    // WebClient
    ErrorCode["RequestError"] = "slackclient_request_error";
    ErrorCode["ReadError"] = "slackclient_read_error";
    ErrorCode["HTTPError"] = "slackclient_http_error";
    ErrorCode["PlatformError"] = "slackclient_platform_error";
    // RTMClient
    ErrorCode["RTMSendWhileDisconnectedError"] = "slackclient_rtmclient_send_while_disconnected_error";
    ErrorCode["RTMSendWhileNotReadyError"] = "slackclient_rtmclient_send_while_not_ready_error";
    ErrorCode["RTMSendMessagePlatformError"] = "slackclient_rtmclient_send_message_platform_error";
    ErrorCode["RTMWebsocketError"] = "slackclient_rtmclient_websocket_error";
    ErrorCode["RTMNoReplyReceivedError"] = "slackclient_rtmclient_no_reply_received_error";
    // KeepAlive
    ErrorCode["KeepAliveConfigError"] = "slackclient_keepalive_config_error";
    ErrorCode["KeepAliveClientNotConnected"] = "slackclient_keepalive_client_not_connected";
    ErrorCode["KeepAliveInconsistentState"] = "slackclient_keepalive_inconsistent_state";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
/**
 * Factory for producing a {@link CodedError} from a generic error
 *
 * @param error
 * @param code
 */
function errorWithCode(error, code) {
    const codedError = error;
    codedError.code = code;
    return codedError;
}
exports.errorWithCode = errorWithCode;
//# sourceMappingURL=errors.js.map