---
title: "@slack/logger"
slug: logger
---

<h1 id="slacklogger">@slack/logger</h1>
<h2 id="classes">Classes</h2>
<h3 id="consolelogger">ConsoleLogger</h3>
<p>Default logger which logs to stdout and stderr</p>
<h5 id="new-consolelogger">new ConsoleLogger()</h5>
<p>Constructs a new instance of the <code>ConsoleLogger</code> class</p>
<h4 id="methods">Methods</h4>
<h5 id="debugmsg">debug(msg)</h5>
<p>Log a debug message</p>
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
<td align="center">msg</td>
<td align="center"><code>any[]</code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h5 id="errormsg">error(msg)</h5>
<p>Log an error message</p>
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
<td align="center">msg</td>
<td align="center"><code>any[]</code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h5 id="getlevel">getLevel()</h5>
<p><strong>Returns</strong> <code><a href="#loglevel" title="">LogLevel</a></code></p>
<h5 id="infomsg">info(msg)</h5>
<p>Log an info message</p>
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
<td align="center">msg</td>
<td align="center"><code>any[]</code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h5 id="setlevellevel">setLevel(level)</h5>
<p>Sets the instance's log level so that only messages which are equal or more severe are output to the console.</p>
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
<td align="center">level</td>
<td align="center"><code><a href="#loglevel" title="">LogLevel</a></code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h5 id="setnamename">setName(name)</h5>
<p>Set the instance's name, which will appear on each log line before the message.</p>
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
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h5 id="warnmsg">warn(msg)</h5>
<p>Log a warning message</p>
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
<td align="center">msg</td>
<td align="center"><code>any[]</code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h2 id="enums">Enums</h2>
<h3 id="loglevel">LogLevel</h3>
<p>Severity levels for log entries</p>
<h4 id="members">Members</h4>
<ul>
<li><strong>DEBUG</strong></li>
<li><strong>ERROR</strong></li>
<li><strong>INFO</strong></li>
<li><strong>WARN</strong></li>
</ul>
<h2 id="interfaces">Interfaces</h2>
<h3 id="logger">Logger</h3>
<p>Interface for objects where objects in this package's logs can be sent (can be used as <code>logger</code> option).</p>
<h4 id="methods-1">Methods</h4>
<h5 id="debugmsg-1">debug(msg)</h5>
<p>Output debug message</p>
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
<td align="center">msg</td>
<td align="center"><code>any[]</code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h5 id="errormsg-1">error(msg)</h5>
<p>Output error message</p>
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
<td align="center">msg</td>
<td align="center"><code>any[]</code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h5 id="getlevel-1">getLevel()</h5>
<p>Return the current LogLevel.</p>
<p><strong>Returns</strong> <code><a href="#loglevel" title="">LogLevel</a></code></p>
<h5 id="infomsg-1">info(msg)</h5>
<p>Output info message</p>
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
<td align="center">msg</td>
<td align="center"><code>any[]</code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h5 id="setlevellevel-1">setLevel(level)</h5>
<p>This disables all logging below the given level, so that after a log.setLevel("warn") call log.warn("something") or log.error("something") will output messages, but log.info("something") will not.</p>
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
<td align="center">level</td>
<td align="center"><code><a href="#loglevel" title="">LogLevel</a></code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h5 id="setnamename-1">setName(name)</h5>
<p>This allows the instance to be named so that they can easily be filtered when many loggers are sending output to the same destination.</p>
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
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h5 id="warnmsg-1">warn(msg)</h5>
<p>Output warn message</p>
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
<td align="center">msg</td>
<td align="center"><code>any[]</code></td>
<td align="center">✓</td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>