import sinon from 'sinon';

import { mockProcess } from '../../utils/test';
import { shell } from '../shell';
import datastore from './datastore';

describe('datastore commands', () => {
  const sandbox = sinon.createSandbox();
  let spawnSpy: sinon.SinonStub;

  beforeEach(() => {
    const process = mockProcess();
    spawnSpy = sandbox.stub(shell, 'spawnProcess').returns({
      command: 'something',
      finished: true,
      output: 'hi',
      process,
    });
    sandbox.stub(shell, 'checkIfFinished').resolves();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('get method', () => {
    it('should invoke `datastore get <query>`', async () => {
      await datastore.datastoreGet({ appPath: '/some/path', datastoreName: 'datastore', primaryKeyValue: '1' });
      sandbox.assert.calledWith(spawnSpy, sinon.match(`datastore get`));
    });
  });
  describe('delete method', () => {
    it('should invoke `datastore delete <query>`', async () => {
      await datastore.datastoreDelete({ appPath: '/some/path', datastoreName: 'datastore', primaryKeyValue: '1' });
      sandbox.assert.calledWith(spawnSpy, sinon.match(`datastore delete`));
    });
  });
  describe('put method', () => {
    it('should invoke `datastore put [item details]`', async () => {
      const itemObj: any = {
        id: "1",
        content: "text"
      };
      await datastore.datastorePut({ appPath: '/some/path', datastoreName: 'datastore', putItem: itemObj });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match(`datastore put`),
      );
    });
  });
  describe('query method', () => {
    it('should invoke `datastore query [expression]`', async () => {
      const expressObj: any = {
        id: "1",
      };
      await datastore.datastoreQuery({ appPath: '/some/path',  datastoreName: 'datastore', queryExpression: 'id = :id', queryExpressionValues: expressObj});
      sandbox.assert.calledWith(spawnSpy, sinon.match(`datastore query`));
    });
  });
});
