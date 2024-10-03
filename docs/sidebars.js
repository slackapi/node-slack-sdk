// @ts-check
export default function sidebarGenerator(_items) {
  return [
    {
      type: 'doc',
      id: 'index', // document ID
      label: 'Node Slack SDK', // sidebar label
      className: 'sidebar-title',
    },
    { type: 'doc', id: 'getting-started' },
    { type: 'doc', id: 'typescript' },
    { type: 'doc', id: 'packages/web-api' },
    { type: 'doc', id: 'packages/oauth' },
    { type: 'doc', id: 'packages/rtm-api' },
    { type: 'doc', id: 'packages/webhook' },
    { type: 'doc', id: 'packages/socket-mode' },
    {
      type: 'category',
      label: 'Deprecated packages',
      items: [
        { type: 'doc', id: 'packages/events-api' },
        { type: 'doc', id: 'packages/interactive-messages' },
      ],
    },
    { type: 'html', value: '<hr>' },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        { type: 'doc', id: 'tutorials/local-development' },
        { type: 'doc', id: 'tutorials/migrating-to-v5' },
        { type: 'doc', id: 'tutorials/migrating-to-v6' },
      ],
    },
    { type: 'html', value: '<hr>' },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        {
          type: 'category',
          label: '@slack/cli-test',
          link: {
            type: 'doc',
            id: 'reference/cli-test/index',
          },
          items: require('./content/reference/cli-test/typedoc-sidebar.cjs'),
        },
        {
          type: 'category',
          label: '@slack/events-api',
          link: {
            type: 'doc',
            id: 'reference/events-api/index',
          },
          items: require('./content/reference/events-api/typedoc-sidebar.cjs'),
        },
        {
          type: 'category',
          label: '@slack/interactive-messages',
          link: {
            type: 'doc',
            id: 'reference/interactive-messages/index',
          },
          items: require('./content/reference/interactive-messages/typedoc-sidebar.cjs'),
        },
        {
          type: 'category',
          label: '@slack/logger',
          link: {
            type: 'doc',
            id: 'reference/logger/index',
          },
          items: require('./content/reference/logger/typedoc-sidebar.cjs'),
        },
        {
          type: 'category',
          label: '@slack/oauth',
          link: {
            type: 'doc',
            id: 'reference/oauth/index',
          },
          items: require('./content/reference/oauth/typedoc-sidebar.cjs'),
        },
        {
          type: 'category',
          label: '@slack/rtm-api',
          link: {
            type: 'doc',
            id: 'reference/rtm-api/index',
          },
          items: require('./content/reference/rtm-api/typedoc-sidebar.cjs'),
        },
        {
          type: 'category',
          label: '@slack/socket-mode',
          link: {
            type: 'doc',
            id: 'reference/socket-mode/index',
          },
          items: require('./content/reference/socket-mode/typedoc-sidebar.cjs'),
        },
        {
          type: 'category',
          label: '@slack/types',
          link: {
            type: 'doc',
            id: 'reference/types/index',
          },
          items: require('./content/reference/types/typedoc-sidebar.cjs'),
        },
        {
          type: 'category',
          label: '@slack/web-api',
          link: {
            type: 'doc',
            id: 'reference/web-api/index',
          },
          items: require('./content/reference/web-api/typedoc-sidebar.cjs'),
        },
        {
          type: 'category',
          label: '@slack/webhook',
          link: {
            type: 'doc',
            id: 'reference/webhook/index',
          },
          items: require('./content/reference/webhook/typedoc-sidebar.cjs'),
        },
      ],
    },
    { type: 'html', value: '<hr>' },
    {
      type: 'link',
      label: 'Release notes',
      href: 'https://github.com/SlackAPI/node-slack-sdk/releases',
    },
    {
      type: 'link',
      label: 'Code on GitHub',
      href: 'https://github.com/SlackAPI/node-slack-sdk',
    },
    {
      type: 'link',
      label: 'Contributors Guide',
      href: 'https://github.com/SlackAPI/node-slack-sdk/blob/main/.github/contributing.md',
    },
  ];
}
