#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

/**
 * Implements the get-manifest script hook required by the Slack CLI.
 * Prints a well-formatted structure of manifest data to stdout.
 * @param {string} cwd - The current working directory of the project.
 */
(function _(cwd) {
  const manifest = getManifestData(cwd);
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(manifest));
}(process.cwd()));

/**
 * Returns parsed manifest data for a project.
 * @param {string} searchDir - The path to begin searching in.
 * @returns {object} Parsed values of the project manifest.
 */
function getManifestData(searchDir) {
  const manifestJSON = readManifestJSONFile(searchDir, 'manifest.json');
  if (!manifestJSON) {
    throw new Error('Failed to find a manifest file in this project');
  }
  return manifestJSON;
}

/**
 * Returns a manifest.json if it exists, null otherwise.
 * @param {string} searchDir - Directory to begin search in.
 * @param {string} filename - The file to search for.
 * @returns {object | undefined} The found manifest.json object.
 */
function readManifestJSONFile(searchDir, filename) {
  try {
    const jsonFilePath = find(searchDir, filename);
    if (jsonFilePath && fs.existsSync(jsonFilePath)) {
      return JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    }
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    throw new Error('Failed to parse the manifest file for this project');
  }
  return undefined;
}

/**
 * Searches for a certain file in the provided file path.
 * @param {string} currentPath - The current path to begin the search in.
 * @param {string} targetFilename - Filename to find and match.
 * @returns {string | undefined} Full file path relative to starting path.
 */
function find(currentPath, targetFilename) {
  //  TODO Cache searched paths and check that they haven't been explored already
  //  This guards against rare edge case of a subdir in the file tree which is
  //  symlinked back to root or in such a way that creates a cycle. Can also implement
  //  max depth check.
  if (currentPath.endsWith(`/${targetFilename}`)) {
    return currentPath;
  }

  /** @type {string | undefined} */
  let targetPath;
  if (fs.existsSync(currentPath) && fs.lstatSync(currentPath).isDirectory()) {
    const dirents = fs.readdirSync(currentPath);
    dirents.some((entry) => {
      if (entry !== 'node_modules') {
        const newPath = path.resolve(currentPath, entry);
        const foundEntry = find(newPath, targetFilename);
        if (foundEntry) {
          targetPath = foundEntry;
          return true;
        }
      }
      return false;
    });
  }
  return targetPath;
}
