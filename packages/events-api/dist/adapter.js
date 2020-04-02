"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable import-name */
var events_1 = require("events");
var http = __importStar(require("http"));
var debug_1 = __importDefault(require("debug"));
var lodash_isstring_1 = __importDefault(require("lodash.isstring"));
var http_handler_1 = require("./http-handler");
var util_1 = require("./util");
/* tslint:enable import-name */
var debug = debug_1.default('@slack/events-api:adapter');
/**
 * An adapter for Slack's Events API.
 */
var SlackEventAdapter = /** @class */ (function (_super) {
    __extends(SlackEventAdapter, _super);
    /**
     * @param signingSecret - The token used to authenticate signed requests from Slack's Events API.
     * @param opts.includeBody - Whether to include the API event bodies in adapter event listeners.
     * @param opts.includeHeaders - Whether to include request headers in adapter event listeners.
     * @param opts.waitForResponse - When `true` prevents the adapter from responding by itself and leaves that up to
     *   listeners.
     */
    function SlackEventAdapter(signingSecret, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.includeBody, includeBody = _c === void 0 ? false : _c, _d = _b.includeHeaders, includeHeaders = _d === void 0 ? false : _d, _e = _b.waitForResponse, waitForResponse = _e === void 0 ? false : _e;
        var _this = this;
        if (!lodash_isstring_1.default(signingSecret)) {
            throw new TypeError('SlackEventAdapter needs a signing secret');
        }
        _this = _super.call(this) || this;
        _this.signingSecret = signingSecret;
        _this.includeBody = includeBody;
        _this.includeHeaders = includeHeaders;
        _this.waitForResponse = waitForResponse;
        debug('adapter instantiated - options: %o', {
            includeBody: includeBody,
            includeHeaders: includeHeaders,
            waitForResponse: waitForResponse,
        });
        return _this;
    }
    /**
     * Creates an HTTP server to listen for event payloads.
     */
    SlackEventAdapter.prototype.createServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // TODO: options (like https)
                return [2 /*return*/, http.createServer(this.requestListener())];
            });
        });
    };
    /**
     * Starts a server on the specified port.
     *
     * @param port - The port number to listen on.
     * @returns The {@link http.Server | server}.
     */
    SlackEventAdapter.prototype.start = function (port) {
        var _this = this;
        return this.createServer()
            .then(function (server) { return new Promise(function (resolve, reject) {
            _this.server = server;
            server.on('error', reject);
            server.listen(port, function () { return resolve(server); });
            debug('server started - port: %s', port);
        }); });
    };
    /**
     * Stops the server started by {@link start}.
     */
    SlackEventAdapter.prototype.stop = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!util_1.isFalsy(_this.server)) {
                _this.server.close(function (error) {
                    delete _this.server;
                    if (!util_1.isFalsy(error)) {
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                });
            }
            else {
                reject(new Error('SlackEventAdapter cannot stop when it did not start a server'));
            }
        });
    };
    /**
     * Returns a middleware-compatible adapter.
     */
    SlackEventAdapter.prototype.expressMiddleware = function () {
        var requestListener = this.requestListener();
        return function (req, res, _next) {
            requestListener(req, res);
        };
    };
    /**
     * Creates a request listener.
     */
    SlackEventAdapter.prototype.requestListener = function () {
        return http_handler_1.createHTTPHandler(this);
    };
    return SlackEventAdapter;
}(events_1.EventEmitter));
exports.SlackEventAdapter = SlackEventAdapter;
/**
 * @alias module:adapter
 */
exports.default = SlackEventAdapter;
//# sourceMappingURL=adapter.js.map