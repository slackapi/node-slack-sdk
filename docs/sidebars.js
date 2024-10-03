// @ts-check

/**
 * Generate a sidebar object for use as reference documentation sidebar entry for each package.
 * @param {string} pkg the sub-package to generate refdoc options for
 */
function packageSidebarEntry(pkg) {
  return {
    type: 'category',
    label: `@slack/${pkg}`,
    link: {
      type: 'doc',
      id: `reference/${pkg}/index`,
    },
    items: require(`./content/reference/${pkg}/typedoc-sidebar.cjs`),
  };
}
/**
 * Generate list of sidebar objects for docs site.
 * @param {string[]} packages list of sub-package to generate refdoc sidebar entries for
 */
export default function sidebarGenerator(packages) {
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
      items: [...packages.map((pkg) => packageSidebarEntry(pkg))],
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
