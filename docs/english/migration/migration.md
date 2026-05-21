# Migrating packages

The Node Slack SDK exists as a single repo containing a confederation of independent packages (`@slack/web-api`, `@slack/webhook`, `@slack/socket-mode`, etc.). Each package can be upgraded independently on its own schedule.

:::tip [For information about how long each Node version is supported, see the [support schedule](/tools/node-slack-sdk/support-schedule).]

## Legacy migration guides

The **Legacy** section contains migration guides for old major versions of the Node Slack SDK. These guides reflect an outdated approach where all packages in the SDK were released together as a coordinated release. Today, each package evolves independently. For example, the `@slack/web-api` package may be at v8 while `@slack/socket-mode` may be at v3.

If you're upgrading from very old versions, the legacy guides provide historical context, but you'll likely want to follow the package-specific guides below for current migrations.

