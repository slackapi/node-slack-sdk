[@slack/types](../index.md) / EmojiChangedEvent

# Interface: EmojiChangedEvent

Defined in: [events/emoji.ts:2](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/emoji.ts#L2)

## Properties

### event\_ts

```ts
event_ts: string;
```

Defined in: [events/emoji.ts:10](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/emoji.ts#L10)

***

### name?

```ts
optional name: string;
```

Defined in: [events/emoji.ts:6](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/emoji.ts#L6)

***

### names?

```ts
optional names: string[];
```

Defined in: [events/emoji.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/emoji.ts#L5)

***

### new\_name?

```ts
optional new_name: string;
```

Defined in: [events/emoji.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/emoji.ts#L9)

***

### old\_name?

```ts
optional old_name: string;
```

Defined in: [events/emoji.ts:8](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/emoji.ts#L8)

***

### subtype

```ts
subtype: "add" | "remove" | "rename";
```

Defined in: [events/emoji.ts:4](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/emoji.ts#L4)

***

### type

```ts
type: "emoji_changed";
```

Defined in: [events/emoji.ts:3](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/emoji.ts#L3)

***

### value?

```ts
optional value: string;
```

Defined in: [events/emoji.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/events/emoji.ts#L7)
