First off, you need to link `@slack/*` packages to `../packages/*` to verify the latest revision's behavior.

```bash
./link.sh
```

### How to run tests

```bash
# with all of the bot scopes
export SLACK_SDK_TEST_BOT_TOKEN=xoxb-
# with all of the user scopes
export SLACK_SDK_TEST_USER_TOKEN=xoxp-
# admin user's token for a workspace in an Enterprise Grid org
export SLACK_SDK_TEST_GRID_WORKSPACE_ADMIN_USER_TOKEN=xoxp-
# org-level admin user's token
export SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN=xoxp-

npm test
```

### How to run example scripts

```bash
# some examples may use different env variable names
export SLACK_BOT_TOKEN=xoxb-(your own token)
# Run the script
npx node scripts/pagination.js # or whatever you want to run
```
