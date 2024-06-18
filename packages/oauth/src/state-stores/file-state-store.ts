import fs from 'fs';
import { homedir } from 'os';
import path from 'path';

import { ConsoleLogger, Logger } from '@slack/logger';

import { StateObj, StateStore } from './interface';
import { InvalidStateError } from '../errors';
import { InstallURLOptions } from '../install-url-options';

export interface FileStateStoreArgs {
  stateExpirationSeconds?: number;
  baseDir?: string;
  logger?: Logger;
}

export class FileStateStore implements StateStore {
  private baseDir: string;

  private stateExpirationSeconds: number;

  private logger: Logger;

  public constructor(args: FileStateStoreArgs) {
    this.baseDir = args.baseDir !== undefined ?
      args.baseDir :
      `${homedir()}/.bolt-js-oauth-states`;
    this.stateExpirationSeconds = args.stateExpirationSeconds !== undefined ?
      args.stateExpirationSeconds :
      600;
    this.logger = args.logger !== undefined ? args.logger : new ConsoleLogger();
  }

  public async generateStateParam(
    installOptions: InstallURLOptions,
    now: Date,
  ): Promise<string> {
    let state = generateRandomString();
    while (this.alreadyExists(state)) {
      // Still race condition can arise here
      state = generateRandomString();
    }
    const source: StateObj = { installOptions, now };
    this.writeToFile(state, source);
    return state;
  }

  public async verifyStateParam(
    now: Date,
    state: string,
  ): Promise<InstallURLOptions> {
    try {
      // decode the state using the secret
      let decoded: StateObj | undefined;
      try {
        decoded = this.readFile(state);
      } catch (e) {
        const message = `Failed to load the data represented by the state parameter (error: ${e})`;
        throw new InvalidStateError(message);
      }
      if (decoded !== undefined) {
        // Check if the state value is not too old
        const generatedAt = new Date(decoded.now);
        const passedSeconds = Math.floor(
          (now.getTime() - generatedAt.getTime()) / 1000,
        );
        if (passedSeconds > this.stateExpirationSeconds) {
          throw new InvalidStateError('The state value is already expired');
        }
        // return installOptions
        return decoded.installOptions;
      }
    } finally {
      this.deleteFile(state);
    }
    throw new InvalidStateError('The state value is already expired');
  }

  // -------------------------------------------
  // private methods
  // -------------------------------------------

  private alreadyExists(filename: string): boolean {
    const fullpath = path.resolve(`${this.baseDir}/${filename}`);
    return fs.existsSync(fullpath);
  }

  private writeToFile(filename: string, data: StateObj): void {
    fs.mkdirSync(this.baseDir, { recursive: true });
    const fullpath = path.resolve(`${this.baseDir}/${filename}`);
    fs.writeFileSync(fullpath, JSON.stringify(data));
  }

  private readFile(filename: string): StateObj | undefined {
    const fullpath = path.resolve(`${this.baseDir}/${filename}`);
    try {
      const data = fs.readFileSync(fullpath);
      if (data !== undefined) {
        return JSON.parse(data.toString());
      }
      return undefined;
    } catch (e) {
      this.logger.debug(`Failed to load state data from file (error: ${e})`);
      return undefined;
    }
  }

  private deleteFile(filename: string): void {
    const fullpath = path.resolve(`${this.baseDir}/${filename}`);
    if (fs.existsSync(fullpath)) {
      fs.unlinkSync(fullpath);
    }
  }
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateRandomString(length: number = 10): string {
  let generated = '';
  for (let i = 0; i < length; i += 1) {
    const position = Math.floor(Math.random() * chars.length);
    generated += chars.charAt(position);
  }
  return generated;
}
