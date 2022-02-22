import { sign, verify } from 'jsonwebtoken';
import { InstallURLOptions } from '../install-url-options';
import { StateStore, StateObj } from './interface';

// default implementation of StateStore
export default class ClearStateStore implements StateStore {
  private stateSecret: string;

  public constructor(stateSecret: string) {
    this.stateSecret = stateSecret;
  }

  public async generateStateParam(installOptions: InstallURLOptions, now: Date): Promise<string> {
    return sign({ installOptions, now: now.toJSON() }, this.stateSecret);
  }

  public async verifyStateParam(_now: Date, state: string): Promise<InstallURLOptions> {
    // decode the state using the secret
    const decoded: StateObj = verify(state, this.stateSecret) as StateObj;

    // return installOptions
    return decoded.installOptions;
  }
}
