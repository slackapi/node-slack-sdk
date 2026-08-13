import { expectAssignable, expectError } from 'tsd';
import type { AlertBlock, CardBlock, CarouselBlock, DataVisualizationBlock, KnownBlock } from '../src/index';

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

// DataVisualizationBlock
// -- sad path
expectError<DataVisualizationBlock>({}); // missing type, title and chart
expectError<DataVisualizationBlock>({ type: 'data_visualization', title: 'Sales' }); // missing required chart
expectError<DataVisualizationBlock>({
  type: 'data_visualization',
  title: 'Sales',
  chart: { type: 'pie' }, // pie chart missing required segments
});
expectError<DataVisualizationBlock>({
  type: 'data_visualization',
  title: 'Sales',
  chart: { type: 'bar', series: [{ name: 'Q1', data: [{ label: 'Jan', value: 1 }] }] }, // series chart missing axis_config
});
expectError<DataVisualizationBlock>({
  type: 'data_visualization',
  title: 'Sales',
  chart: { type: 'scatter', segments: [{ label: 'A', value: 1 }] }, // unknown chart type
});
// -- happy path
expectAssignable<DataVisualizationBlock>({
  type: 'data_visualization',
  title: 'Revenue by region',
  chart: {
    type: 'pie',
    segments: [
      { label: 'North', value: 40 },
      { label: 'South', value: 60 },
    ],
  },
});
expectAssignable<DataVisualizationBlock>({
  type: 'data_visualization',
  title: 'Quarterly revenue',
  block_id: 'viz_1',
  chart: {
    type: 'bar',
    series: [
      {
        name: 'Product A',
        data: [
          { label: 'Q1', value: 10 },
          { label: 'Q2', value: 20 },
        ],
      },
      {
        name: 'Product B',
        data: [
          { label: 'Q1', value: 5 },
          { label: 'Q2', value: -3 },
        ],
      },
    ],
    axis_config: { categories: ['Q1', 'Q2'], x_label: 'Quarter', y_label: 'Revenue' },
  },
});
expectAssignable<KnownBlock>({
  type: 'data_visualization',
  title: 'Trend',
  chart: {
    type: 'line',
    series: [{ name: 'Users', data: [{ label: 'Mon', value: 1 }] }],
    axis_config: { categories: ['Mon'] },
  },
});
