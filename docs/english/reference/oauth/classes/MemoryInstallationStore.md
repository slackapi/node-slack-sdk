[@slack/oauth](../index.md) / MemoryInstallationStore

# Class: MemoryInstallationStore

Defined in: [src/installation-stores/memory-store.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/memory-store.ts#L11)

## Implements

- [`InstallationStore`](../interfaces/InstallationStore.md)

## Constructors

### Constructor

```ts
new MemoryInstallationStore(): MemoryInstallationStore;
```

#### Returns

`MemoryInstallationStore`

## Properties

### devDB

```ts
devDB: DevDatabase = {};
```

Defined in: [src/installation-stores/memory-store.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/memory-store.ts#L12)

## Methods

### deleteInstallation()

```ts
deleteInstallation(query, logger?): Promise<void>;
```

Defined in: [src/installation-stores/memory-store.ts:62](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/memory-store.ts#L62)

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

Defined in: [src/installation-stores/memory-store.ts:38](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/memory-store.ts#L38)

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

Defined in: [src/installation-stores/memory-store.ts:14](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/memory-store.ts#L14)

#### Parameters

##### installation

[`Installation`](../interfaces/Installation.md)

##### logger?

[`Logger`](../interfaces/Logger.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`InstallationStore`](../interfaces/InstallationStore.md).[`storeInstallation`](../interfaces/InstallationStore.md#storeinstallation)
