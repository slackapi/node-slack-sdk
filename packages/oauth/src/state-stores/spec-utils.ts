import { assert } from 'chai';

import type { InstallURLOptions } from '../install-url-options';
import type { StateStore } from './interface';

export interface StateStoreChaiTestRunnerArgs {
  stateStore: StateStore;
  shouldVerifyOnlyOnce?: boolean;
}

export class StateStoreChaiTestRunner {
  private stateStore: StateStore;

  private shouldVerifyOnlyOnce: boolean;

  public constructor(args: StateStoreChaiTestRunnerArgs) {
    this.stateStore = args.stateStore;
    this.shouldVerifyOnlyOnce = args.shouldVerifyOnlyOnce === undefined ? true : args.shouldVerifyOnlyOnce;
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
        const fifteenMinutesLater = new Date(new Date().getTime() + 15 * 60 * 1000);
        const state = await stateStore.generateStateParam(installUrlOptions, new Date());
        try {
          await stateStore.verifyStateParam(fifteenMinutesLater, state);
          assert.fail('Exception should be thrown');
          // biome-ignore lint/suspicious/noExplicitAny: errors can be anything
        } catch (e: any) {
          assert.equal(e.code, 'slack_oauth_invalid_state');
        }
      });

      if (this.shouldVerifyOnlyOnce) {
        it('should detect multiple consumption', async () => {
          const { stateStore } = this;
          const installUrlOptions = { scopes: ['channels:read'] };
          for (let i = 0; i < 100; i++) {
            // generate other states
            const date = new Date();
            await stateStore.generateStateParam(installUrlOptions, date);
            console.log('\tgenerateStateParam:', i, 100, date);
          }
          const state = await stateStore.generateStateParam(installUrlOptions, new Date());

          // Wait 0.5 second to ensure I/O is complete and avoid flaky test results from rapid I/O
          await new Promise((resolve, _) => setTimeout(resolve, 500));
          console.log('\tsetTimeout: complete');

          const result = await stateStore.verifyStateParam(new Date(), state);
          assert.exists(result);
          let expectedlyReturnedResult: InstallURLOptions = { scopes: [] };
          try {
            expectedlyReturnedResult = await stateStore.verifyStateParam(new Date(), state);
            assert.fail('Exception should be thrown');
            // biome-ignore lint/suspicious/noExplicitAny: errors can be anything
          } catch (e: any) {
            assert.equal(e.code, 'slack_oauth_invalid_state', `${state} ${JSON.stringify(expectedlyReturnedResult)}`);
          }
        }).timeout(5000); // https://github.com/slackapi/node-slack-sdk/issues/2159#issuecomment-2749367820
      }
    });
  }
}
