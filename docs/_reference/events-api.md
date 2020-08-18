---
title: "@slack/events-api"
slug: events-api
---

<h1 id="classes" class="undefined auto-anchor-strong">Classes</h1>
<h2 id="slackeventadapter">SlackEventAdapter</h2>
<p>An adapter for Slack's Events API.</p>
<h4>new SlackEventAdapter(signingSecret, opts)</h4>
<p>Constructs a new instance of the <code>SlackEventAdapter</code> class</p>
<strong>Parameters:</strong>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="center">Required</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">signingSecret</td>
<td align="center"><code>string</code></td>
<td align="center">✓</td>
<td><p>The token used to authenticate signed requests from Slack's Events API.</p></td>
</tr>
<tr>
<td align="center">opts</td>
<td align="center"><code><a href="#eventadapteroptions" title="">EventAdapterOptions</a></code></td>
<td align="center">✗</td>
<td>See options.</td>
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
<td align="center">includeBody</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">includeHeaders</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">waitForResponse</td>
<td align="center"><code>boolean</code></td>
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
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">includeBody</td>
<td align="center"><code>boolean</code></td>
<td><p>Whether to include the API event bodies in adapter event listeners.</p></td>
</tr>
<tr>
<td align="center">includeHeaders</td>
<td align="center"><code>boolean</code></td>
<td><p>Whether to include request headers in adapter event listeners.</p></td>
</tr>
<tr>
<td align="center">signingSecret</td>
<td align="center"><code>string</code></td>
<td><p>The token used to authenticate signed requests from Slack's Events API.</p></td>
</tr>
<tr>
<td align="center">waitForResponse</td>
<td align="center"><code>boolean</code></td>
<td><p>When <code>true</code> prevents the adapter from responding by itself and leaves that up to listeners.</p></td>
</tr>
</tbody>
</table>
<h3>Methods</h3>
<h4>createServer()</h4>
<p>Creates an HTTP server to listen for event payloads.</p>
<p><strong>Returns</strong> <code>Promise&#x3C;http.Server></code></p>
<h4>expressMiddleware()</h4>
<p>Returns a middleware-compatible adapter.</p>
<p><strong>Returns</strong> <code>RequestHandler</code></p>
<h4>requestListener()</h4>
<p>Creates a request listener.</p>
<p><strong>Returns</strong> <code>RequestListener</code></p>
<h4>start(port)</h4>
<p>Starts a server on the specified port.</p>
<strong>Parameters:</strong>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="center">Required</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">port</td>
<td align="center"><code>number</code></td>
<td align="center">✓</td>
<td><p>The port number to listen on.</p></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>Promise&#x3C;http.Server></code></p>
<h4>stop()</h4>
<p>Stops the server started by <a href="#slackeventadapter" title=""><code>SlackEventAdapter</code></a>.</p>
<p><strong>Returns</strong> <code>Promise&#x3C;void></code></p>
<h1 id="functions" class="undefined auto-anchor-strong">Functions</h1>
<h2 id="createeventadapter-signingsecret-options-">createEventAdapter(signingSecret, options)</h2>
<p>Creates a new <a href="#slackeventadapter" title=""><code>SlackEventAdapter</code></a>.</p>
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
<td align="center">signingSecret</td>
<td align="center"><code>string</code></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code><a href="#eventadapteroptions" title="">EventAdapterOptions</a></code></td>
<td align="center">✗</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code><a href="#slackeventadapter" title="">SlackEventAdapter</a></code></p>
<h2 id="verifyrequestsignature-opts-">verifyRequestSignature(opts)</h2>
<p>Verifies the signature of a request. Throws a <a href="#codederror" title=""><code>CodedError</code></a> if the signature is invalid.</p>
<h5>Remarks</h5>
<p>See [Verifying requests from Slack](https://api.slack.com/docs/verifying-requests-from-slack#sdk_support) for more information.</p>
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
<td align="center"><code><a href="#verifyrequestsignatureparams" title="">VerifyRequestSignatureParams</a></code></td>
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
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">body</td>
<td align="center"><code>string</code></td>
<td><p>Full, raw body string.</p></td>
</tr>
<tr>
<td align="center">requestSignature</td>
<td align="center"><code>string</code></td>
<td><p>Signature from the <code>X-Slack-Signature</code> header.</p></td>
</tr>
<tr>
<td align="center">requestTimestamp</td>
<td align="center"><code>number</code></td>
<td><p>Timestamp from the <code>X-Slack-Request-Timestamp</code> header.</p></td>
</tr>
<tr>
<td align="center">signingSecret</td>
<td align="center"><code>string</code></td>
<td><p>The signing secret used to verify request signature.</p></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>true</code>:<br>
<br>
<code>true</code> when the signature is valid.</p>
<h1 id="enums" class="undefined auto-anchor-strong">Enums</h1>
<h2 id="errorcode">ErrorCode</h2>
<p>A dictionary of codes for errors produced by this package.</p>
<h3>Members</h3>
<ul>
<li><strong>BodyParserNotPermitted</strong></li>
<li><strong>RequestTimeFailure</strong></li>
<li><strong>SignatureVerificationFailure</strong></li>
</ul>
<h1 id="interfaces" class="undefined auto-anchor-strong">Interfaces</h1>
<h2 id="codederror">CodedError</h2>
<p>All errors produced by this package are regular <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" title="">Error</a> objects with an extra <a href="#codederror" title=""><code>CodedError</code></a> field.</p>
<h3>Fields</h3>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">code</td>
<td align="center"><code><a href="#errorcode" title="">ErrorCode</a></code></td>
<td><p>What kind of error occurred.</p></td>
</tr>
</tbody>
</table>
<h2 id="eventadapteroptions">EventAdapterOptions</h2>
<p>Options when constructing <a href="#slackeventadapter" title=""><code>SlackEventAdapter</code></a>. See <a href="#slackeventadapter" title=""><code>SlackEventAdapter</code></a>'s fields for more information on what each option does.</p>
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
<td align="center">includeBody</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">includeHeaders</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">waitForResponse</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="verifyrequestsignatureparams">VerifyRequestSignatureParams</h2>
<p>Parameters for calling <a href="#verifyrequestsignature" title=""><code>verifyRequestSignature</code></a>.</p>
<h3>Fields</h3>
<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">body</td>
<td align="center"><code>string</code></td>
<td><p>Full, raw body string.</p></td>
</tr>
<tr>
<td align="center">requestSignature</td>
<td align="center"><code>string</code></td>
<td><p>Signature from the <code>X-Slack-Signature</code> header.</p></td>
</tr>
<tr>
<td align="center">requestTimestamp</td>
<td align="center"><code>number</code></td>
<td><p>Timestamp from the <code>X-Slack-Request-Timestamp</code> header.</p></td>
</tr>
<tr>
<td align="center">signingSecret</td>
<td align="center"><code>string</code></td>
<td><p>The signing secret used to verify request signature.</p></td>
</tr>
</tbody>
</table>