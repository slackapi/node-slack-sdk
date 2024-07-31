---
title: "@slack/oauth"
---

<h1 id="classes" class="undefined auto-anchor-strong">Classes</h1>
<h2 id="installprovider">InstallProvider</h2>
<p><code>InstallProvider</code> provides a way to manage configuration and functionality for adding an OAuth flow to Slack apps. It contains capabilities for OAuth URL generation, state verification, authorization code exchange, as well as interfaces for storing installation details like user and bot tokens.</p>
<h4>new InstallProvider(opts)</h4>
<p>Constructs a new instance of the <code>InstallProvider</code> class</p>
<strong>Parameters:</strong>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="center">Required</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">opts</td>
<td align="center"><code><a href="#installprovideroptions" title="">InstallProviderOptions</a></code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<h3>Fields</h3>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">installationStore</td>
<td align="center"><code><a href="#installationstore" title="">InstallationStore</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">stateStore</td>
<td align="center"><code><a href="#statestore" title="">StateStore</a></code></td>
<td></td>
</tr>
</tbody>
</table>
<h3>Methods</h3>
<h4>handleInstallPath(req, res, options, installOptions)</h4>
<p>This method handles HTTP requests to the application's installation page. It can be used to automatically render a typical installation page with an "Add to Slack" button.</p>
<strong>Parameters:</strong>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="center">Required</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">req</td>
<td align="center"><a href="https://nodejs.org/api/http.html#class-httpincomingmessage"><code>IncomingMessage</code></a></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">res</td>
<td align="center"><a href="https://nodejs.org/api/http.html#class-httpserverresponse"><code>ServerResponse</code></a></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code><a href="#installpathoptions" title="">InstallPathOptions</a></code></td>
<td align="center">✗</td>
<td></td>
</tr>
<tr>
<td align="center">installOptions</td>
<td align="center"><code><a href="#installurloptions" title="">InstallURLOptions</a></code></td>
<td align="center">✗</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>Promise&#x3C;void></code></p>
<h4>generateInstallUrl(options)</h4>
<p>Returns a URL that is suitable for including in an Add to Slack button. Uses the instance's <a href="#statestore">stateStore</a> to generate a value for the <code>state</code> OAuth parameter. Can disable state generation by setting <code>stateVerification</code> to <code>false</code>. Can prescribe a specific <code>state</code> OAuth parameter value by setting the <code>state</code> argument to this function explicitly.</p>
<strong>Parameters:</strong>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="center">Required</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">options</td>
<td align="center"><code><a href="#installurloptions" title="">InstallURLOptions</a></code></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">stateVerification</td>
<td align="center"><code>boolean</code></td>
<td align="center">✗ (defaults to <code>true</code>)</td>
<td></td>
</tr>
<tr>
<td align="center">state</td>
<td align="center"><code>string</code></td>
<td align="center">✗</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>Promise&#x3C;string></code></p>
<h4>handleCallback(req, res, options, installOptions)</h4>
<p>This method handles the incoming callback request to the application after a redirection from slack.com following a successful user authorization. It can be used as a RequestListener in almost any HTTP server framework.</p>
<p>Verifies the state using the instance's <a href="#statestore">stateStore</a>, exchanges the grant in the query parameters for an access token, and stores token and associated installation data in the instance's <a href="#installationstore">installationStore</a>.</p>
<strong>Parameters:</strong>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="center">Required</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">req</td>
<td align="center"><a href="https://nodejs.org/api/http.html#class-httpincomingmessage"><code>IncomingMessage</code></a></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">res</td>
<td align="center"><a href="https://nodejs.org/api/http.html#class-httpserverresponse"><code>ServerResponse</code></a></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code><a href="#callbackoptions" title="">CallbackOptions</a></code></td>
<td align="center">✗</td>
<td></td>
</tr>
<tr>
<td align="center">installOptions</td>
<td align="center"><code><a href="#installurloptions" title="">InstallURLOptions</a></code></td>
<td align="center">✗</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>Promise&#x3C;void></code></p>
<h4>authorize(source)</h4>
<p>Fetches installation data from the instance's <a href="#installationstore">installationStore</a>.</p>
<strong>Parameters:</strong>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="center">Required</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">source</td>
<td align="center"><code><a href="#installationquery" title="">InstallationQuery</a></code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>Promise&#x3C;<a href="#authorizeresult" title="">AuthorizeResult</a>></code></p>
<h1 id="interfaces" class="undefined auto-anchor-strong">Interfaces</h1>
<h2 id="authorizeresult">AuthorizeResult</h2>
<h3>Fields</h3>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">botId</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">botRefreshToken</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">botToken</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">botTokenExpiresAt</td>
<td align="center"><code>number</code> (UTC, seconds)</td>
<td></td>
</tr>
<tr>
<td align="center">botUserId</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">enterpriseId</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">teamId</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">userRefreshToken</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">userToken</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">userTokenExpiresAt</td>
<td align="center"><code>number</code> (UTC, seconds)</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="callbackoptions">CallbackOptions</h2>
<h3>Fields</h3>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="center">Description</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">beforeInstallation</td>
<td align="center"><code>(options: <a href="#installurloptions" title="">InstallURLOptions</a>, callbackReq: IncomingMessage, callbackRes: ServerResponse) => Promise&lt;boolean&gt;</code></td>
<td>Additional logic to run right before executing the Slack app installation with the given OAuth code parameter. When this method returns <code>false</code>, the <a href="#installprovider"><code>InstallProvider</code></a> skips the installation. A common use for returning <code>false</code> in this method is if the visiting user is not eligible to proceed with the Slack app installation flow. When returning <code>false</code>, this method is responsible for calling the <code>callbackRes#end()</code> method to build a complete HTTP response for the end-user.</td>
<td></td>
</tr>
<tr>
<td align="center">afterInstallation</td>
<td align="center"><code>(installation: <a href="#installation">Installation</a> | <a href="#orginstallation">OrgInstallation</a>, options: <a href="#installurloptions" title="">InstallURLOptions</a>, callbackReq: IncomingMessage, callbackRes: ServerResponse) => Promise&lt;boolean&gt;</code></td>
<td>Additional logic to run right after executing the Slack app installation with the given OAuth code parameter. When this method returns <code>false</code>, the <a href="#installprovider"><code>InstallProvider</code></a> skips storing the installation in the database (or whatever implementation your <a href="#installationstore"><code>InstallationStore</code></a> uses). A common use for returning <code>false</code> in this method is if your app needs to cancel the installation and display an error page to the installing user. When returning <code>false</code>, this method is responsible for calling the <code>callbackRes#end()</code> method to build a complete HTTP response for the end-user.</td>
<td></td>
</tr>
<tr>
<td align="center">failure</td>
<td align="center"><code>(error: CodedError, options: <a href="#installurloptions" title="">InstallURLOptions</a>, callbackReq: IncomingMessage, callbackRes: ServerResponse) => void</code></td>
<td><code>failure</code> is invoked if <code>handleCallback</code> fails at any point. When provided, this function must complete sending the HTTP response to the end-user by calling <code>callbackRes#end()</code>.</td>
<td></td>
</tr>
<tr>
<td align="center">failureAsync</td>
<td align="center"><code>(error: CodedError, options: <a href="#installurloptions" title="">InstallURLOptions</a>, callbackReq: IncomingMessage, callbackRes: ServerResponse) => Promise&lt;void&gt;</code></td>
<td>An asynchronous version of <code>failure</code>. If both are defined, both will be executed.</td>
<td></td>
</tr>
<tr>
<td align="center">success</td>
<td align="center"><code>(installation: <a href="#installation" title="">Installation</a>, options: <a href="#installurloptions" title="">InstallURLOptions</a>, callbackReq: IncomingMessage, callbackRes: ServerResponse) => void</code></td>
<td><code>success</code> is invoked after <code>handleCallback</code> completes and has stored the installation data. When provided, this function must complete sending the HTTP response to the end-user by calling <code>callbackRes#end()</code>.</td>
<td></td>
</tr>
<tr>
<td align="center">successAsync</td>
<td align="center"><code>(installation: <a href="#installation" title="">Installation</a>, options: <a href="#installurloptions" title="">InstallURLOptions</a>, callbackReq: IncomingMessage, callbackRes: ServerResponse) => Promise&lt;void&gt;</code></td>
<td>An asynchronous version of <code>success</code>. If both are defined, both will be executed.</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="installation">Installation</h2>
<p>An individual installation of the Slack app.</p>
<p>This interface creates a representation for installations that normalizes the responses from OAuth grant exchanges across auth versions (responses from the Web API methods [`oauth.v2.access`](https://api.slack.com/methods/oauth.v2.access) and [`oauth.access`](https://api.slack.com/methods/oauth.access)). It describes some of these differences using the `AuthVersion` generic placeholder type.</p>
<p>This interface also represents both installations which occur on individual Slack workspaces and on Slack enterprise organizations. The `IsEnterpriseInstall` generic placeholder type is used to describe some of those differences.</p>
<p>This representation is designed to be used both when producing data that should be stored by an [`InstallationStore`](#installationstore), and when consuming data that is fetched from an [`InstallationStore`](#installationstore). Most often, [`InstallationStore`](#installationstore) implementations are a database. If you are going to implement an [`InstallationStore`](#installationstore), it's advised that you **store as much of the data in these objects as possible so that you can return as much as possible inside `fetchInstallation()`**.</p>
<h3>Fields</h3>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">appId</td>
<td align="center"><code>string | undefined</code></td>
<td></td>
</tr>
<tr>
<td align="center">authVersion</td>
<td align="center"><code>'v1' | 'v2'</code></td>
<td></td>
</tr>
<tr>
<td align="center">bot</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
<tr>
<td align="center">enterprise</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
<tr>
<td align="center">enterpriseUrl</td>
<td align="center"><code>string | undefined</code></td>
<td></td>
</tr>
<tr>
<td align="center">incomingWebhook</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
<tr>
<td align="center">isEnterpriseInstall</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">metadata</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">team</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
<tr>
<td align="center">tokenType</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="installationquery">InstallationQuery</h2>
<h3>Fields</h3>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">conversationId</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">enterpriseId</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">isEnterpriseInstall</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">teamId</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">userId</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="installationstore">InstallationStore</h2>
<h3>Fields</h3>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="center">Required</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">deleteInstallation</td>
<td align="center"><code>(query: <a href="#installationquery" title="">InstallationQuery</a>, logger?: Logger) => Promise&#x3C;void></code></td>
<td align="center">✗</td>
<td></td>
</tr>
<tr>
<td align="center">fetchInstallation</td>
<td align="center"><code>(query: <a href="#installationquery" title="">InstallationQuery</a>, logger?: Logger) => Promise&#x3C;<a href="#installation" title="">Installation</a>></code></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">storeInstallation</td>
<td align="center"><code>(installation: <a href="#installation" title="">Installation</a>, logger?: Logger) => Promise&#x3C;void></code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="installpathoptions">InstallPathOptions</h2>
<p>Customize the response headers and body data for additional user-specific data handling such as account mapping and activity tracking.</p>
<h3>Fields</h3>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="center">Description</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">beforeRedirection</td>
<td align="center"><code>(request: IncomingMessage, response: ServerResopnse, options: <a href="#installurloptions">InstallURLOptions</a>) => Promise&lt;boolean&gt;</code></td>
<td>When this method returns <code>false</code>, the <a href="#installprovider"><code>InstallProvider</code></a> skips <code>state</code> OAuth parameter generation, setting the <code>state</code> in HTTP cookies, generating an install URL and redirecting to the slack.com authorization URL. Common use cases for returning <code>false</code> include when the visiting user is not eligible to proceed with the Slack application installation flow. When returning <code>false</code>, this method is responsible for calling <code>response#end()</code> to build a complete HTTP response for the end-user.</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="installprovideroptions">InstallProviderOptions</h2>
<h3>Fields</h3>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="center">Description</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">authorizationUrl</td>
<td align="center"><code>string</code></td>
<td>The slack.com authorization URL. This defaults to <code>https://slack.com/oauth/v2/authorize</code> when OAuth v2 is used, otherwise it will be set to <code>https://slack.com/oauth/authorize</code>.</td>
<td></td>
</tr>
<tr>
<td align="center">authVersion</td>
<td align="center"><code>'v1' | 'v2'</code></td>
<td>The OAuth version to employ. Defaults to <code>v2</code>.</td>
<td></td>
</tr>
<tr>
<td align="center">clientId</td>
<td align="center"><code>string</code></td>
<td><b>Required</b>. Your application client ID can be found under the Basic Information section of your application on <a href="https://api.slack.com/apps">api.slack.com/apps</a>.</td>
<td></td>
</tr>
<tr>
<td align="center">clientOptions</td>
<td align="center"><code>Omit&#x3C;WebClientOptions, 'logLevel' | 'logger'></code></td>
<td>An object adhering to the <a href="../web-api">@slack/web-api</a> <a href="../web-api#webclientoptions"><code>WebClientOptions</code></a> interface, which can be used to customize the API client interacting with Slack's APIs under the hood in this package.</td>
<td></td>
</tr>
<tr>
<td align="center">clientSecret</td>
<td align="center"><code>string</code></td>
<td><b>Required</b>. Your application client secret can be found under the Basic Information section of your application on <a href="https://api.slack.com/apps">api.slack.com/apps</a>.</td>
<td></td>
</tr>
<tr>
<td align="center">directInstall</td>
<td align="center"><code>boolean</code></td>
<td>If <code>true</code>, the install path web page rendering will be skipped and instead the user will be immediately redirected to the slack.com entry point for the OAuth process. Defaults to <code>false</code>.</td>
<td></td>
</tr>
<tr>
<td align="center">installationStore</td>
<td align="center"><code><a href="#installationstore" title="">InstallationStore</a></code></td>
<td>An object adhering to the <a href="#installationstore"><code>InstallationStore</code></a> interface. Used to specify how application installation details like access token should be stored. Defaults to an instance of <a href="https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/installation-stores/memory-store.ts"><code>MemoryInstallationStore</code></a>.</td>
<td></td>
</tr>
<tr>
<td align="center">installUrlOptions</td>
<td align="center"><code><a href="#installurloptions" title="">InstallURLOptions</a></code></td>
<td>An object adhering to the <a href="#installurloptions"><code>InstallURLOptions</code></a> interface. Used to specify what permissions (scopes) the application should ask for, metadata to pass during the OAuth flow and override redirect URIs.</td>
<td></td>
</tr>
<tr>
<td align="center">legacyStateVerification</td>
<td align="center"><code>boolean</code></td>
<td>Whether to skip checking browser cookies for <code>state</code> OAuth parameter verification. Defaults to <code>false</code>. Enabling this option is not recommended! This is intended to be used only for backwards-compatibility with versions 2.4 and older.</td>
<td></td>
</tr>
<tr>
<td align="center">logger</td>
<td align="center"><a href="../logger#logger"><code>Logger</code></a></td>
<td>An object adhering to the <a href="../logger#logger"><code>Logger</code></a> interface. Used to specify how the application will log events.</td>
<td></td>
</tr>
<tr>
<td align="center">logLevel</td>
<td align="center"><a href="../logger#loglevel"><code>LogLevel</code></a></td>
<td>An object adhering to the <a href="../logger#loglevel"><code>LogLevel</code></a> enum. Used to specify how verbosely the application should log. Defaults to <code>INFO</code>.</td>
<td></td>
</tr>
<tr>
<td align="center">stateCookieExpirationSeconds</td>
<td align="center"><code>number</code></td>
<td>The expiration time in seconds for the <code>state</code> parameter used during the OAuth process. It defines an expiration time for the cookie used to store the state. Defaults to <code>600</code>.</td>
<td></td>
</tr>
<tr>
<td align="center">stateCookieName</td>
<td align="center"><code>string</code></td>
<td>The cookie name used to house the <code>state</code> parameter during the OAuth process. Defaults to <code>slack-app-oauth-state</code>.</td>
<td></td>
</tr>
<tr>
<td align="center">stateSecret</td>
<td align="center"><code>string</code></td>
<td>A secret value used for generating the <code>state</code> parameter used during the OAuth process (to prevent CSRF).</td>
<td></td>
</tr>
<tr>
<td align="center">stateStore</td>
<td align="center"><code><a href="#statestore" title="">StateStore</a></code></td>
<td>An object adhering to the <a href="#statestore"><code>StateStore</code></a> interface. Stores state issued to the authorization server and verified the value returned at redirection during the OAuth flow (to prevent CSRF). Defaults to <a href="https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/state-stores/clear-state-store.ts"><code>ClearStateStore</code></a>.</td>
<td></td>
</tr>
<tr>
<td align="center">stateVerification</td>
<td align="center"><code>boolean</code></td>
<td>Whether to enable verifying the <code>state</code> OAuth parameter. Defaults to <code>true</code>.</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="installurloptions">InstallURLOptions</h2>
<h3>Fields</h3>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">metadata</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">redirectUri</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">scopes</td>
<td align="center"><code>string | string[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">teamId</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">userScopes</td>
<td align="center"><code>string | string[]</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="orginstallation">OrgInstallation</h2>
<h3>Fields</h3>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">appId</td>
<td align="center"><code>string | undefined</code></td>
<td></td>
</tr>
<tr>
<td align="center">bot</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
<tr>
<td align="center">enterprise</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
<tr>
<td align="center">incomingWebhook</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
<tr>
<td align="center">tokenType</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="statestore">StateStore</h2>
<h3>Fields</h3>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">generateStateParam</td>
<td align="center"><code>(installOptions: <a href="#installurloptions" title="">InstallURLOptions</a>, now: Date) => Promise&#x3C;string></code></td>
<td></td>
</tr>
<tr>
<td align="center">verifyStateParam</td>
<td align="center"><code>(now: Date, state: string) => Promise&#x3C;<a href="#installurloptions" title="">InstallURLOptions</a>></code></td>
<td></td>
</tr>
</tbody>
</table>
