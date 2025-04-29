# Support schedule

## How long will my version be supported?

You have at least until the next Node.js LTS version maintenance ends. According to [current schedule](https://github.com/nodejs/Release), this happens once every 12 months.

If there is a newer major version of the Node SDK available today than the one you are using, plan your migration now. Some updates will only make it to the newest major version, and your feedback on the transition will help the community. Don't panic though, as long as you aren't a year behind on updates you still have until the next LTS version maintenance ends.

## How our schedule works

In order to guarantee you at least 90 days to migrate from one major version to the next, the maintainers make the following three commitments:

1. If we've decided to end support for a major version, we will announce this at least 90 days before the next Node.js LTS version maintenance ends.
2. Within 30 days of that announcement, a new major version release will be available to start developing against.
3. After a major version's maintenance ends, there will be a 30 day period of soft-maintenance for critical fixes and merging low impact contributions. It then is considered end-of-life.

![Node v4.x LTS maintenance end in April creates the opportunity to sunset @slack/client v3.x](/img/support-schedule.png)

_Node v4.x LTS maintenance end in April creates the opportunity to sunset `@slack/client` v3.x_

These commitments are important because it enables both users and maintainers of the Node SDK to establish expectations and plan ahead.

For users, it means you'll have at least 120 days from when you can first find out your major version will be unsupported, to when its end-of-life. It also means you have at least 90 of those days to migrate your application to use the next major version because a release will be available. Lastly, it means you have up to 30 days where you can speak up for the major version changes that are most important to you.

For maintainers, it gives us the freedom of always developing against supported versions of Node and most dependencies. It also keeps us honest by giving us a finite amount of time to make decisions about large changes and to communicate those decisions. Maintainers can decide to create a new major version at any time in the year, but we cannot move a major version out of maintenance without meeting the transition expectations of users.

Lastly, the 30 day soft maintenance period is not meant for new feature development. Maintainers will gladly review contributions, issues, and PRs, but we may close them without a release if they are seen as risky or out of scope.
