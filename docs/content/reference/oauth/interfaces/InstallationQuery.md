[@slack/oauth](../index.md) / InstallationQuery

# Interface: InstallationQuery\<isEnterpriseInstall\>

Defined in: [src/installation-query.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-query.ts#L4)

## Type Parameters

### isEnterpriseInstall

`isEnterpriseInstall` *extends* `boolean`

## Properties

### conversationId?

```ts
optional conversationId: string;
```

Defined in: [src/installation-query.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-query.ts#L8)

***

### enterpriseId

```ts
enterpriseId: isEnterpriseInstall extends true ? string : undefined | string;
```

Defined in: [src/installation-query.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-query.ts#L6)

***

### isEnterpriseInstall

```ts
isEnterpriseInstall: isEnterpriseInstall;
```

Defined in: [src/installation-query.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-query.ts#L4)

***

### teamId

```ts
teamId: isEnterpriseInstall extends false ? string : undefined;
```

Defined in: [src/installation-query.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-query.ts#L5)

***

### userId?

```ts
optional userId: string;
```

Defined in: [src/installation-query.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-query.ts#L7)
