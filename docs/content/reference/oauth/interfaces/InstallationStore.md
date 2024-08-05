# Interface: InstallationStore

## Properties

### deleteInstallation()?

```ts
optional deleteInstallation: (query, logger?) => Promise<void>;
```

#### Parameters

• **query**: [`InstallationQuery`](InstallationQuery.md)\<`boolean`\>

• **logger?**: `any`

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/oauth/src/installation-stores/interface.ts:14](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/oauth/src/installation-stores/interface.ts#L14)

***

### fetchInstallation()

```ts
fetchInstallation: (query, logger?) => Promise<Installation<"v1" | "v2", boolean>>;
```

#### Parameters

• **query**: [`InstallationQuery`](InstallationQuery.md)\<`boolean`\>

• **logger?**: `any`

#### Returns

`Promise`\<[`Installation`](Installation.md)\<`"v1"` \| `"v2"`, `boolean`\>\>

#### Defined in

[packages/oauth/src/installation-stores/interface.ts:11](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/oauth/src/installation-stores/interface.ts#L11)

## Methods

### storeInstallation()

```ts
storeInstallation<AuthVersion>(installation, logger?): Promise<void>
```

#### Type Parameters

• **AuthVersion** *extends* `"v1"` \| `"v2"`

#### Parameters

• **installation**: [`Installation`](Installation.md)\<`AuthVersion`, `boolean`\>

• **logger?**: `any`

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/oauth/src/installation-stores/interface.ts:7](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/oauth/src/installation-stores/interface.ts#L7)
