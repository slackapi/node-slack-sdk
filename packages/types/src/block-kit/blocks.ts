// This file contains objects documented here: https://api.slack.com/reference/block-kit/blocks
// TODO: go through https://api.slack.com/reference/block-kit/blocks and
// - ensure JSdocs are up to date / added,
// - define missing objects, and
// - add further TODOs for future improvements / breaking changes, in prep for next major release

import { PlainTextElement, MrkdwnElement } from './composition-objects';
import { Button, Checkboxes, Datepicker, DateTimepicker, EmailInput, ImageElement, MultiSelect, NumberInput, Overflow, PlainTextInput, RadioButtons, Select, Timepicker, URLInput } from './elements';
import { Action } from './extensions';

export interface Block {
  type: string;
  block_id?: string;
}

export type KnownBlock = ImageBlock | ContextBlock | ActionsBlock | DividerBlock |
SectionBlock | InputBlock | FileBlock | HeaderBlock | VideoBlock;

export interface ActionsBlock extends Block {
  type: 'actions';
  elements: (Button | Overflow | Datepicker | Timepicker | DateTimepicker | Select | RadioButtons | Checkboxes
  | Action)[];
}

export interface ContextBlock extends Block {
  type: 'context';
  elements: (ImageElement | PlainTextElement | MrkdwnElement)[];
}

export interface DividerBlock extends Block {
  type: 'divider';
}

export interface FileBlock extends Block {
  type: 'file';
  source: string; // 'remote'
  external_id: string;
}

export interface HeaderBlock extends Block {
  type: 'header';
  text: PlainTextElement;
}

export interface ImageBlock extends Block {
  type: 'image';
  image_url: string;
  alt_text: string;
  title?: PlainTextElement;
}

export interface InputBlock extends Block {
  type: 'input';
  label: PlainTextElement;
  hint?: PlainTextElement;
  optional?: boolean;
  element: Select | MultiSelect | Datepicker | Timepicker | DateTimepicker | PlainTextInput | URLInput | EmailInput
  | NumberInput | RadioButtons | Checkboxes;
  dispatch_action?: boolean;
}

export interface SectionBlock extends Block {
  type: 'section';
  text?: PlainTextElement | MrkdwnElement; // either this or fields must be defined
  fields?: (PlainTextElement | MrkdwnElement)[]; // either this or text must be defined
  accessory?: Button
  | Overflow
  | Datepicker
  | Timepicker
  | Select
  | MultiSelect
  | Action
  | ImageElement
  | RadioButtons
  | Checkboxes;
}

export interface VideoBlock extends Block {
  type: 'video';
  video_url: string;
  thumbnail_url: string;
  alt_text: string;
  title: PlainTextElement;
  title_url?: string;
  author_name?: string;
  provider_name?: string;
  provider_icon_url?: string;
  description?: PlainTextElement;
}
