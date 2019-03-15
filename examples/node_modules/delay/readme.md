# delay [![Build Status](https://travis-ci.org/sindresorhus/delay.svg?branch=master)](https://travis-ci.org/sindresorhus/delay)

> Delay a promise a specified amount of time


## Install

```
$ npm install --save delay
```


## Usage

```js
const delay = require('delay');

delay(200)
	.then(() => {
		// Executed after 200 milliseconds
	});

somePromise()
	.then(delay(100))
	.then(result => {
		// Executed 100 milliseconds after somePromise resolves
		// The result from somePromise is passed through
	});
```


## Advanced usage

```js
const delay = require('delay');

// With Node.js >=7.6 and async functions
async () => {
	bar();

	await delay(100);

	// Executed 100 milliseconds later
	baz();
}();

// There's also `delay.reject()` that takes the value, and rejects it `ms` later
Promise.resolve('foo')
	.then(delay.reject(100))
	.then(x => blah()) // Never executed
	.catch(err => {
		// Executed 100 milliseconds later
		// err === 'foo'
	});

// You can also specify the rejection value
Promise.resolve('foo')
	.then(delay.reject(100, 'bar'))
	.then(x => blah()) // Never executed
	.catch(err => {
		// executed 100 milliseconds later
		// err === 'bar'
	});

// You can cancel the promise by calling `.cancel()`
async () => {
	const delaying = delay(1000);
	setTimeout(() => {
		delaying.cancel();
	}, 500);
	try {
		await delaying;
	} catch (err) {
		// `err` is an instance of `delay.CancelError`
	}
}();
```


## API

### delay(ms, [value])

Delay the promise and then resolve.

### delay.reject(ms, [value])

Delay the promise and then reject.

#### ms

Type: `number`

Milliseconds to delay the promise.

#### value

Type: `any`

Value to pass down the promise chain. Overrides any existing value.

### delay.CancelError

Exposed for instance checking.

### delay#cancel()

Cancel the delay. Results in the promise being rejected with a `delay.CancelError` error.


## Related

- [p-min-delay](https://github.com/sindresorhus/p-min-delay) - Delay a promise a minimum amount of time
- [p-immediate](https://github.com/sindresorhus/p-immediate) - Returns a promise resolved in the next event loop - think `setImmediate()`
- [p-timeout](https://github.com/sindresorhus/p-timeout) - Timeout a promise after a specified amount of time
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
