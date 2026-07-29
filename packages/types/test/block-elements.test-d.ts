import { expectAssignable, expectError } from 'tsd';
import type { RichTextInput } from '../src/index';

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
