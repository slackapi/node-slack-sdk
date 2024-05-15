/**
 * Test fixture types!
 */

export interface TestFixture {
  team?: TestTeam; // team(s) for test to occur with
  user?: TestUser; // actor(s) performing test actions
}

export interface TestTeam {
  id: string;
  subdomain: string;
  name: string;
  product: string;
  loginUrl?: string; // URL to access for login
  isOktaLogin?: boolean; // true - CLI should attempt to login via Okta
}

export interface TestUser {
  id: string;
  email: string;
  password: string;
  username: string;
}

/**
 * Constants
 */

export const SlackProduct = {
  FREE: 'FREE',
  PRO: 'PRO',
  BUSINESS_PLUS: 'PLUS',
  ENTERPRISE: 'ENTERPRISE',
  ENTERPRISE_SANDBOX: 'ENTERPRISE_SANDBOX',
  ENTERPRISE_SELECT: 'ENTERPRISE_SELECT',
};
