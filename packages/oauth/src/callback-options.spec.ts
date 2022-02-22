import { assert } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { IncomingMessage, ServerResponse } from 'http';

import { CallbackOptions } from './callback-options';
import { MissingStateError } from './errors';

describe('CallbackOptions', async () => {
  it('should have success and failure', async () => {
    const callbackOptions: CallbackOptions = {
      success: async (installation, options, req, resp) => {
        assert.isNotNull(installation);
        assert.isNotNull(options);
        assert.isNotNull(req);
        assert.isNotNull(resp);
      },
      failure: async (installation, options, req, resp) => {
        assert.isNotNull(installation);
        assert.isNotNull(options);
        assert.isNotNull(req);
        assert.isNotNull(resp);
      },
    };
    assert.isNotNull(callbackOptions);
    const installation = {
      enterprise: undefined,
      team: {
        id: 'T111',
      },
      bot: {
        id: 'B111',
        userId: 'W111',
        scopes: ['commands'],
        token: 'xoxb-',
      },
      user: {
        id: 'W222',
        scopes: undefined,
        token: undefined,
      },
    };
    const options = {
      scopes: ['commands', 'chat:write'],
    };
    const req = sinon.createStubInstance(IncomingMessage) as IncomingMessage;
    const resp = sinon.createStubInstance(ServerResponse) as ServerResponse;
    callbackOptions.success!(installation, options, req, resp);

    const error = new MissingStateError();
    callbackOptions.failure!(error, options, req, resp);
  });

  // TODO: tests for default callbacks
});
