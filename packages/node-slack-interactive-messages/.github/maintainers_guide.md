# Maintainers Guide

This document describes tools, tasks and workflow that one needs to be familiar with in order to effectively maintain
this project. If you use this package within your own software as is but don't plan on modifying it, this guide is
**not** for you.

## Tools

All you need to work with this project is a recent version of Node.js (current LTS or above) and npm
(which is distributed with Node.js).

## Tasks

### Building

The source of this project is written in ES2016, a modern JavaScript syntax. In order to allow the
code to run in less modern versions of Node.js, the source is transpiled to ES5 syntax before
being distributed. In order to manually run the transpilation, you can use `npm run build` which
will emit the transpiled source into the `dist/` directory.

### Testing

This module has both unit and integration tests. You can run the entire test suite using the npm
script `npm test`. This command is also executed by Travis, the continuous integration service, for
every Pull Request and branch. Although both unit and integration tests are present, the emphasis
is on integration tests since its non-trivial to mock out each "unit's" dependencies to exercise
them individually. The coverage is computed with help from a module called nyc, which itself is a
CLI to istanbul. The tests themselves are run using mocha.

Test code should be written in syntax that runs on the oldest supported Node.js version, without
transpiling. This ensures that backwards compatibility is tested and the APIs look reasonable in
versions of Node.js that do not support the most modern syntax.

A useful trick for debugging inside tests is to use the Chrome Debugging Protocol feature of Node.js
to set breakpoints and interactively debug. In order to do this you must run mocha directly. This
means that you should have already linted the source (`npm run lint`), built the source
(`npm run build`) and linted the the tests (`npm run lint:test`) manually. You then run the tests
using the following command: `./node_modules/.bin/mocha test/unit/{test-name}.js --debug-brk --inspect`
(replace {test-name} with an actual test file).

### Generating Documentation

There is no generated documentation for this project. The README serves as a guide and the reference
documentation is written manually in markdown in `docs/reference.md`.

### Releasing

1.  Create the commit for the release:
    *  Bump the version number in adherence to [Semantic Versioning](http://semver.org/) in `package.json`.
    *  Commit with a message including the new version number. For example `v1.0.8`.
    *  Tag the commit with the version number. For example `v1.0.8`.

2.  Distribute the release
    *  Publish to the appropriate package manager. Once you have permission to publish on npm, you
       can run `npm publish`.
    *  Create a GitHub Release. This will also serve as a Changelog for the project. Add a
       description of changes to the Changelog. Mention Issue and PR #'s and @-mention
       contributors.

3.  (Slack Internal) Communicate the release internally. Include a link to the GitHub Release.

4.  Announce on Slack Team dev4slack in #slack-api

5.  (Slack Internal) Tweet? Not necessary for patch updates, might be needed for minor updates,
    definitely needed for major updates. Include a link to the GitHub Release.

## Workflow

### Versioning and Tags

This project is versioned using [Semantic Versioning](http://semver.org/), particularly in the
[npm flavor](https://docs.npmjs.com/getting-started/semantic-versioning). Each release is tagged
using git.

### Branches

`master` is where active development occurs. Long running named feature branches are occasionally
created for collaboration on a feature that has a large scope (because everyone cannot push commits
to another person's open Pull Request). At some point in the future after a major version increment,
there may be maintenance branches for older major versions.

### Issue Management

Labels are used to run issues through an organized workflow. Here are the basic definitions:

*  `bug`: A confirmed bug report. A bug is considered confirmed when reproduction steps have been
   documented and the issue has been reproduced.
*  `enhancement`: A feature request for something this package might not already do.
*  `docs`: An issue that is purely about documentation work.
*  `tests`: An issue that is purely about testing work.
*  `needs feedback`: An issue that may have claimed to be a bug but was not reproducible, or was otherwise missing some information.
*  `discussion`: An issue that is purely meant to hold a discussion. Typically the maintainers are looking for feedback in this issue.
*  `question`: An issue that is like a support request because the user's usage was not correct.
*  `semver:major|minor|patch`: Metadata about how resolving this issue would affect the version number.
*  `security`: An issue that has special consideration for security reasons.
*  `good first contribution`: An issue that has a well-defined relatively-small scope, with clear expectations. It helps when the testing approach is also known.
*  `duplicate`: An issue that is functionally the same as another issue. Apply this only if you've linked the other issue by number.

**Triage** is the process of taking new issues that aren't yet "seen" and marking them with a basic
level of information with labels. An issue should have **one** of the following labels applied:
`bug`, `enhancement`, `question`, `needs feedback`, `docs`, `tests`, or `discussion`.

Issues are closed when a resolution has been reached. If for any reason a closed issue seems
relevant once again, reopening is great and better than creating a duplicate issue.

## Everything else

When in doubt, find the other maintainers and ask.
