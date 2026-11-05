[@slack/types](../index.md) / ChannelRenameEvent

# Interface: ChannelRenameEvent

Defined in: [events/channel.ts:60](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/channel.ts#L60)

## Properties

### channel

```ts
channel: object;
```

Defined in: [events/channel.ts:62](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/channel.ts#L62)

#### created

```ts
created: number;
```

#### id

```ts
id: string;
```

#### is\_channel

```ts
is_channel: boolean;
```

#### is\_mpim

```ts
is_mpim: boolean;
```

#### name

```ts
name: string;
```

#### name\_normalized

```ts
name_normalized: string;
```

***

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/channel.ts:70](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/channel.ts#L70)

***

### type

```ts
type: "channel_rename";
```

Defined in: [events/channel.ts:61](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/channel.ts#L61)
