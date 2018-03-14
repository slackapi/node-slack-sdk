import 'mocha';
import { check, checkDirectory } from 'typings-tester';

describe('typescript typings tests', () => {
  it('should allow WebClient to work without a token', () => {
    check([`${__dirname}/sources/webclient-no-token.ts`], `${__dirname}/tsconfig-strict.json`);
  });
});

