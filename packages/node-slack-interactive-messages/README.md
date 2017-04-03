## Usage

### Using with Express

```javascript
const createMessageAdapter = require('@slack/interactive-messages').createMessageAdapter;
const slackMessages = createMessageAdapter(verificationToken);

// imagine you already have an express app all set up
app.use('/slack/actions', slackMessages.expressMiddleware());

// when the first param is a string, match an action by callback_id
// returns `this` so that these action registrations are chainable
slackMessages.action('welcome_button', (action) => {
  // the `action` arg is the entire payload from the HTTP request
  // return a value or a Promise for a value describing a message for replacement
  //   if the value is falsy or promise resolves to anything falsy, do nothing (no replacement)
  //   if the value is a JSON object, return it in the HTTP response for replacement
  //   if the promise resolves to a JSON object, send it for replacement using the `response_url`
  //   if the promise rejects or there is a synchronous throw, the response is 500 Internal Server Error
});

// when the first param is a regular expression, match an action by callback_id
slackMessages.action(/success_\d+/, () => {});

// when the first param is an object, actions are matched using the individual properties of that object
// {
//   callbackId: string|regex,
//   type: 'button'|'select',
//   unfurl: boolean,
// }
slackMessages.action({ type: 'button', unfurl: true }, (action) => {
  // if the action was an unfurl, the Promise that is returned should be for an attachment as opposed to a whole message
});

// The first argument matches based on the callback_id. It can be a string or RegEx.
slackMessages.options('ticket_menu', (selection) => {
  // return a value or a Promise for a set of options (same rules as .action())
});

// TODO: api to inspect action handlers? api to remove action handlers?
// TODO: do we need options for name or value matching/routing? slapp has these

```

1. not inheriting from EventEmitter: instead of using `on()` to attach action handlers, there's
`action()` and `options()` which are more explicit
2. if you return a Promise, we will use the `response_url` to send the response. if you return a value syncrhonously, that will be used to respond right away.
3. changed error handling behavior: there is no error event, handle errors on your own or we respond with 500.
4. shortened the export name: `createSlackInteractiveMessageAdapter` -> `createMessageAdapter`
