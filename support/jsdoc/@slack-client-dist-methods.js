/** 
 * @module @slack/client/dist/methods
 */

/**
 * @type {Map}
 * @constant
 */
export var cursorPaginationEnabledMethods
/**
 * @interface module:@slack/client/dist/methods.AttachmentAction
 * @property {string} [id]
 * @property {module:@slack/client/dist/methods.Confirmation} [confirm]
 * @property {string} [data_source]
 * @property {number} [min_query_length]
 * @property {string} [name]
 * @property {Array<module:@slack/client/dist/methods.OptionField>} [options]
 * @property {Array<module:@slack/client/dist/methods.__type>} [option_groups]
 * @property {Array<module:@slack/client/dist/methods.OptionField>} [selected_options]
 * @property {string} [style]
 * @property {string} text
 * @property {string} type
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
 * @interface module:@slack/client/dist/methods.Confirmation
 * @property {string} [dismiss_text]
 * @property {string} [ok_text]
 * @property {string} text
 * @property {string} [title]
 */
export class Confirmation {
}

/**
 * @interface module:@slack/client/dist/methods.CursorPaginationEnabled
 * @property {number} [limit]
 * @property {string} [cursor]
 */
export class CursorPaginationEnabled {
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
 * @interface module:@slack/client/dist/methods.OptionField
 * @property {string} [description]
 * @property {string} text
 * @property {string} value
 */
export class OptionField {
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
 * @interface module:@slack/client/dist/methods.SelectOption
 * @property {string} label
 * @property {string} value
 */
export class SelectOption {
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
 * @interface module:@slack/client/dist/methods.UserPerspectiveEnabled
 * @property {string} [on_behalf_of]
 */
export class UserPerspectiveEnabled {
}

