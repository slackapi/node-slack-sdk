import { homedir } from 'os';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { StateStore, StateObj } from './interface';
import { InstallURLOptions } from '../install-url-options';
import { InvalidStateError } from '../errors';

export interface FileStateStoreArgs {
  stateExpirationSeconds?: number;
  baseDir?: string;
}

export class FileStateStore implements StateStore {
  private baseDir: string;

  private stateExpirationSeconds: number;

  public constructor(args: FileStateStoreArgs) {
    this.baseDir = args.baseDir !== undefined ?
      args.baseDir :
      `${homedir()}/.bolt-js-oauth-states`;
    this.stateExpirationSeconds = args.stateExpirationSeconds !== undefined ?
      args.stateExpirationSeconds :
      600;
  }

  public async generateStateParam(
    installOptions: InstallURLOptions,
    now: Date,
  ): Promise<string> {
    const state = randomUUID();
    const source: StateObj = {
      installOptions,
      now,
      random: Math.floor(Math.random() * 1000000),
    };
    this.writeToFile(state, source);
    return state;
  }

  public async verifyStateParam(
    now: Date,
    state: string,
  ): Promise<InstallURLOptions> {
    try {
      if (this.findFile(state)) {
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
      }
    } finally {
      this.deleteFile(state);
    }
    throw new InvalidStateError('The state value is already expired');
  }

  // -------------------------------------------
  // private methods
  // -------------------------------------------

  private writeToFile(filename: string, data: StateObj): void {
    fs.mkdirSync(this.baseDir, { recursive: true });
    const fullpath = path.resolve(`${this.baseDir}/${filename}`);
    fs.writeFileSync(fullpath, JSON.stringify(data));
  }

  private findFile(filename: string): boolean {
    const fullpath = path.resolve(`${this.baseDir}/${filename}`);
    return fs.existsSync(fullpath);
  }

  private readFile(filename: string): StateObj | undefined {
    const fullpath = path.resolve(`${this.baseDir}/${filename}`);
    try {
      const data = fs.readFileSync(fullpath);
      if (data !== undefined) {
        return JSON.parse(data.toString());
      }
      return undefined;
    } catch (_) {
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
