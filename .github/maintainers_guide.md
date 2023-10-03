# Maintainer's Guide

This document describes tools, tasks and workflow that one needs to be familiar with in order to effectively maintain this project. If you use this package within your own software but don't plan on modifying it, this guide is **not** for you. Please refer to the [Contributor's Guide](https://github.com/slackapi/node-slack-sdk/blob/main/.github/contributing.md).

## 🛠 Tools
Maintaining this project requires installing [Node.js](https://nodejs.org). All of the remaining tools are downloaded as `devDependencies`, which means you'll have them available once you run `npm install` in a working copy of this repository.

## ✅ Tasks

### ⚗️ Testing and Linting
The Node SDK is made up of multiple, individual packages, each with their own tests. As such, tests are run on a per-package basis. However, the top-level directory contains some development dependencies applicable to all packages. As a result, to run tests for any package, first ensure you run `npm install` from the top-level directory. Then, for a given package, navigate to the package's directory (ie, `packages/web-api`) and run `npm install` to install that package's required dependencies. Finally, run `npm test` to run that package's tests. To run just the linting and not the entire test suite, run `npm run lint`.

This project has tests for individual packages as `*.spec.js` files and inside of each's package's `src` directory. It also has integration tests in the `support/integration-tests` directory.

Upon opening a PR, tests are executed by GitHub Actions, our continuous integration system. GitHub Actions runs several, more granular builds in order to report on success and failure in a more targeted way.

  - There is one build for each package on each supported version of Node, as well as one for the integration tests on each supported version of Node.

  - GitHub Actions runs linting in each package, which is separate from tests so you can run tests locally frequently without having to block for fixing styling problems.

  - GitHub Actions uploads the coverage report for the tests ran within the build to Codecov, our coverage reporting system. GitHub reports status on each PR. Codecov aggregates all the coverage reports, and separate reports status on each PR. The configuration is stored in `.github/workflows/ci-build.yml`.

Test code should be written in syntax that runs on the oldest supported Node.js version. This ensures that backwards compatibility is tested and the APIs look reasonable in versions of Node.js that do not support the most modern syntax.

We have included `launch.json` files that store configuration for `vscode` debugging in each package. This allows you to set breakpoints in test files and interactively debug. Open the project in `vscode` and navigate to the debug screen on the left sidebar. The icon for it looks like a little lock bug with an x inside. At the top in `vscode`, select the configuration to run and press the green play icon to start debugging. Alternatively, on mac, you can press `cmd + shift + d` to get to the debug screen and `F5` to start debugging. If you are using `vscode` debugging, don't forget to lint the source (`npm run lint`) manually.

Also, for verifying the behavior with the real Slack server-side and developer experience with installed packages, you can run the tests amd scripts under `prod-server-integration-tests`. Refer to the README file in the directory for details. These tests are supposed to be run in the project maintainers' manual execution. They are not part of CI builds for now.

### 📄 Generating Documentation
The documentation is built using [Jekyll](https://jekyllrb.com/) and hosted with GitHub Pages. The source files are contained in the `docs` directory. Reading the Jekyll configuration in `docs/_config.yml` is helpful to understand how the documentation is organized and built.

To build the docs locally, navigate to the `docs` directory. First ensure you have Ruby ~2.5.3 and install the dependencies by running `bundle install`. Then, run the command `bundle exec jekyll serve`. You will then be provided with a local URL that you can use to view the build.

To build reference documentation, in the root of this repo, run `npm run ref-docs`. This will generate reference docs and put them in the `docs/_reference` directory. Currently, reference docs need to be built manually running this command and checked into GitHub.

**TODO**: Update this doc once building of reference docs is automated to happen on each commit to the repo

Reference docs are built by using various open source tools and formats. This includes [API-Extractor](https://api-extractor.com/), [mdast](https://github.com/syntax-tree/mdast), and [Remark](https://github.com/remarkjs/remark). [Read more about the reference docs pipeline](https://github.com/slackapi/node-slack-sdk/pull/831#issue-299509206).

### 🚀 Releases
_For beta releases, see [**Beta Releases**](https://github.com/slackapi/node-slack-sdk/blob/main/.github/maintainers_guide.md#beta-releases) section below_

Releasing can feel intimidating at first, but rest assured: if you make a mistake, don't fret! npm allows you to unpublish a release within the first 72 hours of publishing (you just won’t be able to use the same version number again). Venture on!

1. Check the status of the package's GitHub Milestone for issues that should be shipped with the release.

    - If all issues have been closed, continue with the release.

    - If issues are still open, discuss with the team about whether the open issues should be moved to a future release or if the release should be held off until the issues are resolved.

    - Take a look at all issues under the Milestone to make sure that the type of issues included aligns with the Milestone name based on [semantic versioning](https://semver.org/). If the issues do not align with the naming of the Milestone (ex: if the issues are all bug fixes, but the Milestone is labeled as a minor release), then you can tweak the Milestone name to reflect the correct versioning.

2. Make sure your local `main` branch has the latest changes (i.e. `git checkout main && git pull --tags origin main`). Then, open a new branch off of your local `main` branch for the release (i.e. `git checkout -b <package>-<release>`).

3. Navigate to the specific package(s) you're releasing in the `packages/` directory.

4. For each package to be released, run `npm run test` to verify that tests are passing and code is free of linting errors.

5. On your new branch, bump the version(s) in `package.json` (see [Versioning and Tags](https://github.com/slackapi/node-slack-sdk/blob/main/.github/maintainers_guide.md#versioning-and-tags))

    - Make a single commit for the version(s) bump, following the format in: ([Example](https://github.com/slackapi/node-slack-sdk/commit/1503609d79abf035e9e21bad7360e124e4211594))

    - Create a pull request for the version change ([Example](https://github.com/slackapi/node-slack-sdk/pull/1059))

    - Add appropriate labels on the PR, including `release`

6. Once the PR has been approved and tests have passed, merge it into the main repository.

    -  Check out your local `main` branch and update it to get the latest changes: `git checkout main && git pull origin main`

    -  Add a version tag (ie, `git tag @slack/web-api@5.6.0`)

    -  Push the new tag up to origin: `git push --tags origin`

7. Publish the release to npm
    - To publish, you need to be a member of the `slack Org` on npm and set up 2-Factor Auth with your passsword generator of choice. Before you can publish with npm, you must run `npm login` from the command line.

    - As the final validation, within the package directory (ex: `packages/types`), run `mv package-lock.json package-lock.json.bk && rm -rf node_modules/ dist/ && npm i && npm test && npm pack` and confirm if there are `*.js`, `*.d.ts` files under the `dist` directory.

    - Run `npm publish . --otp YOUR_OTP_CODE`. To generate an OTP (One Time Password), use your password generator of choice (Duo, 1Password)

8. Close GitHub Milestone(s)

    - Close the relevant GitHub Milestone(s) for the release(s)

    - Check the existing GitHub Milestones to see if the next minor version exists. If it doesn't, then create a GitHub Milestone for new issues to live in. Typically, you'll create a new minor version - however, if there are any bugs that need to be carried over from the current GitHub Milestone, you could make a Milestone for a patch version to reflect those issues

    - Move any unfinished, open issues to the next GitHub Milestone

9. Create GitHub Release(s) with release notes

    - From the repository, navigate to the **Releases** section and draft a new release

    - When creating the release notes, select the tag you generated earlier for your release and title the release the same name as the tag

    - To see a list of changes between the last tag for the specific package, you can use this `git` command: `git log --oneline --full-history @slack/types@2.8.0..@slack/types@2.9.0 -- packages/types`. Sub in the correct tags and the last argument should be the path to the sub-package you are releasing (in order to filter commits just to the specific path).

    - Release notes should mention contributors, issues and PRs ([Example](https://github.com/slackapi/node-slack-sdk/releases/tag/%40slack%2Fweb-api%406.2.0))

    - Once the release notes are ready, click the "Publish Release" button to make them public

10. Communicate the release (as appropriate)

    - **Internal**

      - Include a brief description and link to the GitHub release

    - **External**

      - **Slack Community Hangout** (`community.slack.com/`) in **#lang-javascript**. Include a link to the package on `npmjs.com/package/@slack/` as well as the release notes. ([Example](https://community.slack.com/archives/CHF1FKX4J/p1657293144932579))

      - **Twitter**: Primarily for major updates. Coordinate with Developer Marketing.

### 🚧 Beta Releases
1. Make sure your local `main` branch has the latest changes

    - Run `git rebase main` from your feature branch (this will rebase your feature branch from `main`). You can opt for `git merge main` if you are not comfortable with rebasing.

    - If you do not have a feature branch, you can also use generic release candidate branch name like `<next-version>rc`, i.e. `2.5.0rc`.

2. Navigate to the specific package(s) you're releasing in the `packages/` directory.

3. For each package to be released, run `npm it` to install the latest dependencies and verify that everything is working and free of linting errors.

4. Bump the version(s) in `package.json`

    - The version must be in the format of `Major.Minor.Patch-BetaNamespace.BetaVersion` (ex: `5.10.0-workflowStepsBeta.1`, `2.5.0-rc.1`)

    - Make a single commit for the version bump ([Example](https://github.com/slackapi/node-slack-sdk/commit/1503609d79abf035e9e21bad7360e124e4211594))

    - Create a pull request for the version change against the corresponding feature branch in the main repository ([Example](https://github.com/slackapi/node-slack-sdk/pull/1244))

    - Add appropriate labels, including `release`

5. Once the PR's checks and tests have passed, merge it into the corresponding feature branch on the main repository. If you would like a review on the pull request or feel that the specific release you're doing requires extra attention, you can wait for an approval, but it is optional for this type of PR.

    -  Update your local main branch: `git pull origin <beta-feature-branch>`

    -  Add a version tag (ie, `git tag @slack/web-api@5.10.0-workflowStepsBeta.1`)

    -  Push the new tag up to origin: `git push --tags origin`

5. Publish the release to npm

    - Run `npm publish --tag <dist-tag> . --otp YOUR_OTP_CODE`

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

### 🪵 Branches
`main` is where active development occurs. Long running named feature branches are occasionally created for collaboration on a feature that has a large scope (because everyone cannot push commits to another person's open Pull Request). After a major version increment, a maintenance branch for the older major version is left open (e.g. `v3`, `v4`, etc).

When resolving issues or implementing features into the repository, you will almost always work off of a dedicated branch that lives on your forked copy of the repository.

## 👩🏻‍🔧 Issue Management
### 🏷 Labels
Labels are used to run issues through an organized workflow. Here are the basic definitions:

* `bug`: A confirmed bug report. A bug is considered confirmed when reproduction steps have been documented and the
  issue has been reproduced by a maintainer.
* `enhancement`: A feature request for something this package might not already do.
* `docs`: An issue that is purely about documentation work.
* `tests`: An issue that is purely about testing work.
* `needs feedback`: An issue that may have claimed to be a bug but was not reproducible, or was otherwise missing some
  information.
* `discussion`: An issue that is purely meant to hold a discussion. Typically the maintainers are looking for feedback
  in these issues.
* `question`: An issue that is like a support request where the user needed more information or their usage was not
  correct.
* `security`: An issue that has special consideration for security reasons.
* `good first contribution`: An issue that has a well-defined relatively-small scope, with clear expectations. It helps
  when the testing approach is also known.
* `duplicate`: An issue that is functionally the same as another issue. Apply this only if you've linked the other issue
  by number.
* `semver:major|minor|patch`: Metadata about how resolving this issue would affect the version number.
* `pkg:*`: Metadata about which package(s) this issue affects.

### 📬 Triage
Triaging is the process of investigating new issues, assigning them an appropriate label, and responding to the submitting developer. An issue should have **one** of the following labels applied: `bug`, `enhancement`, `question`, `needs feedback`, `docs`, `tests`, or `discussion`.

Issues are closed when a resolution has been reached. If for any reason a closed issue seems relevant once again, reopening the issue is preferable over creating a duplicate issue.
