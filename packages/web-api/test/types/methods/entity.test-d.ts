import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// entity.acknowledgeCommentAction
// -- sad path
expectError(web.entity.acknowledgeCommentAction()); // lacking argument
expectError(web.entity.acknowledgeCommentAction({})); // empty argument
expectError(
  web.entity.acknowledgeCommentAction({
    error: 'You do not have permission to edit this comment', // missing trigger_id
  }),
);
expectError(
  web.entity.acknowledgeCommentAction({
    trigger_id: '1234567890123.1234567890123.abcdef01234567890abcdef012345689',
    comment: {
      id: 'comment-unique-identifier-003',
      sender: {
        user_id: 'U123456789',
      },
      timestamp: 1741164500, // missing comment
    },
  }),
);
expectError(
  web.entity.acknowledgeCommentAction({
    trigger_id: '1234567890123.1234567890123.abcdef01234567890abcdef012345689',
    comment: {
      id: 'comment-unique-identifier-003',
      sender: {
        user_id: 'U123456789',
      },
      comment: {
        value: 'The saved comment text',
        blocks: {
          type: 'rich_text',
          elements: [],
        }, // only one of blocks or value
      },
      timestamp: 1741164500,
    },
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.entity.acknowledgeCommentAction>>([
  {
    trigger_id: '1234567890123.1234567890123.abcdef01234567890abcdef012345689',
  },
]);
expectAssignable<Parameters<typeof web.entity.acknowledgeCommentAction>>([
  {
    trigger_id: '1234567890123.1234567890123.abcdef01234567890abcdef012345689',
    comment: {
      id: 'comment-unique-identifier-003',
      sender: {
        user_id: 'U123456789',
      },
      comment: {
        value: 'The saved comment text',
        format: 'markdown',
      },
      timestamp: 1741164500,
      url: 'your.app/item/1/comment/3',
      thread_root_id: 'comment-unique-identifier-001',
    },
  },
]);
expectAssignable<Parameters<typeof web.entity.acknowledgeCommentAction>>([
  {
    trigger_id: '1234567890123.1234567890123.abcdef01234567890abcdef012345689',
    error: 'You do not have permission to edit this comment',
  },
]);

// entity.presentComments
// -- sad path
expectError(web.entity.presentComments()); // lacking argument
expectError(web.entity.presentComments({})); // empty argument
expectError(
  web.entity.presentComments({
    trigger_id: '1234567890123.1234567890123.abcdef01234567890abcdef012345689', // missing comments
  }),
);
expectError(
  web.entity.presentComments({
    comments: [], // missing trigger_id
  }),
);
expectError(
  web.entity.presentComments({
    trigger_id: '1234567890123.1234567890123.abcdef01234567890abcdef012345689',
    comments: [],
    error: '', // error is an object
  }),
);
// -- happy path
expectAssignable<Parameters<typeof web.entity.presentComments>>([
  {
    comments: [
      {
        sender: {
          user_id: 'U123456789',
        },
        timestamp: 1741164235,
        id: 'comment-unique-identifier-001',
        url: 'your.app/item/1/comment/1',
        can_edit: true,
        can_delete: true,
        can_reply: true,
        reply_count: 2,
        reply_users: [
          {
            user_id: 'U234567890',
          },
          {
            text: 'External User',
            icon: {
              alt_text: "Summary of image's content",
              url: '...',
            },
          },
        ],
        latest_reply_ts: 1741165000,
        last_edit_ts: 1741164300,
        comment: {
          blocks: {
            type: 'rich_text',
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Check out these different block types with paragraph breaks between them:\n\n',
                  },
                ],
              },
            ],
          },
        },
      },
      {
        sender: {
          text: 'UserFirstName UserLastName',
          icon: {
            alt_text: "Summary of image's content",
            url: '...',
          },
          url: 'your.app/user/userId',
          email: 'firstname.lastname@domain.com',
        },
        timestamp: 1741164358,
        id: 'comment-unique-identifier-002',
        url: 'your.app/item/1/comment/2',
        thread_root_id: 'comment-unique-identifier-001',
        comment: {
          value: 'Plain text comment',
          format: 'markdown',
        },
      },
    ],
    can_post_comment: true,
    delete_action_id: 'your-delete-action-id',
    trigger_id: '1234567890123.1234567890123.abcdef01234567890abcdef012345689',
  },
]);
expectAssignable<Parameters<typeof web.entity.presentComments>>([
  {
    comments: [],
    trigger_id: '1234567890123.1234567890123.abcdef01234567890abcdef012345689',
    user_auth_required: true,
    user_auth_url: 'https://example.com/onboarding?user_id=xxx',
  },
]);
