[@slack/oauth](../index.md) / InstallationStore

# Interface: InstallationStore

Defined in: [src/installation-stores/interface.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/interface.ts#L5)

## Properties

### deleteInstallation()?

```ts
optional deleteInstallation: (query, logger?) => Promise<void>;
```

Defined in: [src/installation-stores/interface.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/interface.ts#L16)

#### Parameters

##### query

[`InstallationQuery`](InstallationQuery.md)\<`boolean`\>

##### logger?

[`Logger`](Logger.md)

#### Returns

`Promise`\<`void`\>

***

### fetchInstallation()

```ts
fetchInstallation: (query, logger?) => Promise<Installation<"v1" | "v2", boolean>>;
```

Defined in: [src/installation-stores/interface.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/interface.ts#L11)

#### Parameters

##### query

[`InstallationQuery`](InstallationQuery.md)\<`boolean`\>

##### logger?

[`Logger`](Logger.md)

#### Returns

`Promise`\<[`Installation`](Installation.md)\<`"v1"` \| `"v2"`, `boolean`\>\>

## Methods

### storeInstallation()

```ts
storeInstallation<AuthVersion>(installation, logger?): Promise<void>;
```

Defined in: [src/installation-stores/interface.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/interface.ts#L6)

#### Type Parameters

##### AuthVersion

`AuthVersion` *extends* `"v1"` \| `"v2"`

#### Parameters

##### installation

[`Installation`](Installation.md)\<`AuthVersion`, `boolean`\>

##### logger?

[`Logger`](Logger.md)

#### Returns

`Promise`\<`void`\>
