/// <reference types="node" />
import SlackEventAdapter from './adapter';
import { IncomingMessage, ServerResponse } from 'http';
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
export declare function verifyRequestSignature({ signingSecret, requestSignature, requestTimestamp, body, }: VerifyRequestSignatureParams): true;
export declare function createHTTPHandler(adapter: SlackEventAdapter): HTTPHandler;
/**
 * A RequestListener-compatible callback for creating response information from an incoming request.
 *
 * @remarks
 * See RequestListener in the `http` module.
 */
declare type HTTPHandler = (req: IncomingMessage & {
    body?: any;
    rawBody?: Buffer;
}, res: ServerResponse) => void;
/**
 * A Node-style response handler that takes an error (if any occurred) and a few response-related options.
 */
export declare type ResponseHandler = (err?: ResponseError, responseOptions?: {
    failWithNoRetry?: boolean;
    redirectLocation?: boolean;
    content?: any;
}) => void;
/**
 * An error (that may or may not have a status code) in response to a request.
 */
export interface ResponseError extends Error {
    status?: number;
}
/**
 * Parameters for calling {@link verifyRequestSignature}.
 */
export interface VerifyRequestSignatureParams {
    /**
     * The signing secret used to verify request signature.
     */
    signingSecret: string;
    /**
     * Signature from the `X-Slack-Signature` header.
     */
    requestSignature: string;
    /**
     * Timestamp from the `X-Slack-Request-Timestamp` header.
     */
    requestTimestamp: number;
    /**
     * Full, raw body string.
     */
    body: string;
}
/**
 * A dictionary of codes for errors produced by this package.
 */
export declare enum ErrorCode {
    SignatureVerificationFailure = "SLACKHTTPHANDLER_REQUEST_SIGNATURE_VERIFICATION_FAILURE",
    RequestTimeFailure = "SLACKHTTPHANDLER_REQUEST_TIMELIMIT_FAILURE",
    BodyParserNotPermitted = "SLACKADAPTER_BODY_PARSER_NOT_PERMITTED_FAILURE"
}
/**
 * All errors produced by this package are regular
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error | Error} objects with
 * an extra {@link CodedError.code | `error`} field.
 */
export interface CodedError extends Error {
    /**
     * What kind of error occurred.
     */
    code: ErrorCode;
}
export declare const errorCodes: {
    SIGNATURE_VERIFICATION_FAILURE: ErrorCode;
    REQUEST_TIME_FAILURE: ErrorCode;
    BODY_PARSER_NOT_PERMITTED: ErrorCode;
};
export {};
//# sourceMappingURL=http-handler.d.ts.map