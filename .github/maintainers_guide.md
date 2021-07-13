# Maintainer's Guide

This document describes tools, tasks and workflow that one needs to be familiar with in order to effectively maintain this project. If you use this package within your own software but don't plan on modifying it, this guide is **not** for you. Please refer to the [Contributor's Guide](https://github.com/slackapi/node-slack-sdk/blob/main/.github/contributing.md).

## 🛠 Tools
Maintaining this project requires installing [Node.js](https://nodejs.org). All of the remaining tools are downloaded as `devDependencies`, which means you'll have them available once you run `npm install` in a working copy of this repository.

## ✅ Tasks

### ⚗️ Testing and Linting
The Node SDK is made up of multiple, individual packages, each with their own tests. As such, tests are run on a per-package basis. To run tests for a given package, navigate to the package's directory (ie, `packages/web-api`) and run `npm test`. To run linting, run `npm run lint`.

This project has tests for individual packages as `*.spec.js` files and inside of each's respective `test` directory. It also has integration tests in the `integration-tests` directory under the root `support` directory. 

Upon opening a PR, tests are executed by GitHub Actions, our continuous integration system. GitHub Actions runs several, more granular builds in order to report on success and failure in a more targeted way. 

  - There is one build for each package on each supported version of Node, as well as one for the integration tests on each supported version of Node. 
  
  - GitHub Actions runs linting in each package, which is separate from tests so you can run tests locally frequently without having to block for fixing styling problems. 
  
  - GitHub Actions uploads the coverage report for the tests ran within the build to Codecov, our coverage reporting system. GitHub reports status on each PR. Codecov aggregates all the coverage reports, and separate reports status on each PR. The configuration is stored in `.github/workflows/ci-build.yml`.

Test code should be written in syntax that runs on the oldest supported Node.js version. This ensures that backwards compatibility is tested and the APIs look reasonable in versions of Node.js that do not support the most modern syntax.

We have included `launch.json` files that store configuration for `vscode` debugging in each pacakge. This allows you to set breakpoints in test files and interactively debug. Open the project in `vscode` and navigate to the debug screen on the left sidebar. The icon for it looks like a little lock bug with an x inside. At the top in `vscode`, select the configuration to run and press the green play icon to start debugging. Alternatively, on mac, you can press `cmd + shift + d` to get to the debug screen and `F5` to start debugging. If you are using `vscode` debugging, don't forget to lint the source (`npm run lint`) manually.

Also, for verifying the behavior with the real Slack server-side and developer experience with installed packages, you can run the tests amd scripts under `prod-server-integration-tests`. Refer to the README file in the directory for details. These tests are supposed to be run in the project maintainers' manual execution. They are not part of CI builds for now.

### 📄 Generating Documentation
The documentation is built using [Jekyll](https://jekyllrb.com/) and hosted with GitHub Pages. The source files are contained in the `docs` directory. Reading the Jekyll configuration in `docs/_config.yml` is helpful to understand how the documentation is organized and built. 

To build the docs locally, navigate to the `docs` directory. First ensure you have Ruby ~2.5.3 and install the dependencies by running `bundle install`. Then, run the command `bundle exec jekyll serve`. You will then be provided with a local URL that you can use to view the build.

To build reference documentation, in the root of this repo, run `npm run ref-docs`. This will generate reference docs and put them in the `docs/_reference` directory. Currently, reference docs need to be built manually running this command and checked into GitHub.

**TODO**: Update this doc once building of reference docs is automated to happen on each commit to the repo

Reference docs are built by using various open source tools and formats. This includes [API-Extractor](https://api-extractor.com/), [mdast](https://github.com/syntax-tree/mdast), and [Remark](https://github.com/remarkjs/remark). [Read more about the reference docs pipeline](https://github.com/slackapi/node-slack-sdk/pull/831#issue-299509206).

### 🚀 Releases
_For beta releases, see [**Beta Releases**](https://github.com/slackapi/node-slack-sdk/blob/main/.github/maintainers_guide.md#beta-releases) section below_

Releasing can feel intimidaitng at first, but rest assured: if you make a mistake, don't fret! npm allows you to unpublish a release within the first 72 hours of publishing (you just won’t be able to use the same version number again). Venture on!

1. Check the status of the package's GitHub Milestone for issues that should be shipped with the release.

    - If all issues have been closed, continue with the release. 
    
    - If issues are still open, discuss with the team about whether the open issues should be moved to a future release or if the release should be held off until the issues are resolved.

2. Navigate to the specific package you're releasing in the `packages/` directory.

3. Run `npm run test && npm run lint` to verify that everything is working and free of linting errors.

4. Bump the version in `package.json` (see [Versioning and Tags](https://github.com/slackapi/node-slack-sdk/blob/main/.github/maintainers_guide.md#versioning-and-tags))

    - Make a single commit for the version bump ([Example](https://github.com/slackapi/node-slack-sdk/commit/1503609d79abf035e9e21bad7360e124e4211594))

    - Create a pull request for the version change ([Example](https://github.com/slackapi/node-slack-sdk/pull/1059))

    - Add appropriate labels, including `release`

5. Once the PR has been approved and tests have passed, merge it into the main repository.

    -  Update your local main branch: `git pull origin main`

    -  Add a version tag (ie, `git tag @slack/web-api@5.6.0`)

    -  Push the new tag up to origin: `git push --tags origin`

6. Publish the release to npm

    - Run `npm publish . --otp YOUR_OTP_CODE`

    - To generate an OTP (One Time Password), use your password generator of choice (Duo, 1Password)

7. Close GitHub Milestone(s)

    - Close the relevant GitHub Milestone(s) for the release(s)
    
    - Move any unfinished, open issues to the next GitHub Milestone

8. Create GitHub Release(s) with release notes

    - From the repository, navigate to the **Releases** section and draft a new release

    - Release notes should mention contributors, issues and PRs ([Example](https://github.com/slackapi/node-slack-sdk/releases/tag/%40slack%2Fweb-api%406.2.0))

9. Communicate the release (as appropriate)

    - **Internal** 
      
      - Include a brief description and link to the GitHub release

    - **External** 

      - **Bot Developer Hangout** (`dev4slack.slack.com`) in **#slack-api**
    
      - **Twitter**: Primarily for major updates. Coordinate with Developer Marketing.

### 🚧 Beta Releases
1. Navigate to the specific package you're releasing in the `packages/` directory.

2. Make sure your local `main` branch has the latest changes

    - Run `git rebase main` from your feature branch (this will rebase your feature branch from `main`). You can opt for `git merge main` if you are not comfortable with rebasing.

3. Run `npm run test && npm run lint` to verify that everything is working and free of linting errors.

4. Bump the version in `package.json`

    - The version must be in the format of `Major.Minor.Patch-BetaNamespace.BetaVersion` (ex: `5.10.0-workflowStepsBeta.1`)

    - Make a single commit for the version bump ([Example](https://github.com/slackapi/node-slack-sdk/commit/1503609d79abf035e9e21bad7360e124e4211594))

    - Create a pull request for the version change against the corresponding feature branch in the main repository ([Example](https://github.com/slackapi/node-slack-sdk/pull/1244))

    - Add appropriate labels, including `release`

5. Once the PR has been approved and tests have passed, merge it into the corresponding feature branch on the main repository.

    -  Update your local main branch: `git pull origin <beta-feature-branch>`

    -  Add a version tag (ie, `git tag @slack/web-api@5.10.0-workflowStepsBeta.1`)

    -  Push the new tag up to origin: `git push --tags origin`

5. Publish the release to npm

    - Run `npm publish . --otp YOUR_OTP_CODE`

    - To generate an OTP (One Time Password), use your password generator of choice (Duo, 1Password)

6. Immediately after publishing, update the `dist-tags` 

    - Update the `latest` `dist-tag` to the **previous non-beta release**: `npm dist-tag add @slack/web-api@5.10.0 latest --otp YOUR_OTP_CODE`.

    - Add a `dist-tag` name for the beta feature: `npm dist-tag add @slack/web-api@5.10.0-workflow-steps-beta.1 feat-workflow-steps --otp YOUR_OTP_CODE`

7. Test that the publish was successful

    - Run `npm info <PACKAGE_NAME> dist-tags`

8. Create GitHub Release(s) with release notes

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