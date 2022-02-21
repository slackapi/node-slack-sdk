export interface InstallURLOptions {
  scopes: string | string[];
  teamId?: string;
  redirectUri?: string;
  userScopes?: string | string[]; // cannot be used with authVersion=v1
  metadata?: string; // Arbitrary data can be stored here, potentially to save app state or use for custom redirect
}
