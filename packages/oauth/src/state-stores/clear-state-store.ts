import { sign, verify } from 'jsonwebtoken';
import { InstallURLOptions } from '../install-url-options';
import { StateStore, StateObj } from './interface';
import { InvalidStateError } from '../errors';

// default implementation of StateStore
export default class ClearStateStore implements StateStore {
  private stateSecret: string;

  private stateExpirationSeconds: number;

  public constructor(
    stateSecret: string,
    stateExpirationSeconds: number = 600,
  ) {
    this.stateSecret = stateSecret;
    this.stateExpirationSeconds = stateExpirationSeconds;
  }

  public async generateStateParam(
    installOptions: InstallURLOptions,
    now: Date,
  ): Promise<string> {
    const source = {
      installOptions,
      now: now.toJSON(),
    };
    return sign(source, this.stateSecret);
  }

  public async verifyStateParam(
    now: Date,
    state: string,
  ): Promise<InstallURLOptions> {
    // decode the state using the secret
    let decoded: StateObj;
    try {
      decoded = verify(state, this.stateSecret) as StateObj;
    } catch (e) {
      const message = `Failed to load the data represented by the state parameter (error: ${e})`;
      throw new InvalidStateError(message);
    }
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
