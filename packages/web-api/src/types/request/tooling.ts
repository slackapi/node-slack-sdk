// https://api.slack.com/methods/tooling.tokens.rotate
export interface ToolingTokensRotateArguments {
  /** @description The `xoxe` refresh token that was issued along with the old app configuration token. */
  refresh_token: string;
}
