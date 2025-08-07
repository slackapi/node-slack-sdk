[@slack/types](../index.md) / ChannelCreatedEvent

# Interface: ChannelCreatedEvent

Defined in: [events/channel.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/channel.ts#L9)

## Properties

### channel

```ts
channel: object;
```

Defined in: [events/channel.ts:12](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/channel.ts#L12)

#### context\_team\_id

```ts
context_team_id: string;
```

#### created

```ts
created: number;
```

#### creator

```ts
creator: string;
```

#### id

```ts
id: string;
```

#### is\_archived

```ts
is_archived: boolean;
```

#### is\_channel

```ts
is_channel: boolean;
```

#### is\_ext\_shared

```ts
is_ext_shared: boolean;
```

#### is\_frozen

```ts
is_frozen: boolean;
```

#### is\_general

```ts
is_general: boolean;
```

#### is\_group

```ts
is_group: boolean;
```

#### is\_im

```ts
is_im: boolean;
```

#### is\_mpim

```ts
is_mpim: boolean;
```

#### is\_org\_shared

```ts
is_org_shared: boolean;
```

#### is\_pending\_ext\_shared

```ts
is_pending_ext_shared: boolean;
```

#### is\_private

```ts
is_private: boolean;
```

#### is\_shared

```ts
is_shared: boolean;
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

Defined in: [events/channel.ts:11](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/channel.ts#L11)

***

### type

```ts
type: "channel_created";
```

Defined in: [events/channel.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/channel.ts#L10)
