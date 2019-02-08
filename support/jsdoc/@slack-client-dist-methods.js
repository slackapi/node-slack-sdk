/** 
 * @module @slack/client/dist/methods
 */

/**
 * @type {Map}
 * @constant
 */
export var cursorPaginationEnabledMethods
/**
 * @interface module:@slack/client/dist/methods.ActionsBlock
 * @property {"actions"} type
 * @property {string} [block_id]
 * @property {Array<module:@slack/client/dist/methods.UsersSelect | module:@slack/client/dist/methods.StaticSelect | module:@slack/client/dist/methods.ConversationsSelect | module:@slack/client/dist/methods.ChannelsSelect | module:@slack/client/dist/methods.ExternalSelect | module:@slack/client/dist/methods.Button | module:@slack/client/dist/methods.Overflow | module:@slack/client/dist/methods.Datepicker>} elements
 */
export class ActionsBlock {
}

/**
 * @interface module:@slack/client/dist/methods.AttachmentAction
 * @property {string} [id]
 * @property {module:@slack/client/dist/methods.Confirmation} [confirm]
 * @property {"static" | "channels" | "conversations" | "users" | "external"} [data_source]
 * @property {number} [min_query_length]
 * @property {string} [name]
 * @property {Array<module:@slack/client/dist/methods.OptionField>} [options]
 * @property {Array<module:@slack/client/dist/methods.__type>} [option_groups]
 * @property {Array<module:@slack/client/dist/methods.OptionField>} [selected_options]
 * @property {"default" | "primary" | "danger"} [style]
 * @property {string} text
 * @property {"button" | "select"} type
 * @property {string} [value]
 * @property {string} [url]
 */
export class AttachmentAction {
}

/**
 * @interface module:@slack/client/dist/methods.AuxiliaryArguments
 */
export class AuxiliaryArguments {
}

/**
 * @interface module:@slack/client/dist/methods.Button
 * @extends module:@slack/client/dist/methods.Action
 * @property {"button"} type
 * @property {module:@slack/client/dist/methods.PlainTextElement} text
 * @property {string} [value]
 * @property {string} [url]
 */
export class Button {
}

/**
 * @interface module:@slack/client/dist/methods.ChannelsSelect
 * @extends module:@slack/client/dist/methods.Action
 * @property {"channels_select"} type
 * @property {string} [initial_channel]
 * @property {module:@slack/client/dist/methods.PlainTextElement} [placeholder]
 */
export class ChannelsSelect {
}

/**
 * @interface module:@slack/client/dist/methods.Confirm
 * @property {module:@slack/client/dist/methods.PlainTextElement} [title]
 * @property {module:@slack/client/dist/methods.PlainTextElement | module:@slack/client/dist/methods.MrkdwnElement} text
 * @property {module:@slack/client/dist/methods.PlainTextElement} [confirm]
 * @property {module:@slack/client/dist/methods.PlainTextElement} [deny]
 */
export class Confirm {
}

/**
 * @interface module:@slack/client/dist/methods.Confirmation
 * @property {string} [dismiss_text]
 * @property {string} [ok_text]
 * @property {string} text
 * @property {string} [title]
 */
export class Confirmation {
}

/**
 * @interface module:@slack/client/dist/methods.ContextBlock
 * @property {"context"} type
 * @property {string} [block_id]
 * @property {Array<module:@slack/client/dist/methods.PlainTextElement | module:@slack/client/dist/methods.MrkdwnElement | module:@slack/client/dist/methods.ImageElement | module:@slack/client/dist/methods.UserElement>} elements
 */
export class ContextBlock {
}

/**
 * @interface module:@slack/client/dist/methods.ConversationsSelect
 * @extends module:@slack/client/dist/methods.Action
 * @property {"conversations_select"} type
 * @property {string} [initial_conversation]
 * @property {module:@slack/client/dist/methods.PlainTextElement} [placeholder]
 */
