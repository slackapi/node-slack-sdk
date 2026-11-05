import ClearStateStore from './clear-state-store';
import { StateStoreChaiTestRunner } from './spec-utils';

const testRunner = new StateStoreChaiTestRunner({
  stateStore: new ClearStateStore('secret'),
  shouldVerifyOnlyOnce: false,
});
testRunner.enableTests('ClearStateStore');
