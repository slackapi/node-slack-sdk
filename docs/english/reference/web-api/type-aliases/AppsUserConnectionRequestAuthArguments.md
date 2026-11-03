[@slack/web-api](../index.md) / AppsUserConnectionRequestAuthArguments

# Type Alias: AppsUserConnectionRequestAuthArguments

```ts
type AppsUserConnectionRequestAuthArguments = TokenOverridable & UserConnectionTriggerID | UserConnectionUserID & object;
```

Defined in: [packages/web-api/src/types/request/apps.ts:102](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/apps.ts#L102)

## Type Declaration

### primary\_provider

```ts
primary_provider: UserConnectionPrimaryProvider;
```

#### Description

The connection to render. Its `icon_url` defaults to the app's own avatar when omitted.
