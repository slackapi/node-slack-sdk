import { Installation, InstallationStore, InstallationQuery } from '../index';
import { Logger } from '../logger';
import fs from 'fs';
import path from 'path';
import { homedir } from 'os';

export interface FileInstallationOptions {
  baseDir?: string;
  historicalDataEnabled?: boolean;
  clientId?: string;
}

export class FileInstallationStore implements InstallationStore {

  private baseDir: string;
  private historicalDataEnabled: boolean;

  constructor({
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

    if (logger !== undefined) { logger.warn('Storing installation in FileInstallationStore'); }

    // Create Installation Directory
    fs.mkdir(installationDir, { recursive: true }, (err) => {
      if (err !== null) { return console.error(err); }
    });

    try {
      writeToFile(`${installationDir}/app-latest`, installationData);
      writeToFile(`${installationDir}/user-${user.id}-latest`, installationData);

      if (this.historicalDataEnabled) {
        const currentUTC = Date.now();
        writeToFile(`${installationDir}/app-${currentUTC}`, installationData);
        writeToFile(`${installationDir}/user-${user.id}-${currentUTC}`, installationData);
      }
    } catch (err) {
      throw new Error('Failed to save installation to FileInstallationStore');
    }
  }

  public async fetchInstallation(query: InstallationQuery<boolean>, logger?: Logger): Promise<Installation> {
    const { enterpriseId, teamId } = query;
    const installationDir = this.getInstallationDir(enterpriseId, teamId);

    if (logger !== undefined) { logger.warn('Retrieving installation from FileInstallationStore'); }

    try {
      const data = fs.readFileSync(path.resolve(`${installationDir}/app-latest`));
      const installation: Installation = JSON.parse(data.toString());
      return installation;
    } catch (err) {
      throw new Error('Failed to fetch data from FileInstallationStore');
    }
  }

  public async deleteInstallation(query: InstallationQuery<boolean>, logger?: Logger): Promise<void> {
    const { enterpriseId, teamId, userId } = query;
    const installationDir = this.getInstallationDir(enterpriseId, teamId);

    if (logger !== undefined) { logger.warn('Deleting installation from FileInstallationStore'); }

    let filesToDelete: string[] = ['app-latest'];

    const appFiles = fs.readdirSync(installationDir).filter(file => file.includes('app-'));
    filesToDelete = filesToDelete.concat(appFiles);

    if (userId !== undefined) {
      const userFiles = fs.readdirSync(installationDir).filter(file => file.includes(`user-${userId}-`));
      filesToDelete = filesToDelete.concat(userFiles);
    }

    try {
      filesToDelete.map(filePath => deleteFile(path.resolve(`${installationDir}/${filePath}`)));
    } catch (err) {
      throw new Error('Failed to delete installation from FileInstallationStore');
    }
  }

  private getInstallationDir(enterpriseId = '', teamId = ''): string {
    let installDir = `${this.baseDir}/${enterpriseId}`;

    if (teamId !== '') {
      installDir += (enterpriseId !== '') ? `-${teamId}` : `${teamId}`;
    }

    return installDir;
  }
}

function writeToFile(filePath: string, data: string): void {
  fs.writeFile(filePath, data, (err) => {
    if (err !== null) {
      throw new Error('There was an error writing to the InstallationStore');
    }
  });
}

function deleteFile(filePath: string): void {
  fs.unlink(path.resolve(filePath), (err) => {
    if (err !== null) {
      throw new Error('Failed to delete installation from FileInstallationStore');
    }
  });
}
