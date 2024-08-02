# Interface: StateObj

The data structure represented by the state parameter.

## Properties

### installOptions

```ts
installOptions: InstallURLOptions;
```

The passed InstallURLOptions object when generating this state parameter.

#### Defined in

[packages/oauth/src/state-stores/interface.ts:16](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/oauth/src/state-stores/interface.ts#L16)

***

### now

```ts
now: Date;
```

The timestamp that the state object was generated.

#### Defined in

[packages/oauth/src/state-stores/interface.ts:11](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/oauth/src/state-stores/interface.ts#L11)

***

### random?

```ts
optional random: string | number;
```

#### Defined in

[packages/oauth/src/state-stores/interface.ts:17](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/oauth/src/state-stores/interface.ts#L17)
