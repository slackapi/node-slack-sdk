# App Manifests for Integration Tests

This directory contains example `manifest.json` files for the Slack apps required
to run the production integration tests.

## Overview

| Manifest File | Purpose | Token Env Variable(s) |
|---|---|---|
| `main-bot-app.manifest.json` | Primary bot for Web API tests | `SLACK_SDK_TEST_BOT_TOKEN`, `SLACK_SDK_TEST_USER_TOKEN` |
| `slack-connect-sender.manifest.json` | Slack Connect sender workspace bot | `SLACK_SDK_TEST_CONNECT_INVITE_SENDER_BOT_TOKEN` |
| `slack-connect-receiver.manifest.json` | Slack Connect receiver workspace bot | `SLACK_SDK_TEST_CONNECT_INVITE_RECEIVER_BOT_TOKEN` |
| `socket-mode-app.manifest.json` | Socket Mode listener | `SLACK_SDK_TEST_SOCKET_MODE_APP_TOKEN` |
| `admin-app.manifest.json` | Enterprise Grid admin operations | `SLACK_SDK_TEST_GRID_WORKSPACE_ADMIN_USER_TOKEN`, `SLACK_SDK_TEST_GRID_ORG_ADMIN_USER_TOKEN` |

## How to Use These Manifests

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click **Create New App** > **From an app manifest**
3. Select the target workspace
4. Paste the contents of the relevant manifest file (choose JSON format)
5. Review and create the app
6. Install the app to the workspace and note the generated tokens

### Special Setup

**Slack Connect tests** require two apps in two *different* workspaces that both have
Slack Connect enabled. You must manually create a shared channel between the two
workspaces and add both bots as members before running the tests.

**Admin tests** require an Enterprise Grid organization. The admin app must be
installed at the org level by an Org Admin. The user tokens (`xoxp-`) come from
admin users who authorize the app — these are not bot tokens.

**Socket Mode app** requires generating an app-level token with `connections:write`
scope after creating the app. Go to **App Settings > Basic Information > App-Level Tokens**
to generate this token (`xapp-`).

**Tooling token** (`SLACK_TOOLING_TOKEN`) is a configuration token not associated
with any of these manifests. Generate it via the [App Configuration Tokens](https://api.slack.com/authentication/config-tokens) flow.

## Scope Justification

### main-bot-app (bot scopes)

| Scope | Reason |
|-------|--------|
| `bookmarks:read` | `bookmarks.list` in bookmarks tests |
| `bookmarks:write` | `bookmarks.add/edit/remove` in bookmarks tests |
| `channels:history` | Reading channel history |
| `channels:manage` | Creating/archiving test channels |
| `channels:read` | Listing channels |
| `chat:write` | `chat.scheduleMessage` tests |
| `conversations.connect:manage` | Slack Connect invite listing |
| `conversations.connect:read` | Slack Connect invite listing |
| `team.billing:read` | `team.billing.info` test |
| `team.preferences:read` | `team.preferences.list` test |
| `users:read` | Listing users for test setup |

### main-bot-app (user scopes)

| Scope | Reason |
|-------|--------|
| `channels:history` | `auth.test` with user token |
| `channels:read` | `auth.test` with user token |
| `users:read` | `auth.test` with user token |

### slack-connect-sender

| Scope | Reason |
|-------|--------|
| `channels:manage` | Creating channels to share |
| `conversations.connect:manage` | Managing Slack Connect invites |
| `conversations.connect:read` | Listing Slack Connect invites |
| `conversations.connect:write` | Sending Slack Connect invites |

### slack-connect-receiver

| Scope | Reason |
|-------|--------|
| `conversations.connect:manage` | Accepting/approving Slack Connect invites |
| `conversations.connect:read` | Reading Slack Connect invite details |

### socket-mode-app

| Scope | Reason |
|-------|--------|
| `app_mentions:read` | Receiving `app_mention` events |
| `channels:history` | Receiving message events |
| `chat:write` | Responding to events |

### admin-app (user scopes)

| Scope | Reason |
|-------|--------|
| `admin.analytics:read` | `admin.analytics.getFile` |
| `admin.conversations:read` | Reading channel retention, bulk operations |
| `admin.conversations:write` | Bulk archive/delete/move, custom retention |
| `admin.roles:read` | `admin.roles.listAssignments` |
| `admin.roles:write` | Role assignment operations |
| `admin.users:read` | Session settings, unsupported versions export |
| `admin.users:write` | Session reset/clear operations |
