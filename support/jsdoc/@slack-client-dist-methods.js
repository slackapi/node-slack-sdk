/** 
 * @module @slack/client/dist/methods
 */

/**
 * @interface module:@slack/client/dist/methods.AuxiliaryArguments
 */
export class AuxiliaryArguments {
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
 * @property {Array<module:@slack/client/dist/methods.__type>} [actions]
 */
export class MessageAttachment {
}

/**
 * @interface module:@slack/client/dist/methods.Method
 */
export class Method {
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

