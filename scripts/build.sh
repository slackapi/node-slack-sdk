#!/usr/bin/env bash
set -e

# Build packages without internal dependencies
npm run build --workspace=packages/cli-hooks
npm run build --workspace=packages/cli-test

# Build base dependencies
npm run build --workspace=packages/logger
npm run build --workspace=packages/types

# Build packages requiring base dependencies
npm run build --workspace=packages/web-api
npm run build --workspace=packages/webhook

# Build packages that depend on the Web API
npm run build --workspace=packages/oauth
npm run build --workspace=packages/rtm-api
npm run build --workspace=packages/socket-mode
