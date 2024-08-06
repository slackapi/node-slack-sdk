# Class: FileInstallationStore

## Implements

- [`InstallationStore`](Interface.InstallationStore.md)

## Constructors

### new FileInstallationStore()

```ts
new FileInstallationStore(__namedParameters): FileInstallationStore
```

#### Parameters

• **\_\_namedParameters**: `FileInstallationOptions` = `{}`

#### Returns

[`FileInstallationStore`](Class.FileInstallationStore.md)

#### Defined in

[packages/oauth/src/installation-stores/file-store.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/file-store.ts#L19)

## Methods

### deleteInstallation()

```ts
deleteInstallation(query, logger?): Promise<void>
```

#### Parameters

• **query**: [`InstallationQuery`](Interface.InstallationQuery.md)\<`boolean`\>

• **logger?**: `any`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`InstallationStore`](Interface.InstallationStore.md).[`deleteInstallation`](Interface.InstallationStore.md#deleteinstallation)

#### Defined in

[packages/oauth/src/installation-stores/file-store.ts:97](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/file-store.ts#L97)

***

### fetchInstallation()

```ts
fetchInstallation(query, logger?): Promise<Installation<"v1" | "v2", boolean>>
```

#### Parameters

• **query**: [`InstallationQuery`](Interface.InstallationQuery.md)\<`boolean`\>

• **logger?**: `any`

#### Returns

`Promise`\<[`Installation`](Interface.Installation.md)\<`"v1"` \| `"v2"`, `boolean`\>\>

#### Implementation of

[`InstallationStore`](Interface.InstallationStore.md).[`fetchInstallation`](Interface.InstallationStore.md#fetchinstallation)

#### Defined in

[packages/oauth/src/installation-stores/file-store.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/file-store.ts#L61)

***

### storeInstallation()

```ts
storeInstallation(installation, logger?): Promise<void>
```

#### Parameters

• **installation**: [`Installation`](Interface.Installation.md)\<`"v1"` \| `"v2"`, `boolean`\>

• **logger?**: `any`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`InstallationStore`](Interface.InstallationStore.md).[`storeInstallation`](Interface.InstallationStore.md#storeinstallation)

#### Defined in

[packages/oauth/src/installation-stores/file-store.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/file-store.ts#L28)
