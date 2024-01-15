import { expectAssignable, expectError } from 'tsd';
import { WebClient } from '../../../src/WebClient';

const web = new WebClient('TOKEN');

// views.open
// -- sad path
expectError(web.views.open()); // lacking argument
expectError(web.views.open({})); // empty argument
expectError(web.views.open({ // missing interactivity_pointer or trigger_id
  view: {
    type: 'home',
    blocks: [],
  },
}));
expectError(web.views.open({ // missing view
  interactivity_pointer: '1234',
}));
expectError(web.views.open({ // missing view
  trigger_id: '1234',
}));
// -- happy path
expectAssignable<Parameters<typeof web.views.open>>([{
  view: {
    type: 'home',
    blocks: [],
  },
  interactivity_pointer: '1234', // provide a view and interactivity pointer, or..
}]);
expectAssignable<Parameters<typeof web.views.open>>([{
  view: {
    type: 'home',
    blocks: [],
  },
  trigger_id: '1234', // .. a trigger_id
}]);

// views.push
// -- sad path
expectError(web.views.push()); // lacking argument
expectError(web.views.push({})); // empty argument
expectError(web.views.push({ // missing interactivity_pointer or trigger_id
  view: {
    type: 'home',
    blocks: [],
  },
}));
expectError(web.views.push({ // missing view
  interactivity_pointer: '1234',
}));
expectError(web.views.push({ // missing view
  trigger_id: '1234',
}));
// -- happy path
expectAssignable<Parameters<typeof web.views.push>>([{
  view: {
    type: 'home',
    blocks: [],
  },
  interactivity_pointer: '1234', // provide a view and interactivity pointer, or..
}]);
expectAssignable<Parameters<typeof web.views.push>>([{
  view: {
    type: 'home',
    blocks: [],
  },
  trigger_id: '1234', // .. a trigger_id
}]);

// views.publish
// -- sad path
expectError(web.views.publish()); // lacking argument
expectError(web.views.publish({})); // empty argument
expectError(web.views.publish({ // missing user_id
  view: {
    type: 'home',
    blocks: [],
  },
}));
expectError(web.views.publish({ // missing view
  user_id: 'U1234',
}));
// -- happy path
expectAssignable<Parameters<typeof web.views.publish>>([{
  view: {
    type: 'home',
    blocks: [],
  },
  user_id: 'U1234', // provide a view and user_id
}]);

// views.update
// -- sad path
expectError(web.views.update()); // lacking argument
expectError(web.views.update({})); // empty argument
expectError(web.views.update({ // missing external_id or view_id
  view: {
    type: 'home',
    blocks: [],
  },
}));
expectError(web.views.update({ // missing view
  external_id: '1234',
}));
expectError(web.views.update({ // missing view
  view_id: '1234',
}));
// -- happy path
expectAssignable<Parameters<typeof web.views.update>>([{
  view: {
    type: 'home',
    blocks: [],
  },
  external_id: '1234', // provide a view and view_id, or..
}]);
expectAssignable<Parameters<typeof web.views.update>>([{
  view: {
    type: 'home',
    blocks: [],
  },
  view_id: '1234', // .. a view_id
}]);
