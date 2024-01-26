// SlackAPI JavaScript style
// ---
// This style helps maintainers enforce safe and consistent programming practices in this project. It is not meant to be
// comprehensive on its own or vastly different from existing styles. The goal is to inherit and aggregate as many of
// the communities' recommended styles for the technologies used as we can. When, and only when, we have a stated need
// to differentiate, we add more rules (or modify options). Therefore, the fewer rules directly defined in this file,
// the better.
//
// These styles are a subset of the shared JavaScript and TypeScript configurations to only target JavaScript packages.

module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2022
    },

    // Ignore all build outputs and artifacts (node_modules, dotfiles, and dot directories are implicitly ignored)
    ignorePatterns: [
        '/coverage',
    ],

    // These environments contain lists of global variables which are allowed to be accessed
    //
    // The target node version (v18) supports all needed ES2022 features: https://node.green
    env: {
        es2022: true,
        node: true,
    },

    extends: [
        // ESLint's recommended built-in rules: https://eslint.org/docs/rules/
        'eslint:recommended',

        // Node plugin's recommended rules: https://github.com/mysticatea/eslint-plugin-node
        'plugin:node/recommended',

        // AirBnB style guide (without React) rules: https://github.com/airbnb/javascript.
        'airbnb-base',

        // JSDoc plugin's recommended rules
        'plugin:jsdoc/recommended',
    ],

    rules: {
        // JavaScript rules
        // ---
        // The top level of this configuration contains rules which apply to JavaScript.
        //
        // This section does not contain rules meant to override options or disable rules in the base configurations
        // (ESLint, Node, AirBnb). Those rules are added in the final override.

        // Eliminate tabs to standardize on spaces for indentation. If you want to use tabs for something other than
        // indentation, you may need to turn this rule off using an inline config comments.
        'no-tabs': 'error',

        // Bans use of comma as an operator because it can obscure side effects and is often an accident.
        'no-sequences': 'error',

        // Disallow the use of process.exit()
        'node/no-process-exit': 'error',

        // Allow safe references to functions before the declaration.
        'no-use-before-define': ['error', 'nofunc'],

        // Allow scripts for hooks implementations.
        'node/shebang': 'off',

        // Allow unlimited classes in a file.
        'max-classes-per-file': 'off',

        // Disallow invocations of require(). This will help make imports more consistent and ensures a smoother
        // transition to the best future syntax.
        'import/no-commonjs': ['error', {
            allowConditionalRequire: false,
        }],

        // Don't verify that all named imports are part of the set of named exports for the referenced module. The
        // TypeScript compiler will already perform this check, so it is redundant.
        'import/named': 'off',
        'node/no-missing-import': 'off',

        // Require extensions for imported modules
        'import/extensions': ['error', 'ignorePackages', {
            'js': 'always',
        }],

        // Allow use of import and export syntax, despite it not being supported in the node versions. Since this
        // project is transpiled, the ignore option is used. Overrides node/recommended.
        'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],

        'operator-linebreak': ['error', 'after', {
            overrides: { '=': 'none' }
        }],
    },

    overrides: [
        {
            files: ['**/*.js'],
            rules: {
                // Override rules
                // ---
                // This level of this configuration contains rules which override options or disable rules in the base
                // configurations in JavaScript.

                // Increase the max line length to 120. The rest of this setting is copied from the AirBnB config.
                'max-len': ['error', 120, 2, {
                    ignoreUrls: true,
                    ignoreComments: false,
                    ignoreRegExpLiterals: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                }],

                // Restrict the use of backticks to declare a normal string. Template literals should only be used when the
                // template string contains placeholders. The rest of this setting is copied from the AirBnb config.
                quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],

                // The server side Slack API uses snake_case for parameters often.
                //
                // For mocking and override support, we need to allow snake_case.
                // Allow leading underscores for parameter names, which is used to acknowledge unused variables in TypeScript.
                // Also, enforce camelCase naming for variables. Ideally, the leading underscore could be restricted to only
                // unused parameter names, but this rule isn't capable of knowing when a variable is unused. The camelcase and
                // no-underscore-dangle rules are replaced with the naming-convention rule because this single rule can serve
                // both purposes, and it works fine on non-TypeScript code.
                camelcase: 'error',
                'no-underscore-dangle': 'error',
                'no-unused-vars': [
                    'error',
                    {
                        varsIgnorePattern: '^_',
                        argsIgnorePattern: '^_'
                    }
                ],

                // Allow cyclical imports. Turning this rule on is mainly a way to manage the performance concern for linting
                // time. Our projects are not large enough to warrant this. Overrides AirBnB styles.
                'import/no-cycle': 'off',

                // Prevent importing submodules of other modules. Using the internal structure of a module exposes
                // implementation details that can potentially change in breaking ways. Overrides AirBnB styles.
                'import/no-internal-modules': ['error', {
                    // Use the following option to set a list of allowable globs in this project.
                    allow: [
                        '**/middleware/*', // the src/middleware directory doesn't export a module, it's just a namespace.
                        '**/receivers/*', // the src/receivers directory doesn't export a module, it's just a namespace.
                        '**/types/**/*',
                        '**/types/*', // type heirarchies should be used however one wants
                    ],
                }],

                // Remove the minProperties option for enforcing line breaks between braces. The AirBnB config sets this to 4,
                // which is arbitrary and not backed by anything specific in the style guide. If we just remove it, we can
                // rely on the max-len rule to determine if the line is too long and then enforce line breaks. Overrides AirBnB
                // styles.
                'object-curly-newline': ['error', { multiline: true, consistent: true }],
            },
        },
        {
            files: ['src/**/*.spec.js'],
            rules: {
                // Test-specific rules
                // ---
                // Rules that only apply to JavaScript _test_ source files

                // With Mocha as a test framework, it is sometimes helpful to assign
                // shared state to Mocha's Context object, for example in setup and
                // teardown test methods. Assigning stub/mock objects to the Context
                // object via `this` is a common pattern in Mocha. As such, using
                // `function` over the the arrow notation binds `this` appropriately and
                // should be used in tests. So: we turn off the prefer-arrow-callback
                // rule.
                // See https://github.com/slackapi/bolt-js/pull/1012#pullrequestreview-711232738
                // for a case of arrow-vs-function syntax coming up for the team
                'prefer-arrow-callback': 'off',
                // Using ununamed functions (e.g., null logger) in tests is fine
                'func-names': 'off',
                // In tests, don't force constructing a Symbol with a descriptor, as
                // it's probably just for tests
                'symbol-description': 'off',

                'node/no-unpublished-import': ['error', {
                    "allowModules": ["mocha"],
                }],
            },
        },
    ],
};
