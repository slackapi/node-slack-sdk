
const { rm, mv, cd, exec } = require('shelljs');

exec('npm test', { cwd: __dirname });
