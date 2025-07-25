[@slack/oauth](../index.md) / FileInstallationStore

# Class: FileInstallationStore

Defined in: [src/installation-stores/file-store.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/file-store.ts#L14)

## Implements

- [`InstallationStore`](../interfaces/InstallationStore.md)

## Constructors

### Constructor

```ts
new FileInstallationStore(__namedParameters): FileInstallationStore;
```

Defined in: [src/installation-stores/file-store.ts:19](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/file-store.ts#L19)

#### Parameters

##### \_\_namedParameters

`FileInstallationOptions` = `{}`

#### Returns

`FileInstallationStore`

## Methods

### deleteInstallation()

```ts
deleteInstallation(query, logger?): Promise<void>;
```

Defined in: [src/installation-stores/file-store.ts:99](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/file-store.ts#L99)

#### Parameters

##### query

[`InstallationQuery`](../interfaces/InstallationQuery.md)\<`boolean`\>

##### logger?

[`Logger`](../interfaces/Logger.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`InstallationStore`](../interfaces/InstallationStore.md).[`deleteInstallation`](../interfaces/InstallationStore.md#deleteinstallation)

***

### fetchInstallation()

```ts
fetchInstallation(query, logger?): Promise<Installation<"v1" | "v2", boolean>>;
```

Defined in: [src/installation-stores/file-store.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/file-store.ts#L61)

#### Parameters

##### query

[`InstallationQuery`](../interfaces/InstallationQuery.md)\<`boolean`\>

##### logger?

[`Logger`](../interfaces/Logger.md)

#### Returns

`Promise`\<[`Installation`](../interfaces/Installation.md)\<`"v1"` \| `"v2"`, `boolean`\>\>

#### Implementation of

[`InstallationStore`](../interfaces/InstallationStore.md).[`fetchInstallation`](../interfaces/InstallationStore.md#fetchinstallation)

***

### storeInstallation()

```ts
storeInstallation(installation, logger?): Promise<void>;
```

Defined in: [src/installation-stores/file-store.ts:28](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/file-store.ts#L28)

#### Parameters

##### installation

[`Installation`](../interfaces/Installation.md)

##### logger?

[`Logger`](../interfaces/Logger.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`InstallationStore`](../interfaces/InstallationStore.md).[`storeInstallation`](../interfaces/InstallationStore.md#storeinstallation)