export class ConversationsSelect {
}

/**
 * @interface module:@slack/client/dist/methods.CursorPaginationEnabled
 * @property {number} [limit]
 * @property {string} [cursor]
 */
export class CursorPaginationEnabled {
}

/**
 * @interface module:@slack/client/dist/methods.Datepicker
 * @extends module:@slack/client/dist/methods.Action
 * @property {"datepicker"} type
 * @property {string} [initial_date]
 * @property {module:@slack/client/dist/methods.PlainTextElement} [placeholder]
 */
export class Datepicker {
}

/**
 * @interface module:@slack/client/dist/methods.Dialog
 * @property {string} title
 * @property {string} callback_id
 * @property {Array<module:@slack/client/dist/methods.__type>} elements
 * @property {string} [submit_label]
 * @property {boolean} [notify_on_cancel]
 * @property {string} [state]
 */
export class Dialog {
}

/**
 * @interface module:@slack/client/dist/methods.DividerBlock
 * @property {"divider"} type
 * @property {string} [block_id]
 */
export class DividerBlock {
}

/**
 * @interface module:@slack/client/dist/methods.ExternalSelect
 * @extends module:@slack/client/dist/methods.Action
 * @property {"external_select"} type
 * @property {module:@slack/client/dist/methods.Option} [initial_option]
 * @property {module:@slack/client/dist/methods.PlainTextElement} [placeholder]
 * @property {number} [min_query_length]
 */
export class ExternalSelect {
}

/**
 * @interface module:@slack/client/dist/methods.ImageBlock
 * @property {"image"} type
 * @property {string} [block_id]
 * @property {string} image_url
 * @property {string} alt_text
 * @property {module:@slack/client/dist/methods.PlainTextElement} [title]
 */
export class ImageBlock {
}

/**
 * @interface module:@slack/client/dist/methods.ImageElement
 * @property {"image"} type
 * @property {string} image_url
 * @property {string} alt_text
 */
export class ImageElement {
}

/**
 * @interface module:@slack/client/dist/methods.LinkUnfurls
 */
export class LinkUnfurls {
}

/**
 * @interface module:@slack/client/dist/methods.LocaleAware
 * @property {boolean} [include_locale]
 */
export class LocaleAware {
}

/**
 * @interface module:@slack/client/dist/methods.MessageAttachment
 * @property {Array<module:@slack/client/dist/methods.ImageBlock | module:@slack/client/dist/methods.ContextBlock | module:@slack/client/dist/methods.ActionsBlock | module:@slack/client/dist/methods.DividerBlock | module:@slack/client/dist/methods.SectionBlock>} [blocks]
 * @property {string} [fallback]
 * @property {"good" | "warning" | "danger" | string} [color]
 * @property {string} [pretext]
 * @property {string} [author_name]
 * @property {string} [author_link]
 * @property {string} [author_icon]
 * @property {string} [title]
 * @property {string} [title_link]
 * @property {string} [text]
 * @property {Array<module:@slack/client/dist/methods.__type>} [fields]
 * @property {string} [image_url]
 * @property {string} [thumb_url]
 * @property {string} [footer]
 * @property {string} [footer_icon]
 * @property {string} [ts]
 * @property {Array<module:@slack/client/dist/methods.AttachmentAction>} [actions]
 * @property {string} [callback_id]
 * @property {Array<"pretext" | "text" | "fields">} [mrkdwn_in]
 */
export class MessageAttachment {
}

/**
 * @interface module:@slack/client/dist/methods.Method
 */
export class Method {
}

/**
 * @interface module:@slack/client/dist/methods.MrkdwnElement
 * @property {"mrkdwn"} type
 * @property {string} text
 * @property {"none"} [parse]
 */
export class MrkdwnElement {
}

