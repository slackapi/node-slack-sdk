#!/usr/bin/env node --no-warnings
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const SLACK_BOLT_SDK = '@slack/bolt';
let checkUpdateExports = {};

/** 
 * Implements the check-update hook and looks for available SDK updates.
 * Returns an object detailing info on Slack dependencies to pass up to the CLI.
*/
(async function _(cwd) {
  let updates = await checkForSDKUpdates(cwd);
  console.log(JSON.stringify(updates)); // stdout
}(process.cwd()));

/**
 * Wraps and parses the output of the exec() function
 * @param command the command being run by the exec() function
 */
async function execWrapper (command) {
  const { stdout } = await exec(command);
  return stdout.trim();
}

/**
 * Checks for available SDK updates for specified dependencies, creates a version map,
 * and then wraps everything up into a response to be passed to the CLI.
 * @param cwd the current working directory
 */
async function checkForSDKUpdates(cwd) {
  const { versionMap, inaccessibleFiles } = await createVersionMap(cwd);
  const updateResp = createUpdateResp(versionMap, inaccessibleFiles);
  return updateResp;
}

/**
 * Create a version map that contains each (Slack) dependency, detailing info about
 * current and latest versions, as well as if breaking changes are present or if there
 * were any errors with getting version retrieval.
 * @param cwd the current working directory of the CLI project
 */
async function createVersionMap(cwd) {
  const { versionMap, inaccessibleFiles } = await readProjectDependencies(cwd);

  if (versionMap && versionMap[SLACK_BOLT_SDK]) {
    const current = versionMap[SLACK_BOLT_SDK].current || '';
    let latest = '',
      error = null;

    try {
      latest = await fetchLatestModuleVersion(SLACK_BOLT_SDK);
    } catch (err) {
      error = err;
    }
    const update = !!current && !!latest && current !== latest;
    const breaking = hasBreakingChange(current, latest);

    versionMap[SLACK_BOLT_SDK] = {
      ...versionMap[SLACK_BOLT_SDK],
      latest,
      update,
      breaking,
      error,
    };
  }

  return { versionMap, inaccessibleFiles };
}

/**
 * Reads project dependencies - cycles through project dependency files, extracts
 * the listed dependencies, and adds it in to the version map with version info.
 * @param cwd the current working directory of the CLI project
 */
async function readProjectDependencies(cwd) {
  const versionMap = {};
  const { dependencyFile, inaccessibleFiles } = await gatherDependencyFiles(
    cwd
  );

  try {
    const [sdk, value] =
      await checkUpdateExports.extractDependencies(dependencyFile.body, dependencyFile.name);

    if (sdk !== '' && sdk === SLACK_BOLT_SDK) {
      versionMap[SLACK_BOLT_SDK] = {
        name: sdk,
        current: value.version,
      };
    }
  } catch (err) {
    inaccessibleFiles.push({ name: dependencyFile.name, error: err });
  }

  return { versionMap, inaccessibleFiles };
}

/**
 * Reads and parses JSON file - if it works, returns the file contents.
 * If not, returns an empty object
 * @param filePath the path of the file being read
 */
async function getJSON(filePath) {
  let fileContents = {};
  try {
    if (fs.existsSync(filePath)) {
      fileContents = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } else {
      throw new Error('Cannot find a file at path ' + filePath);
    }
  } catch (err) {
    throw new Error(err);
  }
  return fileContents;
}

/**
 * Gathers all related dependency files for the CLI project (package.json).
 * @param cwd the current working directory of the CLI project
 */
async function gatherDependencyFiles(cwd) {
  const { jsonDepFile, inaccessibleFiles } = await getJSONFiles(cwd);
  const dependencyFile = jsonDepFile;
  return { dependencyFile, inaccessibleFiles };
}

/**
 * Gets the needed files that contain dependency info (package.json).
 * @param cwd the current working directory of the CLI project
 */
async function getJSONFiles(cwd) {
  const packageJSON = 'package.json';
  const jsonDepFile = {};
  const inaccessibleFiles = [];

  try {
    const jsonFile = await getJSON(`${cwd}/${packageJSON}`);
    const jsonIsParsable =
      jsonFile &&
      typeof jsonFile === 'object' &&
      !Array.isArray(jsonFile) &&
      jsonFile.dependencies;

    if (jsonIsParsable) {
      jsonDepFile.name = packageJSON;
      jsonDepFile.body= jsonFile;
    }
  } catch (err) {
    inaccessibleFiles.push({ name: packageJSON, error: err });
  }

  return { jsonDepFile, inaccessibleFiles };
}

