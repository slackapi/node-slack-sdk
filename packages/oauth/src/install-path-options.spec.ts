import { IncomingMessage, ServerResponse } from 'node:http';

import { assert } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';

import type { InstallPathOptions } from './install-path-options';

describe('InstallPathOptions', async () => {
  it('should have beforeRedirection', async () => {
    const installPathOptions: InstallPathOptions = {
      beforeRedirection: async (req, resp, options) => {
        assert.isNotNull(req);
        assert.isNotNull(resp);
        assert.isNotNull(options);
        return false;
      },
    };
    assert.isNotNull(installPathOptions);
    const req = sinon.createStubInstance(IncomingMessage) as IncomingMessage;
    const resp = sinon.createStubInstance(ServerResponse) as ServerResponse;
    const options = { scopes: ['commands', 'chat:write'] };
    const result = await installPathOptions.beforeRedirection?.(req, resp, options);
    assert.isFalse(result);
  });
});
