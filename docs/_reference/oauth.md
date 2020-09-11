---
title: "@slack/oauth"
slug: oauth
---

<h1 id="classes" class="undefined auto-anchor-strong">Classes</h1>
<h2 id="installprovider">InstallProvider</h2>
<p>InstallProvider Class.</p>
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
<strong>Options:</strong>
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
<td align="center">authorizationUrl</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">authVersion</td>
<td align="center"><code>'v1' | 'v2'</code></td>
<td></td>
</tr>
<tr>
<td align="center">clientId</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">clientOptions</td>
<td align="center"><code>Omit&#x3C;WebClientOptions, 'logLevel' | 'logger'></code></td>
<td></td>
</tr>
<tr>
<td align="center">clientSecret</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">installationStore</td>
<td align="center"><code><a href="#installationstore" title="">InstallationStore</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">logger</td>
<td align="center"><code>Logger</code></td>
<td></td>
</tr>
<tr>
<td align="center">logLevel</td>
<td align="center"><code>LogLevel</code></td>
<td></td>
</tr>
<tr>
<td align="center">stateSecret</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">stateStore</td>
<td align="center"><code><a href="#statestore" title="">StateStore</a></code></td>
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
<h4>authorize(source)</h4>
<p>Fetches data from the installationStore.</p>
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
<h4>generateInstallUrl(options)</h4>
<p>Returns a URL that is suitable for including in an Add to Slack button Uses stateStore to generate a value for the state query param.</p>
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
</tbody>
</table>
<p><strong>Returns</strong> <code>Promise&#x3C;string></code></p>
<h4>handleCallback(req, res, options)</h4>
<p>This method handles the incoming request to the callback URL. It can be used as a RequestListener in almost any HTTP server framework.</p>
<p>Verifies the state using the stateStore, exchanges the grant in the query params for an access token, and stores token and associated data in the installationStore.</p>
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
<td align="center"><code>IncomingMessage</code></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">res</td>
<td align="center"><code>ServerResponse</code></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code><a href="#callbackoptions" title="">CallbackOptions</a></code></td>
<td align="center">✗</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>Promise&#x3C;void></code></p>
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
<td align="center">botToken</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">botUserId</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">userToken</td>
<td align="center"><code>string</code></td>
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
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">failure</td>
<td align="center"><code>(error: CodedError, options: <a href="#installurloptions" title="">InstallURLOptions</a>, callbackReq: IncomingMessage, callbackRes: ServerResponse) => void</code></td>
<td></td>
</tr>
<tr>
<td align="center">success</td>
<td align="center"><code>(installation: <a href="#installation" title="">Installation</a>, options: <a href="#installurloptions" title="">InstallURLOptions</a>, callbackReq: IncomingMessage, callbackRes: ServerResponse) => void</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="installation">Installation</h2>
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
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">fetchInstallation</td>
<td align="center"><code>(query: <a href="#installationquery" title="">InstallationQuery</a>, logger?: Logger) => Promise&#x3C;<a href="#installation" title="">Installation</a>></code></td>
<td></td>
</tr>
<tr>
<td align="center">storeInstallation</td>
<td align="center"><code>(installation: <a href="#installation" title="">Installation</a>, logger?: Logger) => Promise&#x3C;void></code></td>
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
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">authorizationUrl</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">authVersion</td>
<td align="center"><code>'v1' | 'v2'</code></td>
<td></td>
</tr>
<tr>
<td align="center">clientId</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">clientOptions</td>
<td align="center"><code>Omit&#x3C;WebClientOptions, 'logLevel' | 'logger'></code></td>
<td></td>
</tr>
<tr>
<td align="center">clientSecret</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">installationStore</td>
<td align="center"><code><a href="#installationstore" title="">InstallationStore</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">logger</td>
<td align="center"><code>Logger</code></td>
<td></td>
</tr>
<tr>
<td align="center">logLevel</td>
<td align="center"><code>LogLevel</code></td>
<td></td>
</tr>
<tr>
<td align="center">stateSecret</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">stateStore</td>
<td align="center"><code><a href="#statestore" title="">StateStore</a></code></td>
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