/**
 * Pulls dependencies from a given file and JSON structure.
 * @param json JSON information that includes dependencies
 * @param fileName name of the file that the dependency list is coming from
 */
checkUpdateExports.extractDependencies = async (json, fileName) => {
  // Determine if the JSON passed is an object
  const jsonIsParsable =
    json !== null && typeof json === 'object' && !Array.isArray(json);

  if (jsonIsParsable) {
    let boltCurrentVersion = '';
    if (json['dependencies']['@slack/bolt']) {
      const boltCurrentVersionOutput = JSON.parse(
        await checkUpdateExports.getBoltCurrentVersion()
      );

      if (boltCurrentVersionOutput !== '') {
        boltCurrentVersion =
          boltCurrentVersionOutput['dependencies']['@slack/bolt']['version'];
      }
    }

    return [
      '@slack/bolt',
      {
        version: boltCurrentVersion,
      },
    ];
  }

  return [];
};

/**
 * Gets the latest module version.
 * @param moduleName the module that the latest version is being queried for
 */
async function fetchLatestModuleVersion(moduleName) {
  let command = '';
  if (moduleName === '@slack/bolt') {
    command = `npm info ${moduleName} version --tag next-gen`;
  } else if (moduleName === '@slack/deno-slack-sdk') {
    command = `npm info ${moduleName} version --tag latest`;
  }
  const stdout = await execWrapper(command);

  return stdout;
}

/**
 * Checks if a dependency's upgrade from a current to the latest version will cause a
 * breaking change.
 * @param current current dependency version in project
 * @param latest most up-to-date dependency version available on NPM
 */
function hasBreakingChange(current, latest) {
  return current !== latest;
}

/**
 * Creates the update response - returns an object in the expected response format.
 * @param versionMap version map of checked dependencies, current versions, and info on upgrade + breaking changes
 * @param inaccessibleFiles array of files that could not be read or accessed
 */
function createUpdateResp(versionMap, inaccessibleFiles) {
  const name = 'the Slack SDK';
  const releases = [];
  const url = 'https://api.slack.com/future/changelog';
  const fileErrorMsg = createFileErrorMsg(inaccessibleFiles);

  let error = null;
  let errorMsg = '';
  let message = '';


  // Output information for each dependency
  for (const sdk of Object.values(versionMap)) {
    // Dependency has an update OR the fetch of update failed
    if (sdk) {
      releases.push(sdk);

      // Add the dependency that failed to be fetched to the top-level error message
      if (sdk.error && sdk.error.message) {
        errorMsg += errorMsg
          ? `, ${sdk}`
          : `An error occurred fetching updates for the following packages: ${sdk.name}`;
      }
    }
  }

  // Surface release notes for breaking changes
  if (releases && releases[0] && releases[0].breaking) {
    message = `Learn more about the breaking change at https://github.com/slackapi/bolt-js/releases/tag/@slack/bolt@${releases[0].latest}`
  }

  // If there were issues accessing dependency files, append error message(s)
  if (inaccessibleFiles.length) {
    errorMsg += errorMsg ? `\n\n   ${fileErrorMsg}` : fileErrorMsg;
  }

  if (errorMsg) {
    error = { message: errorMsg };
  }

  return {
    name,
    message,
    releases,
    url,
    error,
  };
}

/**
 * Returns error when dependency files cannot be read.
 * @param inaccessibleFiles array of files that could not be read or accessed
 */
function createFileErrorMsg(inaccessibleFiles) {
  let fileErrorMsg = '';

  // There were issues with reading some of the files that were found
  for (const file of inaccessibleFiles) {
    fileErrorMsg += fileErrorMsg
      ? `\n   ${file.name}: ${file.error.message}`
      : `An error occurred while reading the following files: \n\n   ${file.name}: ${file.error.message}`;
  }

  return fileErrorMsg;
}

/**
 * Queries for current Bolt version of the project.
 */
checkUpdateExports.getBoltCurrentVersion = async () => {
  const stdout = await execWrapper('npm list @slack/bolt --depth=0 --json');
  return stdout;
};