#!/usr/bin/env node
console.log(JSON.stringify({
  hooks: {
    'get-manifest': 'npx -q --no-install -p @slack/bolt slack-cli-get-manifest',
    'check-update': 'npx -q --no-install -p @slack/bolt slack-cli-check-update',
    start: 'npx -q --no-install -p @slack/bolt slack-cli-start',
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