[@slack/types](../index.md) / GroupRenameEvent

# Interface: GroupRenameEvent

Defined in: [events/group.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/group.ts#L43)

## Properties

### channel

```ts
channel: object;
```

Defined in: [events/group.ts:45](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/group.ts#L45)

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

Defined in: [events/group.ts:53](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/group.ts#L53)

***

### type

```ts
type: "group_rename";
```

Defined in: [events/group.ts:44](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/group.ts#L44)
