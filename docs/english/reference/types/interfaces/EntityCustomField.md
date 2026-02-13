[@slack/types](../index.md) / EntityCustomField

# Interface: EntityCustomField

Defined in: [message-metadata.ts:270](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L270)

## Properties

### alt\_text?

```ts
optional alt_text: string;
```

Defined in: [message-metadata.ts:281](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L281)

***

### boolean?

```ts
optional boolean: 
  | EntityBooleanCheckboxField
  | EntityBooleanTextField;
```

Defined in: [message-metadata.ts:287](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L287)

***

### edit?

```ts
optional edit: EntityEditSupport;
```

Defined in: [message-metadata.ts:283](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L283)

***

### entity\_ref?

```ts
optional entity_ref: EntityRefField;
```

Defined in: [message-metadata.ts:286](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L286)

***

### format?

```ts
optional format: string;
```

Defined in: [message-metadata.ts:278](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L278)

***

### icon?

```ts
optional icon: EntityIconField;
```

Defined in: [message-metadata.ts:276](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L276)

***

### image\_url?

```ts
optional image_url: string;
```

Defined in: [message-metadata.ts:279](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L279)

***

### item\_type?

```ts
optional item_type: string;
```

Defined in: [message-metadata.ts:284](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L284)

***

### key

```ts
key: string;
```

Defined in: [message-metadata.ts:272](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L272)

***

### label

```ts
label: string;
```

Defined in: [message-metadata.ts:271](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L271)

***

### link?

```ts
optional link: string;
```

Defined in: [message-metadata.ts:275](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L275)

***

### long?

```ts
optional long: boolean;
```

Defined in: [message-metadata.ts:277](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L277)

***

### slack\_file?

```ts
optional slack_file: SlackFile;
```

Defined in: [message-metadata.ts:280](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L280)

***

### tag\_color?

```ts
optional tag_color: string;
```

Defined in: [message-metadata.ts:282](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L282)

***

### type

```ts
type: string;
```

Defined in: [message-metadata.ts:273](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L273)

***

### user?

```ts
optional user: 
  | EntityUserIDField
  | EntityUserField;
```

Defined in: [message-metadata.ts:285](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L285)

***

### value?

```ts
optional value: string | number | EntityArrayItemField[];
```

Defined in: [message-metadata.ts:274](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L274)
