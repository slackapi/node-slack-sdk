/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { assert } from 'chai';
import { StateStore } from './interface';
import { InstallURLOptions } from '../install-url-options';

export interface StateStoreChaiTestRunnerArgs {
  stateStore: StateStore;
  shouldVerifyOnlyOnce?: boolean;
}

export class StateStoreChaiTestRunner {
  private stateStore: StateStore;

  private shouldVerifyOnlyOnce: boolean;

  public constructor(args: StateStoreChaiTestRunnerArgs) {
    this.stateStore = args.stateStore;
    this.shouldVerifyOnlyOnce = args.shouldVerifyOnlyOnce === undefined ?
      true :
      args.shouldVerifyOnlyOnce;
  }

  public async enableTests(testTarget: string): Promise<void> {
    describe(testTarget, () => {
      it('should generate and verify valid state values', async () => {
        const { stateStore } = this;
        const options: InstallURLOptions = {
          scopes: ['commands', 'chat:write'],
          teamId: 'T111',
          redirectUri: 'https://www.example.com/slack/oauth_redirect',
          userScopes: ['search:read'],
          metadata: 'the metadata',
        };
        const state = await stateStore.generateStateParam(options, new Date());
        assert.isNotEmpty(state);
        const result = await stateStore.verifyStateParam(new Date(), state);
        assert.deepEqual(result, options);
      });

      it('should detect old state values', async () => {
        const { stateStore } = this;
        const installUrlOptions = { scopes: ['channels:read'] };
        const fifteenMinutesLater = new Date(
          new Date().getTime() + 15 * 60 * 1000,
        );
        const state = await stateStore.generateStateParam(
          installUrlOptions,
          new Date(),
        );
        try {
          await stateStore.verifyStateParam(fifteenMinutesLater, state);
          assert.fail('Exception should be thrown');
        } catch (e: any) {
          assert.equal(e.code, 'slack_oauth_invalid_state');
        }
      });

      if (this.shouldVerifyOnlyOnce) {
        it('should detect multiple consumption', async () => {
          const { stateStore } = this;
          const installUrlOptions = { scopes: ['channels:read'] };
          Array.from(Array(200)).forEach(async () => {
            // generate other states
            await stateStore.generateStateParam(installUrlOptions, new Date());
          });
          const state = await stateStore.generateStateParam(
            installUrlOptions,
            new Date(),
          );
          const result = await stateStore.verifyStateParam(new Date(), state);
          assert.exists(result);
          let expectedlyReturnedResult;
          try {
            expectedlyReturnedResult = await stateStore.verifyStateParam(
              new Date(),
              state,
            );
            assert.fail('Exception should be thrown');
          } catch (e: any) {
            assert.equal(
              e.code,
              'slack_oauth_invalid_state',
              `${state} ${JSON.stringify(expectedlyReturnedResult)}`,
            );
          }
        });
      }
    });
  }
}
