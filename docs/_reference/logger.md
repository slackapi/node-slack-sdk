---
title: "@slack/logger"
---

<h1 id="classes" class="undefined auto-anchor-strong">Classes</h1>
<h2 id="consolelogger">ConsoleLogger</h2>
<p>Default logger which logs to stdout and stderr</p>
<h4>new ConsoleLogger()</h4>
<p>Constructs a new instance of the <code>ConsoleLogger</code> class</p>
<h3>Methods</h3>
<h4>debug(msg)</h4>
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
<h4>error(msg)</h4>
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
<h4>getLevel()</h4>
<p><strong>Returns</strong> <code><a href="#loglevel" title="">LogLevel</a></code></p>
<h4>info(msg)</h4>
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
<h4>setLevel(level)</h4>
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
<h4>setName(name)</h4>
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
<h4>warn(msg)</h4>
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
<h1 id="enums" class="undefined auto-anchor-strong">Enums</h1>
<h2 id="loglevel">LogLevel</h2>
<p>Severity levels for log entries</p>
<h3>Members</h3>
<ul>
<li><strong>DEBUG</strong></li>
<li><strong>ERROR</strong></li>
<li><strong>INFO</strong></li>
<li><strong>WARN</strong></li>
</ul>
<h1 id="interfaces" class="undefined auto-anchor-strong">Interfaces</h1>
<h2 id="logger">Logger</h2>
<p>Interface for objects where objects in this package's logs can be sent (can be used as <code>logger</code> option).</p>
<h3>Methods</h3>
<h4>debug(msg)</h4>
<p>Output debug message</p>
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
<td align="center">msg</td>
<td align="center"><code>any[]</code></td>
<td align="center">✓</td>
<td><p>any data to log</p></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h4>error(msg)</h4>
<p>Output error message</p>
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
<td align="center">msg</td>
<td align="center"><code>any[]</code></td>
<td align="center">✓</td>
<td><p>any data to log</p></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h4>getLevel()</h4>
<p>Return the current LogLevel.</p>
<p><strong>Returns</strong> <code><a href="#loglevel" title="">LogLevel</a></code></p>
<h4>info(msg)</h4>
<p>Output info message</p>
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
<td align="center">msg</td>
<td align="center"><code>any[]</code></td>
<td align="center">✓</td>
<td><p>any data to log</p></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h4>setLevel(level)</h4>
<p>This disables all logging below the given level, so that after a log.setLevel("warn") call log.warn("something") or log.error("something") will output messages, but log.info("something") will not.</p>
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
<td align="center">level</td>
<td align="center"><code><a href="#loglevel" title="">LogLevel</a></code></td>
<td align="center">✓</td>
<td><p>as a string, like 'error' (case-insensitive)</p></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h4>setName(name)</h4>
<p>This allows the instance to be named so that they can easily be filtered when many loggers are sending output to the same destination.</p>
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
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td align="center">✓</td>
<td><p>as a string, will be output with every log after the level</p></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>
<h4>warn(msg)</h4>
<p>Output warn message</p>
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
<td align="center">msg</td>
<td align="center"><code>any[]</code></td>
<td align="center">✓</td>
<td><p>any data to log</p></td>
</tr>
</tbody>
</table>
<p><strong>Returns</strong> <code>void</code></p>