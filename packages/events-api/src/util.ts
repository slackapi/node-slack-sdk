import os from 'os';
const pkg = require('../package.json'); // tslint:disable-line

// TODO: expose an API to extend this
// there will potentially be more named exports in this file
export function packageIdentifier(): string {
  return `${pkg.name.replace('/', ':')}/${pkg.version} ${os.platform()}/${os.release()} ` +
    `node/${process.version.replace('v', '')}`;
}
