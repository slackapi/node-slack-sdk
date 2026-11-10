[@slack/web-api](../index.md) / UsersSetPhotoArguments

# Interface: UsersSetPhotoArguments

Defined in: [packages/web-api/src/types/request/users.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L50)

## Extends

- `TokenOverridable`

## Properties

### crop\_w?

```ts
crop_w?: number;
```

Defined in: [packages/web-api/src/types/request/users.ts:54](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L54)

#### Description

Width/height of crop box (always square).

***

### crop\_x?

```ts
crop_x?: number;
```

Defined in: [packages/web-api/src/types/request/users.ts:56](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L56)

#### Description

X coordinate of top-left corner of crop box.

***

### crop\_y?

```ts
crop_y?: number;
```

Defined in: [packages/web-api/src/types/request/users.ts:58](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L58)

#### Description

Y coordinate of top-left corner of crop box.

***

### image

```ts
image: Buffer<ArrayBufferLike> | Stream;
```

Defined in: [packages/web-api/src/types/request/users.ts:52](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L52)

#### Description

Image file contents.

***

### token?

```ts
token?: string;
```

Defined in: [packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/common.ts#L43)

#### Description

Overridable authentication token bearing required scopes.

#### Inherited from

`TokenOverridable.token`
