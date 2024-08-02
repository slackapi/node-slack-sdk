---
title: "@slack/types"
---

## Interfaces

### Action

#### Fields

| Name | Type |
| --- | --- | 
| action\_id | `string` |
| type | `string` |

### ActionsBlock

#### Fields

<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>

</tr>
</thead>
<tbody>
<tr>
<td align="center">elements</td>
<td align="center"><code>(<a href="#button" title="">Button</a> | <a href="#overflow" title="">Overflow</a> | <a href="#datepicker" title="">Datepicker</a> | <a href="#select" title="">Select</a> | <a href="#radiobuttons" title="">RadioButtons</a> | <a href="#checkboxes" title="">Checkboxes</a> | <a href="#action" title="">Action</a>)[]</code></td>

</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'actions'</code></td>

</tr>
</tbody>
</table>

### AttachmentAction

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirmation`](#confirmation) |
| data\_source | `'static' \| 'channels' \| 'conversations' \| 'users' \| 'external'` |
| id  | `string` |
| min\_query\_length | `number` |
| name | `string` |
| option\_groups | `object` |
| options | [`OptionField`](#optionfield)`[]` |
| selected\_options | [`OptionField`](#optionfield)`[]` |
| style | `'default' \| 'primary' \| 'danger'` |
| text | `string` |
| type | `'button' \| 'select'` |
| url | `string` |
| value | `string` |

### Block

#### Fields

| Name | Type |
| --- | --- | 
| block\_id | `string` |
| type | `string` |

### Button

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirm`](#confirm)` |
| style | `'danger' \| 'primary'` |
| text | [`PlainTextElement`](#plaintextelement)` |
| type | `'button'` |
| url | `string` |
| value | `string` |

### CallUserExternal

#### Fields

| Name | Type |
| --- | --- | 
| avatar\_url | `string` |
| display\_name | `string` |
| external\_id | `string` |

### CallUserSlack

#### Fields

| Name | Type |
| --- | --- | 
| slack\_id | `string` |

### ChannelsSelect

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirm`](#confirm) |
| initial\_channel | `string` |
| placeholder | [`PlainTextElement`](#plaintextelement) |
| type | `'channels_select'` |

### Checkboxes

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirm`](#confirm) |
| initial\_options | `Option[]` |
| options | `Option[]` |
| type | `'checkboxes'` |

### Confirm

#### Fields

<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">confirm</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
</tr>
<tr>
<td align="center">deny</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
</tr>
<tr>
<td align="center">style</td>
<td align="center"><code>'primary' | 'danger'</code></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a> | <a href="#mrkdwnelement" title="">MrkdwnElement</a></code></td>
</tr>
<tr>
<td align="center">title</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
</tr>
</tbody>
</table>

### Confirmation

#### Fields

| Name | Type |
| --- | --- | 
| dismiss\_text | `string` |
| ok\_text | `string` |
| text | `string` |
| title | `string` |

### ContextBlock

#### Fields

<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>

</tr>
</thead>
<tbody>
<tr>
<td align="center">elements</td>
<td align="center"><code>(<a href="#imageelement" title="">ImageElement</a> | <a href="#plaintextelement" title="">PlainTextElement</a> | <a href="#mrkdwnelement" title="">MrkdwnElement</a>)[]</code></td>

</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'context'</code></td>

</tr>
</tbody>
</table>

### ConversationsSelect

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirm`](#confirm) |
| default\_to\_current\_conversation | `boolean` |
| filter | `object` |
| initial\_conversation | `string` |
| placeholder | [`PlainTextElement`](#plaintextelement) |
| response\_url\_enabled | `boolean` |
| type | `'conversations_select'` |

### Datepicker

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirm`](#confirm) |
| initial\_date | `string` |
| placeholder | [`PlainTextElement`](#plaintextelement) |
| type | `'datepicker'` |

### Dialog

#### Fields

| Name | Type |
| --- | --- | 
| callback\_id | `string` |
| elements | `object` |
| notify\_on\_cancel | `boolean` |
| state | `string` |
| submit\_label | `string` |
| title | `string` |

### DividerBlock

#### Fields

| Name | Type |
| --- | --- | 
| type | `'divider'` |

### ExternalSelect

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirm`](#confirm) |
| initial\_option | `Option` |
| min\_query\_length | `number` |
| placeholder | [`PlainTextElement`](#plaintextelement) |
| type | `'external_select'` |

### FileBlock

#### Fields

| Name | Type |
| --- | --- | 
| external\_id | `string` |
| source | `string` |
| type | `'file'` |

### HeaderBlock

#### Fields

| Name | Type |
| --- | --- | 
| text | [`PlainTextElement`](#plaintextelement) |
| type | `'header'` |

### ImageBlock

#### Fields

| Name | Type |
| --- | --- | 
| alt\_text | `string` |
| image\_url | `string` |
| title | [`PlainTextElement`](#plaintextelement) |
| type | `'image'` |

### ImageElement

#### Fields

| Name | Type |
| --- | --- | 
| alt\_text | `string` |
| image\_url | `string` |
| type | `'image'` |

### InputBlock

#### Fields

<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">element</td>
<td align="center"><code><a href="#select" title="">Select</a> | <a href="#multiselect" title="">MultiSelect</a> | <a href="#datepicker" title="">Datepicker</a> | <a href="#plaintextinput" title="">PlainTextInput</a> | <a href="#radiobuttons" title="">RadioButtons</a> | <a href="#checkboxes" title="">Checkboxes</a></code></td>
</tr>
<tr>
<td align="center">hint</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
</tr>
<tr>
<td align="center">label</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
</tr>
<tr>
<td align="center">optional</td>
<td align="center"><code>boolean</code></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'input'</code></td>
</tr>
</tbody>
</table>

### LinkUnfurls

### MessageAttachment

#### Fields

<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">actions</td>
<td align="center"><code><a href="#attachmentaction" title="">AttachmentAction</a>[]</code></td>
</tr>
<tr>
<td align="center">author_icon</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">author_link</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">author_name</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">blocks</td>
<td align="center"><code>(<a href="#knownblock" title="">KnownBlock</a> | <a href="#block" title="">Block</a>)[]</code></td>
</tr>
<tr>
<td align="center">callback_id</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">color</td>
<td align="center"><code>'good' | 'warning' | 'danger' | string</code></td>
</tr>
<tr>
<td align="center">fallback</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">fields</td>
<td align="center"><code>object</code></td>
</tr>
<tr>
<td align="center">footer_icon</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">footer</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">image_url</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">mrkdwn_in</td>
<td align="center"><code>('pretext' | 'text' | 'fields')[]</code></td>
</tr>
<tr>
<td align="center">pretext</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">thumb_url</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">title_link</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">title</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">ts</td>
<td align="center"><code>string</code></td>
</tr>
</tbody>
</table>

### MrkdwnElement

#### Fields

| Name | Type |
| --- | --- | 
| text | `string` |
| type | `'mrkdwn'` |
| verbatim | `boolean` |

### MultiChannelsSelect

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirm`](#confirm) |
| initial\_channels | `string[]` |
| max\_selected\_items | `number` |
| placeholder | [`PlainTextElement`](#plaintextelement) |
| type | `'multi_channels_select'` |

### MultiConversationsSelect

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirm`](#confirm) |
| default\_to\_current\_conversation | `boolean` |
| filter | `object` |
| initial\_conversations | `string[]` |
| max\_selected\_items | `number` |
| placeholder | [`PlainTextElement`](#plaintextelement) |
| type | `'multi_conversations_select'` |

### MultiExternalSelect

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirm`](#confirm) |
| initial\_options | `Option[]` |
| max\_selected\_items | `number` |
| min\_query\_length | `number` |
| placeholder | [`PlainTextElement`](#plaintextelement) |
| type | `'multi_external_select'` |

### MultiStaticSelect

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirm`](#confirm) |
| initial\_options | `Option[]` |
| max\_selected\_items | `number` |
| option\_groups | `object` |
| options | `Option[]` |
| placeholder | [`PlainTextElement`](#plaintextelement) |
| type | `'multi_static_select'` |

### MultiUsersSelect

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirm`](#confirm) |
| initial\_users | `string[]` |
| max\_selected\_items | `number` |
| placeholder | [`PlainTextElement`](#plaintextelement) |
| type | `'multi_users_select'` |

### Option\_2

#### Fields

<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>

</tr>
</thead>
<tbody>
<tr>
<td align="center">description</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>

</tr>
<tr>
<td align="center">text</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a> | <a href="#mrkdwnelement" title="">MrkdwnElement</a></code></td>

</tr>
<tr>
<td align="center">url</td>
<td align="center"><code>string</code></td>

</tr>
<tr>
<td align="center">value</td>
<td align="center"><code>string</code></td>

</tr>
</tbody>
</table>

### OptionField

#### Fields

| Name | Type |
| --- | --- | 
| description | `string` |
| text | `string` |
| value | `string` |

### Overflow

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirm`](#confirm) |
| options | `Option[]` |
| type | `'overflow'` |

### PlainTextElement

#### Fields

| Name | Type |
| --- | --- | 
| emoji | `boolean` |
| text | `string` |
| type | `'plain_text'` |

### PlainTextInput

#### Fields

| Name | Type |
| --- | --- | 
| initial\_value | `string` |
| max\_length | `number` |
| min\_length | `number` |
| multiline | `boolean` |
| placeholder | [`PlainTextElement`](#plaintextelement) |
| type | `'plain_text_input'` |

### RadioButtons

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirm`](#confirm) |
| initial\_option | `Option` |
| options | `Option[]` |
| type | `'radio_buttons'` |

### SectionBlock

#### Fields

<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">accessory</td>
<td align="center"><code><a href="#button" title="">Button</a> | <a href="#overflow" title="">Overflow</a> | <a href="#datepicker" title="">Datepicker</a> | <a href="#select" title="">Select</a> | <a href="#multiselect" title="">MultiSelect</a> | <a href="#action" title="">Action</a> | <a href="#imageelement" title="">ImageElement</a> | <a href="#radiobuttons" title="">RadioButtons</a> | <a href="#checkboxes" title="">Checkboxes</a></code></td>
</tr>
<tr>
<td align="center">fields</td>
<td align="center"><code>(<a href="#plaintextelement" title="">PlainTextElement</a> | <a href="#mrkdwnelement" title="">MrkdwnElement</a>)[]</code></td>
</tr>
<tr>
<td align="center">text</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a> | <a href="#mrkdwnelement" title="">MrkdwnElement</a></code></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'section'</code></td>
</tr>
</tbody>
</table>

### SelectOption

#### Fields

| Name | Type |
| --- | --- | 
| label | `string` |
| value | `string` |

### StaticSelect

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirm`](#confirm) |
| initial\_option | `Option` |
| option\_groups | `object` |
| options | `Option[]` |
| placeholder | [`PlainTextElement`](#plaintextelement) |
| type | `'static_select'` |

### UsersSelect

#### Fields

| Name | Type |
| --- | --- | 
| confirm | [`Confirm`](#confirm) |
| initial\_user | `string` |
| placeholder | [`PlainTextElement`](#plaintextelement) |
| type | `'users_select'` |

### View

#### Fields

<table>
<thead>
<tr>
<th align="center">Name</th>
<th align="center">Type</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">blocks</td>
<td align="center"><code>(<a href="#knownblock" title="">KnownBlock</a> | <a href="#block" title="">Block</a>)[]</code></td>
</tr>
<tr>
<td align="center">callback_id</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">clear_on_close</td>
<td align="center"><code>boolean</code></td>
</tr>
<tr>
<td align="center">close</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
</tr>
<tr>
<td align="center">external_id</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">notify_on_close</td>
<td align="center"><code>boolean</code></td>
</tr>
<tr>
<td align="center">private_metadata</td>
<td align="center"><code>string</code></td>
</tr>
<tr>
<td align="center">submit_disabled</td>
<td align="center"><code>boolean</code></td>
</tr>
<tr>
<td align="center">submit</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
</tr>
<tr>
<td align="center">title</td>
<td align="center"><code><a href="#plaintextelement" title="">PlainTextElement</a></code></td>
</tr>
<tr>
<td align="center">type</td>
<td align="center"><code>'home' | 'modal' | 'workflow_step'</code></td>
</tr>
</tbody>
</table>

## Type Aliases

### CallUser

```ts
CallUserExternal
```

One of:

*   [`CallUserExternal`](#calluserexternal)

### KnownBlock

```ts
ContextBlock | ActionsBlock | DividerBlock | SectionBlock | InputBlock | FileBlock | HeaderBlock
```

One of:

*   [`ContextBlock`](#contextblock)
*   [`ActionsBlock`](#actionsblock)
*   [`DividerBlock`](#dividerblock)
*   [`SectionBlock`](#sectionblock)
*   [`InputBlock`](#inputblock)
*   [`FileBlock`](#fileblock)
*   [`HeaderBlock`](#headerblock)

### MultiSelect

```ts
MultiStaticSelect | MultiConversationsSelect | MultiChannelsSelect | MultiExternalSelect
```

One of:

*   [`MultiStaticSelect`](#multistaticselect)
*   [`MultiConversationsSelect`](#multiconversationsselect)
*   [`MultiChannelsSelect`](#multichannelsselect)
*   [`MultiExternalSelect`](#multiexternalselect)

### Select

```ts
StaticSelect | ConversationsSelect | ChannelsSelect | ExternalSelect
```

One of:

*   [`StaticSelect`](#staticselect)
*   [`ConversationsSelect`](#conversationsselect)
*   [`ChannelsSelect`](#channelsselect)
*   [`ExternalSelect`](#externalselect)