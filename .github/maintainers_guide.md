# Maintainers Guide

> ⚠️ This maintainers guide is out of date. Progress on updating it is being [tracked](https://github.com/slackapi/node-slack-sdk/issues/748).

This document describes tools, tasks and workflow that one needs to be familiar with in order to effectively maintain
this project. If you use this package within your own software but don't plan on modifying it, this guide is
**not** for you.

## Tools

Maintaining this project requires installing [Node.js](https://nodejs.org) in your development environment. All of the
remaining tools are downloaded as `devDependencies`, which means you'll have them available once you run `npm install`
in a working copy of this repository.

In particular, [`lerna`](https://lerna.js.org/) is a tool you should become familiar with. This project is home to
several packages, and lerna makes it easier to manage operations across the set of packages. The very next thing you
should do is run `npx lerna bootstrap` in the root of this project to install dependencies for each of the packages,
and to allow lerna to link them to each other.

## Tasks

### Testing

This project has tests for individual packages inside of each's respective `test` directory. It also has
integration tests in the `integration-tests` directory under the root `support` directory. You can run the entire test
suite using the npm script `npm test` at the top level. This script will use Lerna to invoke tests in each package and
the integration tests.

Tests are executed by Travis, our continuous integration system, slightly differently. Travis runs several, more
granular builds in order to report on success and failure in a more useful (targeted) way. There is one build for each
package on each supported version of Node, as well as one for the integration tests on each supported version of Node.
Travis also runs linting in each package, which is separate from tests so you can run tests locally frequently without
having to block for fixing styling problems. Lastly, Travis uploads the coverage report for the tests ran within the
build to Codecov, our coverage reporting system. Travis reports status on each PR. Codecov aggregates all the coverage
reports, and separate reports status on each PR. The configuration is stored in `.travis.yml`.

Test code should be written in syntax that runs on the oldest supported Node.js version, without transpiling. This
ensures that backwards compatibility is tested and the APIs look reasonable in versions of Node.js that do not support
the most modern syntax.

We have included `launch.json` files that store configuration for `vscode` debugging in each pacakge. This allows you to set breakpoints in test files and interactively debug. Open the project in `vscode` and navigate to the debug screen on the left sidebar. The icon for it looks like a little lock bug with an x inside. At the top in `vscode`, select the configuration to run and press the green play icon to start debugging. Alternatively, on mac, you can press `cmd + shift + d` to get to the debug screen and `F5` to start debugging. If you are using `vscode` debugging, don't forget to lint the source (`npm run lint`) manually.

### Generating Documentation

The documentation is built using [Jekyll](https://jekyllrb.com/) and hosted with GitHub Pages. The source files are
contained in the `docs` directory. Reading the Jekyll configuration in `docs/_config.yml` is helpful to understand how
the documentation is organized and built. To build the docs, you will have to run the command `bundle exec jekyll serve` 
in the docs directory. A prerequisite to building the docs locally is to have ruby ~2.5.3 and install the dependencies by running `bundle install`.

To build reference documentation, in the root of this repo, run `npm run ref-docs`. This will generate reference docs and put them in the `docs/_reference` directory.
Currently, reference docs need to be built manually running this command and checked into GitHub.

**TODO**: Update this doc once building of reference docs is automated to happen on each commit to the repo

Reference docs are built by using various open source tools and formats. This includes [API-Extractor](https://api-extractor.com/), [mdast](https://github.com/syntax-tree/mdast), and [Remark](https://github.com/remarkjs/remark). [Read more about the reference docs pipeline](https://github.com/slackapi/node-slack-sdk/pull/831#issue-299509206).

### Releasing

Before releasing, it's important to understand that you may release several packages simultaneously. While `lerna` can
offer its view on which packages have changed since the last release, you should **verify version changes yourself**
before continuing with the release. If you find a file or set of files that should be allowed to change without
publishing a package, it might be a good idea to add it to the `ignoreChanges` setting in `lerna.json`.

If you make a mistake, don't fret. NPM allows you to unpublish a release within the first 72 hours of publishing, but you won’t be able to use the same version number again. Venture on!

> If you have any doubt whether your working copy is in good shape to do a release, here is a succinct way to get a
> fresh start: `npx lerna clean && npx lerna bootstrap`.

0. Verify that everything is in order by testing and linting locally before proceeding: `npm run test && npm run lint`.

1. First, lets confirm lerna wants to release the correct packages. Run `npx lerna changed` to see which packages lerna thinks are ready for release. If that looks good, follow through with the command to create a tagged commit `npx learna version`.
  * Lerna will ask you to make selections for the version increment on each package it plans to tag for release. You
    should already have an idea of what the appropriate semver increment (patch, minor, or major) you intend to create.
    If Lerna asks about a package you didn't intend to release, it's best to bail at this point
    (<kbd>CTRL</kbd>+<kbd>C</kbd>).
  * If lerna wants to release more packages than you want to, it's best to run the commands individually. This includes the following:
    - bump the version in `package.json` for all packages you are releasing
    - Make a single commit for the version bump. The commit message should be similar to a [previous one](https://github.com/slackapi/node-slack-sdk/commit/1503609d79abf035e9e21bad7360e124e4211594).
    - Add version tags for each package you are about to release. Ex `git tag @slack/web-api@5.6.0`
    - Push commit and tags up to your fork: `git push username main --tags`. 
    - Create pull request for review. It should be similar to a [previous one](https://github.com/slackapi/node-slack-sdk/pull/1059)

2.  Merge into main repository
  *  Once tests pass and a reviewer has approved, merge the pull request. 
  *  Update your local main branch `git rebase origin main` (or `git pull origin main`)
  *  Push the new tag up to origin `git push --tags origin`.

3. Publish the release(s) to npm
  * If you are using learna, use `NPM_CONFIG_OTP=xxxxxx npx lerna publish from-package` You should have [2FA set up with NPM](https://docs.npmjs.com/about-two-factor-authentication), and the
    `NPM_CONFIG_OTP` value should be set to the one time password from your configured second factor device. If the
    publishing process takes longer than the expiration time of the value (30 seconds), then you may see a publish
    failure. You can try again as soon as the value changes if you think you can beat the timeout, or you can run
    `npm publish . --otp YOUR_OTP_CODE` in each of the package directories.
  * If you are releasing without learna, change into the package directory and run `npm publish . --otp YOUR_OTP_CODE`.

4. Create GitHub Release(s) and add release notes.
  * Release notes should mention contributors (@-mentions) and issues/PRs (#-mentions).
  * Example release: https://github.com/slackapi/node-slack-sdk/releases/tag/%40slack%2Fweb-api%405.11.0

5. (Slack Internal) Communicate the release internally. Include a link to the GitHub Release(s).

6. Announce on Bot Developer Hangout (`dev4slack.slack.com`) in **#slack-api**.

7. (Slack Internal) Tweet? Not necessary for patch updates, might be needed for minor updates, definitely needed for
   major updates. Include a link to the GitHub Release(s).

### Beta Releases

#### **Get Feature Branch Ready**

1. Make sure your local `main` branch has the latest changes from GitHub

2. Run `git rebase main` from your feature branch. This command will rebase your feature branch from `main`. You can opt for `git merge main` if you are not comfortable with rebasing.

3. Make sure all tests and linting pass by running `npm run test && npm run lint`

#### **Update the Package Version**

1. Update the release version in `package.json`
    - Use the existing version and add a hyphen to name the beta release (ex: `5.10.0-workflowStepsBeta.1`)
    - Note: the beta version must be in the format of `Major.Minor.Patch-BetaNamespace.BetaVersion`

2. Make a single commit for this version bump. The commit message should be in the following format:

```
Publish

- @slack/web-api@5.11.0-workflowStepsBeta.1
- @slack/types@1.8.0-workflowStepsBeta.1
```

#### **Add Git Tags**

1. Add a git tag for every package you are releasing 

    - Example: `git tag @slack/web-api@5.10.0-workflowStepsBeta.1`

2. Push all tags and commits up to the feature branch on `origin` via `git push origin feature-branch --tags`

#### **Publish to npm**

1. Navigate to the specific package you wish to publish

2. Publish to npm via `npm publish . --otp YOUR_OTP_CODE`

    - To obtain an OTP (One Time Password) code, use a utility like Duo or 1Password

3. Immediately after publishing to npm, update the `dist-tags`: 

    - First update the `latest` `dist-tag` to the previous non-beta release: `npm dist-tag add @slack/web-api@5.10.0 latest --otp YOUR_OTP_CODE`.

    - If you are adding or updating a specific feature/beta `dist-tag`, run: `npm dist-tag add @slack/web-api@5.10.0-workflow-steps-beta.1 feat-workflow-steps --otp YOUR_OTP_CODE`

4. In order to test that the publish was successful, install the package from npm into a test project via `npm install @slack/web-api@feat-workflow-steps`. Verify that the `package.json` looks as you'd expect.

#### **Create Release and Publish Release Notes**

1. From the repository's Github, navigate to the **Releases** section and draft a new release
  
2. Summarize the release

    - Release notes should mention what changes are present, including contributors (@mentions) and associated issues/PRs (#mentions) for each. 
  
    - Use the following as a template, viewable [here](https://github.com/slackapi/node-slack-sdk/releases/tag/%40slack%2Fweb-api%405.11.0). 

3. Check the **This is a pre-release** checkbox

4. And finally, go ahead and click **Update release** and celebrate! 🎉

## Workflow

### Versioning and Tags

This project is versioned using [Semantic Versioning](http://semver.org/), particularly in the [npm
flavor](https://docs.npmjs.com/getting-started/semantic-versioning). Each release is tagged using git. The naming
convention for tags is `{package_name}@{version}`. For example, the tag `@slack/web-api@v5.0.0` marks the v5.0.0 release
of the `@slack/web-api` package. A single commit will have multiple tags when multiple packages are released
simultaneously.

While `lerna` is used for management of this repository, it is configured for **independent** versioning. This allows
each package to evolve in a less tightly-coupled manner. Specifically, if one package were to require a major version
increment, it could do so without unnecessarily affecting all the other packages.

### Branches

`main` is where active development occurs. Long running named feature branches are occasionally created for
collaboration on a feature that has a large scope (because everyone cannot push commits to another person's open Pull
Request). After a major version increment, a maintenance branch for the older major version is left open (e.g. `v3`,
`v4`, etc)

### Issue Management

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

**Triage** is the process of taking new issues that aren't yet "seen" and marking them with a basic level of information
with labels. An issue should have **one** of the following labels applied: `bug`, `enhancement`, `question`,
`needs feedback`, `docs`, `tests`, or `discussion`.

Issues are closed when a resolution has been reached. If for any reason a closed issue seems relevant once again,
reopening is great and better than creating a duplicate issue.

## Everything else

When in doubt, find the other maintainers and ask.
