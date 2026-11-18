import assert from 'node:assert/strict';
import { IncomingMessage, ServerResponse } from 'node:http';
import { Socket } from 'node:net';
import { describe, it } from 'node:test';

import { type CallbackOptions, escapeHtml } from './callback-options';
import { MissingStateError } from './errors';

describe('CallbackOptions', async () => {
  it('should have success and failure', async () => {
    const callbackOptions: CallbackOptions = {
      success: async (installation, options, req, resp) => {
        assert.ok(installation);
        assert.ok(options);
        assert.ok(req);
        assert.ok(resp);
      },
      failure: async (installation, options, req, resp) => {
        assert.ok(installation);
        assert.ok(options);
        assert.ok(req);
        assert.ok(resp);
      },
    };
    assert.ok(callbackOptions);
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
    const req = new IncomingMessage(new Socket());
    const resp = new ServerResponse(req);
    callbackOptions.success?.(installation, options, req, resp);

    const error = new MissingStateError();
    callbackOptions.failure?.(error, options, req, resp);
  });

  it('should escape special characters when using the default page rendering', async () => {
    assert.strictEqual(escapeHtml('slack://app?team=T111&id=A111'), 'slack://app?team=T111&amp;id=A111');
    assert.strictEqual(
      escapeHtml('https://www.example.com?foo=bar&baz=123'),
      'https://www.example.com?foo=bar&amp;baz=123',
    );
    assert.strictEqual(escapeHtml('<b>test</b>'), '&lt;b&gt;test&lt;/b&gt;');
  });
  // TODO: tests for default callbacks
});
