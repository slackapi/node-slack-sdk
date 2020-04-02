"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:import-name */
var debug_1 = __importDefault(require("debug"));
var raw_body_1 = __importDefault(require("raw-body"));
var crypto_1 = __importDefault(require("crypto"));
var tsscmp_1 = __importDefault(require("tsscmp"));
var util_1 = require("./util");
/* tslint:enable:import-name */
var debug = debug_1.default('@slack/events-api:http-handler');
/**
 * Verifies the signature of a request.
 *
 * @remarks
 * See [Verifying requests from Slack](https://api.slack.com/docs/verifying-requests-from-slack#sdk_support) for more
 * information.
 *
 * @param params - See {@link VerifyRequestSignatureParams}.
 * @returns `true` when the signature is valid.
 * @throws {CodedError} - Signature is invalid.
 */
function verifyRequestSignature(_a) {
    var signingSecret = _a.signingSecret, requestSignature = _a.requestSignature, requestTimestamp = _a.requestTimestamp, body = _a.body;
    // convert the current time to seconds (to match the API's `ts` format), then subtract 5 minutes' worth of seconds.
    var fiveMinutesAgo = Math.floor(Date.now() / 1000) - (60 * 5);
    if (requestTimestamp < fiveMinutesAgo) {
        debug('request is older than 5 minutes');
        throw errorWithCode(new Error('Slack request signing verification outdated'), ErrorCode.RequestTimeFailure);
    }
    var hmac = crypto_1.default.createHmac('sha256', signingSecret);
    var _b = requestSignature.split('='), version = _b[0], hash = _b[1];
    hmac.update(version + ":" + requestTimestamp + ":" + body);
    if (!tsscmp_1.default(hash, hmac.digest('hex'))) {
        debug('request signature is not valid');
        throw errorWithCode(new Error('Slack request signing verification failed'), ErrorCode.SignatureVerificationFailure);
    }
    debug('request signing verification success');
    return true;
}
exports.verifyRequestSignature = verifyRequestSignature;
function createHTTPHandler(adapter) {
    var poweredBy = util_1.packageIdentifier();
    /**
     * Binds a response handler to the given response.
     *
     * @param res - The response object.
     * @returns The responder funciton bound to the input response.
     */
    function sendResponse(res) {
        // This function is the completion handler for sending a response to an event. It can either
        // be invoked by automatically or by the user (when using the `waitForResponse` option).
        return function (err, responseOptions) {
            debug('sending response - error: %s, responseOptions: %o', err, responseOptions);
            // Deal with errors up front
            if (!util_1.isFalsy(err)) {
                if ('status' in err && typeof err.status === 'number') {
                    res.statusCode = err.status;
                }
                else if (err.code === ErrorCode.SignatureVerificationFailure ||
                    err.code === ErrorCode.RequestTimeFailure) {
                    res.statusCode = ResponseStatus.NotFound;
                }
                else {
                    res.statusCode = ResponseStatus.Failure;
                }
            }
            else {
                // First determine the response status
                if (!util_1.isFalsy(responseOptions)) {
                    if (responseOptions.failWithNoRetry) {
                        res.statusCode = ResponseStatus.Failure;
                    }
                    else if (responseOptions.redirectLocation) {
                        res.statusCode = ResponseStatus.Redirect;
                    }
                    else {
                        // URL Verification
                        res.statusCode = ResponseStatus.Ok;
                    }
                }
                else {
                    res.statusCode = ResponseStatus.Ok;
                }
                // Next determine the response headers
                if (!util_1.isFalsy(responseOptions) && responseOptions.failWithNoRetry) {
                    res.setHeader('X-Slack-No-Retry', '1');
                }
                res.setHeader('X-Slack-Powered-By', poweredBy);
            }
            // Lastly, send the response
            if (!util_1.isFalsy(responseOptions) && responseOptions.content) {
                res.end(responseOptions.content);
            }
            else {
                res.end();
            }
        };
    }
    /**
     * Handles making responses for errors.
     *
     * @param error - The error that occurred.
     * @param respond - The {@link ResponseHandler | response handler}.
     */
    function handleError(error, respond) {
        debug('handling error - message: %s, code: %s', error.message, error.code);
        try {
            if (adapter.waitForResponse) {
                adapter.emit('error', error, respond);
            }
            else if (process.env.NODE_ENV === 'development') {
                adapter.emit('error', error);
                // tslint:disable-next-line: no-object-literal-type-assertion
                respond({ status: ResponseStatus.Failure }, { content: error.message });
            }
            else {
                adapter.emit('error', error);
                respond(error);
            }
        }
        catch (userError) {
            process.nextTick(function () { throw userError; });
        }
    }
    /**
     * Request listener used to handle Slack requests and send responses and
     * verify request signatures
     *
     * @param req - The incoming request.
     * @param res - The outgoing response.
     */
    return function (req, res) {
        debug('request recieved - method: %s, path: %s', req.method, req.url);
        // Bind a response function to this request's respond object.
        var respond = sendResponse(res);
        // If parser is being used and we don't receive the raw payload via `rawBody`,
        // we can't verify request signature
        if (!util_1.isFalsy(req.body) && util_1.isFalsy(req.rawBody)) {
            handleError(errorWithCode(new Error('Parsing request body prohibits request signature verification'), ErrorCode.BodyParserNotPermitted), respond);
            return;
        }
        // Some serverless cloud providers (e.g. Google Firebase Cloud Functions) might populate
        // the request with a bodyparser before it can be populated by the SDK.
        // To prevent throwing an error here, we check the `rawBody` field before parsing the request
        // through the `raw-body` module (see Issue #85 - https://github.com/slackapi/node-slack-events-api/issues/85)
        var parseRawBody;
        if (!util_1.isFalsy(req.rawBody)) {
            debug('Parsing request with a rawBody attribute');
            parseRawBody = Promise.resolve(req.rawBody);
        }
        else {
            debug('Parsing raw request');
            parseRawBody = raw_body_1.default(req);
        }
        parseRawBody
            .then(function (bodyBuf) {
            var rawBody = bodyBuf.toString();
            if (verifyRequestSignature({
                signingSecret: adapter.signingSecret,
                requestSignature: req.headers['x-slack-signature'],
                requestTimestamp: parseInt(req.headers['x-slack-request-timestamp'], 10),
                body: rawBody,
            })) {
                // Request signature is verified
                // Parse raw body
                var body = JSON.parse(rawBody);
                // Handle URL verification challenge
                if (body.type === 'url_verification') {
                    debug('handling url verification');
                    respond(undefined, { content: body.challenge });
                    return;
                }
                var emitArguments = [body.event];
                if (adapter.includeBody) {
                    emitArguments.push(body);
                }
                if (adapter.includeHeaders) {
                    emitArguments.push(req.headers);
                }
                if (adapter.waitForResponse) {
                    emitArguments.push(respond);
                }
                else {
                    respond();
                }
                debug('emitting event -  type: %s, arguments: %o', body.event.type, emitArguments);
                adapter.emit.apply(adapter, __spreadArrays([body.event.type], emitArguments));
            }
        }).catch(function (error) {
            handleError(error, respond);
        });
    };
}
exports.createHTTPHandler = createHTTPHandler;
/** Some HTTP response statuses. */
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["Ok"] = 200] = "Ok";
    ResponseStatus[ResponseStatus["Redirect"] = 302] = "Redirect";
    ResponseStatus[ResponseStatus["NotFound"] = 404] = "NotFound";
    ResponseStatus[ResponseStatus["Failure"] = 500] = "Failure";
})(ResponseStatus || (ResponseStatus = {}));
/**
 * A dictionary of codes for errors produced by this package.
 */
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["SignatureVerificationFailure"] = "SLACKHTTPHANDLER_REQUEST_SIGNATURE_VERIFICATION_FAILURE";
    ErrorCode["RequestTimeFailure"] = "SLACKHTTPHANDLER_REQUEST_TIMELIMIT_FAILURE";
    ErrorCode["BodyParserNotPermitted"] = "SLACKADAPTER_BODY_PARSER_NOT_PERMITTED_FAILURE";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
/**
 * Factory for producing a {@link CodedError} from a generic error.
 */
function errorWithCode(error, code) {
    var codedError = error;
    codedError.code = code;
    return codedError;
}
// legacy export
exports.errorCodes = {
    SIGNATURE_VERIFICATION_FAILURE: ErrorCode.SignatureVerificationFailure,
    REQUEST_TIME_FAILURE: ErrorCode.RequestTimeFailure,
    BODY_PARSER_NOT_PERMITTED: ErrorCode.BodyParserNotPermitted,
};
//# sourceMappingURL=http-handler.js.map