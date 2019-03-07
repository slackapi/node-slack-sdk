import 'mocha';
import { check } from 'typings-tester';

describe('typescript typings tests', () => {
  it('should allow WebClient to work without a token', () => {
    check([`${__dirname}/sources/webclient-no-token.ts`], `${__dirname}/tsconfig-strict.json`);
  });

  it('should export method argument types and enforce strictness in the right ways', () => {
    check([`${__dirname}/sources/method-argument-types.ts`], `${__dirname}/tsconfig-strict.json`);
  });
});
