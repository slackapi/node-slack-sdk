import { expectAssignable, expectError } from 'tsd';

import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// reminders.add
// -- sad path
expectError(web.reminders.add()); // lacking argument
expectError(web.reminders.add({})); // empty argument
expectError(web.reminders.add({ text: 'take out the garbage' })); // missing time
expectError(web.reminders.add({ time: 'mondays at 6pm' })); // missing text
expectError(web.reminders.add({
  time: '6pm',
  text: 'take out the garbage',
  recurrence: {
    frequency: 'weekly', // missing weekdays property
  },
}));
expectError(web.reminders.add({
  time: '6pm',
  text: 'take out the garbage',
  recurrence: {
    frequency: 'weekly', // missing weekdays property
    weekdays: [], // must provide at least one weekday if frequency=weekly
  },
}));
// -- happy path
expectAssignable<Parameters<typeof web.reminders.add>>([{
  text: 'floss your teeth',
  time: 'every damn day',
}]); // must provide at a minimum time and text
expectAssignable<Parameters<typeof web.reminders.add>>([{
  text: 'take out the garbage',
  time: '6pm', // must provide at a minimum time and text
  recurrence: {
    frequency: 'weekly',
    weekdays: ['monday'], // and weekly recurrence needs at least one weekday
  },
}]);
expectAssignable<Parameters<typeof web.reminders.add>>([{
  text: 'call mom for her birthday',
  time: 'April 8th', // must provide at a minimum time and text
  recurrence: {
    frequency: 'yearly',
  },
}]);

// reminders.complete
// -- sad path
expectError(web.reminders.complete()); // lacking argument
expectError(web.reminders.complete({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.reminders.complete>>([{
  reminder: 'R1234', // needs the reminder ID
}]);

// reminders.delete
// -- sad path
expectError(web.reminders.delete()); // lacking argument
expectError(web.reminders.delete({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.reminders.delete>>([{
  reminder: 'R1234', // needs the reminder ID
}]);

// reminders.info
// -- sad path
expectError(web.reminders.info()); // lacking argument
expectError(web.reminders.info({})); // empty argument
// -- happy path
expectAssignable<Parameters<typeof web.reminders.info>>([{
  reminder: 'R1234', // needs the reminder ID
}]);

// reminders.list
// -- sad path
// -- happy path
expectAssignable<Parameters<typeof web.reminders.list>>([{}]); // all optional args
expectAssignable<Parameters<typeof web.reminders.list>>([]); // no arg is fine
