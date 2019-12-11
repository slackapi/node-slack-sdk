---
title: "@slack/web-api"
slug: web-api
---

<h1 id="slackweb-api">@slack/web-api</h1>
<h2 id="classes">Classes</h2>
<h3 id="webclient">WebClient</h3>
<p>A client for Slack's Web API</p>
<p>This client provides an alias for each <a href="https://api.slack.com/methods" title="">Web API method</a>. Each method is a convenience wrapper for calling the <code>apiCall</code> method using the method name as the first parameter.</p>
<h5 id="new-webclienttoken-opts">new WebClient(token, opts)</h5>
<p>Constructs a new instance of the <code>WebClient</code> class</p>
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
<td align="center">token</td>
<td align="center"><code>string</code></td>
<td align="center">✗</td>
<td><p>An API token to authenticate/authorize with Slack (usually start with <code>xoxp</code>, <code>xoxb</code>)</p></td>
</tr>
<tr>
<td align="center">opts</td>
<td align="center"><code><a href="#webclientoptions" title="">WebClientOptions</a></code></td>
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
<td align="center">headers</td>
<td align="center"><code>object</code></td>
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
<td align="center">maxRequestConcurrency</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">rejectRateLimitedCalls</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">retryConfig</td>
<td align="center"><code><a href="#retryoptions" title="">RetryOptions</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">slackApiUrl</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">tls</td>
<td align="center"><code><a href="#tlsoptions" title="">TLSOptions</a></code></td>
<td></td>
</tr>
</tbody>
</table>
<h4 id="fields">Fields</h4>
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
<td align="center">admin</td>
<td align="center"><code>object</code></td>
<td><p>admin method family</p></td>
</tr>
<tr>
<td align="center">api</td>
<td align="center"><code>object</code></td>
<td><p>api method family</p></td>
</tr>
<tr>
<td align="center">auth</td>
<td align="center"><code>object</code></td>
<td><p>auth method family</p></td>
</tr>
<tr>
<td align="center">bots</td>
<td align="center"><code>object</code></td>
<td><p>bots method family</p></td>
</tr>
<tr>
<td align="center">channels</td>
<td align="center"><code>object</code></td>
<td><p>channels method family</p></td>
</tr>
<tr>
<td align="center">chat</td>
<td align="center"><code>object</code></td>
<td><p>chat method family</p></td>
</tr>
<tr>
<td align="center">conversations</td>
<td align="center"><code>object</code></td>
<td><p>conversations method family</p></td>
</tr>
<tr>
<td align="center">dialog</td>
<td align="center"><code>object</code></td>
<td><p>dialog method family</p></td>
</tr>
<tr>
<td align="center">dnd</td>
<td align="center"><code>object</code></td>
<td><p>dnd method family</p></td>
</tr>
<tr>
<td align="center">emoji</td>
<td align="center"><code>object</code></td>
<td><p>emoji method family</p></td>
</tr>
<tr>
<td align="center">files</td>
<td align="center"><code>object</code></td>
<td><p>files method family</p></td>
</tr>
<tr>
<td align="center">groups</td>
<td align="center"><code>object</code></td>
<td><p>groups method family</p></td>
</tr>
<tr>
<td align="center">im</td>
<td align="center"><code>object</code></td>
<td><p>im method family</p></td>
</tr>
<tr>
<td align="center">migration</td>
<td align="center"><code>object</code></td>
<td><p>migration method family</p></td>
</tr>
<tr>
<td align="center">mpim</td>
<td align="center"><code>object</code></td>
<td><p>mpim method family</p></td>
</tr>
<tr>
<td align="center">oauth</td>
<td align="center"><code>object</code></td>
<td><p>oauth method family</p></td>
</tr>
<tr>
<td align="center">pins</td>
<td align="center"><code>object</code></td>
<td><p>pins method family</p></td>
</tr>
<tr>
<td align="center">reactions</td>
<td align="center"><code>object</code></td>
<td><p>reactions method family</p></td>
</tr>
<tr>
<td align="center">reminders</td>
<td align="center"><code>object</code></td>
<td><p>reminders method family</p></td>
</tr>
<tr>
<td align="center">rtm</td>
<td align="center"><code>object</code></td>
<td><p>rtm method family</p></td>
</tr>
<tr>
<td align="center">search</td>
<td align="center"><code>object</code></td>
<td><p>search method family</p></td>
</tr>
<tr>
<td align="center">slackApiUrl</td>
<td align="center"><code>string</code></td>
<td><p>The base URL for reaching Slack's Web API. Consider changing this value for testing purposes.</p></td>
</tr>
<tr>
<td align="center">stars</td>
<td align="center"><code>object</code></td>
<td><p>stars method family</p></td>
</tr>
<tr>
<td align="center">team</td>
<td align="center"><code>object</code></td>
<td><p>team method family</p></td>
</tr>
<tr>
<td align="center">token</td>
<td align="center"><code>string</code></td>
<td><p>Authentication and authorization token for accessing Slack Web API (usually begins with <code>xoxp</code> or <code>xoxb</code>)</p></td>
</tr>
<tr>
<td align="center">usergroups</td>
<td align="center"><code>object</code></td>
<td><p>usergroups method family</p></td>
</tr>
<tr>
<td align="center">users</td>
<td align="center"><code>object</code></td>
<td><p>users method family</p></td>
</tr>
<tr>
<td align="center">views</td>
<td align="center"><code>object</code></td>
<td><p>view method family</p></td>
</tr>
</tbody>
</table>
<h4 id="methods">Methods</h4>
<h5 id="apicallmethod-options">apiCall(method, options)</h5>
<p>Generic method for calling a Web API method</p>
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
<td align="center">method</td>
<td align="center"><code>string</code></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code><a href="#webapicalloptions" title="">WebAPICallOptions</a></code></td>
<td align="center">✗</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>Promise&#x3C;<a href="#webapicallresult" title="">WebAPICallResult</a>></code></p>
<h5 id="paginatemethod-options">paginate(method, options)</h5>
<p>Iterate over the result pages of a cursor-paginated Web API method. This method can return two types of values, depending on which arguments are used. When up to two parameters are used, the return value is an async iterator which can be used as the iterable in a for-await-of loop. When three or four parameters are used, the return value is a promise that resolves at the end of iteration. The third parameter, <code>shouldStop</code>, is a function that is called with each <code>page</code> and can end iteration by returning <code>true</code>. The fourth parameter, <code>reduce</code>, is a function that is called with three arguments: <code>accumulator</code>, <code>page</code>, and <code>index</code>. The <code>accumulator</code> is a value of any type you choose, but it will contain <code>undefined</code> when <code>reduce</code> is called for the first time. The <code>page</code> argument and <code>index</code> arguments are exactly what they say they are. The <code>reduce</code> function's return value will be passed in as <code>accumulator</code> the next time its called, and the returned promise will resolve to the last value of <code>accumulator</code>.</p>
<p>The for-await-of syntax is part of ES2018. It is available natively in Node starting with v10.0.0. You may be able to use it in earlier JavaScript runtimes by transpiling your source with a tool like Babel. However, the transpiled code will likely sacrifice performance.</p>
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
<td align="center">method</td>
<td align="center"><code>string</code></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code><a href="#webapicalloptions" title="">WebAPICallOptions</a></code></td>
<td align="center">✗</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>AsyncIterator&#x3C;<a href="#webapicallresult" title="">WebAPICallResult</a>></code></p>
<h5 id="paginatemethod-options-shouldstop">paginate(method, options, shouldStop)</h5>
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
<td align="center">method</td>
<td align="center"><code>string</code></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code><a href="#webapicalloptions" title="">WebAPICallOptions</a></code></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">shouldStop</td>
<td align="center"><code><a href="#paginatepredicate" title="">PaginatePredicate</a></code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>Promise&#x3C;void></code></p>
<h5 id="paginatemethod-options-shouldstop-reduce">paginate(method, options, shouldStop, reduce)</h5>
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
<td align="center">method</td>
<td align="center"><code>string</code></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code><a href="#webapicalloptions" title="">WebAPICallOptions</a></code></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">shouldStop</td>
<td align="center"><code><a href="#paginatepredicate" title="">PaginatePredicate</a></code></td>
<td align="center">✓</td>
<td></td>
</tr>
<tr>
<td align="center">reduce</td>
<td align="center"><code>PageReducer&#x3C;A></code></td>
<td align="center">✗</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>Promise&#x3C;A></code></p>
<h2 id="functions">Functions</h2>
<h3 id="addappmetadataopts">addAppMetadata(opts)</h3>
<p>Appends the app metadata into the User-Agent value</p>
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
<td align="center">{ name, version }</td>
<td align="center"><code>object</code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h2 id="enums">Enums</h2>
<h3 id="errorcode">ErrorCode</h3>
<p>A dictionary of codes for errors produced by this package</p>
<h4 id="members">Members</h4>
<ul>
<li><strong>HTTPError</strong></li>
<li><strong>PlatformError</strong></li>
<li><strong>RateLimitedError</strong></li>
<li><strong>RequestError</strong></li>
</ul>
<h3 id="webclientevent">WebClientEvent</h3>
<h4 id="members-1">Members</h4>
<ul>
<li><strong>RATE_LIMITED</strong></li>
</ul>
<h2 id="interfaces">Interfaces</h2>
<h3 id="adminappsapprovearguments">AdminAppsApproveArguments</h3>
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
<td align="center">app_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">request_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="adminappsrequestslistarguments">AdminAppsRequestsListArguments</h3>
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
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="adminappsrestrictarguments">AdminAppsRestrictArguments</h3>
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
<td align="center">app_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">request_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="admininviterequestsapprovearguments">AdminInviteRequestsApproveArguments</h3>
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
<td align="center">invite_request_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="admininviterequestsapprovedlistarguments">AdminInviteRequestsApprovedListArguments</h3>
<h4 id="fields-5">Fields</h4>
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
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="admininviterequestsdeniedlistarguments">AdminInviteRequestsDeniedListArguments</h3>
<h4 id="fields-6">Fields</h4>
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
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="admininviterequestsdenyarguments">AdminInviteRequestsDenyArguments</h3>
<h4 id="fields-7">Fields</h4>
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
<td align="center">invite_request_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="admininviterequestslistarguments">AdminInviteRequestsListArguments</h3>
<h4 id="fields-8">Fields</h4>
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
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="adminteamsadminslistarguments">AdminTeamsAdminsListArguments</h3>
<h4 id="fields-9">Fields</h4>
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
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="adminteamscreatearguments">AdminTeamsCreateArguments</h3>
<h4 id="fields-10">Fields</h4>
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
<td align="center">team_description</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">team_discoverability</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">team_domain</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">team_name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="adminteamsownerslistarguments">AdminTeamsOwnersListArguments</h3>
<h4 id="fields-11">Fields</h4>
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
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="adminusersassignarguments">AdminUsersAssignArguments</h3>
<h4 id="fields-12">Fields</h4>
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
<td align="center">is_restricted</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">is_ultra_restricted</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="adminusersinvitearguments">AdminUsersInviteArguments</h3>
<h4 id="fields-13">Fields</h4>
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
<td align="center">channel_ids</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">custom_message</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">email</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">guest_expiration_ts</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">is_restricted</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">is_ultra_restricted</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">real_name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">resend</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="adminusersremovearguments">AdminUsersRemoveArguments</h3>
<h4 id="fields-14">Fields</h4>
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
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="adminuserssessionresetarguments">AdminUsersSessionResetArguments</h3>
<h4 id="fields-15">Fields</h4>
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
<td align="center">mobile_only</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">user_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">web_only</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="adminuserssetadminarguments">AdminUsersSetAdminArguments</h3>
<h4 id="fields-16">Fields</h4>
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
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="adminuserssetownerarguments">AdminUsersSetOwnerArguments</h3>
<h4 id="fields-17">Fields</h4>
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
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="adminuserssetregulararguments">AdminUsersSetRegularArguments</h3>
<h4 id="fields-18">Fields</h4>
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
<td align="center">team_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="apitestarguments">APITestArguments</h3>
<h3 id="authrevokearguments">AuthRevokeArguments</h3>
<h4 id="fields-19">Fields</h4>
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
<td align="center">test</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="authtestarguments">AuthTestArguments</h3>
<h3 id="botsinfoarguments">BotsInfoArguments</h3>
<h4 id="fields-20">Fields</h4>
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
<td align="center">bot</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="channelsarchivearguments">ChannelsArchiveArguments</h3>
<h4 id="fields-21">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="channelscreatearguments">ChannelsCreateArguments</h3>
<h4 id="fields-22">Fields</h4>
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
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">validate</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="channelshistoryarguments">ChannelsHistoryArguments</h3>
<h4 id="fields-23">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">count</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">unreads</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="channelsinfoarguments">ChannelsInfoArguments</h3>
<h4 id="fields-24">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="channelsinvitearguments">ChannelsInviteArguments</h3>
<h4 id="fields-25">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="channelsjoinarguments">ChannelsJoinArguments</h3>
<h4 id="fields-26">Fields</h4>
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
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">validate</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="channelskickarguments">ChannelsKickArguments</h3>
<h4 id="fields-27">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="channelsleavearguments">ChannelsLeaveArguments</h3>
<h4 id="fields-28">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="channelslistarguments">ChannelsListArguments</h3>
<h4 id="fields-29">Fields</h4>
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
<td align="center">exclude_archived</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">exclude_members</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="channelsmarkarguments">ChannelsMarkArguments</h3>
<h4 id="fields-30">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">ts</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="channelsrenamearguments">ChannelsRenameArguments</h3>
<h4 id="fields-31">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">validate</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="channelsrepliesarguments">ChannelsRepliesArguments</h3>
<h4 id="fields-32">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">thread_ts</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="channelssetpurposearguments">ChannelsSetPurposeArguments</h3>
<h4 id="fields-33">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">purpose</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="channelssettopicarguments">ChannelsSetTopicArguments</h3>
<h4 id="fields-34">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">topic</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="channelsunarchivearguments">ChannelsUnarchiveArguments</h3>
<h4 id="fields-35">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="chatdeletearguments">ChatDeleteArguments</h3>
<h4 id="fields-36">Fields</h4>
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
<td align="center">as_user</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">ts</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="chatdeletescheduledmessagearguments">ChatDeleteScheduledMessageArguments</h3>
<h4 id="fields-37">Fields</h4>
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
<td align="center">as_user</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">scheduled_message_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="chatgetpermalinkarguments">ChatGetPermalinkArguments</h3>
<h4 id="fields-38">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">message_ts</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="chatmemessagearguments">ChatMeMessageArguments</h3>
<h4 id="fields-39">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="chatpostephemeralarguments">ChatPostEphemeralArguments</h3>
<h4 id="fields-40">Fields</h4>
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
<td align="center">as_user</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">link_names</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">parse</td>
<td align="center"><code>'full' | 'none'</code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="chatpostmessagearguments">ChatPostMessageArguments</h3>
<h4 id="fields-41">Fields</h4>
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
<td align="center">as_user</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
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
<td align="center">mrkdwn</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">parse</td>
<td align="center"><code>'full' | 'none'</code></td>
<td></td>
</tr>
<tr>
<td align="center">reply_broadcast</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">thread_ts</td>
<td align="center"><code>string</code></td>
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
<tr>
<td align="center">username</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="chatscheduledmessageslistarguments">ChatScheduledMessagesListArguments</h3>
<h4 id="fields-42">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">latest</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">oldest</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="chatschedulemessagearguments">ChatScheduleMessageArguments</h3>
<h4 id="fields-43">Fields</h4>
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
<td align="center">as_user</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">link_names</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">parse</td>
<td align="center"><code>'full' | 'none'</code></td>
<td></td>
</tr>
<tr>
<td align="center">post_at</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">reply_broadcast</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">thread_ts</td>
<td align="center"><code>string</code></td>
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
<h3 id="chatunfurlarguments">ChatUnfurlArguments</h3>
<h4 id="fields-44">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">ts</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">unfurls</td>
<td align="center"><code>LinkUnfurls</code></td>
<td></td>
</tr>
<tr>
<td align="center">user_auth_message</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user_auth_required</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">user_auth_url</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="chatupdatearguments">ChatUpdateArguments</h3>
<h4 id="fields-45">Fields</h4>
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
<td align="center">as_user</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">link_names</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">parse</td>
<td align="center"><code>'full' | 'none'</code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">ts</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationsarchivearguments">ConversationsArchiveArguments</h3>
<h4 id="fields-46">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationsclosearguments">ConversationsCloseArguments</h3>
<h4 id="fields-47">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationscreatearguments">ConversationsCreateArguments</h3>
<h4 id="fields-48">Fields</h4>
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
<td align="center">is_private</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationshistoryarguments">ConversationsHistoryArguments</h3>
<h4 id="fields-49">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationsinfoarguments">ConversationsInfoArguments</h3>
<h4 id="fields-50">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationsinvitearguments">ConversationsInviteArguments</h3>
<h4 id="fields-51">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">users</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationsjoinarguments">ConversationsJoinArguments</h3>
<h4 id="fields-52">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationskickarguments">ConversationsKickArguments</h3>
<h4 id="fields-53">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationsleavearguments">ConversationsLeaveArguments</h3>
<h4 id="fields-54">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationslistarguments">ConversationsListArguments</h3>
<h4 id="fields-55">Fields</h4>
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
<td align="center">exclude_archived</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">types</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationsmembersarguments">ConversationsMembersArguments</h3>
<h4 id="fields-56">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationsopenarguments">ConversationsOpenArguments</h3>
<h4 id="fields-57">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">return_im</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">users</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationsrenamearguments">ConversationsRenameArguments</h3>
<h4 id="fields-58">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationsrepliesarguments">ConversationsRepliesArguments</h3>
<h4 id="fields-59">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">ts</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationssetpurposearguments">ConversationsSetPurposeArguments</h3>
<h4 id="fields-60">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">purpose</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationssettopicarguments">ConversationsSetTopicArguments</h3>
<h4 id="fields-61">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">topic</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationsunarchivearguments">ConversationsUnarchiveArguments</h3>
<h4 id="fields-62">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="cursorpaginationenabled">CursorPaginationEnabled</h3>
<h4 id="fields-63">Fields</h4>
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
<td align="center">cursor</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">limit</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="dialogopenarguments">DialogOpenArguments</h3>
<h4 id="fields-64">Fields</h4>
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
<td align="center">dialog</td>
<td align="center"><code>Dialog</code></td>
<td></td>
</tr>
<tr>
<td align="center">trigger_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="dndenddndarguments">DndEndDndArguments</h3>
<h3 id="dndendsnoozearguments">DndEndSnoozeArguments</h3>
<h3 id="dndinfoarguments">DndInfoArguments</h3>
<h4 id="fields-65">Fields</h4>
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
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="dndsetsnoozearguments">DndSetSnoozeArguments</h3>
<h4 id="fields-66">Fields</h4>
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
<td align="center">num_minutes</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="dndteaminfoarguments">DndTeamInfoArguments</h3>
<h4 id="fields-67">Fields</h4>
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
<td align="center">users</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="emojilistarguments">EmojiListArguments</h3>
<h3 id="filescommentsdeletearguments">FilesCommentsDeleteArguments</h3>
<h4 id="fields-68">Fields</h4>
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
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="filesdeletearguments">FilesDeleteArguments</h3>
<h4 id="fields-69">Fields</h4>
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
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="filesinfoarguments">FilesInfoArguments</h3>
<h4 id="fields-70">Fields</h4>
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
<td align="center">count</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">page</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="fileslistarguments">FilesListArguments</h3>
<h4 id="fields-71">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">ts_from</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">ts_to</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">types</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="filesremoteaddarguments">FilesRemoteAddArguments</h3>
<h4 id="fields-72">Fields</h4>
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
<td align="center">external_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">external_url</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">filetype</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">indexable_file_contents</td>
<td align="center"><code>Buffer | Stream</code></td>
<td></td>
</tr>
<tr>
<td align="center">preview_image</td>
<td align="center"><code>Buffer | Stream</code></td>
<td></td>
</tr>
<tr>
<td align="center">title</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="filesremoteinfoarguments">FilesRemoteInfoArguments</h3>
<h4 id="fields-73">Fields</h4>
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
<td align="center">external_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="filesremotelistarguments">FilesRemoteListArguments</h3>
<h4 id="fields-74">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">ts_from</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">ts_to</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="filesremoteremovearguments">FilesRemoteRemoveArguments</h3>
<h4 id="fields-75">Fields</h4>
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
<td align="center">external_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="filesremotesharearguments">FilesRemoteShareArguments</h3>
<h4 id="fields-76">Fields</h4>
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
<td align="center">channels</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">external_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="filesremoteupdatearguments">FilesRemoteUpdateArguments</h3>
<h4 id="fields-77">Fields</h4>
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
<td align="center">external_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">external_url</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">filetype</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">indexable_file_contents</td>
<td align="center"><code>Buffer | Stream</code></td>
<td></td>
</tr>
<tr>
<td align="center">preview_image</td>
<td align="center"><code>Buffer | Stream</code></td>
<td></td>
</tr>
<tr>
<td align="center">title</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="filesrevokepublicurlarguments">FilesRevokePublicURLArguments</h3>
<h4 id="fields-78">Fields</h4>
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
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="filessharedpublicurlarguments">FilesSharedPublicURLArguments</h3>
<h4 id="fields-79">Fields</h4>
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
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="filesuploadarguments">FilesUploadArguments</h3>
<h4 id="fields-80">Fields</h4>
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
<td align="center">channels</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">content</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file</td>
<td align="center"><code>Buffer | Stream</code></td>
<td></td>
</tr>
<tr>
<td align="center">filename</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">filetype</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">initial_comment</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">thread_ts</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">title</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupsarchivearguments">GroupsArchiveArguments</h3>
<h4 id="fields-81">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupscreatearguments">GroupsCreateArguments</h3>
<h4 id="fields-82">Fields</h4>
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
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">validate</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupscreatechildarguments">GroupsCreateChildArguments</h3>
<h4 id="fields-83">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupshistoryarguments">GroupsHistoryArguments</h3>
<h4 id="fields-84">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">count</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">unreads</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupsinfoarguments">GroupsInfoArguments</h3>
<h4 id="fields-85">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupsinvitearguments">GroupsInviteArguments</h3>
<h4 id="fields-86">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupskickarguments">GroupsKickArguments</h3>
<h4 id="fields-87">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupsleavearguments">GroupsLeaveArguments</h3>
<h4 id="fields-88">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupslistarguments">GroupsListArguments</h3>
<h4 id="fields-89">Fields</h4>
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
<td align="center">exclude_archived</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">exclude_members</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupsmarkarguments">GroupsMarkArguments</h3>
<h4 id="fields-90">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">ts</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupsopenarguments">GroupsOpenArguments</h3>
<h4 id="fields-91">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupsrenamearguments">GroupsRenameArguments</h3>
<h4 id="fields-92">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">validate</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupsrepliesarguments">GroupsRepliesArguments</h3>
<h4 id="fields-93">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">thread_ts</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupssetpurposearguments">GroupsSetPurposeArguments</h3>
<h4 id="fields-94">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">purpose</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupssettopicarguments">GroupsSetTopicArguments</h3>
<h4 id="fields-95">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">topic</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="groupsunarchivearguments">GroupsUnarchiveArguments</h3>
<h4 id="fields-96">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="imclosearguments">IMCloseArguments</h3>
<h4 id="fields-97">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="imhistoryarguments">IMHistoryArguments</h3>
<h4 id="fields-98">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">count</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">unreads</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="imlistarguments">IMListArguments</h3>
<h3 id="immarkarguments">IMMarkArguments</h3>
<h4 id="fields-99">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">ts</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="imopenarguments">IMOpenArguments</h3>
<h4 id="fields-100">Fields</h4>
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
<td align="center">return_im</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="imrepliesarguments">IMRepliesArguments</h3>
<h4 id="fields-101">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">thread_ts</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="localeaware">LocaleAware</h3>
<h4 id="fields-102">Fields</h4>
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
<td align="center">include_locale</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="migrationexchangearguments">MigrationExchangeArguments</h3>
<h4 id="fields-103">Fields</h4>
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
<td align="center">to_old</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">users</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="mpimclosearguments">MPIMCloseArguments</h3>
<h4 id="fields-104">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="mpimhistoryarguments">MPIMHistoryArguments</h3>
<h4 id="fields-105">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">count</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">unreads</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="mpimlistarguments">MPIMListArguments</h3>
<h3 id="mpimmarkarguments">MPIMMarkArguments</h3>
<h4 id="fields-106">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">ts</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="mpimopenarguments">MPIMOpenArguments</h3>
<h4 id="fields-107">Fields</h4>
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
<td align="center">users</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="mpimrepliesarguments">MPIMRepliesArguments</h3>
<h4 id="fields-108">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">thread_ts</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="oauthaccessarguments">OAuthAccessArguments</h3>
<h4 id="fields-109">Fields</h4>
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
<td align="center">client_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">client_secret</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">code</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">redirect_uri</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">single_channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="oauthv2accessarguments">OAuthV2AccessArguments</h3>
<h4 id="fields-110">Fields</h4>
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
<td align="center">client_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">client_secret</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">code</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">redirect_uri</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="paginatepredicate">PaginatePredicate</h3>
<h3 id="pinsaddarguments">PinsAddArguments</h3>
<h4 id="fields-111">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file_comment</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">timestamp</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="pinslistarguments">PinsListArguments</h3>
<h4 id="fields-112">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="pinsremovearguments">PinsRemoveArguments</h3>
<h4 id="fields-113">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file_comment</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">timestamp</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="reactionsaddarguments">ReactionsAddArguments</h3>
<h4 id="fields-114">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file_comment</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">timestamp</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="reactionsgetarguments">ReactionsGetArguments</h3>
<h4 id="fields-115">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file_comment</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">full</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">timestamp</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="reactionslistarguments">ReactionsListArguments</h3>
<h4 id="fields-116">Fields</h4>
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
<td align="center">full</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="reactionsremovearguments">ReactionsRemoveArguments</h3>
<h4 id="fields-117">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file_comment</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">timestamp</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="remindersaddarguments">RemindersAddArguments</h3>
<h4 id="fields-118">Fields</h4>
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
<tr>
<td align="center">time</td>
<td align="center"><code>string | number</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="reminderscompletearguments">RemindersCompleteArguments</h3>
<h4 id="fields-119">Fields</h4>
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
<td align="center">reminder</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="remindersdeletearguments">RemindersDeleteArguments</h3>
<h4 id="fields-120">Fields</h4>
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
<td align="center">reminder</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="remindersinfoarguments">RemindersInfoArguments</h3>
<h4 id="fields-121">Fields</h4>
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
<td align="center">reminder</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="reminderslistarguments">RemindersListArguments</h3>
<h3 id="retryoptions">RetryOptions</h3>
<p>Options to create retry policies. Extends from https://github.com/tim-kos/node-retry.</p>
<h3 id="rtmconnectarguments">RTMConnectArguments</h3>
<h4 id="fields-122">Fields</h4>
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
<td align="center">batch_presence_aware</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">presence_sub</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="rtmstartarguments">RTMStartArguments</h3>
<h4 id="fields-123">Fields</h4>
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
<td align="center">batch_presence_aware</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">mpim_aware</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">no_latest</td>
<td align="center"><code>'0' | '1'</code></td>
<td></td>
</tr>
<tr>
<td align="center">no_unreads</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">presence_sub</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">simple_latest</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="searchable">Searchable</h3>
<h4 id="fields-124">Fields</h4>
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
<td align="center">highlight</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">query</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">sort_dir</td>
<td align="center"><code>'asc' | 'desc'</code></td>
<td></td>
</tr>
<tr>
<td align="center">sort</td>
<td align="center"><code>'score' | 'timestamp'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="searchallarguments">SearchAllArguments</h3>
<h3 id="searchfilesarguments">SearchFilesArguments</h3>
<h3 id="searchmessagesarguments">SearchMessagesArguments</h3>
<h3 id="starsaddarguments">StarsAddArguments</h3>
<h4 id="fields-125">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file_comment</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">timestamp</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="starslistarguments">StarsListArguments</h3>
<h3 id="starsremovearguments">StarsRemoveArguments</h3>
<h4 id="fields-126">Fields</h4>
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
<td align="center">channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file_comment</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">file</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">timestamp</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="teamaccesslogsarguments">TeamAccessLogsArguments</h3>
<h4 id="fields-127">Fields</h4>
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
<td align="center">before</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">count</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">page</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="teambillableinfoarguments">TeamBillableInfoArguments</h3>
<h4 id="fields-128">Fields</h4>
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
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="teaminfoarguments">TeamInfoArguments</h3>
<h3 id="teamintegrationlogsarguments">TeamIntegrationLogsArguments</h3>
<h4 id="fields-129">Fields</h4>
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
<td align="center">app_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">change_type</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">count</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">page</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">service_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="teamprofilegetarguments">TeamProfileGetArguments</h3>
<h4 id="fields-130">Fields</h4>
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
<td align="center">visibility</td>
<td align="center"><code>'all' | 'visible' | 'hidden'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="timelinepaginationenabled">TimelinePaginationEnabled</h3>
<h4 id="fields-131">Fields</h4>
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
<td align="center">inclusive</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">latest</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">oldest</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="tokenoverridable">TokenOverridable</h3>
<h4 id="fields-132">Fields</h4>
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
<td align="center">token</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="traditionalpagingenabled">TraditionalPagingEnabled</h3>
<h4 id="fields-133">Fields</h4>
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
<td align="center">count</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">page</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="usergroupscreatearguments">UsergroupsCreateArguments</h3>
<h4 id="fields-134">Fields</h4>
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
<td align="center">channels</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">description</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">handle</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">include_count</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="usergroupsdisablearguments">UsergroupsDisableArguments</h3>
<h4 id="fields-135">Fields</h4>
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
<td align="center">include_count</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">usergroup</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="usergroupsenablearguments">UsergroupsEnableArguments</h3>
<h4 id="fields-136">Fields</h4>
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
<td align="center">include_count</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">usergroup</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="usergroupslistarguments">UsergroupsListArguments</h3>
<h4 id="fields-137">Fields</h4>
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
<td align="center">include_count</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">include_disabled</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">include_users</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="usergroupsupdatearguments">UsergroupsUpdateArguments</h3>
<h4 id="fields-138">Fields</h4>
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
<td align="center">channels</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">description</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">handle</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">include_count</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">usergroup</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="usergroupsuserslistarguments">UsergroupsUsersListArguments</h3>
<h4 id="fields-139">Fields</h4>
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
<td align="center">include_disabled</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">usergroup</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="usergroupsusersupdatearguments">UsergroupsUsersUpdateArguments</h3>
<h4 id="fields-140">Fields</h4>
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
<td align="center">include_count</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">usergroup</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">users</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="usersconversationsarguments">UsersConversationsArguments</h3>
<h4 id="fields-141">Fields</h4>
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
<td align="center">exclude_archived</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">types</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="usersdeletephotoarguments">UsersDeletePhotoArguments</h3>
<h3 id="usersgetpresencearguments">UsersGetPresenceArguments</h3>
<h4 id="fields-142">Fields</h4>
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
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="usersidentityarguments">UsersIdentityArguments</h3>
<h3 id="usersinfoarguments">UsersInfoArguments</h3>
<h4 id="fields-143">Fields</h4>
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
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="userslistarguments">UsersListArguments</h3>
<h4 id="fields-144">Fields</h4>
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
<td align="center">presence</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="userslookupbyemailarguments">UsersLookupByEmailArguments</h3>
<h4 id="fields-145">Fields</h4>
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
<td align="center">email</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="usersprofilegetarguments">UsersProfileGetArguments</h3>
<h4 id="fields-146">Fields</h4>
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
<td align="center">include_labels</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="usersprofilesetarguments">UsersProfileSetArguments</h3>
<h4 id="fields-147">Fields</h4>
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
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">profile</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">value</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="userssetphotoarguments">UsersSetPhotoArguments</h3>
<h4 id="fields-148">Fields</h4>
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
<td align="center">crop_w</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">crop_x</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">crop_y</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">image</td>
<td align="center"><code>Buffer | Stream</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="userssetpresencearguments">UsersSetPresenceArguments</h3>
<h4 id="fields-149">Fields</h4>
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
<td align="center">presence</td>
<td align="center"><code>'auto' | 'away'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="viewsopenarguments">ViewsOpenArguments</h3>
<h4 id="fields-150">Fields</h4>
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
<td align="center">trigger_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">view</td>
<td align="center"><code>View</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="viewspublisharguments">ViewsPublishArguments</h3>
<h4 id="fields-151">Fields</h4>
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
<td align="center">hash</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">user_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">view</td>
<td align="center"><code>View</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="viewspusharguments">ViewsPushArguments</h3>
<h4 id="fields-152">Fields</h4>
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
<td align="center">trigger_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">view</td>
<td align="center"><code>View</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="viewsupdatearguments">ViewsUpdateArguments</h3>
<h4 id="fields-153">Fields</h4>
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
<td align="center">external_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">hash</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">view_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">view</td>
<td align="center"><code>View</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="webapicalloptions">WebAPICallOptions</h3>
<h3 id="webapicallresult">WebAPICallResult</h3>
<h4 id="fields-154">Fields</h4>
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
<td align="center">error</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">ok</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">response_metadata</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="webapihttperror">WebAPIHTTPError</h3>
<h4 id="fields-155">Fields</h4>
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
<td align="center">body</td>
<td align="center"><code>any</code></td>
<td></td>
</tr>
<tr>
<td align="center">code</td>
<td align="center"><code>ErrorCode.HTTPError</code></td>
<td></td>
</tr>
<tr>
<td align="center">headers</td>
<td align="center"><code>IncomingHttpHeaders</code></td>
<td></td>
</tr>
<tr>
<td align="center">statusCode</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">statusMessage</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="webapiplatformerror">WebAPIPlatformError</h3>
<h4 id="fields-156">Fields</h4>
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
<td align="center"><code>ErrorCode.PlatformError</code></td>
<td></td>
</tr>
<tr>
<td align="center">data</td>
<td align="center"><code><a href="#webapicallresult" title="">WebAPICallResult</a> &#x26; {
error: string;
}</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="webapiratelimitederror">WebAPIRateLimitedError</h3>
<h4 id="fields-157">Fields</h4>
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
<td align="center"><code>ErrorCode.RateLimitedError</code></td>
<td></td>
</tr>
<tr>
<td align="center">retryAfter</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="webapirequesterror">WebAPIRequestError</h3>
<h4 id="fields-158">Fields</h4>
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
<h3 id="webclientoptions">WebClientOptions</h3>
<h4 id="fields-159">Fields</h4>
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
<td align="center">headers</td>
<td align="center"><code>object</code></td>
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
<td align="center">maxRequestConcurrency</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">rejectRateLimitedCalls</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">retryConfig</td>
<td align="center"><code><a href="#retryoptions" title="">RetryOptions</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">slackApiUrl</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">tls</td>
<td align="center"><code><a href="#tlsoptions" title="">TLSOptions</a></code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="type-aliases">Type Aliases</h2>
<h3 id="tlsoptions">TLSOptions</h3>
<pre><code class="language-ts">SecureContextOptions, 'pfx' | 'key' | 'passphrase' | 'cert' | 'ca'>
</code></pre>
<h3 id="webapicallerror">WebAPICallError</h3>
<pre><code class="language-ts">WebAPIRequestError | WebAPIHTTPError | WebAPIRateLimitedError
</code></pre>
One of:
<ul>
<li><a href="#webapirequesterror" title=""><code>WebAPIRequestError</code></a></li>
<li><a href="#webapihttperror" title=""><code>WebAPIHTTPError</code></a></li>
<li><a href="#webapiratelimitederror" title=""><code>WebAPIRateLimitedError</code></a></li>
</ul>