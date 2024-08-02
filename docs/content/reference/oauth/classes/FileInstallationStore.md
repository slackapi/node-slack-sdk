# Class: FileInstallationStore

## Implements

- [`InstallationStore`](../interfaces/InstallationStore.md)

## Constructors

### new FileInstallationStore()

```ts
new FileInstallationStore(__namedParameters): FileInstallationStore
```

#### Parameters

• **\_\_namedParameters**: `FileInstallationOptions` = `{}`

#### Returns

[`FileInstallationStore`](FileInstallationStore.md)

#### Defined in

[packages/oauth/src/installation-stores/file-store.ts:19](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/oauth/src/installation-stores/file-store.ts#L19)

## Methods

### deleteInstallation()

```ts
deleteInstallation(query, logger?): Promise<void>
```

#### Parameters

• **query**: [`InstallationQuery`](../interfaces/InstallationQuery.md)\<`boolean`\>

• **logger?**: `any`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`InstallationStore`](../interfaces/InstallationStore.md).[`deleteInstallation`](../interfaces/InstallationStore.md#deleteinstallation)

#### Defined in

[packages/oauth/src/installation-stores/file-store.ts:97](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/oauth/src/installation-stores/file-store.ts#L97)

***

### fetchInstallation()

```ts
fetchInstallation(query, logger?): Promise<Installation<"v1" | "v2", boolean>>
```

#### Parameters

• **query**: [`InstallationQuery`](../interfaces/InstallationQuery.md)\<`boolean`\>

• **logger?**: `any`

#### Returns

`Promise`\<[`Installation`](../interfaces/Installation.md)\<`"v1"` \| `"v2"`, `boolean`\>\>

#### Implementation of

[`InstallationStore`](../interfaces/InstallationStore.md).[`fetchInstallation`](../interfaces/InstallationStore.md#fetchinstallation)

#### Defined in

[packages/oauth/src/installation-stores/file-store.ts:61](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/oauth/src/installation-stores/file-store.ts#L61)

***

### storeInstallation()

```ts
storeInstallation(installation, logger?): Promise<void>
```

#### Parameters

• **installation**: [`Installation`](../interfaces/Installation.md)\<`"v1"` \| `"v2"`, `boolean`\>

• **logger?**: `any`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`InstallationStore`](../interfaces/InstallationStore.md).[`storeInstallation`](../interfaces/InstallationStore.md#storeinstallation)

#### Defined in

[packages/oauth/src/installation-stores/file-store.ts:28](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/oauth/src/installation-stores/file-store.ts#L28)
