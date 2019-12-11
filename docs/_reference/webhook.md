---
title: "@slack/webhook"
slug: webhook
---

<h1 id="slackwebhook">@slack/webhook</h1>
<h2 id="classes">Classes</h2>
<h3 id="incomingwebhook">IncomingWebhook</h3>
<p>A client for Slack's Incoming Webhooks</p>
<h5 id="new-incomingwebhookurl-defaults">new IncomingWebhook(url, defaults)</h5>
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
<h4 id="methods">Methods</h4>
<h5 id="sendmessage">send(message)</h5>
<p>Send a notification to a conversation</p>
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
<td align="center">message</td>
<td align="center"><code>string | <a href="#incomingwebhooksendarguments" title="">IncomingWebhookSendArguments</a></code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>Promise&#x3C;<a href="#incomingwebhookresult" title="">IncomingWebhookResult</a>></code></p>
<h2 id="enums">Enums</h2>
<h3 id="errorcode">ErrorCode</h3>
<p>A dictionary of codes for errors produced by this package</p>
<h4 id="members">Members</h4>
<ul>
<li><strong>HTTPError</strong></li>
<li><strong>RequestError</strong></li>
</ul>
<h2 id="interfaces">Interfaces</h2>
<h3 id="incomingwebhookdefaultarguments">IncomingWebhookDefaultArguments</h3>
<h4 id="fields">Fields</h4>
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
<h3 id="incomingwebhookhttperror">IncomingWebhookHTTPError</h3>
<h4 id="fields-1">Fields</h4>
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
<h3 id="incomingwebhookrequesterror">IncomingWebhookRequestError</h3>
<h4 id="fields-2">Fields</h4>
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
<h3 id="incomingwebhookresult">IncomingWebhookResult</h3>
<h4 id="fields-3">Fields</h4>
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
<h3 id="incomingwebhooksendarguments">IncomingWebhookSendArguments</h3>
<h4 id="fields-4">Fields</h4>
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
<h2 id="type-aliases">Type Aliases</h2>
<h3 id="incomingwebhooksenderror">IncomingWebhookSendError</h3>
<pre><code class="language-ts">IncomingWebhookHTTPError
</code></pre>
One of:
<ul>
<li><a href="#incomingwebhookhttperror" title=""><code>IncomingWebhookHTTPError</code></a></li>
</ul>