---
title: "@slack/webhook"
---

<h1 id="classes" class="undefined auto-anchor-strong">Classes</h1>
<h2 id="incomingwebhook">IncomingWebhook</h2>
<p>A client for Slack's Incoming Webhooks</p>
<h4>new IncomingWebhook(url, defaults)</h4>
<p>Constructs a new instance of the <code>IncomingWebhook</code> class</p>
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
<td align="center">url</td>
<td align="center"><code>string</code></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">defaults</td>
<td align="center"><code><a href="#incomingwebhookdefaultarguments" title="">IncomingWebhookDefaultArguments</a></code></td>
<td align="center">✗</td>
<td></td>
</tr>
</tbody>
</table>
<h3>Methods</h3>
<h4>send(message)</h4>
<p>Send a notification to a conversation</p>
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
<td align="center">message</td>
<td align="center"><code>string | <a href="#incomingwebhooksendarguments" title="">IncomingWebhookSendArguments</a></code></td>
<td align="center">✓</td>
<td><p>the message (a simple string, or an object describing the message)</p></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>Promise&#x3C;<a href="#incomingwebhookresult" title="">IncomingWebhookResult</a>></code></p>
<h1 id="enums" class="undefined auto-anchor-strong">Enums</h1>
<h2 id="errorcode">ErrorCode</h2>
<p>A dictionary of codes for errors produced by this package</p>
<h3>Members</h3>
<ul>
<li><strong>HTTPError</strong></li>
<li><strong>RequestError</strong></li>
</ul>
<h1 id="interfaces" class="undefined auto-anchor-strong">Interfaces</h1>
<h2 id="codederror">CodedError</h2>
<p>All errors produced by this package adhere to this interface</p>
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
<td align="center">code</td>
<td align="center"><code><a href="#errorcode" title="">ErrorCode</a></code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="incomingwebhookdefaultarguments">IncomingWebhookDefaultArguments</h2>
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
<td align="center">agent</td>
<td align="center"><code>Agent</code></td>
<td></td>
</tr>
<tr>
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">icon_emoji</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">icon_url</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">link_names</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">username</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="incomingwebhookhttperror">IncomingWebhookHTTPError</h2>
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
<td align="center">code</td>
<td align="center"><code>ErrorCode.HTTPError</code></td>
<td></td>
</tr>
<tr>
<td align="center">original</td>
<td align="center"><code>Error</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="incomingwebhookrequesterror">IncomingWebhookRequestError</h2>
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
<td align="center">code</td>
<td align="center"><code>ErrorCode.RequestError</code></td>
<td></td>
</tr>
<tr>
<td align="center">original</td>
<td align="center"><code>Error</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="incomingwebhookresult">IncomingWebhookResult</h2>
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
<td align="center">text</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="incomingwebhooksendarguments">IncomingWebhookSendArguments</h2>
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
<td align="center">attachments</td>
<td align="center"><code>MessageAttachment[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">blocks</td>
<td align="center"><code>(KnownBlock | Block)[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">unfurl_links</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">unfurl_media</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h1 id="type-aliases" class="undefined auto-anchor-strong">Type Aliases</h1>
<h2 id="incomingwebhooksenderror">IncomingWebhookSendError</h2>
<pre><code class="language-ts">IncomingWebhookHTTPError</code></pre>
One of:
<ul>
<li><a href="#incomingwebhookhttperror" title=""><code>IncomingWebhookHTTPError</code></a></li>
</ul>