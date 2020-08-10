module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-typescript/base',
    /* TODO: Uncomment rule below once jsdoc comments are added. 
      This matches the jsdoc rules in the TSLint config */
    // "plugin:jsdoc/recommended",
    'prettier',
    'prettier/@typescript-eslint',
    './eslint-config-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['**/*.spec.ts', 'src/test-helpers.ts'],
  rules: {
    'import/first': ['off'],
    'import/prefer-default-export': ['off'],
    'max-classes-per-file': ['off', 1],
    'import/no-cycle': ['off'],
    '@typescript-eslint/no-use-before-define': 'off',
    'no-nested-ternary': 'off',
    'consistent-return': 'off',
  },
};
