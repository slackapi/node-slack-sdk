/*
 * Integration test setup script
 *
 * This script creates a project within the `test` directory which mimics how this package would be used by a consumer.
 * It's important that when the integration tests are run, the environment is as **isolated** from the dependencies
 * (runtime and developer) as possible, so that fewer assumptions are made about a consumer's environment.
 */

const { rm, cd, exec } = require('shelljs');

// The current working directory is set to where ever the node process is executed from, which is typically the root
// of the project directory.

// Clean up any artifacts from a previous integration test run
rm('-rf', 'test/node_modules');
rm('test/*.tgz');
rm('test/package-lock.json');

// Install dependencies
cd(__dirname);
exec('npm install')

// Build a tarball that represents the current source code as a distribution
// The filename for the tarball is printed as the second to last line on stdout
const tarballFilename = exec('npm pack ..').stdout.split('\n').slice(-2).shift();

// Guard for `npm pack` unexpectedly changing the output format
if (tarballFilename.length > 0) {
  // Install the tarball as a dependency (--no-save so that the package.json doesn't get modified)
  exec(`npm install --no-save ${tarballFilename}`);
} else {
  console.log('ERROR: did not find tarball filename.', tarballFilename);
}
