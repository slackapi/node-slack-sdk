---
title: "@slack/types"
slug: types
---

<h1 id="interfaces" class="undefined auto-anchor-strong">Interfaces</h1>
<h2 id="action">Action</h2>
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
<td align="center">action_id</td>
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
<h2 id="actionsblock">ActionsBlock</h2>
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
<td align="center">elements</td>
<td align="center"><code>(<a href="#button" title="">Button</a> | <a href="#overflow" title="">Overflow</a> | <a href="#datepicker" title="">Datepicker</a> | <a href="#select" title="">Select</a> | <a href="#radiobuttons" title="">RadioButtons</a> | <a href="#checkboxes" title="">Checkboxes</a> | <a href="#action" title="">Action</a>)[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'actions'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="attachmentaction">AttachmentAction</h2>
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
<h2 id="block">Block</h2>
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
<h2 id="button">Button</h2>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
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
<h2 id="calluserexternal">CallUserExternal</h2>
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
<td align="center">avatar_url</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">display_name</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">external_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="calluserslack">CallUserSlack</h2>
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
<td align="center">slack_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="channelsselect">ChannelsSelect</h2>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
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
<h2 id="checkboxes">Checkboxes</h2>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">initial_options</td>
<td align="center"><code>Option[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code>Option[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'checkboxes'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="confirm">Confirm</h2>
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
<td align="center">style</td>
<td align="center"><code>'primary' | 'danger'</code></td>
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
<h2 id="confirmation">Confirmation</h2>
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
<h2 id="contextblock">ContextBlock</h2>
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
<td align="center">elements</td>
<td align="center"><code>(<a href="#imageelement" title="">ImageElement</a> | <a href="#plaintextelement" title="">PlainTextElement</a> | <a href="#mrkdwnelement" title="">MrkdwnElement</a>)[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'context'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="conversationsselect">ConversationsSelect</h2>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">default_to_current_conversation</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">filter</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
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
<td align="center">response_url_enabled</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'conversations_select'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="datepicker">Datepicker</h2>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
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
<h2 id="dialog">Dialog</h2>
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
<h2 id="dividerblock">DividerBlock</h2>
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
<td align="center">type</td>
<td align="center"><code>'divider'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="externalselect">ExternalSelect</h2>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">initial_option</td>
<td align="center"><code>Option</code></td>
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
<h2 id="fileblock">FileBlock</h2>
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
<h2 id="headerblock">HeaderBlock</h2>
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
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'header'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="imageblock">ImageBlock</h2>
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
<h2 id="imageelement">ImageElement</h2>
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
<h2 id="inputblock">InputBlock</h2>
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
<td align="center">element</td>
<td align="center"><code><a href="#select" title="">Select</a> | <a href="#multiselect" title="">MultiSelect</a> | <a href="#datepicker" title="">Datepicker</a> | <a href="#plaintextinput" title="">PlainTextInput</a> | <a href="#radiobuttons" title="">RadioButtons</a> | <a href="#checkboxes" title="">Checkboxes</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">hint</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">label</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">optional</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'input'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="linkunfurls">LinkUnfurls</h2>
<h2 id="messageattachment">MessageAttachment</h2>
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
<h2 id="mrkdwnelement">MrkdwnElement</h2>
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
<h2 id="multichannelsselect">MultiChannelsSelect</h2>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">initial_channels</td>
<td align="center"><code>string[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">max_selected_items</td>
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
<td align="center"><code>'multi_channels_select'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="multiconversationsselect">MultiConversationsSelect</h2>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">default_to_current_conversation</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">filter</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
<tr>
<td align="center">initial_conversations</td>
<td align="center"><code>string[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">max_selected_items</td>
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
<td align="center"><code>'multi_conversations_select'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="multiexternalselect">MultiExternalSelect</h2>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">initial_options</td>
<td align="center"><code>Option[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">max_selected_items</td>
<td align="center"><code>number</code></td>
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
<td align="center"><code>'multi_external_select'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="multistaticselect">MultiStaticSelect</h2>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">initial_options</td>
<td align="center"><code>Option[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">max_selected_items</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">option_groups</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code>Option[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">placeholder</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'multi_static_select'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="multiusersselect">MultiUsersSelect</h2>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">initial_users</td>
<td align="center"><code>string[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">max_selected_items</td>
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
<td align="center"><code>'multi_users_select'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="option-2">Option_2</h2>
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
<td align="center">description</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a> | <a href="#mrkdwnelement" title="">MrkdwnElement</a></code></td>
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
<h2 id="optionfield">OptionField</h2>
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
<h2 id="overflow">Overflow</h2>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code>Option[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'overflow'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="plaintextelement">PlainTextElement</h2>
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
<h2 id="plaintextinput">PlainTextInput</h2>
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
<td align="center">initial_value</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">max_length</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">min_length</td>
<td align="center"><code>number</code></td>
<td></td>
</tr>
<tr>
<td align="center">multiline</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">placeholder</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'plain_text_input'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="radiobuttons">RadioButtons</h2>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">initial_option</td>
<td align="center"><code>Option</code></td>
<td></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code>Option[]</code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'radio_buttons'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="sectionblock">SectionBlock</h2>
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
<td align="center">accessory</td>
<td align="center"><code><a href="#button" title="">Button</a> | <a href="#overflow" title="">Overflow</a> | <a href="#datepicker" title="">Datepicker</a> | <a href="#select" title="">Select</a> | <a href="#multiselect" title="">MultiSelect</a> | <a href="#action" title="">Action</a> | <a href="#imageelement" title="">ImageElement</a> | <a href="#radiobuttons" title="">RadioButtons</a> | <a href="#checkboxes" title="">Checkboxes</a></code></td>
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
<h2 id="selectoption">SelectOption</h2>
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
<h2 id="staticselect">StaticSelect</h2>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">initial_option</td>
<td align="center"><code>Option</code></td>
<td></td>
</tr>
<tr>
<td align="center">option_groups</td>
<td align="center"><code>object</code></td>
<td></td>
</tr>
<tr>
<td align="center">options</td>
<td align="center"><code>Option[]</code></td>
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
<h2 id="usersselect">UsersSelect</h2>
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
<td align="center">confirm</td>
<td align="center"><code><a href="#confirm" title="">Confirm</a></code></td>
<td></td>
</tr>
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
<h2 id="view">View</h2>
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
<td align="center">clear_on_close</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">close</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">external_id</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">notify_on_close</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">private_metadata</td>
<td align="center"><code>string</code></td>
<td></td>
</tr>
<tr>
<td align="center">submit_disabled</td>
<td align="center"><code>boolean</code></td>
<td></td>
</tr>
<tr>
<td align="center">submit</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">title</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
<td></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'home' | 'modal' | 'workflow_step'</code></td>
<td></td>
</tr>
</tbody>
</table>
<h1 id="type-aliases" class="undefined auto-anchor-strong">Type Aliases</h1>
<h2 id="calluser">CallUser</h2>
<pre><code class="language-ts">CallUserExternal
</code></pre>
One of:
<ul>
<li><a href="#calluserexternal" title=""><code>CallUserExternal</code></a></li>
</ul>
<h2 id="knownblock">KnownBlock</h2>
<pre><code class="language-ts">ContextBlock | ActionsBlock | DividerBlock | SectionBlock | InputBlock | FileBlock | HeaderBlock
</code></pre>
One of:
<ul>
<li><a href="#contextblock" title=""><code>ContextBlock</code></a></li>
<li><a href="#actionsblock" title=""><code>ActionsBlock</code></a></li>
<li><a href="#dividerblock" title=""><code>DividerBlock</code></a></li>
<li><a href="#sectionblock" title=""><code>SectionBlock</code></a></li>
<li><a href="#inputblock" title=""><code>InputBlock</code></a></li>
<li><a href="#fileblock" title=""><code>FileBlock</code></a></li>
<li><a href="#headerblock" title=""><code>HeaderBlock</code></a></li>
</ul>
<h2 id="multiselect">MultiSelect</h2>
<pre><code class="language-ts">MultiStaticSelect | MultiConversationsSelect | MultiChannelsSelect | MultiExternalSelect
</code></pre>
One of:
<ul>
<li><a href="#multistaticselect" title=""><code>MultiStaticSelect</code></a></li>
<li><a href="#multiconversationsselect" title=""><code>MultiConversationsSelect</code></a></li>
<li><a href="#multichannelsselect" title=""><code>MultiChannelsSelect</code></a></li>
<li><a href="#multiexternalselect" title=""><code>MultiExternalSelect</code></a></li>
</ul>
<h2 id="select">Select</h2>
<pre><code class="language-ts">StaticSelect | ConversationsSelect | ChannelsSelect | ExternalSelect
</code></pre>
One of:
<ul>
<li><a href="#staticselect" title=""><code>StaticSelect</code></a></li>
<li><a href="#conversationsselect" title=""><code>ConversationsSelect</code></a></li>
<li><a href="#channelsselect" title=""><code>ChannelsSelect</code></a></li>
<li><a href="#externalselect" title=""><code>ExternalSelect</code></a></li>
</ul>