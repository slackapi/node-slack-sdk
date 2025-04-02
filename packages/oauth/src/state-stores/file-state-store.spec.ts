import os from 'node:os';

import { FileStateStore } from './file-state-store';
import { StateStoreChaiTestRunner } from './spec-utils';

const testRunner = new StateStoreChaiTestRunner({
  stateStore: new FileStateStore({
    baseDir: os.tmpdir(),
  }),
});
testRunner.enableTests('FileStateStore');
