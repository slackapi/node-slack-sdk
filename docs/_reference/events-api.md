---
title: "@slack/events-api"
slug: events-api
---

<h1 id="slackevents-api">@slack/events-api</h1>
<h2 id="functions">Functions</h2>
<h3 id="createeventadaptersigningsecret-options">createEventAdapter(signingSecret, options)</h3>
<p>Creates a new <code>SlackEventAdapter</code>.</p>
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
<td align="center"><code>EventAdapterOptions</code></td>
<td align="center">✗</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>SlackEventAdapter</code></p>
<h3 id="verifyrequestsignatureopts">verifyRequestSignature(opts)</h3>
<p>Verifies the signature of a request. Throws a <code>CodedError</code> if the signature is invalid.</p>
<h6 id="remarks">Remarks</h6>
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
<td align="center">{ signingSecret, requestSignature, requestTimestamp, body, }</td>
<td align="center"><code>VerifyRequestSignatureParams</code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>true</code>:<br>
<br>
<code>true</code> when the signature is valid.</p>