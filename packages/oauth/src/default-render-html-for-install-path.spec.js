require('mocha');
const { assert } = require('chai');
const { default: defaultRenderHtmlForInstallPath } = require('./default-render-html-for-install-path');

describe('defaultRenderHtmlForInstallPath', async () => {
  it('should render an HTML text with a given URL', async () => {
    const url = 'https://expected-url';
    const html = defaultRenderHtmlForInstallPath(url);
    assert.isTrue(html.includes(`<a href="${url}">`));
  });
});
