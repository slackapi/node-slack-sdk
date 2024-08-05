# Class: MemoryInstallationStore

## Implements

- [`InstallationStore`](../interfaces/InstallationStore.md)

## Constructors

### new MemoryInstallationStore()

```ts
new MemoryInstallationStore(): MemoryInstallationStore
```

#### Returns

[`MemoryInstallationStore`](MemoryInstallationStore.md)

## Properties

### devDB

```ts
devDB: DevDatabase = {};
```

#### Defined in

[packages/oauth/src/installation-stores/memory-store.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/memory-store.ts#L12)

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

[packages/oauth/src/installation-stores/memory-store.ts:59](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/memory-store.ts#L59)

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

[packages/oauth/src/installation-stores/memory-store.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/memory-store.ts#L38)

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

[packages/oauth/src/installation-stores/memory-store.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/memory-store.ts#L14)
