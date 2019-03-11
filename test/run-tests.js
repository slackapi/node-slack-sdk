
const { rm, mv, cd, exec } = require('shelljs');

const code = exec('npm test', { cwd: __dirname }).code;

if (code !== 0) {
  throw new Error('Integration tests failed.');
}
