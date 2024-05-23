const slackEslintConfig = require('../../lint-configs/.eslintrc');
// Same eslint config as the other packages in this monorepo, with some package-specific tweaks listed below

// Don't check object property name convention; we want to allow kebab case for CLI flags which is not easy to support in eslint
const overrideIndex = slackEslintConfig.overrides.findIndex((o) => o.files.includes('**/*.js') && o.files.includes('**/*.ts'));
const selectorIndex = slackEslintConfig.overrides[overrideIndex].rules['@typescript-eslint/naming-convention'].findIndex((s) => s.selector == 'objectLiteralProperty');
slackEslintConfig.overrides[overrideIndex].rules['@typescript-eslint/naming-convention'][selectorIndex] = {
  'selector': 'objectLiteralProperty',
  format: null
};

// Otherwise export the common config.
module.exports = {
  ...slackEslintConfig,
}
