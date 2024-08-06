# Class: MemoryInstallationStore

## Implements

- [`InstallationStore`](Interface.InstallationStore.md)

## Constructors

### new MemoryInstallationStore()

```ts
new MemoryInstallationStore(): MemoryInstallationStore
```

#### Returns

[`MemoryInstallationStore`](Class.MemoryInstallationStore.md)

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

• **query**: [`InstallationQuery`](Interface.InstallationQuery.md)\<`boolean`\>

• **logger?**: `any`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`InstallationStore`](Interface.InstallationStore.md).[`deleteInstallation`](Interface.InstallationStore.md#deleteinstallation)

#### Defined in

[packages/oauth/src/installation-stores/memory-store.ts:59](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/memory-store.ts#L59)

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

[packages/oauth/src/installation-stores/memory-store.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/memory-store.ts#L38)

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

[packages/oauth/src/installation-stores/memory-store.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/memory-store.ts#L14)
