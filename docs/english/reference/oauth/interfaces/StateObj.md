[@slack/oauth](../index.md) / StateObj

# Interface: StateObj

Defined in: [src/state-stores/interface.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/state-stores/interface.ts#L6)

The data structure represented by the state parameter.

## Properties

### installOptions

```ts
installOptions: InstallURLOptions;
```

Defined in: [src/state-stores/interface.ts:15](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/state-stores/interface.ts#L15)

The passed InstallURLOptions object when generating this state parameter.

***

### now

```ts
now: Date;
```

Defined in: [src/state-stores/interface.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/state-stores/interface.ts#L10)

The timestamp that the state object was generated.

***

### random?

```ts
optional random: string | number;
```

Defined in: [src/state-stores/interface.ts:16](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/state-stores/interface.ts#L16)
