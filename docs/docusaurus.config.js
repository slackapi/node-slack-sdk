import {themes as prismThemes} from 'prism-react-renderer';
const footer = require('./footerConfig');
const navbar = require('./navbarConfig');

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
          path: 'content',
          breadcrumbs: false,
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/slackapi/node-slack-sdk/tree/main/docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins:
    ['docusaurus-theme-github-codeblock',

    ['@docusaurus/plugin-client-redirects',
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
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'cli-test',
        entryPoints: ['../packages/cli-test/src/index.ts'],
        tsconfig: '../packages/cli-test/tsconfig.json',
        out: "./content/reference/cli-test",
      }
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'events-api',
        entryPoints: ['../packages/events-api/src/index.ts'],
        tsconfig: '../packages/events-api/tsconfig.json',
        out: "./content/reference/events-api",
      }
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'interactive-messages',
        entryPoints: ['../packages/interactive-messages/src/index.ts'],
        tsconfig: '../packages/interactive-messages/tsconfig.json',
        out: "./content/reference/interactive-messages",
      }
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'logger',
        entryPoints: ['../packages/logger/src/index.ts'],
        tsconfig: '../packages/logger/tsconfig.json',
        out: "./content/reference/logger",
      }
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'oauth',
        entryPoints: ['../packages/oauth/src/index.ts'],
        tsconfig: '../packages/oauth/tsconfig.json',
        out: "./content/reference/oauth",
      }
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'rtm-api',
        entryPoints: ['../packages/rtm-api/src/index.ts'],
        tsconfig: '../packages/rtm-api/tsconfig.json',
        out: "./content/reference/rtm-api",
      }
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'socket-mode',
        entryPoints: ['../packages/socket-mode/src/index.ts'],
        tsconfig: '../packages/socket-mode/tsconfig.json',
        out: "./content/reference/socket-mode",
      }
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'types',
        entryPoints: ['../packages/types/src/index.ts'],
        tsconfig: '../packages/types/tsconfig.json',
        out: "./content/reference/types",
      }
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'web',
        entryPoints: ['../packages/web-api/src/index.ts'],
        tsconfig: '../packages/web-api/tsconfig.json',
        out: "./content/reference/web-api",
      }
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'webhook',
        entryPoints: ['../packages/webhook/src/index.ts'],
        tsconfig: '../packages/webhook/tsconfig.json',
        out: "./content/reference/webhook",
      }
    ]
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
      navbar,
      footer,
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
};

export default config;
