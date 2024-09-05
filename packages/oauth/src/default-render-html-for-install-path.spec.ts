import { assert } from 'chai';
import defaultRenderHtmlForInstallPath from './default-render-html-for-install-path';

describe('defaultRenderHtmlForInstallPath', () => {
  it('should render an HTML text with a given URL', () => {
    const url = 'https://expected-url';
    const html = defaultRenderHtmlForInstallPath(url);
    assert.isTrue(html.includes(`<a href="${url}">`));
  });
});
