// This is intentionally structurally identical to AuthorizeSourceData
// from App. It is redefined so that this class remains loosely coupled to
// the rest of Bolt.
export interface InstallationQuery<isEnterpriseInstall extends boolean> {
  teamId: isEnterpriseInstall extends false ? string : undefined;
  enterpriseId: isEnterpriseInstall extends true ? string : string | undefined;
  userId?: string;
  conversationId?: string;
  isEnterpriseInstall: isEnterpriseInstall;
}

export type OrgInstallationQuery = InstallationQuery<true>;
