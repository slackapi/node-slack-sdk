# finity

[![npm version](https://badge.fury.io/js/finity.svg)](https://badge.fury.io/js/finity)
[![Build Status](https://api.travis-ci.org/nickuraltsev/finity.svg?branch=master)](https://travis-ci.org/nickuraltsev/finity)
[![Coverage Status](https://coveralls.io/repos/nickuraltsev/finity/badge.svg?branch=master&service=github)](https://coveralls.io/github/nickuraltsev/finity?branch=master)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/nickuraltsev/finity/master/LICENSE)
[![Greenkeeper badge](https://badges.greenkeeper.io/nickuraltsev/finity.svg)](https://greenkeeper.io/)

A finite state machine library for Node.js and the browser with a friendly configuration DSL.

## Features

- Event-based, time-based, and Promise-based triggers
- Entry, exit, and transition actions
- Guard conditions
- Self-transitions and internal transitions
- Hierarchical state machines
- State machine event hooks
- Fluent configuration API
- No external dependencies
- 3.7 kB minified and gzipped
- TypeScript typings

## Installation

Install `finity` using [npm](https://www.npmjs.org/):

```
npm install --save finity
```

Then you can import it using ES2015 or CommonJS modules:

```js
// ES2015
import Finity from 'finity';

// CommonJS
const Finity = require('finity');
```

The UMD build is available on [unpkg](https://unpkg.com/):

```html
<script src="https://unpkg.com/finity/umd/Finity.min.js"></script>
```

## Example

```javascript
const worker = Finity
  .configure()
    .initialState('ready')
      .on('task_submitted').transitionTo('running')
    .state('running')
      .do((state, context) => processTaskAsync(context.eventPayload))
        .onSuccess().transitionTo('succeeded')
        .onFailure().transitionTo('failed')
      .onTimeout(1000)
        .transitionTo('timed_out')
    .global()
      .onStateEnter(state => console.log(`Entering state '${state}'`))
  .start();

worker.handle('task_submitted', task);
```

[More examples](https://github.com/nickuraltsev/finity/tree/master/examples)

## Usage

### Configuration

Before you can create and start a state machine, you need to create a state machine configuration using Finity configuration DSL. The entry point to the DSL is the `Finity.configure` method.

#### States

To define the initial state, use the `initialState` method. To add other states, use the `state` method. Both methods take the state name as a parameter.

```javascript
Finity
  .configure()
    .initialState('state1')
    .state('state2')
```

A state machine must have one and only one initial state.

#### Transitions

A transition from one state to another can be triggered by an event-based, time-based, or Promise-based trigger.

##### Event-based triggers

To add a transition that is triggered by a specific event, first call the `on` method, passing in the name of the event. Then call the `transitionTo` method, passing in the name of the target state.

```javascript
Finity
  .configure()
    .initialState('state1')
      .on('eventA').transitionTo('state2')
      .on('eventB').transitionTo('state3')
    .state('state2')
      .on('eventC').transitionTo('state1')
```

To add a catch-all transition that is triggered by any event, use the `onAny` method. (Event-specific transitions take precedence over catch-all transitions.)

```javascript
Finity
  .configure()
    .initialState('state1')
        // Perform a transition to state2 when eventA occurs
      .on('eventA').transitionTo('state2')
      // Perform a transition to state3 when any other event occurs
      .onAny().transitionTo('state3')  
```

##### Time-based triggers

To add a transition that is triggered when a specific amount of time has passed since entering the state,
use the `onTimeout` method which accepts the amount of time in milliseconds as a parameter.

```javascript
// Perform a transition from state1 to state2 when 100 milliseconds have passed
// since entering state1
Finity
  .configure()
    .initialState('state1')
      .onTimeout(100).transitionTo('state2')

// If eventA occurs before 100 milliseconds have passed, perform a transition to
// state2; otherwise, perform a transition to state3
Finity
  .configure()
    .initialState('state1')
      .on('eventA').transitionTo('state2')
      .onTimeout(100).transitionTo('state3')
```

##### Promise-based triggers

A transition can be triggered by the completion of an async operation.

```javascript
Finity
  .configure()
    .initialState('state1')
      .do(asyncOperation) // asyncOperation is a function that returns a Promise
        .onSuccess().transitionTo('state2')
        .onFailure().transitionTo('state3')
```

The result or error can be accessed through the [context](#context) object.

```javascript
Finity
  .configure()
    .initialState('state1')
      // httpClient.get makes an HTTP request and returns a Promise that will
      // resolve with the response if the request succeeds or reject if the
      // request fails
      .do(() => httpClient.get('https://api.github.com/users/nickuraltsev'))
        .onSuccess().transitionTo('state2').withAction((from, to, context) =>
          console.log('Response: ', context.result)
        )
        .onFailure().transitionTo('state3').withAction((from, to, context) =>
          console.log('Error: ', context.error)
        )
```

#### Entry and exit actions

A state can have entry and exit actions associated with it, which are functions that are called when the state is about to be entered or exited, respectively.

Entry and exit actions receive two parameters:

- `state` - The name of the state to be entered or exited.
- `context` - The current [context](#context).

Use the `onEnter` method to add an entry action to a state, and the `onExit` method to add an exit action.

```javascript
Finity
  .configure()
    .initialState('ready')
      .on('task_submitted').transitionTo('running')
    .state('running')
      .onEnter(() => console.log('Processing task...'))
      .onExit(() => console.log('All done!'))
```

You can add multiple entry actions to a state. They will be executed in the same order as they have been added. The same is true for exit actions.

#### Transition actions

Transitions can have actions associated with them. Transition actions are functions that are called when the transition is executed.

A transition action receives three parameters:

- `fromState` - The name of the transition's source state.
- `toState` - The name of the transition's target state.
- `context` - The current [context](#context).

To add an action to a transition, use the `withAction` method.

```javascript
Finity
  .configure()
    .initialState('state1')
      .on('eventA')
        .transitionTo('state2')
          .withAction(() => console.log('Transitioning to next state'))
```

You can add multiple actions to a transition. They will be executed in the same order as they have been added.

#### Guard conditions

A transition can have a guard condition attached, which is a function that is used to determine if the transition is allowed. A transition with a guard condition can be executed only if the guard condition returns a truthy value.

A guard condition function receives the current [context](#context) as a parameter.

To set a guard condition for a transition, use the `withCondition` method.

```javascript
Finity
  .configure()
    .initialState('state1')
      .on('eventA')
        // Perform a transition to state2 if `fn` returns a truthy value
        .transitionTo('state2').withCondition(fn)
        // Otherwise, perform a transition to state3
        .transitionTo('state3')
```

A transition cannot have more than one guard condition.

#### Self-transitions and internal transitions

Self-transitions and internal transitions are transitions from a state to itself.

When a self-transition is executed, the state is exited and re-entered, and thus the entry and exit actions are executed. In contrast, an internal transition does not cause exit and reentry to the state.

To add a self-transition to a state, use the `selfTransition` method. To add an internal transition, call the `internalTransition` method.

```javascript
Finity
  .configure()
    .initialState('state1')
      .on('eventA').selfTransition()
      .on('eventB').internalTransition()
```

Self-transitions and internal transitions can have actions and guard conditions attached.

#### Ignoring events

To ignore an event, use the `ignore` method.

```javascript
Finity
  .configure()
    .initialState('state1')
      .on('eventA').ignore()
```

Events can be conditionally ignored using the `withCondition` method.

```javascript
Finity
  .configure()
    .initialState('state1')
      .on('eventA')
        // If `fn1` returns a truthy value, perform a transition to state2
        .transitionTo('state2').withCondition(fn1)
        // Else if `fn2` returns a truthy value, ignore the event
        .ignore().withCondition(fn2)
        // Otherwise, perform a transition to state3
        .transitionTo('state3')
```

#### Global hooks

Global hooks are functions that are called on certain state machine events, such as state entry, state exit, and state transition.

Global hooks are similar to entry, exit, and transition actions. The main difference is that global hooks are called for any state or transition, while actions are called only for the state or transition that they are attached to.

##### `onStateEnter`

Called when the state machine is about to enter a state.

###### Parameters

- `state` - The name of the state to be entered.
- `context` - The current [context](#context).

```javascript
Finity
  .configure()
    .global()
      .onStateEnter(state => console.log(`Entering state '${state}'`))
```

##### `onStateExit`

Called when the state machine is about to exit a state.

###### Parameters

- `state` - The name of the state to be exited.
- `context` - The current [context](#context).

```javascript
Finity
  .configure()
    .global()
      .onStateExit(state => console.log(`Exiting state '${state}'`))
```

##### `onTransition`

Called when the state machine is executing a transition.

###### Parameters

- `fromState` - The name of the transition's source state.
- `toState` - The name of the transition's target state.
- `context` - The current [context](#context).

```javascript
Finity
  .configure()
    .global()
      .onTransition((fromState, toState) =>
        console.log(`Transitioning from '${fromState}' to '${toState}'`)
      )
```

##### `onStateChange`

Called when the state of the state machine is about to change.

In contrast to `onTransition` hooks, `onStateChange` hooks are not called when executing a self-transition or internal transition as these types of transitions do not cause a state change.

###### Parameters

- `oldState` - The name of the old state.
- `newState` - The name of the new state.
- `context` - The current [context](#context).

```javascript
Finity
  .configure()
    .global()
      .onStateChange((oldState, newState) =>
        console.log(`Changing state from '${oldState}' to '${newState}'`)
      )
```

You can register multiple global hooks of the same type. They will be called in the same order as they have been registered.

```javascript
Finity
  .configure()
    .initialState('state1')
    .global()
      .onStateEnter(state => console.log(`Entering state '${state}'`))
      .onStateEnter(state => console.log('We are almost there!'))
```

#### Unhandled events

By default, if a state machine receives an event that it cannot handle, it will throw an error. You can override this behavior by registering an `onUnhandledEvent` hook.

An `onUnhandledEvent` hook receives three parameters:

- `event` - The name of the event.
- `state` - The name of the state.
- `context` - The current [context](#context).

```javascript
Finity
  .configure()
    .initialState('state1')
    .global()
      .onUnhandledEvent((event, state) =>
        console.log(`Unhandled event '${event}' in state '${state}'.`)
      )
```

You can register multiple `onUnhandledEvent` hooks. They will be executed in the same order as they have been registered.

### Creating and starting a state machine

Once you have created a configuration, you can create and start a state machine. There are two ways to do this. The easiest way is to call the `start` method of the configuration API.

```javascript
const stateMachine = Finity
  .configure()
    .initialState('state1')
  .start();
```

If you don't want to start a state machine right away or you need to create multiple instances of a state machine with the same configuration, you can call the `getConfig` method to get the configuration first. Then you can create and start new state machine instances by passing the configuration to the `Finity.start` method.

```javascript
const config = Finity
  .configure()
    .initialState('state1')
  .getConfig();

const firstInstance = Finity.start(config);
const secondInstance = Finity.start(config);
```

When a state machine is started, it enters the initial state and all the `onStateEnter` hooks and the initial state's entry actions are executed. However, the `onTransition` and `onStateChange` hooks are not executed.

### Sending an event to a state machine

To send an event to a state machine, pass the event name as the first parameter to the `handle` method of the state machine object.

```javascript
const stateMachine = Finity
  .configure()
    .initialState('state1')
      .on('eventA').transitionTo('state2')
  .start();

// This will trigger a transition from state1 to state2.
stateMachine.handle('eventA');
```

You can send an event with a payload by passing the payload as the optional second parameter. The event payload can be accessed in entry, exit, and transition actions, guard conditions, async operations, and global hooks through the [context](#context) object.

```javascript
const stateMachine = Finity
  .configure()
    .initialState('state1')
      .on('eventA').transitionTo('state2').withAction((fromState, toState, context) => {
        console.log('Payload:', context.eventPayload);
      })
  .start();

stateMachine.handle('eventA', { foo: 'bar' }); // Note: A payload can be of any type.
```

If a state machine cannot handle the specified event, it will throw an error or execute the `onUnhandledEvent` hooks if any are registered (see [Unhandled events](#unhandled-events)).

### Checking if a state machine can handle an event

You can check if a state machine, in its current state, can handle a given event via the `canHandle` method. Like the `handle` method, it takes an event name and an optional payload. If the specified event can be handled, the `canHandle` method returns `true`; otherwise, it returns `false`.

```javascript
const stateMachine = Finity
  .configure()
    .initialState('state1')
      .on('eventA').transitionTo('state2')
  .start();

console.log(stateMachine.canHandle('eventA')); // true
console.log(stateMachine.canHandle('eventB')); // false
```

### Getting the current state of a state machine

To get the current state of a state machine, call the `getCurrentState` method on the state machine object.

```javascript
const stateMachine = Finity
  .configure()
    .initialState('state1')
  .start();

console.log(stateMachine.getCurrentState()); // state1
```

### Context

A context object is passed to all entry, exit, and transition actions, guard conditions, async operations, and global hooks.

#### Properties

- `stateMachine` - The current state machine instance.
- `event` - The name of the event. This property is only present when the state machine is handling an event.
- `eventPayload` - The payload of the event. This property is only present when the state machine is handling an event that has a payload.
- `result` - The async operation result.
- `error` - The async operation error.

### Hierarchical state machines

```javascript
const submachineConfig = Finity
  .configure()
    .initialState('s21')
      .on('eventB').transitionTo('s22')
    .global()
      .onStateEnter(substate => console.log(`  - Entering substate '${substate}'`))
      .onStateExit(substate => console.log(`  - Exiting substate '${substate}'`))
  .getConfig();

const stateMachine = Finity
  .configure()
    .initialState('s1')
      .on('eventA').transitionTo('s2')
    .state('s2')
      .submachine(submachineConfig) // s2 is a submachine state
      .on('eventC').transitionTo('s3')
    .global()
      .onStateEnter(state => console.log(`- Entering state '${state}'`))
      .onStateExit(state => console.log(`- Exiting state '${state}'`))
  .start();

stateMachine.handle('eventA');

stateMachine.handle('eventB');

stateMachine.handle('eventC');
```

The above code will generate the following output:

```
- Entering state 's1'
- Exiting state 's1'
- Entering state 's2'
  - Entering substate 's21'
  - Exiting substate 's21'
  - Entering substate 's22'
  - Exiting substate 's22'
- Exiting state 's2'
- Entering state 's3'
```

## TypeScript Support

Finity includes [TypeScript typings](https://github.com/nickuraltsev/finity/blob/master/index.d.ts).

## Contributing

Bug reports and pull requests are welcome!

By participating in this project you agree to abide by the [code of conduct](https://github.com/nickuraltsev/finity/blob/master/CODE_OF_CONDUCT.md).

## License

[MIT](https://github.com/nickuraltsev/finity/blob/master/LICENSE)
