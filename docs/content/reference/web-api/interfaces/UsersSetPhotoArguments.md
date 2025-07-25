[@slack/web-api](../index.md) / UsersSetPhotoArguments

# Interface: UsersSetPhotoArguments

Defined in: [src/types/request/users.ts:50](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L50)

## Extends

- `TokenOverridable`

## Properties

### crop\_w?

```ts
optional crop_w: number;
```

Defined in: [src/types/request/users.ts:54](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L54)

#### Description

Width/height of crop box (always square).

***

### crop\_x?

```ts
optional crop_x: number;
```

Defined in: [src/types/request/users.ts:56](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L56)

#### Description

X coordinate of top-left corner of crop box.

***

### crop\_y?

```ts
optional crop_y: number;
```

Defined in: [src/types/request/users.ts:58](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L58)

#### Description

Y coordinate of top-left corner of crop box.

***

### image

```ts
image: Buffer<ArrayBufferLike> | Stream;
```

Defined in: [src/types/request/users.ts:52](https://github.com/slackapi/node-slack-sdk/blob/main/packages/web-api/src/types/request/users.ts#L52)

#### Description

Image file contents.

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
