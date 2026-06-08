import { expectAssignable } from 'tsd';
import type { SlackListsItemFieldMessage } from '../../../src/types/request/slackLists';

expectAssignable<SlackListsItemFieldMessage>({
  column_id: 'Col123',
  message: {
    text: 'hello',
    ts: '123.456',
    user: 'U123',
    team: 'T123',
    type: 'message',
  },
});

expectAssignable<SlackListsItemFieldMessage>({
  column_id: 'Col123',
  message: [
    {
      text: 'hello',
      ts: '1234567890.123456',
      user: 'U123',
      team: 'T123',
      type: 'message',
    },
  ],
});
