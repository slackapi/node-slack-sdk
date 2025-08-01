[@slack/web-api](../index.md) / DialogOpenArguments

# Interface: DialogOpenArguments

Defined in: [src/types/request/dialog.ts:5](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/dialog.ts#L5)

## Extends

- `TokenOverridable`

## Properties

### dialog

```ts
dialog: Dialog;
```

Defined in: [src/types/request/dialog.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/dialog.ts#L9)

#### Description

The dialog definition.

***

### token?

```ts
optional token: string;
```

Defined in: [src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

```ts
TokenOverridable.token
```

***

### trigger\_id

```ts
trigger_id: string;
```

Defined in: [src/types/request/dialog.ts:7](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/dialog.ts#L7)

#### Description

Exchange a trigger to post to the user.
