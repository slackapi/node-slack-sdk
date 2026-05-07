# Production Server Integration Tests

End-to-end integration tests that run against real Slack APIs to verify the
`@slack/web-api` and `@slack/socket-mode` packages work correctly.

## Prerequisites

1. **Link local packages** to test the latest code from this repository:

```bash
# For Web API tests
./link-web-api.sh

# For Socket Mode tests
./link-socket-mode.sh
```

2. **Create the required Slack apps** using the manifests in [`manifests/`](./manifests/).
   See [`manifests/README.md`](./manifests/README.md) for detailed setup instructions.

3. **Configure environment variables** by copying the sample file:

```bash
cp .env.sample .env
# Edit .env and fill in your tokens/IDs
```

The `dotenv` package loads `.env` automatically when tests run.

## Running Tests

### All tests

```bash
npm test
```

### Individual test suites

```bash
# Core Web API tests (auth, chat.scheduleMessage, Slack Connect, team.*)
npx mocha --require dotenv/config --timeout 10000 test/web-api.js

# Bookmarks CRUD
npx mocha --require dotenv/config --timeout 10000 test/bookmarks-web-api.js

# Admin: session settings + auth policy
npx mocha --require dotenv/config --timeout 10000 test/admin-web-api.js

# Admin: analytics
npx mocha --require dotenv/config --timeout 10000 test/admin-web-api-analytics.js

# Admin: bulk archive/delete/move
npx mocha --require dotenv/config --timeout 10000 test/admin-web-api-conversations-bulk.js

# Admin: custom retention
npx mocha --require dotenv/config --timeout 10000 test/admin-web-api-custom-retention.js

# Admin: roles
npx mocha --require dotenv/config --timeout 10000 test/admin-web-api-roles.js

# Admin: user sessions reset
npx mocha --require dotenv/config --timeout 10000 test/admin-web-api-user-sessions.js

# Admin: unsupported versions export
npx mocha --require dotenv/config --timeout 10000 test/admin-web-api-users-unsupportedVersions-export.js
```

### Example scripts

```bash
# No token needed
npx node scripts/api_test.js

# Requires SLACK_BOT_TOKEN
npx node scripts/auth_test.js
npx node scripts/pagination.js

# Requires SLACK_SDK_TEST_BOT_TOKEN
npx node scripts/conversations_invite.js

# Requires SLACK_SDK_TEST_SOCKET_MODE_APP_TOKEN
npx node scripts/socket-mode.js

# Requires SLACK_TOOLING_TOKEN
npx node scripts/apps_manifest_test.js

# Requires SLACK_SDK_TEST_GRID_*_TOKEN vars
npx node scripts/admin/usersSessionSettings.js
```

## Environment Variables

See [`.env.sample`](./.env.sample) for the complete list with descriptions. Summary:

| Variable | Source App | Used By |
|---|---|---|
| `SLACK_SDK_TEST_BOT_TOKEN` | main-bot-app | web-api, bookmarks, conversations_invite |
| `SLACK_SDK_TEST_USER_TOKEN` | main-bot-app (user OAuth) | web-api |
| `SLACK_SDK_TEST_WEB_TEST_CHANNEL_ID` | — (channel in workspace) | chat.scheduleMessage test |
| `SLACK_SDK_TEST_CONNECT_INVITE_SENDER_BOT_TOKEN` | slack-connect-sender | Slack Connect tests |
| `SLACK_SDK_TEST_CONNECT_INVITE_RECEIVER_BOT_TOKEN` | slack-connect-receiver | Slack Connect tests |
| `SLACK_SDK_TEST_CONNECT_INVITE_RECEIVER_BOT_USER_ID` | — (user ID) | Slack Connect tests |
| `SLACK_SDK_TEST_GRID_WORKSPACE_ADMIN_USER_TOKEN` | admin-app (user OAuth) | all admin tests |
| `SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN` | admin-app (user OAuth) | all admin tests |
| `SLACK_SDK_TEST_GRID_SECONDARY_WORKSPACE_ID` | — (team ID) | admin bulk move test |
| `SLACK_SDK_TEST_GRID_USER_ID` | — (user ID, optional) | admin auth policy test |
| `SLACK_SDK_TEST_SOCKET_MODE_APP_TOKEN` | socket-mode-app | Socket Mode script |
| `SLACK_BOT_TOKEN` | main-bot-app (or any) | auth_test, pagination scripts |
| `SLACK_TOOLING_TOKEN` | — (configuration token) | apps_manifest_test script |

## App Manifests

The [`manifests/`](./manifests/) directory contains ready-to-use app manifest JSON files.
Each file can be pasted directly into the Slack app creation flow at
[api.slack.com/apps](https://api.slack.com/apps) when selecting "From an app manifest."
