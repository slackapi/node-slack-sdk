import { describe, it } from 'mocha';
import assert from 'assert';

import doctor from './doctor.js';

describe('doctor implementation', async () => {
  it('should return versions of runtime dependencies', async () => {
    const { versions } = doctor();
    assert(versions[0].name === 'node');
    assert(versions[0].current === process.versions.node);
    assert(versions[1].name === 'v8');
    assert(versions[1].current === process.versions.v8);
    assert(versions[2].name === 'modules');
    assert(versions[2].current === process.versions.modules);
  });
});
