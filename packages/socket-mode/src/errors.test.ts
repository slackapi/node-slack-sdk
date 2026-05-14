import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  ErrorCode,
  SMNoReplyReceivedError,
  SMPlatformError,
  SMSendWhileDisconnectedError,
  SMSendWhileNotReadyError,
  SMWebsocketError,
} from './errors';

describe('error classes', () => {
  describe('SMWebsocketError', () => {
    it('should be an instance of Error and SMWebsocketError', () => {
      const original = new Error('connection reset');
      const err = new SMWebsocketError(original);
      assert.ok(err instanceof Error);
      assert.ok(err instanceof SMWebsocketError);
      assert.equal(err.code, ErrorCode.WebsocketError);
      assert.equal(err.original, original);
      assert.equal(err.cause, original);
      assert.equal(err.message, 'connection reset');
      assert.equal(err.name, 'SMWebsocketError');
    });
  });

  describe('SMPlatformError', () => {
    it('should be an instance of Error and SMPlatformError', () => {
      const event = { error: { msg: 'not_authed' } };
      const err = new SMPlatformError(event);
      assert.ok(err instanceof Error);
      assert.ok(err instanceof SMPlatformError);
      assert.equal(err.code, ErrorCode.SendMessagePlatformError);
      assert.equal(err.data, event);
      assert.equal(err.message, 'An API error occurred: not_authed');
      assert.equal(err.name, 'SMPlatformError');
    });
  });

  describe('SMNoReplyReceivedError', () => {
    it('should be an instance of Error and SMNoReplyReceivedError', () => {
      const err = new SMNoReplyReceivedError();
      assert.ok(err instanceof Error);
      assert.ok(err instanceof SMNoReplyReceivedError);
      assert.equal(err.code, ErrorCode.NoReplyReceivedError);
      assert.equal(err.name, 'SMNoReplyReceivedError');
      assert.ok(err.message.includes('no server acknowledgement'));
    });
  });

  describe('SMSendWhileDisconnectedError', () => {
    it('should be an instance of Error and SMSendWhileDisconnectedError', () => {
      const err = new SMSendWhileDisconnectedError();
      assert.ok(err instanceof Error);
      assert.ok(err instanceof SMSendWhileDisconnectedError);
      assert.equal(err.code, ErrorCode.SendWhileDisconnectedError);
      assert.equal(err.name, 'SMSendWhileDisconnectedError');
      assert.ok(err.message.includes('not connected'));
    });
  });

  describe('SMSendWhileNotReadyError', () => {
    it('should be an instance of Error and SMSendWhileNotReadyError', () => {
      const err = new SMSendWhileNotReadyError();
      assert.ok(err instanceof Error);
      assert.ok(err instanceof SMSendWhileNotReadyError);
      assert.equal(err.code, ErrorCode.SendWhileNotReadyError);
      assert.equal(err.name, 'SMSendWhileNotReadyError');
      assert.ok(err.message.includes('not ready'));
    });
  });
});