/**
 * @interface module:@slack/client/dist/methods.Option
 * @property {module:@slack/client/dist/methods.PlainTextElement} text
 * @property {string} [value]
 * @property {string} [url]
 * @property {module:@slack/client/dist/methods.PlainTextElement} [description]
 */
export class Option {
}

/**
 * @interface module:@slack/client/dist/methods.OptionField
 * @property {string} [description]
 * @property {string} text
 * @property {string} value
 */
export class OptionField {
}

/**
 * @interface module:@slack/client/dist/methods.Overflow
 * @extends module:@slack/client/dist/methods.Action
 * @property {"overflow"} type
 * @property {Array<module:@slack/client/dist/methods.Option>} options
 */
export class Overflow {
}

/**
 * @interface module:@slack/client/dist/methods.PlainTextElement
 * @property {"plaintext"} type
 * @property {string} text
 * @property {boolean} [emoji]
 */
export class PlainTextElement {
}

/**
 * @interface module:@slack/client/dist/methods.Searchable
 * @property {string} query
 * @property {boolean} [highlight]
 * @property {"score" | "timestamp"} sort
 * @property {"asc" | "desc"} sort_dir
 */
export class Searchable {
}

/**
 * @interface module:@slack/client/dist/methods.SectionBlock
 * @property {"section"} type
 * @property {string} [block_id]
 * @property {module:@slack/client/dist/methods.PlainTextElement | module:@slack/client/dist/methods.MrkdwnElement} [text]
 * @property {Array<module:@slack/client/dist/methods.PlainTextElement | module:@slack/client/dist/methods.MrkdwnElement>} [fields]
 * @property {module:@slack/client/dist/methods.Button | module:@slack/client/dist/methods.Overflow | module:@slack/client/dist/methods.StaticSelect | module:@slack/client/dist/methods.UsersSelect | module:@slack/client/dist/methods.ConversationsSelect | module:@slack/client/dist/methods.ChannelsSelect | module:@slack/client/dist/methods.ExternalSelect | module:@slack/client/dist/methods.Datepicker} [accessory]
 */
export class SectionBlock {
}

/**
 * @interface module:@slack/client/dist/methods.SelectOption
 * @property {string} label
 * @property {string} value
 */
export class SelectOption {
}

/**
 * @interface module:@slack/client/dist/methods.StaticSelect
 * @extends module:@slack/client/dist/methods.Action
 * @property {"static_select"} type
 * @property {module:@slack/client/dist/methods.PlainTextElement} [placeholder]
 * @property {module:@slack/client/dist/methods.Option} [initial_option]
 * @property {Array<module:@slack/client/dist/methods.Option>} [options]
 * @property {Array<module:@slack/client/dist/methods.__type>} [option_groups]
 */
export class StaticSelect {
}

/**
 * @interface module:@slack/client/dist/methods.TimelinePaginationEnabled
 * @property {string} [oldest]
 * @property {string} [latest]
 * @property {boolean} [inclusive]
 */
export class TimelinePaginationEnabled {
}

/**
 * @interface module:@slack/client/dist/methods.TokenOverridable
 * @property {string} [token]
 */
export class TokenOverridable {
}

/**
 * @interface module:@slack/client/dist/methods.TraditionalPagingEnabled
 * @property {number} [page]
 * @property {number} [count]
 */
export class TraditionalPagingEnabled {
}

/**
 * @interface module:@slack/client/dist/methods.UserElement
 * @property {"user"} type
 * @property {string} user_id
 */
export class UserElement {
}

/**
 * @interface module:@slack/client/dist/methods.UserPerspectiveEnabled
 * @property {string} [on_behalf_of]
 */
export class UserPerspectiveEnabled {
}

/**
 * @interface module:@slack/client/dist/methods.UsersSelect
 * @extends module:@slack/client/dist/methods.Action
 * @property {"users_select"} type
 * @property {string} [initial_user]
 * @property {module:@slack/client/dist/methods.PlainTextElement} [placeholder]
 */
export class UsersSelect {
}

