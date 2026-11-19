# Security Policy

Slack takes the security of its software and services seriously, including all open-source repositories managed through the [slackapi](https://github.com/slackapi) GitHub organization.

## Reporting a Vulnerability

**Do NOT report security vulnerabilities through public GitHub issues, pull requests, or discussions.**

If you believe you have found a security vulnerability in any package within this repository (`@slack/web-api`, `@slack/oauth`, `@slack/socket-mode`, `@slack/webhook`, `@slack/types`, `@slack/logger`, `@slack/cli-hooks`), please report it through the Slack bug bounty program on HackerOne:

**<https://hackerone.com/slack>**

Even if these packages are not explicitly listed as in-scope assets on the HackerOne program page, reports for vulnerabilities in them should still be submitted there. The Slack security team triages reports for all `slackapi` open-source repositories through this program.

If HackerOne is inaccessible, you may alternatively report the issue to [security@salesforce.com](mailto:security@salesforce.com).

Please do not discuss potential vulnerabilities in public without first coordinating with the security team.

## What to Include

To help us triage and respond quickly, please include:

- Type of vulnerability (e.g., credential exposure, OAuth bypass, denial of service)
- Affected package(s) and version(s)
- Step-by-step reproduction instructions
- Proof-of-concept code or payloads, if available
- Impact assessment: what an attacker could achieve
- Any specific configuration required to trigger the vulnerability
- Affected source file paths, if known

## Threat Model

The Node Slack SDK is a collection of client libraries for interacting with Slack's APIs. These packages make outbound requests to Slack on behalf of developers. The security boundary covers the safe handling of credentials, the integrity of authentication flows, and the confidentiality of data in transit.

### In Scope

The following are considered SDK vulnerabilities:

- Token or credential leakage through logs, error messages, HTTP headers, or unintended network requests
- OAuth state parameter validation bypass or CSRF vulnerabilities in the `@slack/oauth` authorization flow
- Cross-tenant token exposure or installation data leakage in built-in installation stores
- Failure to enforce TLS for connections to Slack's APIs (Web API, WebSocket, or webhook endpoints)
- WebSocket connection hijacking or man-in-the-middle vulnerabilities in `@slack/socket-mode`
- Insecure default configurations that could lead to credential exposure
- Denial of service caused by malformed API responses that crash or hang the client
- Injection vulnerabilities where SDK internals unsafely interpolate user-supplied data into requests

### Out of Scope

The following are NOT SDK vulnerabilities:

- Vulnerabilities in the Node.js runtime, operating system, or hosting infrastructure
- Security issues in Slack's server-side platform infrastructure (report those directly under Slack's main HackerOne scope)
- Vulnerabilities in third-party npm packages chosen and installed by the developer outside of this SDK's direct dependencies
- Security issues in developer application logic built on top of the SDK (e.g., storing tokens insecurely in application code)
- Attacks that require possession of valid tokens or secrets (the SDK assumes tokens provided to it are confidential)
- Rate limiting or resource exhaustion on Slack's servers caused by legitimate API usage
- Issues that only affect end-of-life versions with no reproduction on supported versions
- Security of custom `slackApiUrl` endpoints configured by the developer for testing or proxying

## Disclosure Policy

This project follows coordinated disclosure:

- Allow a reasonable timeframe for the team to investigate, develop, and release a fix before any public disclosure.
- Researchers who follow responsible disclosure practices are eligible for recognition and bounty consideration through the Slack HackerOne program.
