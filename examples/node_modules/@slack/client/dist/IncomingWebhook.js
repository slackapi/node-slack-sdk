"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const got = require("got"); // tslint:disable-line:no-require-imports
const util_1 = require("./util");
/**
 * A client for Slack's Incoming Webhooks
 */
class IncomingWebhook {
    constructor(url, defaults = {}) {
        if (url === undefined) {
            throw new Error('Incoming webhook URL is required');
        }
        this.url = url;
        this.defaults = defaults;
    }
    /**
     * Send a notification to a conversation
     * @param message the message (a simple string, or an object describing the message)
     * @param callback
     */
    send(message, callback) {
        // NOTE: no support for proxy
        // NOTE: no support for TLS config
        let payload = this.defaults;
        if (typeof message === 'string') {
            payload.text = message;
        }
        else {
            payload = Object.assign(payload, message);
        }
        const implementation = () => got.post(this.url, {
            body: JSON.stringify(payload),
            retries: 0,
        }).then(() => {
            return;
        });
        util_1.callbackify(implementation)(callback);
    }
}
exports.IncomingWebhook = IncomingWebhook;
//# sourceMappingURL=IncomingWebhook.js.map