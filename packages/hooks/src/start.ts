#!/usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const { main: pkgJSONMain } = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

// Run script hook verifies that requirements for running an App in
// in developerMode (via Socket Mode) are met
(function _(cwd, customPath): void {
  // TODO - Format so that its less miss-able in output
  console.log('Preparing local run in developer mode (Socket Mode)'); // eslint-disable-line no-console
  // Check required local run tokens
  validate();

  // tries the provided path, then package.json main, then defaults to index.js in the current
  // working directory
  const pkgJSONDefault = 'index.js';
  const fullPath = path.resolve(cwd, customPath || (pkgJSONMain || pkgJSONDefault));
  console.log(fullPath); // eslint-disable-line no-console

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
    console.log(`bolt-app local run exited with code ${code}`); // eslint-disable-line no-console
  });
}(process.cwd(), process.env.SLACK_CLI_CUSTOM_FILE_PATH));

function validate(): void {
  if (!process.env.SLACK_CLI_XOXB) {
    throw new Error('Missing local run bot token. Please see slack-cli maintainers to troubleshoot.');
  }
  if (!process.env.SLACK_CLI_XAPP) {
    throw new Error('Missing local run app token. Please see slack-cli maintainers to troubleshoot');
  }
}
