require('mocha');
const { assert } = require('chai');

const { default: ClearStateStore } = require('./clear-state-store');

describe('ClearStateStore', async () => {
  it('should generate a state and return install options once verified', async () => {
    const stateStore = new ClearStateStore('stateSecret');
    const installUrlOptions = { scopes: ['channels:read'] };
    const state = await stateStore.generateStateParam(installUrlOptions, new Date());
    const returnedInstallUrlOptions = await stateStore.verifyStateParam(new Date(), state);
    assert.deepEqual(installUrlOptions, returnedInstallUrlOptions);
  });
});
