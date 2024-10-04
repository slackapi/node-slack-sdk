// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
import sidebarGenerator from './sidebars.js';

// TODO: add cli-hooks to this list in the future, even though its not typescript but pure jsdoc
const PACKAGES = ['cli-test', 'logger', 'oauth', 'rtm-api', 'socket-mode', 'types', 'web-api', 'webhook'];

/**
 * Generate a typedoc / docusaurus config object for use as reference documentation generation options for each package.
 * @param {string} pkg the sub-package to generate refdoc options for
 */
function packageReferenceOptions(pkg) {
  return {
    classPropertiesFormat: 'table',
    enumMembersFormat: 'table',
    entryPoints: [`../packages/${pkg}/src/index.ts`],
    id: pkg,
    indexFormat: 'table',
    interfacePropertiesFormat: 'table',
    parametersFormat: 'table',
    propertyMembersFormat: 'table',
    out: `./content/reference/${pkg}`,
    tsconfig: `../packages/${pkg}/tsconfig.json`,
    typeDeclarationFormat: 'table',
    useCodeBlocks: true,
    watch: process.env.TYPEDOC_WATCH,
  };
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Node Slack SDK',
  tagline: 'Official frameworks, libraries, and SDKs for Slack developers',
  favicon: 'img/favicon.ico',

  url: 'https://tools.slack.dev',
  baseUrl: '/node-slack-sdk/',
  organizationName: 'slackapi',
  projectName: 'node-slack-sdk',

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarItemsGenerator: async () => {
            return await sidebarGenerator(PACKAGES);
          },
          path: 'content',
          breadcrumbs: false,
          routeBasePath: '/', // Serve the docs at the site's root
          editUrl: 'https://github.com/slackapi/node-slack-sdk/tree/main/docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-9H1YZW28BG',
        },
      }),
    ],
  ],

  plugins: [
    'docusaurus-theme-github-codeblock',

    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/getting-started#getting-a-token-to-use-the-web-api',
            from: ['/auth'],
          },
          {
            to: '/reference/logger',
            from: ['/reference'],
          },
          {
            to: 'https://github.com/SlackAPI/node-slack-sdk/releases',
            from: ['/changelog'],
          },
        ],
      },
    ],
    ...PACKAGES.map((pkg) => ['docusaurus-plugin-typedoc', packageReferenceOptions(pkg)]),
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: 'Slack Developer Tools',
        logo: {
          alt: 'Slack logo',
          src: 'img/slack-logo.svg',
          href: 'https://tools.slack.dev',
          target: '_self',
        },
        items: [
          {
            type: 'dropdown',
            label: 'Bolt',
            position: 'left',
            items: [
              {
                label: 'Java',
                to: 'https://tools.slack.dev/java-slack-sdk/guides/bolt-basics',
                target: '_self',
              },
              {
                label: 'JavaScript',
                to: 'https://tools.slack.dev/bolt-js',
                target: '_self',
              },
              {
                label: 'Python',
                to: 'https://tools.slack.dev/bolt-python',
                target: '_self',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'SDKs',
            position: 'left',
            items: [
              {
                label: 'Java Slack SDK',
                to: 'https://tools.slack.dev/java-slack-sdk/',
                target: '_self',
              },
              {
                label: 'Node Slack SDK',
                to: 'https://tools.slack.dev/node-slack-sdk/',
                target: '_self',
              },
              {
                label: 'Python Slack SDK',
                to: 'https://tools.slack.dev/python-slack-sdk/',
                target: '_self',
              },
              {
                label: 'Deno Slack SDK',
                to: 'https://api.slack.com/automation/quickstart',
                target: '_self',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Community',
            position: 'left',
            items: [
              {
                label: 'Community tools',
                to: 'https://tools.slack.dev/community-tools',
                target: '_self',
              },
              {
                label: 'Slack Community',
                to: 'https://slackcommunity.com/',
                target: '_self',
              },
            ],
          },
          {
            to: 'https://api.slack.com/docs',
            label: 'API Docs',
            target: '_self',
          },
          {
            'aria-label': 'GitHub Repository',
            className: 'navbar-github-link',
            href: 'https://github.com/slackapi/node-slack-sdk',
            position: 'right',
            target: '_self',
          },
        ],
      },
      footer: {
        copyright: '<p> Made with ♡ by Slack and pals like you <p>',
      },
      prism: {
        // switch to alucard when available in prism?
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      codeblock: {
        showGithubLink: true,
        githubLinkLabel: 'View on GitHub',
      },
      // announcementBar: {
      //   id: `announcementBar`,
      //   content: `🎉️ <b><a target="_blank" href="https://api.slack.com/">Version 2.26.0</a> of the developer tools for the Slack automations platform is here!</b> 🎉️ `,
      // },
    }),
  // for performance, don't use docusaurus default of babel for transpiling, use esbuild. Details: https://github.com/facebook/docusaurus/discussions/3132#discussioncomment-3599203
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('esbuild-loader'),
      options: {
        loader: 'tsx',
        format: isServer ? 'cjs' : undefined,
        target: isServer ? 'node12' : 'es2017',
      },
    }),
  },
};

export default config;
