import fs from 'fs';
import { homedir } from 'os';
import path from 'path';

import { Installation, InstallationQuery, InstallationStore } from '../index';
import { Logger } from '../logger';

export interface FileInstallationOptions {
  baseDir?: string;
  historicalDataEnabled?: boolean;
  clientId?: string;
}

export default class FileInstallationStore implements InstallationStore {
  private baseDir: string;

  private historicalDataEnabled: boolean;

  public constructor({
    baseDir = `${homedir()}/.bolt-js-app-installation`,
    clientId,
    historicalDataEnabled = true,
  }: FileInstallationOptions = {}) {
    this.baseDir = clientId !== undefined ? `${baseDir}/${clientId}` : baseDir;
    this.historicalDataEnabled = historicalDataEnabled;
  }

  public async storeInstallation(installation: Installation, logger?: Logger): Promise<void> {
    const { enterprise, team, user } = installation;
    const installationData = JSON.stringify(installation);
    const installationDir = this.getInstallationDir(enterprise?.id, team?.id);

    if (logger !== undefined) {
      const dataForLogging = {
        enterprise,
        team,
        // user object can include token values
        user: { id: user.id },
      };
      logger.info(`Storing installation in ${installationDir} for ${JSON.stringify(dataForLogging)}`);
      logger.warn('FileInstallationStore is not intended for production purposes.');
    }

    // Create Installation Directory
    fs.mkdirSync(installationDir, { recursive: true });

    try {
      writeToFile(`${installationDir}/app-latest`, installationData);
      writeToFile(`${installationDir}/user-${user.id}-latest`, installationData);

      if (this.historicalDataEnabled) {
        const currentUTC = Date.now();
        writeToFile(`${installationDir}/app-${currentUTC}`, installationData);
        writeToFile(`${installationDir}/user-${user.id}-${currentUTC}`, installationData);
      }
    } catch (err) {
      throw new Error(`Failed to save installation to FileInstallationStore (error: ${err})`);
    }
  }

  public async fetchInstallation(query: InstallationQuery<boolean>, logger?: Logger): Promise<Installation> {
    const { enterpriseId, teamId, isEnterpriseInstall } = query;
    const installationDir = this.getInstallationDir(enterpriseId, teamId, isEnterpriseInstall);

    if (logger !== undefined) {
      logger.info(`Retrieving installation from ${installationDir} with the following query: ${JSON.stringify(query)}`);
    }

    if (isEnterpriseInstall && enterpriseId === undefined) {
      throw new Error('enterpriseId is required to fetch data of an enterprise installation');
    }

    try {
      const data = fs.readFileSync(path.resolve(`${installationDir}/app-latest`));
      const installation: Installation = JSON.parse(data.toString());
      if (query.userId && installation.user.id !== query.userId) {
        try {
          const userData = fs.readFileSync(path.resolve(`${installationDir}/user-${query.userId}-latest`));
          if (userData !== undefined && userData !== null) {
            const userInstallation: Installation = JSON.parse(userData.toString());
            installation.user = userInstallation.user;
          }
        } catch (err) {
          logger?.debug(`The user-token installation for the request user (user_id: ${query.userId}) was not found.`);
          delete installation.user.token;
          delete installation.user.refreshToken;
          delete installation.user.expiresAt;
          delete installation.user.scopes;
        }
      }
      return installation;
    } catch (err) {
      throw new Error(`No installation data found (enterprise_id: ${query.enterpriseId}, team_id: ${query.teamId}, user_id: ${query.userId})`);
    }
  }

  public async deleteInstallation(query: InstallationQuery<boolean>, logger?: Logger): Promise<void> {
    const { enterpriseId, teamId, userId } = query;
    const installationDir = this.getInstallationDir(enterpriseId, teamId);

    if (logger !== undefined) {
      logger.info(`Deleting installations in ${installationDir} with the following query: ${JSON.stringify(query)}`);
    }

    let filesToDelete: string[] = [];

    if (userId === undefined) {
      const allFiles = fs.readdirSync(installationDir);
      filesToDelete = filesToDelete.concat(allFiles);
    } else {
      const userFiles = fs.readdirSync(installationDir).filter((file) => file.includes(`user-${userId}-`));
      filesToDelete = filesToDelete.concat(userFiles);
    }

    try {
      filesToDelete.forEach((filePath) => deleteFile(path.resolve(`${installationDir}/${filePath}`)));
    } catch (err) {
      throw new Error(`Failed to delete installation from FileInstallationStore (error: ${err})`);
    }
  }

  private getInstallationDir(enterpriseId = '', teamId = '', isEnterpriseInstall = false): string {
    let installDir = `${this.baseDir}/${enterpriseId}`;
    if (teamId !== '' && !isEnterpriseInstall) {
      installDir += (enterpriseId !== '') ? `-${teamId}` : `${teamId}`;
    }
    return installDir;
  }
}

function writeToFile(filePath: string, data: string): void {
  fs.writeFileSync(filePath, data);
}

function deleteFile(filePath: string): void {
  fs.unlinkSync(path.resolve(filePath));
}
