import os from 'os';
import pkg from '../package.json';

// TODO: expose an API to extend this
// there will potentially be more named exports in this file
// eslint-disable-next-line import/prefer-default-export
export function packageIdentifier() {
  return `${pkg.name.replace('/', ':')}/${pkg.version} ${os.platform()}/${os.release()} node/${process.version.replace('v', '')}`;
}
