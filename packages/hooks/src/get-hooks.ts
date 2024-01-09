#!/usr/bin/env node
/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line no-console
console.log(JSON.stringify({
  hooks: {
    'get-manifest': 'npx -q --no-install -p @slack/hooks slack-cli-get-manifest',
    'check-update': 'npx -q --no-install -p @slack/hooks slack-cli-check-update',
    start: 'npx -q --no-install -p @slack/hooks slack-cli-start',
  },
  config: {
    watch: {
      'filter-regex': '^manifest\\.(ts|js|json)$',
      paths: [
        '.',
      ],
    },
    'sdk-managed-connection-enabled': true,
  },
}));
