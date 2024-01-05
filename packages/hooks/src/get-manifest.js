#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/** 
 * Implements the get-manifest script hook required by the Slack CLI
 * Returns a manifest JSON string to stdout.
*/
(function _(cwd) {
  let manifest = getManifestData(cwd);
  console.log(JSON.stringify(manifest));
}(process.cwd()));

/** 
 * Returns manifest data
 * @param searchDir path to begin searching at
 */
function getManifestData(searchDir) {
  const manifestJSON = readManifestJSONFile(searchDir, 'manifest.json');

  if (!manifestJSON) {
    const msg = 'Unable to find a manifest file in this project';
    throw new Error(msg);
  }

  return manifestJSON;
} 

/** 
 * Returns a manifest.json if it exists, null otherwise
 * @param searchDir typically current working directory
 * @param filename file to search for
 */
function readManifestJSONFile(searchDir, filename) {
  let jsonFilePath, manifestJSON;
  
  try {
    jsonFilePath = find(searchDir, filename);
    if (fs.existsSync(jsonFilePath)) {
      manifestJSON = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    }
  } catch (error) {
    console.error(error)
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
 * */
function find(currentPath, targetFilename) {
  //  TODO Cache searched paths and check that they haven't been explored already
  //  This guards against rare edge case of a subdir in the file tree which is 
  //  symlinked back to root or in such a way that creates a cycle. Can also implement
  //  max depth check. 
  if (currentPath.endsWith(`/${targetFilename}`)) {
    return currentPath;
  }

  if (fs.existsSync(currentPath) && fs.lstatSync(currentPath).isDirectory()) {
    let foundEntry;
    const dirents = fs.readdirSync(currentPath);
    for (const entry of dirents) {
      if (entry !== 'node_modules') {
        let newPath = path.resolve(currentPath, entry);
        foundEntry = find(newPath, targetFilename);
        if (foundEntry) {
          return foundEntry;
        }
      }
    }
    return null;
  }
}