---
title: "@slack/web-api"
slug: web-api
---

<h1 id="classes" class="undefined auto-anchor-strong">Classes</h1>
<h2 id="webclient">WebClient</h2>
<p>A client for Slack's Web API</p>
<p>This client provides an alias for each <a href="https://api.slack.com/methods" title="">Web API method</a>. Each method is a convenience wrapper for calling the <code>apiCall</code> method using the method name as the first parameter.</p>
<h4>new WebClient(token, opts)</h4>
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
<td><p>An API token to authenticate/authorize with Slack (usually start with <code>xoxp</code>, <code>xoxb</code>). To learn how to get an access token, check out our <a href="https://api.slack.com/authentication/basics">Authentication Basics documentation</a>, and in particular the <a href="https://api.slack.com/authentication/basics#getting-your-authentication-token">Getting your access token section</a>.</p></td>
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
<td align="center">slackApiUrl</td>
<td align="center"><code>string</code></td>
<td><p>The base URL for reaching Slack's Web API. Consider changing this value for testing purposes.</p></td>
</tr>
<tr>
<td align="center">token</td>
<td align="center"><code>string</code></td>
<td><p>An API token to authenticate/authorize with Slack (usually start with <code>xoxp</code>, <code>xoxb</code>). To learn how to get an access token, check out our <a href="https://api.slack.com/authentication/basics">Authentication Basics documentation</a>, and in particular the <a href="https://api.slack.com/authentication/basics#getting-your-authentication-token">Getting your access token section</a>.</p></td>
</tr>
</tbody>
</table>
<h3>Methods</h3>
<h4>apiCall(method, options)</h4>
<p>Generic method for calling a Web API method</p>
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
<td align="center">method</td>
<td align="center"><code>string</code></td>
<td align="center">✓</td>
<td><p>the Web API method to call <a href="https://api.slack.com/methods" title="">https://api.slack.com/methods</a></p></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code><a href="#webapicalloptions" title="">WebAPICallOptions</a></code></td>
<td align="center">✗</td>
<td><p>options</p></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>Promise&#x3C;<a href="#webapicallresult" title="">WebAPICallResult</a>></code></p>
<h4>paginate(method, options)</h4>
<p>Iterate over the result pages of a cursor-paginated Web API method. This method can return two types of values, depending on which arguments are used. When up to two parameters are used, the return value is an async iterator which can be used as the iterable in a for-await-of loop. When three or four parameters are used, the return value is a promise that resolves at the end of iteration. The third parameter, <code>shouldStop</code>, is a function that is called with each <code>page</code> and can end iteration by returning <code>true</code>. The fourth parameter, <code>reduce</code>, is a function that is called with three arguments: <code>accumulator</code>, <code>page</code>, and <code>index</code>. The <code>accumulator</code> is a value of any type you choose, but it will contain <code>undefined</code> when <code>reduce</code> is called for the first time. The <code>page</code> argument and <code>index</code> arguments are exactly what they say they are. The <code>reduce</code> function's return value will be passed in as <code>accumulator</code> the next time its called, and the returned promise will resolve to the last value of <code>accumulator</code>.</p>
<p>The for-await-of syntax is part of ES2018. It is available natively in Node starting with v10.0.0. You may be able to use it in earlier JavaScript runtimes by transpiling your source with a tool like Babel. However, the transpiled code will likely sacrifice performance.</p>
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
<td align="center">method</td>
<td align="center"><code>string</code></td>
<td align="center">✓</td>
<td><p>the cursor-paginated Web API method to call <a href="https://api.slack.com/docs/pagination" title="">https://api.slack.com/docs/pagination</a></p></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code><a href="#webapicalloptions" title="">WebAPICallOptions</a></code></td>
<td align="center">✗</td>
<td><p>options</p></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>AsyncIterable&#x3C;<a href="#webapicallresult" title="">WebAPICallResult</a>></code></p>
<h4>paginate(method, options, shouldStop)</h4>
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
<h4>paginate(method, options, shouldStop, reduce)</h4>
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
<td align="center"><code><a href="#pagereducer" title="">PageReducer</a>&#x3C;A></code></td>
<td align="center">✗</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>Promise&#x3C;A></code></p>
<h1 id="functions" class="undefined auto-anchor-strong">Functions</h1>
<h2 id="addappmetadata-opts-">addAppMetadata(opts)</h2>
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
<h1 id="enums" class="undefined auto-anchor-strong">Enums</h1>
<h2 id="errorcode">ErrorCode</h2>
<p>A dictionary of codes for errors produced by this package</p>
<h3>Members</h3>
<ul>
<li><strong>HTTPError</strong></li>
<li><strong>PlatformError</strong></li>
<li><strong>RateLimitedError</strong></li>
<li><strong>RequestError</strong></li>
</ul>
<h2 id="webclientevent">WebClientEvent</h2>
<h3>Members</h3>
<ul>
<li><strong>RATE_LIMITED</strong></li>
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
<h2 id="cursorpaginationenabled">CursorPaginationEnabled</h2>
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
<h2 id="localeaware">LocaleAware</h2>
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
<td align="center">include_locale</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="method">Method</h2>
<p>Generic method definition</p>
<h2 id="pagereducer">PageReducer</h2>
<h2 id="paginatepredicate">PaginatePredicate</h2>
<h2 id="retryoptions">RetryOptions</h2>
<p>Options to create retry policies. Extends from https://github.com/tim-kos/node-retry.</p>
<h2 id="searchable">Searchable</h2>
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
<h2 id="timelinepaginationenabled">TimelinePaginationEnabled</h2>
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
<h2 id="tokenoverridable">TokenOverridable</h2>
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
<td align="center">token</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="traditionalpagingenabled">TraditionalPagingEnabled</h2>
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
<h2 id="webapicalloptions">WebAPICallOptions</h2>
<h2 id="webapicallresult">WebAPICallResult</h2>
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
<h2 id="webapihttperror">WebAPIHTTPError</h2>
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
<h2 id="webapiplatformerror">WebAPIPlatformError</h2>
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
<h2 id="webapiratelimitederror">WebAPIRateLimitedError</h2>
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
<h2 id="webapirequesterror">WebAPIRequestError</h2>
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
<h2 id="webclientoptions">WebClientOptions</h2>
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
<h1 id="type-aliases" class="undefined auto-anchor-strong">Type Aliases</h1>
<h2 id="pageaccumulator">PageAccumulator</h2>
<pre><code class="language-ts">R extends (accumulator: (infer A) | undefined, page: WebAPICallResult, index: number) => infer A ? A : never
</code></pre>
<h2 id="tlsoptions">TLSOptions</h2>
<pre><code class="language-ts">SecureContextOptions, 'pfx' | 'key' | 'passphrase' | 'cert' | 'ca'>
</code></pre>
<h2 id="webapicallerror">WebAPICallError</h2>
<pre><code class="language-ts">WebAPIRequestError | WebAPIHTTPError | WebAPIRateLimitedError
</code></pre>
One of:
<ul>
<li><a href="#webapirequesterror" title=""><code>WebAPIRequestError</code></a></li>
<li><a href="#webapihttperror" title=""><code>WebAPIHTTPError</code></a></li>
<li><a href="#webapiratelimitederror" title=""><code>WebAPIRateLimitedError</code></a></li>
</ul>
