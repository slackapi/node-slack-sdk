import fs from 'node:fs';
import os from 'node:os';
import { assert, expect } from 'chai';
import sinon from 'sinon';

import { FileStateStore } from './file-state-store';
import type { StateStore } from './interface';
import { StateStoreChaiTestRunner } from './spec-utils';

const testRunner = new StateStoreChaiTestRunner({
  stateStore: new FileStateStore({
    baseDir: os.tmpdir(),
  }),
});
testRunner.enableTests('FileStateStore');

describe('FileStateStore specifics', () => {
  const stateStore: StateStore = new FileStateStore({
    baseDir: os.tmpdir(),
  });
  const installUrlOptions = { scopes: ['channels:read'] };

  it('should close all files after writing them', async () => {
    const writeFileSyncStub = sinon.stub(fs, 'writeFileSync').throws(new Error('mock_write_error'));

    try {
      await stateStore.generateStateParam(installUrlOptions, new Date());
      assert.fail('Exception should be thrown');
      // biome-ignore lint/suspicious/noExplicitAny: errors can be anything
    } catch (e: any) {
      assert.equal(e.message, 'mock_write_error');
    }

    assert(writeFileSyncStub.calledOnce, 'writeFileSync should be called once');
    const fd = writeFileSyncStub.getCall(0).args[0] as number;

    expect(
      () => fs.fstatSync(fd),
      'The file must be closed, we expect fstatSync to throw an error when the file is closed',
    ).to.throw('EBADF: bad file descriptor, fstat');

    // Restore original function
    writeFileSyncStub.restore();
  });
});
