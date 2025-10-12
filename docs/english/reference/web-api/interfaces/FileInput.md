[@slack/web-api](../index.md) / FileInput

# Interface: FileInput

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:166

## Description

Allows user to upload files. In order to use the `file_input` element within your app,
your app must have the `files:read` scope.

## See

[File input element reference](https://docs.slack.dev/reference/block-kit/block-elements/file-input-element).

## Extends

- [`Actionable`](Actionable.md)

## Properties

### action\_id?

```ts
optional action_id: string;
```

Defined in: node\_modules/@slack/types/dist/block-kit/extensions.d.ts:12

@description: An identifier for this action. You can use this when you receive an interaction payload to
[identify the source of the action](https://docs.slack.dev/interactivity/handling-user-interaction#payloads). Should be unique
among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.

#### Inherited from

[`Actionable`](Actionable.md).[`action_id`](Actionable.md#action_id)

***

### filetypes?

```ts
optional filetypes: string[];
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:176

#### Description

An array of valid [file extensions](https://docs.slack.dev/reference/objects/file-object) that will be accepted
for this element. All file extensions will be accepted if `filetypes` is not specified. This validation is provided
for convenience only, and you should perform your own file type validation based on what you expect to receive.

***

### max\_files?

```ts
optional max_files: number;
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:181

#### Description

Maximum number of files that can be uploaded for this `file_input` element. Minimum of `1`, maximum of
`10`. Defaults to `10` if not specified.

***

### type

```ts
type: "file_input";
```

Defined in: node\_modules/@slack/types/dist/block-kit/block-elements.d.ts:170

#### Description

The type of element. In this case `type` is always `file_input`.

#### Overrides

[`Actionable`](Actionable.md).[`type`](Actionable.md#type)
