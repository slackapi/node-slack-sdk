/**
 * Example for uploading a file using the Slack Web API
 */

const { WebClient } = require('@slack/client');
const path = require('path');
const fs = require('fs');

// Get an API token by creating an app at <https://api.slack.com/apps?new_app=1>
// It's always a good idea to keep sensitive data like the token outside your source code. Prefer environment variables.
const token = process.env.SLACK_API_TOKEN || '';
if (!token) { console.log('You must specify a token to use this example'); process.exitCode = 1; return; }

// Initialize a Web API client
const web = new WebClient(token);

// Path to example file
const filePath = path.resolve('..', 'test', 'fixtures', 'train.jpg');

// Using a Stream as the source for the upload
// Your token should have `files:write:user` scope
const fileStream = fs.createReadStream(filePath);
web.files.upload({ file: fileStream })
  .then((response) => {
    // Success!
    console.log(`File uploaded as Stream. File ID: ${response.file.id}`);
  })
  .catch((error) => {
    // Error :/
    console.log('File upload as Stream error:');
    console.log(error);
  });

// Using a Buffer as the source for the upload
// Your token should have `files:write:user` scope
const fileBuffer = fs.readFileSync(filePath);
// When using a Buffer, its best to support a filename, since the SDK will not know the filename on disk
web.files.upload({ file: fileStream, filename: 'train.jpg' })
  .then((response) => {
    // Success!
    console.log(`File uploaded as Buffer. File ID: ${response.file.id}`);
  })
  .catch((error) => {
    // Error :/
    console.log('File upload as Buffer error:');
    console.log(error);
  });
