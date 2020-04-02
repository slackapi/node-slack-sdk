"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adapter_1 = require("./adapter");
var http_handler_1 = require("./http-handler");
exports.verifyRequestSignature = http_handler_1.verifyRequestSignature;
exports.errorCodes = http_handler_1.errorCodes;
/**
 * Creates a new {@link SlackEventAdapter}.
 */
function createEventAdapter(signingSecret, options) {
    return new adapter_1.SlackEventAdapter(signingSecret, options);
}
exports.createEventAdapter = createEventAdapter;
//# sourceMappingURL=index.js.map