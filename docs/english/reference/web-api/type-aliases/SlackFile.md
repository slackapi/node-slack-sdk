[@slack/web-api](../index.md) / SlackFile

# Type Alias: SlackFile

```ts
type SlackFile = SlackFileViaUrl | SlackFileViaId;
```

Defined in: packages/web-api/node\_modules/@slack/types/dist/block-kit/composition-objects.d.ts:221

## Description

Defines an object containing Slack file information to be used in an image block or image element.
This file https://docs.slack.dev/reference/objects/file-object must be an image and you must provide either the URL or ID. In addition,
the user posting these blocks must have access to this file. If both are provided then the payload will be rejected.
Currently only `png`, `jpg`, `jpeg`, and `gif` Slack image files are supported.

## See

[Slack File object reference](https://docs.slack.dev/reference/block-kit/composition-objects/slack-file-object).
