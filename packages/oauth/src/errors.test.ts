import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  AuthorizationError,
  ErrorCode,
  GenerateInstallUrlError,
  InstallerInitializationError,
  InvalidStateError,
  MissingCodeError,
  MissingStateError,
  SlackOAuthError,
  UnknownError,
} from './errors';

describe('error classes', () => {
  // Each entry pairs a no-extra-args error class with its expected code.
  const simpleErrors: Array<[new (message: string) => SlackOAuthError, ErrorCode]> = [
    [InstallerInitializationError, ErrorCode.InstallerInitializationError],
    [GenerateInstallUrlError, ErrorCode.GenerateInstallUrlError],
    [MissingStateError, ErrorCode.MissingStateError],
    [InvalidStateError, ErrorCode.InvalidStateError],
    [MissingCodeError, ErrorCode.MissingCodeError],
    [UnknownError, ErrorCode.UnknownError],
  ];

  for (const [ErrorClass, expectedCode] of simpleErrors) {
    describe(ErrorClass.name, () => {
      it(`should be an instance of Error, SlackOAuthError, and ${ErrorClass.name}`, () => {
        const err = new ErrorClass('something went wrong');
        assert.ok(err instanceof Error);
        assert.ok(err instanceof SlackOAuthError);
        assert.ok(err instanceof ErrorClass);
        assert.equal(err.code, expectedCode);
        assert.equal(err.name, ErrorClass.name);
        assert.equal(err.message, 'something went wrong');
      });
    });
  }

  describe('AuthorizationError', () => {
    it('should be an instance of Error, SlackOAuthError, and AuthorizationError', () => {
      const err = new AuthorizationError('access denied');
      assert.ok(err instanceof Error);
      assert.ok(err instanceof SlackOAuthError);
      assert.ok(err instanceof AuthorizationError);
      assert.equal(err.code, ErrorCode.AuthorizationError);
      assert.equal(err.name, 'AuthorizationError');
      assert.equal(err.message, 'access denied');
    });

    it('should leave original and cause undefined when no original error is given', () => {
      const err = new AuthorizationError('access denied');
      assert.equal(err.original, undefined);
      assert.equal(err.cause, undefined);
    });

    it('should expose the original error via both original and the standard cause property', () => {
      const original = new Error('token exchange failed');
      const err = new AuthorizationError(original.message, original);
      assert.equal(err.original, original);
      assert.equal(err.cause, original);
    });
  });
});
