import { expectAssignable, expectError } from 'tsd';
import type { AlertBlock, CardBlock, CarouselBlock, DataTableBlock, KnownBlock } from '../src/index';

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
