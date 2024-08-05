# Interface: FileInput

## Description

Allows user to upload files. In order to use the `file_input` element within your app,
your app must have the `files:read` scope.

## See

[File input element reference](https://api.slack.com/reference/block-kit/block-elements#file_input).

## Extends

- [`Actionable`](Actionable.md)

## Properties

### action\_id?

```ts
optional action_id: string;
```

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://api.slack.com/interactivity/handling#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Inherited from

[`Actionable`](Actionable.md).[`action_id`](Actionable.md#action_id)

#### Defined in

[block-kit/extensions.ts:15](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/extensions.ts#L15)

***

### filetypes?

```ts
optional filetypes: string[];
```

#### Description

An array of valid [file extensions](https://api.slack.com/types/file#types) that will be accepted
for this element. All file extensions will be accepted if `filetypes` is not specified. This validation is provided
for convenience only, and you should perform your own file type validation based on what you expect to receive.

#### Defined in

[block-kit/block-elements.ts:164](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/block-elements.ts#L164)

***

### max\_files?

```ts
optional max_files: number;
```

#### Description

Maximum number of files that can be uploaded for this `file_input` element. Minimum of `1`, maximum of
`10`. Defaults to `10` if not specified.

#### Defined in

[block-kit/block-elements.ts:169](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/block-elements.ts#L169)

***

### type

```ts
type: "file_input";
```

#### Description

The type of element. In this case `type` is always `file_input`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)

#### Defined in

[block-kit/block-elements.ts:158](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/types/src/block-kit/block-elements.ts#L158)
