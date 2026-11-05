import { expectAssignable, expectError } from 'tsd';
import type {
  Button,
  Checkboxes,
  Overflow,
  RadioButtons,
  RichTextInput,
  StaticSelect,
  WorkflowButton,
} from '../src/index';

// RichTextInput — happy paths
expectAssignable<RichTextInput>({
  type: 'rich_text_input',
});
expectAssignable<RichTextInput>({
  type: 'rich_text_input',
  min_lines: 3,
});
expectAssignable<RichTextInput>({
  type: 'rich_text_input',
  max_lines: 16,
});
expectAssignable<RichTextInput>({
  type: 'rich_text_input',
  min_lines: 3,
  max_lines: 16,
});

// RichTextInput — sad paths
expectError<RichTextInput>({
  type: 'rich_text_input',
  min_lines: '3', // Minimum should be integer
});
expectError<RichTextInput>({
  type: 'rich_text_input',
  max_lines: '16',
});

// WorkflowButton happy path
expectAssignable<WorkflowButton>({
  type: 'workflow_button',
  text: {
    type: 'plain_text',
    text: 'Run workflow',
  },
  action_id: 'run_workflow',
  workflow: {
    trigger: {
      url: 'https://example.com/trigger',
    },
  },
});

// Button with agent prompt and visibility fields
expectAssignable<Button>({
  type: 'button',
  text: {
    type: 'plain_text',
    text: 'Summarize with Slackbot',
  },
  action_id: 'summarize_incident',
  agent_prompt: 'Summarize this incident and suggest next steps.',
  agent_prompt_display: 'Summarize this incident',
  visible_to_user_ids: ['U123456'],
});

// Checkboxes option with a mrkdwn description
expectAssignable<Checkboxes>({
  type: 'checkboxes',
  options: [
    {
      value: 'A2',
      text: {
        type: 'plain_text',
        text: 'Checkbox 2',
      },
      description: {
        type: 'mrkdwn',
        text: '*A description of option two*',
      },
    },
  ],
});

// RadioButtons option with a mrkdwn description
expectAssignable<RadioButtons>({
  type: 'radio_buttons',
  options: [
    {
      value: 'A2',
      text: {
        type: 'plain_text',
        text: 'Radio 2',
      },
      description: {
        type: 'mrkdwn',
        text: '*A description of option two*',
      },
    },
  ],
});

// Overflow option descriptions are plain_text only
expectError<Overflow>({
  type: 'overflow',
  options: [
    {
      value: 'A2',
      text: {
        type: 'plain_text',
        text: 'Option 2',
      },
      description: {
        type: 'mrkdwn',
        text: '*A description of option two*',
      },
    },
  ],
});

// StaticSelect option descriptions are plain_text only
expectError<StaticSelect>({
  type: 'static_select',
  options: [
    {
      value: 'A2',
      text: {
        type: 'plain_text',
        text: 'Option 2',
      },
      description: {
        type: 'mrkdwn',
        text: '*A description of option two*',
      },
    },
  ],
});
