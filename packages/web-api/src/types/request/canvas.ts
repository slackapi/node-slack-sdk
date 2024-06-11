import type { ChannelIDs, TokenOverridable, UserIDs } from './common';
import type { OptionalArgument } from '../helpers';

interface CanvasID {
  /** @description Encoded ID of the canvas. */
  canvas_id: string;
}
interface DocumentContent {
  /** @description The type of content used to describe Canvas content. Always is `markdown`. */
  type: 'markdown';
  /** @description The markdown defining the Canvas content. */
  markdown: string;
}
type SectionType = 'any_header' | 'h1' | 'h2' | 'h3';
interface SectionTypes {
  /** @description List of desired section types to filter on. Minimum of 1, maximum of 3. */
  section_types: [SectionType, ...SectionType[]];
}
interface ContainsText {
  /** @description Textual content that must appear in the section. */
  contains_text: string;
}
// At least one of `section_types` or `contains_text` must be defined.
type Criteria = (SectionTypes & Partial<ContainsText>) | (Partial<SectionTypes> & ContainsText);
type Operation = 'insert_after' | 'insert_before' | 'insert_at_start' | 'insert_at_end' | 'replace' | 'delete';
interface BaseChange {
  /** @description The operation to perform on the canvas. */
  operation?: Operation;
  /** @description The section of the canvas to target the operation on. */
  section_id?: string;
  /** @description Structure describing the type and contents. */
  document_content?: DocumentContent;
}
type ChangeWithSectionAndContent = Required<BaseChange> & {
  /** @description The operation to perform on the canvas. */
  operation: 'insert_after' | 'insert_before'
};
type ChangeWithContent = Required<Pick<BaseChange, 'document_content'>> & {
  /** @description The operation to perform on the canvas. */
  operation: 'insert_at_start' | 'insert_at_end';
};
type ChangeWithContentAndOptionalSection = BaseChange & Required<Pick<BaseChange, 'document_content'>> & {
  /** @description The operation to perform on the canvas. */
  operation: 'replace';
};
type ChangeWithSection = Required<Pick<BaseChange, 'section_id'>> & {
  /** @description The operation to perform on the canvas. */
  operation: 'delete';
};
type Change = ChangeWithSection | ChangeWithContent | ChangeWithSectionAndContent | ChangeWithContentAndOptionalSection;

// https://api.slack.com/methods/canvases.access.delete
export interface CanvasesAccessDeleteArguments extends CanvasID, Partial<ChannelIDs>, TokenOverridable,
  Partial<UserIDs> {}

// https://api.slack.com/methods/canvases.access.set
export interface CanvasesAccessSetArguments extends CanvasID, Partial<ChannelIDs>, TokenOverridable, Partial<UserIDs> {
  /** @description Desired level of access. */
  access_level: 'read' | 'write';
}

// https://api.slack.com/methods/canvases.create
export type CanvasesCreateArguments = OptionalArgument<TokenOverridable & {
  /** @description Title of the newly created canvas. */
  title?: string;
  /** @description Structure describing the type and contents of the Canvas being created. */
  document_content?: DocumentContent;
}>;

// https://api.slack.com/methods/canvases.sections.lookup
export interface CanvasesSectionsLookupArguments extends CanvasID, TokenOverridable {
  /** @description Filtering criteria. */
  criteria: Criteria;
}

// https://api.slack.com/methods/canvases.delete
export interface CanvasesDeleteArguments extends CanvasID, TokenOverridable {}

// https://api.slack.com/methods/canvases.edit
export interface CanvasesEditArguments extends CanvasID, TokenOverridable {
  /** @description List of changes to apply to the canvas. */
  changes: [Change, ...Change[]];
}

// https://api.slack.com/methods/conversations.canvases.create
export interface ConversationsCanvasesCreateArguments extends TokenOverridable {
  /** @description Channel ID of the channel to create a canvas in. */
  channel_id: string;
  /** @description Structure describing the type and contents of the Canvas being created. */
  document_content?: DocumentContent;
}
