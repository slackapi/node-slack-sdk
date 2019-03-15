# p-retry [![Build Status](https://travis-ci.org/sindresorhus/p-retry.svg?branch=master)](https://travis-ci.org/sindresorhus/p-retry)

> Retry a promise-returning or async function


## Install

```
$ npm install --save p-retry
```


## Usage

```js
const pRetry = require('p-retry');
const fetch = require('node-fetch');

const run = () => fetch('https://sindresorhus.com/unicorn')
	.then(response => {
		// abort retrying if the resource doesn't exist
		if (response.status === 404) {
			throw new pRetry.AbortError(response.statusText);
		}

		return response.blob();
	});

pRetry(run, {retries: 5}).then(result => {});
```


## API

### pRetry(input, [options])

Returns a `Promise` that is fulfilled when calling `input` returns a fulfilled promise. If calling `input` returns a rejected promise, `input` is called again until the max retries are reached, it then rejects with the last rejection reason.

It doesn't retry on `TypeError` as that's a user error.

#### input

Type: `Function`

Receives the number of attempts as the first argument and is expected to return a `Promise` or any value.

#### options

Type: `Object`

Options are passed to the [`retry`](https://github.com/tim-kos/node-retry#retryoperationoptions) module.

### pRetry.AbortError(message|error)

Abort retrying and reject the promise.

### message

Type: `string`

Error message.

### error

Type: `Error`

Custom error.


## Related

- [p-timeout](https://github.com/sindresorhus/p-timeout) - Timeout a promise after a specified amount of time
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
