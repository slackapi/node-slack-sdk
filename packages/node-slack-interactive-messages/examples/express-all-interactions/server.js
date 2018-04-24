const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { createMessageAdapter } = require('@slack/interactive-messages');
const { WebClient } = require('@slack/client');
const { users, neighborhoods } = require('./models');
const axios = require('axios');

// Read the verification token from the environment variables
const slackVerificationToken = process.env.SLACK_VERIFICATION_TOKEN;
const slackAccessToken = process.env.SLACK_ACCESS_TOKEN;
if (!slackVerificationToken || !slackAccessToken) {
  throw new Error('Slack verification token and access token are required to run this app.');
}

// Create the adapter using the app's verification token
const slackInteractions = createMessageAdapter(slackVerificationToken);

// Create a Slack Web API client
const web = new WebClient(slackAccessToken);

// Initialize an Express application
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Attach the adapter to the Express application as a middleware
app.use('/slack/actions', slackInteractions.expressMiddleware());

// Attach the slash command handler
app.post('/slack/commands', slackSlashCommand);

// Start the express application server
const port = process.env.PORT || 0;
http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
});

// Slack interactive message handlers
slackInteractions.action('accept_tos', (payload, respond) => {
  console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed a button`);

  // Use the data model to persist the action
  users.findBySlackId(payload.user.id)
    .then(user => user.setPolicyAgreementAndSave(payload.actions[0].value === 'accept'))
    .then((user) => {
      // After the asynchronous work is done, call `respond()` with a message object to update the
      // message.
      let confirmation;
      if (user.agreedToPolicy) {
        confirmation = 'Thank you for agreeing to the terms of service';
      } else {
        confirmation = 'You have denied the terms of service. You will no longer have access to this app.';
      }
      respond({ text: confirmation });
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
      respond({
        text: 'An error occurred while recording your agreement choice.'
      });
    });

  // Before the work completes, return a message object that is the same as the original but with
  // the interactive elements removed.
  const reply = payload.original_message;
  delete reply.attachments[0].actions;
  return reply;
});

slackInteractions
  .options({ callbackId: 'pick_sf_neighborhood', within: 'interactive_message' }, (payload) => {
    console.log(`The user ${payload.user.name} in team ${payload.team.domain} has requested options`);

    // Gather possible completions using the user's input
    return neighborhoods.fuzzyFind(payload.value)
      // Format the data as a list of options
      .then(formatNeighborhoodsAsOptions)
      .catch((error) => {
        console.error(error);
        return { options: [] };
      });
  })
  .action('pick_sf_neighborhood', (payload, respond) => {
    console.log(`The user ${payload.user.name} in team ${payload.team.domain} selected from a menu`);

    // Use the data model to persist the action
    neighborhoods.find(payload.actions[0].selected_options[0].value)
      // After the asynchronous work is done, call `respond()` with a message object to update the
      // message.
      .then((neighborhood) => {
        respond({
          text: payload.original_message.text,
          attachments: [{
            title: neighborhood.name,
            title_link: neighborhood.link,
            text: 'One of the most interesting neighborhoods in the city.',
          }],
        });
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        respond({
          text: 'An error occurred while finding the neighborhood.'
        });
      });

    // Before the work completes, return a message object that is the same as the original but with
    // the interactive elements removed.
    const reply = payload.original_message;
    delete reply.attachments[0].actions;
    return reply;
  });

slackInteractions.action({ type: 'dialog_submission' }, (payload, respond) => {
  // `payload` is an object that describes the interaction
  console.log(`The user ${payload.user.name} in team ${payload.team.domain} submitted a dialog`);

  // Check the values in `payload.submission` and report any possible errors
  const errors = validateKudosSubmission(payload.submission);
  if (errors) {
    return errors;
  } else {
    setTimeout(() => {
      const partialMessage = `<@${payload.user.id}> just gave kudos to <@${payload.submission.user}>.`;

      // When there are no errors, after this function returns, send an acknowledgement to the user
      respond({
        text: partialMessage,
      });

      // The app does some work using information in the submission
      users.findBySlackId(payload.submission.id)
        .then(user => user.incrementKudosAndSave(payload.submission.comment))
        .then((user) => {
          // After the asynchronous work is done, call `respond()` with a message object to update
          // the message.
          respond({
            text: `${partialMessage} That makes a total of ${user.kudosCount}! :balloon:`,
            replace_original: true,
          });
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
          respond({ text: 'An error occurred while incrementing kudos.' });
        });
    });
  }
});


// Example interactive messages
const interactiveButtons = {
  text: 'The terms of service for this app are _not really_ here: <https://unsplash.com/photos/bmmcfZqSjBU>',
  response_type: 'in_channel',
  attachments: [{
    text: 'Do you accept the terms of service?',
    callback_id: 'accept_tos',
    actions: [
      {
        name: 'accept_tos',
        text: 'Yes',
        value: 'accept',
        type: 'button',
        style: 'primary',
      },
      {
        name: 'accept_tos',
        text: 'No',
        value: 'deny',
        type: 'button',
        style: 'danger',
      },
    ],
  }],
};

const interactiveMenu = {
  text: 'San Francisco is a diverse city with many different neighborhoods.',
  response_type: 'in_channel',
  attachments: [{
    text: 'Explore San Francisco',
    callback_id: 'pick_sf_neighborhood',
    actions: [{
      name: 'neighborhood',
      text: 'Choose a neighborhood',
      type: 'select',
      data_source: 'external',
    }],
  }],
};

const dialog = {
  callback_id: 'kudos_submit',
  title: 'Give kudos',
  submit_label: 'Give',
  elements: [
    {
      label: 'Teammate',
      type: 'select',
      name: 'user',
      data_source: 'users',
      placeholder: 'Teammate Name'
    },
    {
      label: 'Comment',
      type: 'text',
      name: 'comment',
      placeholder: 'Thanks for helping me with my project!',
      hint: 'Describe why you think your teammate deserves kudos.',
    },
  ],
};

// Slack slash command handler
function slackSlashCommand(req, res, next) {
  if (req.body.token === slackVerificationToken && req.body.command === '/interactive-example') {
    const type = req.body.text.split(' ')[0];
    if (type === 'button') {
      res.json(interactiveButtons);
    } else if (type === 'menu') {
      res.json(interactiveMenu);
    } else if (type === 'dialog') {
      res.send();
      web.dialog.open({
        trigger_id: req.body.trigger_id,
        dialog,
      }).catch((error) => {
        return axios.post(req.body.response_url, {
          text: `An error occurred while opening the dialog: ${error.message}`,
        });
      }).catch(console.error);
    } else {
      res.send('Use this command followed by `button`, `menu`, or `dialog`.');
    }
  } else {
    next();
  }
}

// Helpers
function formatNeighborhoodsAsOptions(neighborhoods) {
  return {
    options: neighborhoods.map(n => ({ text: n.name, value: n.name })),
  };
}

function validateKudosSubmission(submission) {
  let errors = [];
  if (!submission.comment.trim()) {
    errors.push({
      name: 'comment',
      error: 'The comment cannot be empty',
    });
  }
  if (errors.length > 0) {
    return { errors };
  }
}
