import { expectAssignable, expectError } from 'tsd';
import type { RichTextInput, WorkflowButton } from '../src/index';

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
