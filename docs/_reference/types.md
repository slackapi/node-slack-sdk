---
title: "@slack/types"
slug: types
---

<h1 id="slacktypes">@slack/types</h1>
<h2 id="interfaces">Interfaces</h2>
<h3 id="action">Action</h3>
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
<td align="center">action_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="actionsblock">ActionsBlock</h3>
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
<td align="center">elements</td>
<td align="center"><code>(<a href="#knownaction" title="">KnownAction</a> | <a href="#action" title="">Action</a>)[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'actions'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="attachmentaction">AttachmentAction</h3>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirmation" title="">Confirmation</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">data_source</td>
<td align="center"><code>'static' | 'channels' | 'conversations' | 'users' | 'external'</code></td>
<td></td>
</tr>
<tr>
<td align="center">id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">min_query_length</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">option_groups</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code><a href="#optionfield" title="">OptionField</a>[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">selected_options</td>
<td align="center"><code><a href="#optionfield" title="">OptionField</a>[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">style</td>
<td align="center"><code>'default' | 'primary' | 'danger'</code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'button' | 'select'</code></td>
<td></td>
</tr>
<tr>
<td align="center">url</td>
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
<h3 id="block">Block</h3>
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
<td align="center">block_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="button">Button</h3>
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
<td align="center">style</td>
<td align="center"><code>'danger' | 'primary'</code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'button'</code></td>
<td></td>
</tr>
<tr>
<td align="center">url</td>
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
<h3 id="channelsselect">ChannelsSelect</h3>
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
<td align="center">initial_channel</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">placeholder</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'channels_select'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="confirm">Confirm</h3>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">deny</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a> | <a href="#mrkdwnelement" title="">MrkdwnElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">title</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="confirmation">Confirmation</h3>
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
<td align="center">dismiss_text</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">ok_text</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
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
<h3 id="contextblock">ContextBlock</h3>
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
<td align="center">elements</td>
<td align="center"><code>(<a href="#imageelement" title="">ImageElement</a> | <a href="#userelement" title="">UserElement</a> | <a href="#plaintextelement" title="">PlainTextElement</a> | <a href="#mrkdwnelement" title="">MrkdwnElement</a>)[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'context'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="conversationsselect">ConversationsSelect</h3>
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
<td align="center">initial_conversation</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">placeholder</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'conversations_select'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="datepicker">Datepicker</h3>
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
<td align="center">initial_date</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">placeholder</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'datepicker'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="dialog">Dialog</h3>
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
<td align="center">callback_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">elements</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
<tr>
<td align="center">notify_on_cancel</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">state</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">submit_label</td>
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
<h3 id="dividerblock">DividerBlock</h3>
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
<td align="center">type</td>
<td align="center"><code>'divider'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="externalselect">ExternalSelect</h3>
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
<td align="center">initial_option</td>
<td align="center"><code><a href="#option" title="">Option</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">min_query_length</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">placeholder</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'external_select'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="fileblock">FileBlock</h3>
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
<td align="center">external_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">source</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'file'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="imageblock">ImageBlock</h3>
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
<td align="center">alt_text</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">image_url</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">title</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'image'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="imageelement">ImageElement</h3>
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
<td align="center">alt_text</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">image_url</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'image'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="linkunfurls">LinkUnfurls</h3>
<h3 id="messageattachment">MessageAttachment</h3>
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
<td align="center">actions</td>
<td align="center"><code><a href="#attachmentaction" title="">AttachmentAction</a>[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">author_icon</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">author_link</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">author_name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">blocks</td>
<td align="center"><code>(<a href="#knownblock" title="">KnownBlock</a> | <a href="#block" title="">Block</a>)[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">callback_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">color</td>
<td align="center"><code>'good' | 'warning' | 'danger' | string</code></td>
<td></td>
</tr>
<tr>
<td align="center">fallback</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">fields</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
<tr>
<td align="center">footer_icon</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">footer</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">image_url</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">mrkdwn_in</td>
<td align="center"><code>('pretext' | 'text' | 'fields')[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">pretext</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">thumb_url</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">title_link</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">title</td>
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
<h3 id="mrkdwnelement">MrkdwnElement</h3>
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
<td align="center">text</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'mrkdwn'</code></td>
<td></td>
</tr>
<tr>
<td align="center">verbatim</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="option">Option</h3>
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
<td align="center">description</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">url</td>
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
<h3 id="optionfield">OptionField</h3>
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
<td align="center">description</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
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
<h3 id="overflow">Overflow</h3>
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
<td align="center">options</td>
<td align="center"><code><a href="#option" title="">Option</a>[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'overflow'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="plaintextelement">PlainTextElement</h3>
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
<td align="center">emoji</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'plain_text'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="sectionblock">SectionBlock</h3>
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
<td align="center">accessory</td>
<td align="center"><code><a href="#knownaction" title="">KnownAction</a> | <a href="#action" title="">Action</a> | <a href="#imageelement" title="">ImageElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">fields</td>
<td align="center"><code>(<a href="#plaintextelement" title="">PlainTextElement</a> | <a href="#mrkdwnelement" title="">MrkdwnElement</a>)[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a> | <a href="#mrkdwnelement" title="">MrkdwnElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'section'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="selectoption">SelectOption</h3>
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
<td align="center">label</td>
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
<h3 id="staticselect">StaticSelect</h3>
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
<td align="center">initial_option</td>
<td align="center"><code><a href="#option" title="">Option</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">option_groups</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code><a href="#option" title="">Option</a>[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">placeholder</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'static_select'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="userelement">UserElement</h3>
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
<td align="center">type</td>
<td align="center"><code>'user'</code></td>
<td></td>
</tr>
<tr>
<td align="center">user_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="usersselect">UsersSelect</h3>
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
<td align="center">initial_user</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">placeholder</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'users_select'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="type-aliases">Type Aliases</h2>
<h3 id="knownaction">KnownAction</h3>
<pre><code class="language-ts">UsersSelect | StaticSelect | ConversationsSelect | ChannelsSelect | ExternalSelect | Button | Overflow | Datepicker
</code></pre>
One of:
<ul>
<li><a href="#usersselect" title=""><code>UsersSelect</code></a></li>
<li><a href="#staticselect" title=""><code>StaticSelect</code></a></li>
<li><a href="#conversationsselect" title=""><code>ConversationsSelect</code></a></li>
<li><a href="#channelsselect" title=""><code>ChannelsSelect</code></a></li>
<li><a href="#externalselect" title=""><code>ExternalSelect</code></a></li>
<li><a href="#button" title=""><code>Button</code></a></li>
<li><a href="#overflow" title=""><code>Overflow</code></a></li>
<li><a href="#datepicker" title=""><code>Datepicker</code></a></li>
</ul>
<h3 id="knownblock">KnownBlock</h3>
<pre><code class="language-ts">ImageBlock | ContextBlock | ActionsBlock | DividerBlock | SectionBlock | FileBlock
</code></pre>
One of:
<ul>
<li><a href="#imageblock" title=""><code>ImageBlock</code></a></li>
<li><a href="#contextblock" title=""><code>ContextBlock</code></a></li>
<li><a href="#actionsblock" title=""><code>ActionsBlock</code></a></li>
<li><a href="#dividerblock" title=""><code>DividerBlock</code></a></li>
<li><a href="#sectionblock" title=""><code>SectionBlock</code></a></li>
<li><a href="#fileblock" title=""><code>FileBlock</code></a></li>
</ul>