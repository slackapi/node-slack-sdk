---
name: SDK Bug
about: Report an SDK bug
title: "(Set a clear title describing the issue)"
labels: untriaged
assignees: ''

---

(Filling out the following with as much detail as you can provide will help us solve your issue sooner.)

#### Packages:

Select all that apply:

- [ ] `@slack/web-api`
- [ ] `@slack/rtm-api`
- [ ] `@slack/webhooks`
- [ ] `@slack/oauth`
- [ ] `@slack/socket-mode`
- [ ] `@slack/types`
- [ ] I don't know

### Reproducible in:

#### The Slack SDK version

(Paste the output of)
```bash
npm ls | grep -o "\S\+@\S\+$" | tr @ ' ' | awk -v q='"' '{print q$1q": "q"^"$2q","}' | grep slack
```
or refer to your `package.json`

#### Node.js runtime version

(Paste the output of `node --version`)

#### OS info

(Paste the output of `sw_vers && uname -v` on macOS/Linux or `ver` on Windows OS)

#### Steps to reproduce:

(Share the commands to run, source code, and project settings)

1.
2.
3.

### Expected result:

(Tell what you expected to happen)

### Actual result:

(Tell what actually happened with logs, screenshots)

### Requirements

For general questions/issues about Slack API platform or its server-side, could you submit questions at https://my.slack.com/help/requests/new instead. :bow:

Please read the [Contributing guidelines](https://github.com/slackapi/node-slack-sdk/blob/main/.github/contributing.md) and [Code of Conduct](https://slackhq.github.io/code-of-conduct) before creating this issue or pull request. By submitting, you are agreeing to those rules.
