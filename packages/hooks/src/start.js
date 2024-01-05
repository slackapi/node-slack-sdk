#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { main: pkgJSONMain } = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

// Run script hook verifies that requirements for running an App in
// in developerMode (via Socket Mode) are met
(function _(cwd, customPath) {
  // TODO - Format so that its less miss-able in output
  console.log('Preparing local run in developer mode (Socket Mode)');
  // Check required local run tokens
  validate();

  // tries the provided path, then package.json main, then defaults to index.js in the current 
  // working directory
  const pkgJSONDefault = 'index.js';
  const fullPath = path.resolve(cwd, customPath ? customPath : pkgJSONMain ? pkgJSONMain : pkgJSONDefault);
  console.log(fullPath);

  // Kick off a subprocess to run the app in development mode
  const app = spawn('node', [`${fullPath}`]);
  app.stdout.setEncoding('utf-8');
  app.stdout.on('data', (data) => {
    process.stdout.write(data);
  });
  app.stderr.on('data', (data) => {
    process.stderr.write(data);
  });

  app.on('close', (code) => {
    console.log(`bolt-app local run exited with code ${code}`);
  });
}(process.cwd(), process.env.SLACK_CLI_CUSTOM_FILE_PATH));

function validate() {
  if (!process.env.SLACK_CLI_XOXB) {
    throw new Error('Missing local run bot token. Please see slack-cli maintainers to troubleshoot.');
  }
  if (!process.env.SLACK_CLI_XAPP) {
    throw new Error('Missing local run app token. Please see slack-cli maintainers to troubleshoot');
  }
}