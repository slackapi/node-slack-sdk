# Interface: DialogOpenArguments

## Extends

- `TokenOverridable`

## Properties

### dialog

```ts
dialog: Dialog;
```

#### Description

The dialog definition.

#### Defined in

[packages/web-api/src/types/request/dialog.ts:9](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/dialog.ts#L9)

***

### token?

```ts
optional token: string;
```

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`

#### Defined in

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/common.ts#L43)

***

### trigger\_id

```ts
trigger_id: string;
```

#### Description

Exchange a trigger to post to the user.

#### Defined in

[packages/web-api/src/types/request/dialog.ts:7](https://github.com/slackapi/node-slack-sdk/blob/c15385ef93ccdde9702f52f7d1f445999203d794/packages/web-api/src/types/request/dialog.ts#L7)
