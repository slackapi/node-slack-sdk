[@slack/types](../index.md) / EntityArrayItemField

# Interface: EntityArrayItemField

Defined in: [message-metadata.ts:188](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L188)

## Extends

- `Omit`\<[`EntityTypedField`](EntityTypedField.md), `"type"`\>

## Properties

### alt\_text?

```ts
optional alt_text: string;
```

Defined in: [message-metadata.ts:202](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L202)

#### Inherited from

[`EntityTypedField`](EntityTypedField.md).[`alt_text`](EntityTypedField.md#alt_text)

***

### edit?

```ts
optional edit: EntityEditSupport;
```

Defined in: [message-metadata.ts:203](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L203)

#### Inherited from

[`EntityTypedField`](EntityTypedField.md).[`edit`](EntityTypedField.md#edit)

***

### entity\_ref?

```ts
optional entity_ref: EntityRefField;
```

Defined in: [message-metadata.ts:206](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L206)

#### Inherited from

[`EntityTypedField`](EntityTypedField.md).[`entity_ref`](EntityTypedField.md#entity_ref)

***

### format?

```ts
optional format: string;
```

Defined in: [message-metadata.ts:199](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L199)

#### Inherited from

[`EntityTypedField`](EntityTypedField.md).[`format`](EntityTypedField.md#format)

***

### icon?

```ts
optional icon: EntityIconField;
```

Defined in: [message-metadata.ts:197](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L197)

#### Inherited from

[`EntityTypedField`](EntityTypedField.md).[`icon`](EntityTypedField.md#icon)

***

### image\_url?

```ts
optional image_url: string;
```

Defined in: [message-metadata.ts:200](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L200)

#### Inherited from

[`EntityTypedField`](EntityTypedField.md).[`image_url`](EntityTypedField.md#image_url)

***

### label?

```ts
optional label: string;
```

Defined in: [message-metadata.ts:194](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L194)

#### Inherited from

[`EntityTypedField`](EntityTypedField.md).[`label`](EntityTypedField.md#label)

***

### link?

```ts
optional link: string;
```

Defined in: [message-metadata.ts:196](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L196)

#### Inherited from

[`EntityTypedField`](EntityTypedField.md).[`link`](EntityTypedField.md#link)

***

### long?

```ts
optional long: boolean;
```

Defined in: [message-metadata.ts:198](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L198)

#### Inherited from

[`EntityTypedField`](EntityTypedField.md).[`long`](EntityTypedField.md#long)

***

### slack\_file?

```ts
optional slack_file: SlackFile;
```

Defined in: [message-metadata.ts:201](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L201)

#### Inherited from

[`EntityTypedField`](EntityTypedField.md).[`slack_file`](EntityTypedField.md#slack_file)

***

### tag\_color?

```ts
optional tag_color: string;
```

Defined in: [message-metadata.ts:204](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L204)

#### Inherited from

[`EntityTypedField`](EntityTypedField.md).[`tag_color`](EntityTypedField.md#tag_color)

***

### type?

```ts
optional type: string;
```

Defined in: [message-metadata.ts:189](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L189)

***

### user?

```ts
optional user: 
  | EntityUserIDField
  | EntityUserField;
```

Defined in: [message-metadata.ts:205](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L205)

#### Inherited from

[`EntityTypedField`](EntityTypedField.md).[`user`](EntityTypedField.md#user)

***

### value?

```ts
optional value: string | number;
```

Defined in: [message-metadata.ts:195](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/message-metadata.ts#L195)

#### Inherited from

[`EntityTypedField`](EntityTypedField.md).[`value`](EntityTypedField.md#value)
