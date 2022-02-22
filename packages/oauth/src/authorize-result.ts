// This is intentionally structurally identical to AuthorizeResult from App
// It is redefined so that this class remains loosely coupled to the rest
// of Bolt.
export interface AuthorizeResult {
  botToken?: string;
  botRefreshToken?: string;
  botTokenExpiresAt?: number; // utc, seconds
  userToken?: string;
  userRefreshToken?: string;
  userTokenExpiresAt?: number; // utc, seconds
  botId?: string;
  botUserId?: string;
  teamId?: string;
  enterpriseId?: string;
}
