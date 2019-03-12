/*
 * Integration test setup script
 *
 * This script creates a project within the `test` directory which mimics how this package would be used by a consumer.
 * It's important that when the integration tests are run, the environment is as **isolated** from the dependencies
 * (runtime and developer) as possible, so that fewer assumptions are made about a consumer's environment.
 */

const { rm, mv, cd, exec } = require('shelljs');

// The current working directory is set to where ever the node process is executed from, which is typically the root
// of the project directory. Change into the test directory.
cd(__dirname);

// Clean up any artifacts from a previous integration test run
rm('-rf', 'node_modules');
rm('*.tgz');
rm('package-lock.json');

// Build a tarball that represents the current source code as a distribution
// The filename for the tarball is printed as the second to last line on stdout
const tarballFilename = exec('npm pack ..').stdout.split('\n').slice(-2).shift();

// Guard for `npm pack` unexpectedly changing the output format
if (tarballFilename.length > 0) {

  // Rename the tarball to a known filename that corresponds to the one listed in the `package.json`
  mv(tarballFilename, 'slack-client.tgz');

  // Install dependencies
  exec('npm install')
} else {
  console.log('ERROR: did not find tarball filename.', tarballFilename);
}
