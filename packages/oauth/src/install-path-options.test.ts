import assert from 'node:assert/strict';
import { IncomingMessage, ServerResponse } from 'node:http';
import { Socket } from 'node:net';
import { describe, it } from 'node:test';

import type { InstallPathOptions } from './install-path-options';

describe('InstallPathOptions', async () => {
  it('should have beforeRedirection', async () => {
    const installPathOptions: InstallPathOptions = {
      beforeRedirection: async (req, resp, options) => {
        assert.ok(req);
        assert.ok(resp);
        assert.ok(options);
        return false;
      },
    };
    assert.ok(installPathOptions);
    const req = new IncomingMessage(new Socket());
    const resp = new ServerResponse(req);
    const options = { scopes: ['commands', 'chat:write'] };
    const result = await installPathOptions.beforeRedirection?.(req, resp, options);
    assert.strictEqual(result, false);
  });
});
