# Maintainer's Guide

This document describes tools, tasks and workflow that one needs to be familiar with in order to effectively maintain this project. If you use this package within your own software but don't plan on modifying it, this guide is **not** for you. Please refer to the [Contributor's Guide](https://github.com/slackapi/node-slack-sdk/blob/main/.github/contributing.md).

## 🛠 Tools

Maintaining this project requires installing [Node.js](https://nodejs.org). All of the remaining tools are downloaded as `devDependencies`, which means you'll have them available once you run `npm install` in a working copy of this repository.

## ✅ Tasks

### ⚗️ Testing and Linting

The Node SDK is made up of multiple, individual packages, each with their own tests. As such, tests are run on a per-package basis. However, the top-level directory contains some development dependencies applicable to all packages. As a result, to run tests for any package, first run `npm install` from the top-level directory. Then run `npm test --workspace packages/<package-name>` to run that package's tests. To run linting across all packages, run `npm run lint` from the root directory.

```sh
npm install
npm run lint
npm test --workspace packages/web-api
```

This project has tests for individual packages as `*.spec.js` files and inside of each package's `src` directory. Also, for verifying the behavior with the real Slack server-side and developer experience with installed packages, you can run the tests amd scripts under `prod-server-integration-tests`. Refer to the README file in the directory for details. These tests are supposed to be run in the project maintainers' manual execution. They are not part of CI builds for now.

Upon opening a PR, tests are executed by GitHub Actions, our continuous integration system. GitHub Actions runs several, more granular builds in order to report on success and failure in a more targeted way.

- There is one build for each package on each supported version of Node, as well as one for the integration tests on each supported version of Node.

- GitHub Actions runs linting in each package, which is separate from tests so you can run tests locally frequently without having to block for fixing styling problems.

- GitHub Actions uploads the coverage report for the tests ran within the build to Codecov, our coverage reporting system. GitHub reports status on each PR. Codecov aggregates all the coverage reports, and separate reports status on each PR. The configuration is stored in `.github/workflows/ci-build.yml`.

Test code should be written in syntax that runs on the oldest supported Node.js version. This ensures that backwards compatibility is tested and the APIs look reasonable in versions of Node.js that do not support the most modern syntax.

We have included `launch.json` files that store configuration for `vscode` debugging in each package. This allows you to set breakpoints in test files and interactively debug. Open the project in `vscode` and navigate to the debug screen on the left sidebar. The icon for it looks like a little lock bug with an x inside. At the top in `vscode`, select the configuration to run and press the green play icon to start debugging. Alternatively, on mac, you can press `cmd + shift + d` to get to the debug screen and `F5` to start debugging. If you are using `vscode` debugging, don't forget to lint the source (`npm run lint`) manually.

### 🧰 Local Development

Using in progress changes made to this package in an app can be useful for development. Use the pack command to package a particular SDK package. For example:

```sh
npm pack --workspace packages/web-api
```

Install the `slack-web-api-*.tgz` to an app to use your changes:

```sh
npm install path/to/node-slack-sdk/slack-web-api-*.tgz
```

The packaged build includes dependencies published with each package, including required peer dependencies but not devDependencies, to imitate actual installations.

Remove cached project dependencies with `rm -r node_modules package-lock.json` between those steps to keep the cache clean.

### 📄 Managing Documentation

The reference docs for each package is independent of the others. They're generated using the `typedoc` and `typedoc-plugin-markdown` packages with the configurations of the package's `typedoc.json` file.

Each package has a script to these generate reference docs. For example:

```sh
npm run docs --workspace packages/web-api
```

The script places the reference markdown files in `/docs/english/reference/package-name`.

### 🎁 Updating Changesets

This project uses [Changesets](https://github.com/changesets/changesets) to track changes and automate releases.

Each changeset describes a change to a package and its [semver](https://semver.org/) impact, and a new changeset should be added when updating a published package with some change that affects consumers of the package:

```sh
npm run changeset
```

Updates to documentation, tests, or CI might not require new entries.

When a PR containing changesets is merged to `main`, a different PR is opened or updating using [changesets/action](https://github.com/changesets/action) which consumes the pending changesets, bumps relevant package versions, and updates various `CHANGELOG` files in preparation to release.

### 🚀 Releases

Releasing can feel intimidating at first, but don't fret! If you make a mistake, npm allows you to unpublish within the first 72 hours. The one catch is that you can't reuse the same version number. Venture on!

> For beta releases, read the [**Beta Releases**](#-beta-releases) section below.

New official package versions are published when the release PR created from changesets is merged and the publish workflow is approved. Follow these steps to build confidence:

1. **Check GitHub Milestones**: Before merging the release PR please check the relevant [Milestones](https://github.com/slackapi/node-slack-sdk/milestones). If issues or pull requests are still open either decide to postpone the release or save those changes for a future update.

2. **Review the release PR**: Verify that version bumps match expectations, `CHANGELOG` entries are clear, and CI checks pass.

3. **Merge and approve**: Merge the release PR, then approve the publish workflow to release packages to npm.

4. **Update Milestones**: Close the relevant [Milestones](https://github.com/slackapi/node-slack-sdk/milestones) and rename these to match the released package versions. Open a new Milestone for the next version, e.g. `@slack/web-api@next`.

5. **Communicate the release**:

   - **Internal**: Post a brief description and link to the GitHub release.
   - **External**: Post in **#lang-javascript** on [Slack Community](https://community.slack.com/). Include a link to the package on `npmjs.com/package/@slack/` as well as the release notes.

### 🚧 Beta Releases

1. Make sure your local `main` branch has the latest changes

   - Run `git rebase main` from your feature branch (this will rebase your feature branch from `main`). You can opt for `git merge main` if you are not comfortable with rebasing.

   - If you do not have a feature branch, you can also use generic release candidate branch name like `<next-version>rc`, i.e. `2.5.0rc`.

2. For each package to be released, run `npm test --workspace packages/<package-name>` to verify that tests are passing.

3. Bump the version(s) in `package.json`

   - The version must be in the format of `Major.Minor.Patch-BetaNamespace.BetaVersion` (ex: `5.10.0-workflowStepsBeta.1`, `2.5.0-rc.1`)

   - Make a single commit for the version bump ([Example](https://github.com/slackapi/node-slack-sdk/commit/1503609d79abf035e9e21bad7360e124e4211594))

   - Create a pull request for the version change against the corresponding feature branch in the main repository ([Example](https://github.com/slackapi/node-slack-sdk/pull/1244))

   - Add appropriate labels, including `release`

4. Once the PR's checks and tests have passed, merge it into the corresponding feature branch on the main repository. If you would like a review on the pull request or feel that the specific release you're doing requires extra attention, you can wait for an approval, but it is optional for this type of PR.

   - Update your local main branch: `git pull origin <beta-feature-branch>`

   - Add a version tag (ie, `git tag @slack/web-api@5.10.0-workflowStepsBeta.1`)

   - Push the new tag up to origin: `git push --tags origin`

5. Publish the release to npm

   - Run `npm publish --workspace packages/<package-name> --tag <dist-tag> --otp YOUR_OTP_CODE`

     - `<dist-tag>` should be a label representative of the beta release. It could be feature-specific (i.e. `feat-token-rotation`) or it can be a generic release candidate (i.e. `2.5.0rc`). Whatever you decide: it must _not_ be `latest`, as that is reserved for non-beta releases.

   - To generate an OTP (One Time Password), use your password generator of choice (Duo, 1Password)

6. Test that the publish was successful

   - Run `npm info <PACKAGE_NAME> dist-tags`

7. Create GitHub Release(s) with release notes

   - From the repository, navigate to the **Releases** section and draft a new release

   - Release notes should mention the beta feature (if applicable), contributors, issues and PRs ([Example](https://github.com/slackapi/node-slack-sdk/releases/tag/%40slack%2Ftypes%401.8.0-workflowStepsBeta.2))

   - Select the **This is a pre-release** checkbox

## 📥 Workflow

### 🔖 Versioning and Tags

This project is versioned using [Semantic Versioning](http://semver.org/), particularly in the [npm flavor](https://docs.npmjs.com/getting-started/semantic-versioning). Each release is tagged using git. The naming convention for tags is `{package_name}@{version}`. For example, the tag `@slack/web-api@v5.0.0` marks the v5.0.0 release of the `@slack/web-api` package. A single commit will have multiple tags when multiple packages are released simultaneously.

One package that expands upon the standard major.minor.patch version schema typically associated with Semantic Versioning is the `@slack/cli-test` package. This package employs standard major.minor.patch version, in addition to a [build metadata suffix](https://semver.org/#spec-item-10) suffix of the form `+cli.X.Y.Z`, e.g. `0.1.0+cli.2.24.0`. The version after `+cli.` communicates compatibility between the `@slack/cli-test` package and the [Slack CLI](https://docs.slack.dev/tools/slack-cli/) itself.

### 🪵 Branches

`main` is where active development occurs. Long running named feature branches are occasionally created for collaboration on a feature that has a large scope (because everyone cannot push commits to another person's open Pull Request). After a major version increment, a maintenance branch for the older major version is left open (e.g. `v3`, `v4`, etc).

When resolving issues or implementing features into the repository, you will almost always work off of a dedicated branch that lives on your forked copy of the repository.

## 👩🏻‍🔧 Issue Management

### 🏷 Labels

Labels are used to run issues through an organized workflow. Here are the basic definitions:

- `bug`: A confirmed bug report. A bug is considered confirmed when reproduction steps have been documented and the
  issue has been reproduced by a maintainer.
- `enhancement`: A feature request for something this package might not already do.
- `docs`: An issue that is purely about documentation work.
- `tests`: An issue that is purely about testing work.
- `needs feedback`: An issue that may have claimed to be a bug but was not reproducible, or was otherwise missing some
  information.
- `discussion`: An issue that is purely meant to hold a discussion. Typically the maintainers are looking for feedback
  in these issues.
- `question`: An issue that is like a support request where the user needed more information or their usage was not
  correct.
- `security`: An issue that has special consideration for security reasons.
- `good first contribution`: An issue that has a well-defined relatively-small scope, with clear expectations. It helps
  when the testing approach is also known.
- `duplicate`: An issue that is functionally the same as another issue. Apply this only if you've linked the other issue
  by number.
- `semver:major|minor|patch`: Metadata about how resolving this issue would affect the version number.
- `pkg:*`: Metadata about which package(s) this issue affects.

### 📬 Triage

Triaging is the process of investigating new issues, assigning them an appropriate label, and responding to the submitting developer. An issue should have **one** of the following labels applied: `bug`, `enhancement`, `question`, `needs feedback`, `docs`, `tests`, or `discussion`.

Issues are closed when a resolution has been reached. If for any reason a closed issue seems relevant once again, reopening the issue is preferable over creating a duplicate issue.
