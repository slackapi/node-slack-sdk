#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

/**
 * Implements the get-manifest script hook required by the Slack CLI
 * Returns a manifest JSON string to stdout.
 */
(function _(cwd: string) {
  const manifest = getManifestData(cwd);
  console.log(JSON.stringify(manifest)); // eslint-disable-line no-console
}(process.cwd()));

/**
 * Returns manifest data
 * @param searchDir path to begin searching at
 */
function getManifestData(searchDir: string): object {
  const manifestJSON = readManifestJSONFile(searchDir, 'manifest.json');

  if (!manifestJSON) {
    const msg = 'Failed to find a manifest file in this project';
    throw new Error(msg);
  }

  return manifestJSON;
}

/**
 * Returns a manifest.json if it exists, null otherwise
 * @param searchDir typically current working directory
 * @param filename file to search for
 */
function readManifestJSONFile(searchDir: string, filename: string): object | null {
  let jsonFilePath;
  let manifestJSON;

  try {
    jsonFilePath = find(searchDir, filename);
    if (jsonFilePath && fs.existsSync(jsonFilePath)) {
      manifestJSON = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    }
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    return null;
  }

  return manifestJSON;
}

/**
 * Search for provided file path.
 * Returns full path when filename is found or null if no file found.
 * @param currentPath string of current path
 * @param targetFilename filename to match
 * @returns full file path string relative to starting path or null
 */
function find(currentPath: string, targetFilename: string): string | undefined {
  //  TODO Cache searched paths and check that they haven't been explored already
  //  This guards against rare edge case of a subdir in the file tree which is
  //  symlinked back to root or in such a way that creates a cycle. Can also implement
  //  max depth check.
  if (currentPath.endsWith(`/${targetFilename}`)) {
    return currentPath;
  }

  if (fs.existsSync(currentPath) && fs.lstatSync(currentPath).isDirectory()) {
    const dirents = fs.readdirSync(currentPath);
    return dirents.find((entry) => {
      if (entry !== 'node_modules') {
        const newPath = path.resolve(currentPath, entry);
        return find(newPath, targetFilename);
      }
      return false;
    });
  }
  return undefined;
}
