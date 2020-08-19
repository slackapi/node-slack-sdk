---
title: "@slack/interactive-messages"
slug: interactive-messages
---

<h1 id="classes" class="undefined auto-anchor-strong">Classes</h1>
<h2 id="slackmessageadapter">SlackMessageAdapter</h2>
<p>An adapter for Slack's interactive message components such as buttons, menus, and dialogs.</p>
<h4>new SlackMessageAdapter(signingSecret, opts)</h4>
<p>Create a message adapter.</p>
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
<td><p>Slack app signing secret used to authenticate request</p></td>
</tr>
<tr>
<td align="center">opts</td>
<td align="center"><code><a href="#messageadapteroptions" title="">MessageAdapterOptions</a></code></td>
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
<td align="center">agent</td>
<td align="center"><code>Agent</code></td>
<td></td>
</tr>
<tr>
<td align="center">lateResponseFallbackEnabled</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">syncResponseTimeout</td>
<td align="center"><code>number</code></td>
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
<td align="center">lateResponseFallbackEnabled</td>
<td align="center"><code>boolean</code></td>
<td><p>Whether or not promises that resolve after the syncResponseTimeout can fallback to a request for the response_url. This only works in cases where the semantic meaning of the response and the response_url are the same.</p></td>
</tr>
<tr>
<td align="center">signingSecret</td>
<td align="center"><code>string</code></td>
<td><p>Slack app signing secret used to authenticate request</p></td>
</tr>
<tr>
<td align="center">syncResponseTimeout</td>
<td align="center"><code>number</code></td>
<td><p>The number of milliseconds to wait before flushing a synchronous response to an incoming request and falling back to an asynchronous response.</p></td>
</tr>
</tbody>
</table>
<h3>Methods</h3>
<h4>action(matchingConstraints, callback)</h4>
<p>Add a handler for an interactive message action.</p>
<p>Usually there's no need to be concerned with _how_ a message is sent to Slack, but the following table describes it fully.</p>
<p>**Action**|**Return <code>object</code>**|**Return <code>Promise&#x3C;object></code>**|**Return <code>undefined</code>**|**Call <code>respond(message)</code>**|**Notes** :-----:|:-----:|:-----:|:-----:|:-----:|:-----: **Button Press**| Message in response | When resolved before <code>syncResponseTimeout</code> or <code>lateResponseFallbackEnabled: false</code>, message in response<br />When resolved after <code>syncResponseTimeout</code> and <code>lateResponseFallbackEnabled: true</code>, message in request to <code>response_url</code> | Empty response | Message in request to <code>response_url</code> | Create a new message instead of replacing using <code>replace_original: false</code> **Menu Selection**| Message in response | When resolved before <code>syncResponseTimeout</code> or <code>lateResponseFallbackEnabled: false</code>, message in response<br />When resolved after <code>syncResponseTimeout</code> and <code>lateResponseFallbackEnabled: true</code>, message in request to <code>response_url</code> | Empty response | Message in request to <code>response_url</code> | Create a new message instead of replacing using <code>replace_original: false</code> **Message Action** | Message in response | When resolved before <code>syncResponseTimeout</code> or <code>lateResponseFallbackEnabled: false</code>, message in response<br />When resolved after <code>syncResponseTimeout</code> and <code>lateResponseFallbackEnabled: true</code>, message in request to <code>response_url</code> | Empty response | Message in request to <code>response_url</code> | **Dialog Submission**| Error list in response | Error list in response | Empty response | Message in request to <code>response_url</code> | Returning a Promise that takes longer than 3 seconds to resolve can result in the user seeing an error. Warning logged if a promise isn't completed before <code>syncResponseTimeout</code>.</p>
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
<td align="center">matchingConstraints</td>
<td align="center"><code>string | RegExp | <a href="#actionconstraints" title="">ActionConstraints</a></code></td>
<td align="center">✓</td>
<td><p>the callback ID (as a string or RegExp) or an object describing the constraints to match actions for the handler.</p></td>
</tr>
<tr>
<td align="center">callback</td>
<td align="center"><code><a href="#actionhandler" title="">ActionHandler</a></code></td>
<td align="center">✓</td>
<td><p>the function to run when an action is matched</p></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>this</code></p>
<h4>createServer()</h4>
<p>Create a server that dispatches Slack's interactive message actions and menu requests to this message adapter instance. Use this method if your application will handle starting the server.</p>
<p><strong>Returns</strong> <code>Promise&#x3C;http.Server></code></p>
<h4>expressMiddleware()</h4>
<p>Create a middleware function that can be used to integrate with the <code>express</code> web framework in order for incoming requests to be dispatched to this message adapter instance.</p>
<p><strong>Returns</strong> <code>RequestHandler</code></p>
<h4>options(matchingConstraints, callback)</h4>
<p>Add a handler for an options request</p>
<p>Usually there's no need to be concerned with _how_ a message is sent to Slack, but the following table describes it fully</p>
<p>&#x26;nbsp;|**Return <code>options</code>**|**Return <code>Promise&#x3C;options></code>**|**Return <code>undefined</code>**|**Notes** :-----:|:-----:|:-----:|:-----:|:-----: **Options Request**| Options in response | Options in response | Empty response | Returning a Promise that takes longer than 3 seconds to resolve can result in the user seeing an error. If the request is from within a dialog, the <code>text</code> field is called <code>label</code>.</p>
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
<td align="center">matchingConstraints</td>
<td align="center"><code>string | RegExp | <a href="#optionsconstraints" title="">OptionsConstraints</a></code></td>
<td align="center">✓</td>
<td><p>the callback ID (as a string or RegExp) or an object describing the constraints to select options requests for the handler.</p></td>
</tr>
<tr>
<td align="center">callback</td>
<td align="center"><code><a href="#optionshandler" title="">OptionsHandler</a></code></td>
<td align="center">✓</td>
<td><p>the function to run when an options request is matched</p></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>this</code></p>
<h4>requestListener()</h4>
<p>Create a request listener function that handles HTTP requests, verifies requests and dispatches responses</p>
<p><strong>Returns</strong> <code>RequestListener</code></p>
<h4>shortcut(matchingConstraints, callback)</h4>
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
<td align="center">matchingConstraints</td>
<td align="center"><code>string | RegExp | <a href="#shortcutconstraints" title="">ShortcutConstraints</a></code></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">callback</td>
<td align="center"><code><a href="#shortcuthandler" title="">ShortcutHandler</a></code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>this</code></p>
<h4>start(port)</h4>
<p>Start a built-in server that dispatches Slack's interactive message actions and menu requests to this message adapter interface.</p>
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
<td align="center">port</td>
<td align="center"><code>number</code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>Promise&#x3C;http.Server></code></p>
<h4>stop()</h4>
<p>Stop the previously started built-in server.</p>
<p><strong>Returns</strong> <code>Promise&#x3C;void></code></p>
<h4>viewClosed(matchingConstraints, callback)</h4>
<p>Add a handler for view closed interaction. The handler should not return a value.</p>
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
<td align="center">matchingConstraints</td>
<td align="center"><code>string | RegExp | <a href="#viewconstraints" title="">ViewConstraints</a></code></td>
<td align="center">✓</td>
<td><p>the callback ID (as a string or RegExp) or an object describing the constraints to match view closed interactions for the handler.</p></td>
</tr>
<tr>
<td align="center">callback</td>
<td align="center"><code><a href="#viewclosedhandler" title="">ViewClosedHandler</a></code></td>
<td align="center">✓</td>
<td><p>the function to run when an view closed interaction is matched</p></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>this</code></p>
<h4>viewSubmission(matchingConstraints, callback)</h4>
<p>Add a handler for view submission.</p>
<p>The value returned from the <code>callback</code> determines the response sent back to Slack. The handler can return a plain object with a <code>response_action</code> property to dismiss the modal, push a view into the modal, display validation errors, or update the view. Alternatively, the handler can return a Promise for this kind of object, which resolves before <code>syncResponseTimeout</code> or <code>lateResponseFallbackEnabled: false</code>, to perform the same response actions. If the Promise resolves afterwards or <code>lateResponseFallbackEnabled: true</code> then the modal will be dismissed. If the handler returns <code>undefined</code> the modal will be dismissed.</p>
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
<td align="center">matchingConstraints</td>
<td align="center"><code>string | RegExp | <a href="#viewconstraints" title="">ViewConstraints</a></code></td>
<td align="center">✓</td>
<td><p>the callback ID (as a string or RegExp) or an object describing the constraints to match view submissions for the handler.</p></td>
</tr>
<tr>
<td align="center">callback</td>
<td align="center"><code><a href="#viewsubmissionhandler" title="">ViewSubmissionHandler</a></code></td>
<td align="center">✓</td>
<td><p>the function to run when an view submission is matched</p></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>this</code></p>
<h1 id="functions" class="undefined auto-anchor-strong">Functions</h1>
<h2 id="createmessageadapter-signingsecret-options-">createMessageAdapter(signingSecret, options)</h2>
<p>Factory method to create an instance of <a href="#slackmessageadapter" title=""><code>SlackMessageAdapter</code></a></p>
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
<td align="center"><code><a href="#messageadapteroptions" title="">MessageAdapterOptions</a></code></td>
<td align="center">✗</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code><a href="#slackmessageadapter" title="">SlackMessageAdapter</a></code></p>
<h1 id="enums" class="undefined auto-anchor-strong">Enums</h1>
<h2 id="errorcode">ErrorCode</h2>
<p>A dictionary of codes for errors produced by this package.</p>
<h3>Members</h3>
<ul>
<li><strong>BodyParserNotPermitted</strong></li>
<li><strong>PromiseTimeout</strong></li>
<li><strong>RequestTimeFailure</strong></li>
<li><strong>SignatureVerificationFailure</strong></li>
</ul>
<h2 id="responsestatus">ResponseStatus</h2>
<p>Some HTTP response statuses.</p>
<h3>Members</h3>
<ul>
<li><strong>Failure</strong></li>
<li><strong>Ok</strong></li>
</ul>
<h1 id="interfaces" class="undefined auto-anchor-strong">Interfaces</h1>
<h2 id="actionconstraints">ActionConstraints</h2>
<p>Constraints on when to call an action handler.</p>
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
<td align="center">actionId</td>
<td align="center"><code>string | RegExp</code></td>
<td><p>A string or RegExp to match against the <code>action_id</code></p></td>
</tr>
<tr>
<td align="center">blockId</td>
<td align="center"><code>string | RegExp</code></td>
<td><p>A string or RegExp to match against the <code>block_id</code></p></td>
</tr>
<tr>
<td align="center">callbackId</td>
<td align="center"><code>string | RegExp</code></td>
<td><p>A string or RegExp to match against the <code>callback_id</code></p></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>string</code></td>
<td><p>Valid types include all [actions block elements](https://api.slack.com/reference/messaging/interactive-components), <code>select</code> only for menu selections, or <code>dialog_submission</code> only for dialog submissions</p></td>
</tr>
<tr>
<td align="center">unfurl</td>
<td align="center"><code>boolean</code></td>
<td><p>When <code>true</code> only match actions from an unfurl</p></td>
</tr>
</tbody>
</table>
<h2 id="dispatchresult">DispatchResult</h2>
<p>The result of a call to <code>dispatch</code>.</p>
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
<td align="center">content</td>
<td align="center"><code>any</code></td>
<td></td>
</tr>
<tr>
<td align="center">status</td>
<td align="center"><code><a href="#responsestatus" title="">ResponseStatus</a></code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="messageadapteroptions">MessageAdapterOptions</h2>
<p>Options for constructing <a href="#slackmessageadapter" title=""><code>SlackMessageAdapter</code></a>.</p>
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
<td align="center">lateResponseFallbackEnabled</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">syncResponseTimeout</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="optionsconstraints">OptionsConstraints</h2>
<p>Constraints on when to call an options handler.</p>
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
<td align="center">actionId</td>
<td align="center"><code>string | RegExp</code></td>
<td><p>A string or RegExp to match against the <code>action_id</code></p></td>
</tr>
<tr>
<td align="center">blockId</td>
<td align="center"><code>string | RegExp</code></td>
<td><p>A string or RegExp to match against the <code>block_id</code></p></td>
</tr>
<tr>
<td align="center">callbackId</td>
<td align="center"><code>string | RegExp</code></td>
<td><p>A string or RegExp to match against the <code>callback_id</code></p></td>
</tr>
<tr>
<td align="center">within</td>
<td align="center"><code>'block_actions' | 'interactive_message' | 'dialog'</code></td>
<td><p>The source of options request.</p></td>
</tr>
</tbody>
</table>
<h2 id="shortcutconstraints">ShortcutConstraints</h2>
<p>Constraints on when to call an shortcut handler.</p>
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
<td align="center">callbackId</td>
<td align="center"><code>string | RegExp</code></td>
<td><p>A string or RegExp to match against the <code>callback_id</code></p></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'shortcut'</code></td>
<td><p>Valid type includes shortcut</p></td>
</tr>
</tbody>
</table>
<h2 id="viewconstraints">ViewConstraints</h2>
<p>Constraints on when to call a view submission or view closed handler.</p>
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
<td align="center">callbackId</td>
<td align="center"><code>string | RegExp</code></td>
<td><p>A string or RegExp to match against the <code>callback_id</code></p></td>
</tr>
<tr>
<td align="center">externalId</td>
<td align="center"><code>string | RegExp</code></td>
<td><p>A string to match against the <code>external_id</code></p></td>
</tr>
<tr>
<td align="center">viewId</td>
<td align="center"><code>string</code></td>
<td><p>A string to match against the <code>view_id</code></p></td>
</tr>
</tbody>
</table>
<h1 id="type-aliases" class="undefined auto-anchor-strong">Type Aliases</h1>
<h2 id="actionhandler">ActionHandler</h2>
<p>A handler function for action requests (block actions, button presses, menu selections, and dialog submissions).</p>
<pre><code class="language-ts">) => any | Promise&#x3C;any> | undefined
</code></pre>
<h2 id="optionshandler">OptionsHandler</h2>
<p>A handler function for menu options requests.</p>
<pre><code class="language-ts">&#x3C;any> | undefined
</code></pre>
<h2 id="respond">Respond</h2>
<p>A function used to send message updates after an action is handled. This function can be used up to 5 times in 30 minutes.</p>
<pre><code class="language-ts">&#x3C;unknown>
</code></pre>
<h2 id="shortcuthandler">ShortcutHandler</h2>
<p>A handler function for global shortcuts.</p>
<p>TODO: describe the payload and return values more specifically?</p>
<pre><code class="language-ts">&#x3C;any> | undefined
</code></pre>
<h2 id="viewclosedhandler">ViewClosedHandler</h2>
<p>A handler function for view closed requests.</p>
<p>TODO: describe the payload and return values more specifically?</p>
<pre><code class="language-ts"></code></pre>
One of:
<ul>
</ul>
<h2 id="viewsubmissionhandler">ViewSubmissionHandler</h2>
<p>A handler function for view submission requests.</p>
<p>TODO: describe the payload and return values more specifically?</p>
<pre><code class="language-ts">&#x3C;any> | undefined
</code></pre>