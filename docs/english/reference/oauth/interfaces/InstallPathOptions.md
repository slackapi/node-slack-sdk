[@slack/oauth](../index.md) / InstallPathOptions

# Interface: InstallPathOptions

Defined in: [src/install-path-options.ts:9](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-path-options.ts#L9)

Customizable callbacks that are supposed to be called
inside InstallProvider#handleInstallPath() method.

## Properties

### beforeRedirection()?

```ts
optional beforeRedirection: (request, response, options?) => Promise<boolean>;
```

Defined in: [src/install-path-options.ts:21](https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/install-path-options.ts#L21)

Customize the response headers and body data for
additional user-specific data handling such as acccount mapping and activity tracking.

When this method returns false, the InstallProvider skips
the following operations including the redirection to Slack authorize URL.
You can set false when the visiting user is not eligible to proceed with the Slack app installation flow.

Also, when returning false, this method is responsible for calling the response#end() method
to build a complete HTTP response for end-users.

#### Parameters

##### request

`IncomingMessage`

##### response

`ServerResponse`

##### options?

[`InstallURLOptions`](InstallURLOptions.md)

#### Returns

`Promise`\<`boolean`\>
