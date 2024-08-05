# Interface: UsersSetPhotoArguments

## Extends

- `TokenOverridable`

## Properties

### crop\_w?

```ts
optional crop_w: number;
```

#### Description

Width/height of crop box (always square).

#### Defined in

[packages/web-api/src/types/request/users.ts:51](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/users.ts#L51)

***

### crop\_x?

```ts
optional crop_x: number;
```

#### Description

X coordinate of top-left corner of crop box.

#### Defined in

[packages/web-api/src/types/request/users.ts:53](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/users.ts#L53)

***

### crop\_y?

```ts
optional crop_y: number;
```

#### Description

Y coordinate of top-left corner of crop box.

#### Defined in

[packages/web-api/src/types/request/users.ts:55](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/users.ts#L55)

***

### image

```ts
image: Buffer | Stream;
```

#### Description

Image file contents.

#### Defined in

[packages/web-api/src/types/request/users.ts:49](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/users.ts#L49)

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

[packages/web-api/src/types/request/common.ts:43](https://github.com/slackapi/node-slack-sdk/blob/7b348598b763c2b7545d1042b5f0429775cfa62c/packages/web-api/src/types/request/common.ts#L43)
