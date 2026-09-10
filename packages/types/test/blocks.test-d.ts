import { expectAssignable, expectError } from 'tsd';
import type {
  AlertBlock,
  CardBlock,
  CarouselBlock,
  ContainerBlock,
  DataTableBlock,
  KnownBlock,
  TableBlock,
} from '../src/index';

// CardBlock
// -- sad path
expectError<CardBlock>({}); // missing type
expectError<CardBlock>({ type: 'card', title: { type: 'plain_text', text: 'wrong type' } }); // title must be mrkdwn
// -- happy path
expectAssignable<CardBlock>({ type: 'card' });
expectAssignable<CardBlock>({
  type: 'card',
  title: { type: 'mrkdwn', text: 'Title' },
});
expectAssignable<CardBlock>({
  type: 'card',
  icon: { type: 'image', image_url: 'https://example.com/icon.png', alt_text: 'icon' },
  title: { type: 'mrkdwn', text: 'Lumon Industries' },
  subtitle: { type: 'mrkdwn', text: 'Committed to work-life balance' },
  hero_image: { type: 'image', image_url: 'https://example.com/hero.png', alt_text: 'hero' },
  body: { type: 'mrkdwn', text: 'Please enjoy each card equally.' },
  actions: [{ type: 'button', text: { type: 'plain_text', text: 'Click' }, action_id: 'btn' }],
});
expectAssignable<KnownBlock>({ type: 'card', body: { type: 'mrkdwn', text: 'hi' } });

// AlertBlock
// -- sad path
expectError<AlertBlock>({}); // missing type and text
expectError<AlertBlock>({ type: 'alert' }); // missing required text
// -- happy path
expectAssignable<AlertBlock>({
  type: 'alert',
  text: { type: 'mrkdwn', text: 'Something happened' },
});
expectAssignable<AlertBlock>({
  type: 'alert',
  text: { type: 'plain_text', text: 'Simple alert' },
  level: 'warning',
});
expectAssignable<KnownBlock>({
  type: 'alert',
  text: { type: 'mrkdwn', text: 'Notice' },
  level: 'error',
});

// CarouselBlock
// -- sad path
expectError<CarouselBlock>({}); // missing type and elements
expectError<CarouselBlock>({ type: 'carousel' }); // missing required elements
// -- happy path
expectAssignable<CarouselBlock>({
  type: 'carousel',
  elements: [{ type: 'card', title: { type: 'mrkdwn', text: 'Card 1' } }],
});
expectAssignable<CarouselBlock>({
  type: 'carousel',
  elements: [
    { type: 'card', title: { type: 'mrkdwn', text: 'Card 1' } },
    { type: 'card', body: { type: 'mrkdwn', text: 'Card 2 body' } },
  ],
});
expectAssignable<KnownBlock>({
  type: 'carousel',
  elements: [{ type: 'card' }],
});

// ContainerBlock
// -- sad path
expectError<ContainerBlock>({}); // missing type and child_blocks
expectError<ContainerBlock>({ type: 'container' }); // missing required child_blocks
// -- happy path
expectAssignable<ContainerBlock>({
  type: 'container',
  title: { type: 'plain_text', text: 'My Container' },
  child_blocks: [{ type: 'divider' }],
});
expectAssignable<ContainerBlock>({
  type: 'container',
  title: { type: 'plain_text', text: 'Full Container' },
  subtitle: { type: 'plain_text', text: 'A subtitle' },
  child_blocks: [{ type: 'section', text: { type: 'mrkdwn', text: 'Content' } }, { type: 'divider' }],
  width: 'wide',
  icon: { type: 'image', image_url: 'https://example.com/icon.png', alt_text: 'icon' },
  is_collapsible: true,
  default_collapsed: true,
});
expectAssignable<ContainerBlock>({
  type: 'container',
  rich_text_title: {
    type: 'rich_text',
    elements: [{ type: 'rich_text_section', elements: [{ type: 'text', text: 'Rich Title' }] }],
  },
  child_blocks: [{ type: 'divider' }],
});
expectAssignable<ContainerBlock>({
  type: 'container',
  title: { type: 'plain_text', text: 'Divider' },
  child_blocks: [{ type: 'divider' }],
  has_header_divider: true,
});
expectAssignable<KnownBlock>({
  type: 'container',
  title: { type: 'plain_text', text: 'Known' },
  child_blocks: [{ type: 'divider' }],
});

// DataTableBlock
// -- sad path
expectError<DataTableBlock>({}); // missing type, rows, and caption
expectError<DataTableBlock>({ type: 'data_table' }); // missing required rows and caption
expectError<DataTableBlock>({
  type: 'data_table',
  rows: [[{ type: 'raw_text', text: 'Name' }]],
}); // missing required caption
expectError<DataTableBlock>({
  type: 'data_table',
  caption: 'A list of fruit and their quantities',
}); // missing required rows
// -- happy path
expectAssignable<DataTableBlock>({
  type: 'data_table',
  caption: 'A list of fruit and their quantities',
  rows: [
    [
      { type: 'raw_text', text: 'Fruit' },
      { type: 'raw_text', text: 'Quantity' },
    ],
    [
      { type: 'raw_text', text: 'Apples' },
      { type: 'raw_number', value: 12, text: '12' },
    ],
  ],
});
expectAssignable<DataTableBlock>({
  type: 'data_table',
  caption: 'A list of users',
  block_id: 'users_table',
  page_size: 10,
  row_header_column_index: 0,
  rows: [
    [
      { type: 'raw_text', text: 'User' },
      { type: 'raw_text', text: 'Bio' },
    ],
    [
      { type: 'raw_text', text: 'Mark' },
      { type: 'rich_text', elements: [{ type: 'rich_text_section', elements: [{ type: 'text', text: 'Founder' }] }] },
    ],
  ],
});
expectAssignable<KnownBlock>({
  type: 'data_table',
  caption: 'A minimal table',
  rows: [[{ type: 'raw_text', text: 'Header' }], [{ type: 'raw_text', text: 'Value' }]],
});

// TableBlock
// -- sad path
expectError<TableBlock>({}); // missing type and rows
expectError<TableBlock>({ type: 'table' }); // missing required rows
// -- happy path
// Table cells can be rich_text, raw_text, or raw_number; column_settings describe column behavior.
expectAssignable<TableBlock>({
  type: 'table',
  column_settings: [{ is_wrapped: true }, { align: 'right' }],
  rows: [
    [
      { type: 'raw_text', text: 'Item' },
      { type: 'raw_text', text: 'Count' },
    ],
    [
      { type: 'raw_text', text: 'Widgets' },
      { type: 'raw_number', value: 42, text: '42' },
    ],
    [
      { type: 'rich_text', elements: [{ type: 'rich_text_section', elements: [{ type: 'text', text: 'Gadgets' }] }] },
      { type: 'raw_number', value: 7, text: '7' },
    ],
  ],
});
expectAssignable<KnownBlock>({
  type: 'table',
  rows: [[{ type: 'raw_number', value: 1, text: '1' }]],
});
