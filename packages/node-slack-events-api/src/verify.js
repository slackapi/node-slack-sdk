#!/usr/bin/env node

import yargs from 'yargs';
import { createSlackEventAdapter } from './index';

const argv = yargs
  .options({
    token: {
      alias: 't',
      describe: 'Slack verification token from the App management page',
      demand: true,
      type: 'string',
    },
    path: {
      alias: 'p',
      describe: 'The path (part of URL after hostname and port) that resolves to your Request URL in the App management page',
      default: '/slack/events',
      type: 'string',
    },
    port: {
      alias: 'l',
      describe: 'The local port for the HTTP server. The development proxy should be configured to forward to this port.',
      default: 3000,
      type: 'number',
    },
  })
  .help()
  .argv;

const slackEvents = createSlackEventAdapter(argv.token);

/* eslint-disable no-console */
slackEvents
  .createServer(argv.path)
  .then(server => new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(argv.port, () => {
      const { address, port } = server.address();
      console.log(`The verification server is now listening at the URL: http://${address}:${port}${argv.path}`);
      resolve();
    });
  }))
  .catch((error) => {
    console.error(`The verification server failed to start. error: ${error.message}`);
  });
/* eslint-enable no-console */
