#!/usr/bin/env node
import fs from 'fs';
import util from 'util';
import childProcess from 'child_process';

const exec = util.promisify(childProcess.exec);

const SLACK_BOLT_SDK = '@slack/bolt';
const SLACK_DENO_SDK = '@slack/deno-slack-sdk';
const SLACK_CLI_HOOKS = '@slack/hooks';

interface UpdateInfo {
  /** Overall package identifier */
  name: string;
  /** Collection of new releases */
  releases: ReleaseInfo[];
  /** Details about any updates */
  message: string | undefined;
  /** Additional notes to inspect */
  url: string | undefined;
  /** Information of happened failures */
  error: ErrorInfo | undefined;
}

interface ReleaseInfo {
  /** Dependency identifier on known registry. */
  name: string;
  /** Version present in the current project. */
  current: string | undefined;
  /** Most recent version available to download. */
  latest: string | undefined;
  /** If latest version is newer than current. */
  update: boolean;
  /** If latest version requires a major bump. */
  breaking: boolean;
  /** Additional information for the dependency. */
  message: string | undefined;
  /** Web address containing update information. */
  url: string | undefined;
  /** Information of failures found gathering. */
  error: ErrorInfo | undefined;
}

interface ErrorInfo {
  message: string;
}

/**
 * Mappings from dependencies to installed packages for the project.
 */
interface ProjectDependencies {
  /** The file contianing package information. Often package.json. */
  fileName: string;
  /** Pairs of packages and the matching values in a package.json. */
  dependencies: Record<string, string>;
}

/**
 * File that cannot be accessed for some unexpected reason.
 */
interface InaccessibleFile {
  /** Identifier of the file */
  name: string;
  /** Reason for the failure */
  error: unknown;
}

/**
 * Implementation of the check-update hook that finds available SDK updates.
 * Prints an object detailing information on Slack dependencies for the CLI.
 */
(async function _(cwd) {
  const updates = await checkForSDKUpdates(cwd);
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(updates)); // stdout
}(process.cwd()));

/**
 * Checks for available SDK updates of specified Slack dependencies.
 * @param cwd the current working directory of the CLI project
 * @returns a formatted response with dependency information for the CLI
 */
async function checkForSDKUpdates(cwd: string) {
  const { versionMap, inaccessibleFiles } = await getProjectDependencies(cwd);
  const checkUpdateResponse = createCheckUpdateResponse(versionMap, inaccessibleFiles);
  return checkUpdateResponse;
}

/**
 * Gathers version information about Slack packages that are project dependencies.
 * @param cwd the current working directory of the CLI project
 * @returns a map of version information and any encountered errors
 */
async function getProjectDependencies(cwd: string): Promise<{
  versionMap: Record<string, ReleaseInfo>,
  inaccessibleFiles: InaccessibleFile[],
}> {
  const { projectDependencies, inaccessibleFiles } = await gatherDependencyFile(cwd);
  const versionMap: Record<string, ReleaseInfo> = {};
  try {
    if (projectDependencies.dependencies[SLACK_BOLT_SDK]) {
      versionMap[SLACK_BOLT_SDK] = await collectVersionInfo(SLACK_BOLT_SDK);
    }
    if (projectDependencies.dependencies[SLACK_DENO_SDK]) {
      versionMap[SLACK_DENO_SDK] = await collectVersionInfo(SLACK_DENO_SDK);
    }
    if (projectDependencies.dependencies[SLACK_CLI_HOOKS]) {
      versionMap[SLACK_CLI_HOOKS] = await collectVersionInfo(SLACK_CLI_HOOKS);
    }
  } catch (err) {
    inaccessibleFiles.push({ name: projectDependencies.fileName, error: err });
  }
  return { versionMap, inaccessibleFiles };
}

/**
 * Gathers dependencies and version information from the project (package.json).
 * @param cwd the current working directory of the CLI project
 * @returns dependencies found for the project and any encountered errors
 */
async function gatherDependencyFile(cwd: string): Promise<{
  projectDependencies: ProjectDependencies,
  inaccessibleFiles: InaccessibleFile[],
}> {
  const packageJSONFileName = 'package.json';
  const projectDependencies: ProjectDependencies = {
    fileName: packageJSONFileName,
    dependencies: {},
  };
  const inaccessibleFiles = [];
  try {
    const packageJSONFile = await getJSON(`${cwd}/${packageJSONFileName}`);
    if ('devDependencies' in packageJSONFile &&
            typeof packageJSONFile.devDependencies === 'object' &&
            packageJSONFile.devDependencies !== null &&
            Object.values(packageJSONFile.devDependencies).every((value) => (typeof value === 'string'))) {
      projectDependencies.dependencies = packageJSONFile.devDependencies as Record<string, string>;
    }
    if ('dependencies' in packageJSONFile &&
            typeof packageJSONFile.dependencies === 'object' &&
            packageJSONFile.dependencies !== null &&
            Object.values(packageJSONFile.dependencies).every((value) => (typeof value === 'string'))) {
      projectDependencies.dependencies = {
        ...projectDependencies.dependencies,
        ...packageJSONFile.dependencies as Record<string, string>,
      };
    }
  } catch (err) {
    inaccessibleFiles.push({ name: packageJSONFileName, error: err });
  }
  return { projectDependencies, inaccessibleFiles };
}

/**
 * Finds version information for a package and prepares release information.
 * @param packageName name of the package to lookup
 * @returns current version and latest release information for the package
 */
