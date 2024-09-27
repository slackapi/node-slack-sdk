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

  describe('put method', () => {
    it('should invoke `datastore put [item details]`', async () => {
      await datastore.datastorePut({ appPath: '/some/path', putDetails: '{ "datastore": "datastore", "item": { "id": "1"} }' });
      sandbox.assert.calledWith(
        spawnSpy,
        sinon.match(`datastore put '{ "datastore": "datastore", "item": { "id": "1"} }'`),
      );
    });
  });
  describe('get method', () => {
    it('should invoke `datastore get <query>`', async () => {
      await datastore.datastoreGet({ appPath: '/some/path', getQuery: '{ "datastore": "datastore", "id": "1" }' });
      sandbox.assert.calledWith(spawnSpy, sinon.match(`datastore get '{ "datastore": "datastore", "id": "1" }'`));
    });
  });
  describe('delete method', () => {
    it('should invoke `datastore delete <query>`', async () => {
      await datastore.datastoreDelete({ appPath: '/some/path', deleteQuery: '{ "datastore": "datastore", "id": "1" }' });
      sandbox.assert.calledWith(spawnSpy, sinon.match(`datastore delete '{ "datastore": "datastore", "id": "1" }'`));
    });
  });
  describe('query method', () => {
    it('should invoke `datastore query [expression]`', async () => {
      await datastore.datastoreQuery({ appPath: '/some/path', queryExpression: '{ "datastore": "datastore", "expression": "id = :id", "expression_values": {":id": "1"} }' });
      sandbox.assert.calledWith(spawnSpy, sinon.match(`datastore query '{ "datastore": "datastore", "expression": "id = :id", "expression_values": {":id": "1"} }'`));
    });
  });
});
