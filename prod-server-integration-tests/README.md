# Production Server Integration Tests

End-to-end integration tests that run against real Slack APIs to verify the
`@slack/web-api` and `@slack/socket-mode` packages work correctly.

## Prerequisites

1. **Build local packages** that these tests depend on:

```bash
npm run build
```

2. **Install dependencies**:

```bash
npm install
```

3. **Create the required Slack apps** using the manifests in [`manifests/`](./manifests/).
   See [`manifests/README.md`](./manifests/README.md) for detailed setup instructions.

4. **Configure environment variables** by copying the sample file:

```bash
cp .env.sample .env
# Edit .env and fill in your tokens/IDs
```

## Running Tests

### All tests

```bash
npm test
```

### Individual test suites

```bash
# Core Web API tests (auth, chat.scheduleMessage, Slack Connect, team.*)
node --test-timeout=10000 --test test/web-api.test.js

# Bookmarks CRUD
node --test-timeout=10000 --test test/bookmarks-web-api.test.js

# Admin: session settings + auth policy
node --test-timeout=10000 --test test/admin-web-api.test.js

# Admin: analytics
node --test-timeout=10000 --test test/admin-web-api-analytics.test.js

# Admin: bulk archive/delete/move
node --test-timeout=10000 --test test/admin-web-api-conversations-bulk.test.js

# Admin: custom retention
node --test-timeout=10000 --test test/admin-web-api-custom-retention.test.js

# Admin: roles
node --test-timeout=10000 --test test/admin-web-api-roles.test.js

# Admin: user sessions reset
node --test-timeout=10000 --test test/admin-web-api-user-sessions.test.js

# Admin: unsupported versions export
node --test-timeout=10000 --test test/admin-web-api-users-unsupportedVersions-export.test.js
```

### Example scripts

```bash
# No token needed
node scripts/api_test.js

# Requires SLACK_SDK_TEST_BOT_TOKEN
node scripts/auth_test.js
node scripts/pagination.js
node scripts/conversations_invite.js

# Requires SLACK_SDK_TEST_SOCKET_MODE_APP_TOKEN
node scripts/socket-mode.js

# Requires SLACK_TOOLING_TOKEN
node scripts/apps_manifest_test.js

# Requires SLACK_SDK_TEST_GRID_*_TOKEN vars
node scripts/admin/usersSessionSettings.js
```

## Environment Variables

See [`.env.sample`](./.env.sample) for the complete list with descriptions.

## App Manifests

The [`manifests/`](./manifests/) directory contains ready-to-use app manifest JSON files.
Each file can be pasted directly into the Slack app creation flow at
[api.slack.com/apps](https://api.slack.com/apps) when selecting "From an app manifest."
