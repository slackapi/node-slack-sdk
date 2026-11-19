[@slack/types](../index.md) / RawNumberElement

# Interface: RawNumberElement

Defined in: [block-kit/composition-objects.ts:179](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L179)

## Description

Defines an object containing a numeric value.

## Properties

### text

```ts
text: string;
```

Defined in: [block-kit/composition-objects.ts:191](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L191)

#### Description

The text used to display the value. The minimum length is 1 character.

***

### type

```ts
type: "raw_number";
```

Defined in: [block-kit/composition-objects.ts:183](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L183)

#### Description

The formatting to use for this numeric object.

***

### value

```ts
value: number;
```

Defined in: [block-kit/composition-objects.ts:187](https://github.com/slackapi/node-slack-sdk/blob/main/packages/types/src/block-kit/composition-objects.ts#L187)

#### Description

The numeric value.