async function collectVersionInfo(packageName: string): Promise<ReleaseInfo> {
  let currentVersion: string | undefined;
  let latestVersion: string | undefined;
  let releaseNotesUrl: string | undefined;
  let dependencyError: ErrorInfo | undefined;
  try {
    currentVersion = await getProjectPackageVersion(packageName);
    latestVersion = await fetchLatestPackageVersion(packageName);
    if (hasAvailableUpdates(currentVersion, latestVersion)) {
      releaseNotesUrl = getReleaseNotesUrl(packageName, latestVersion);
    }
  } catch (err: unknown) {
    if (typeof err === 'string') {
      dependencyError = { message: err };
    } else if (err instanceof Error) {
      dependencyError = { message: err.message };
    }
  }
  return {
    name: packageName,
    current: currentVersion,
    latest: latestVersion,
    update: hasAvailableUpdates(currentVersion, latestVersion),
    breaking: hasBreakingChange(currentVersion, latestVersion),
    message: undefined,
    url: releaseNotesUrl,
    error: dependencyError,
  };
}

/**
 * Finds the current version of a local project package.
 * @param packageName name of the package to lookup
 * @returns a stringified semver of the found version
 */
async function getProjectPackageVersion(packageName: string): Promise<string> {
  const stdout = await execWrapper(`npm list ${packageName} --depth=0 --json`);
  const currentVersionOutput = JSON.parse(stdout);
  if (!currentVersionOutput.dependencies || !currentVersionOutput.dependencies[packageName]) {
    throw new Error(`Failed to gather project information about ${packageName}`);
  }
  return currentVersionOutput.dependencies[packageName].version;
}

/**
 * Gets the latest package version.
 * @param packageName the package that the latest version is being queried for
 * @returns the most recent version of the published package
 */
async function fetchLatestPackageVersion(packageName: string): Promise<string> {
  const command = `npm info ${packageName} version --tag latest`;
  const stdout = await execWrapper(command);
  return stdout;
}

/**
 * Formats the URL with the release notes for a package.
 * @param packageName the package with the release
 * @param latestVersion the version of the recent release
 * @returns a URL with release notes
 */
function getReleaseNotesUrl(packageName: string, latestVersion: string): string | undefined {
  if (packageName === SLACK_BOLT_SDK) {
    return `https://github.com/slackapi/bolt-js/releases/tag/@slack/bolt@${latestVersion}`;
  } if (packageName === SLACK_DENO_SDK) {
    return `https://github.com/slackapi/deno-slack-sdk/releases/tag/${latestVersion}`;
  } if (packageName === SLACK_CLI_HOOKS) {
    return `https://github.com/slackapi/node-slack-sdk/releases/tag/@slack/hooks@${latestVersion}`;
  }
  return undefined;
}

/**
 * Checks if the latest version is more recent than the current version.
 * @param current package version available in the project
 * @param latest most up-to-date dependency version available on NPM
 */
function hasAvailableUpdates(current: string | undefined, latest: string | undefined): boolean {
  if (!current || !latest) {
    return false;
  }
  return current !== latest;
}

/**
 * Checks if updating a dependency to the latest version causes a breaking change.
 * @param current package version available in the project
 * @param latest most up-to-date dependency version available on NPM
 * @returns if the update will result in a breaking change
 */
function hasBreakingChange(current: string | undefined, latest: string | undefined): boolean {
  if (!current || !latest) {
    return false;
  }
  return current !== latest;
}

/**
 * Wraps and parses the output of the exec() function
 * @param command the command being run by the exec() function
 * @returns the output from the command
 */
async function execWrapper(command: string): Promise<string> {
  const { stdout } = await exec(command);
  return stdout.trim();
}

/**
 * Reads and parses a JSON file to return the contents
 * @param filePath the path of the file being read
 * @returns the file contents or a thrown error
 */
async function getJSON(filePath: string): Promise<object> {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  throw new Error(`Cannot find a file at path ${filePath}`);
}

/**
 * Creates the check update response in the format expected by the CLI.
 * @param versionMap information about package versions and potential updates
 * @param inaccessibleFiles array of files that could not be read or accessed
 * @returns update information formatted in the expected manner
 */
function createCheckUpdateResponse(
  versionMap: Record<string, ReleaseInfo>,
  inaccessibleFiles: InaccessibleFile[],
): UpdateInfo {
  const dependencyErrors: string[] = [];
  const releases = Object.entries(versionMap).map(([dependency, version]) => {
    if (version.error) {
      dependencyErrors.push(dependency);
    }
    return version;
  });
  return {
    name: 'the Slack SDK',
    message: '',
    releases,
    url: 'https://api.slack.com/automation/changelog',
    error: createUpdateErrorMessage(dependencyErrors, inaccessibleFiles),
  };
}

/**
 * Prepares a message about any errors encountered.
 * @param dependencyErrors array of packages that failed by unexpected reason
 * @param inaccessibleFiles array of files that could not be read or accessed
 * @returns information about errors in a formatted message
 */
function createUpdateErrorMessage(
  dependencyErrors: string[],
  inaccessibleFiles: InaccessibleFile[],
): ErrorInfo | undefined {
  if (dependencyErrors.length === 0 && inaccessibleFiles.length === 0) {
    return undefined;
  }
  let message: string = '';
  if (dependencyErrors.length > 0) {
    message = `An error occurred fetching updates for the following packages: ${dependencyErrors.join(', ')}\n`;
  }
  const fileErrors = inaccessibleFiles.map((file) => `\n   ${file.name}: ${file.error}`);
  if (dependencyErrors.length > 0) {
    message += `An error occurred while reading the following files:\n${fileErrors.join('')}`;
  }
  return { message };
}
