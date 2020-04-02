#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var index_1 = require("./index");
var argv = yargs_1.default
    .options({
    secret: {
        alias: 's',
        describe: 'Slack request signing secret from the App management page',
        demand: true,
        type: 'string',
    },
    path: {
        alias: 'p',
        describe: 'The path (part of URL after hostname and port) that resolves to your Request URL in the App ' +
            'management page',
        default: '/slack/events',
        type: 'string',
    },
    port: {
        alias: 'l',
        describe: 'The local port for the HTTP server. The development proxy should be configured to forward to this ' +
            'port.',
        default: 3000,
        type: 'number',
    },
})
    .help()
    .argv;
var slackEvents = index_1.createEventAdapter(argv.secret);
slackEvents
    .createServer()
    .then(function (server) { return new Promise(function (resolve, reject) {
    server.on('error', reject);
    server.listen(argv.port, function () {
        var _a = server.address(), address = _a.address, port = _a.port;
        console.log("The verification server is now listening at the URL: http://" + address + ":" + port + argv.path);
        resolve();
    });
}); })
    .catch(function (error) {
    console.error("The verification server failed to start. error: " + error.message);
});
//# sourceMappingURL=verify.js.map