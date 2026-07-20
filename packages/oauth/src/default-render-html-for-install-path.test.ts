import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import defaultRenderHtmlForInstallPath from './default-render-html-for-install-path';

describe('defaultRenderHtmlForInstallPath', () => {
  it('should render an HTML text with a given URL', () => {
    const url = 'https://expected-url';
    const html = defaultRenderHtmlForInstallPath(url);
    assert.strictEqual(html.includes(`<a href="${url}">`), true);
  });
});
