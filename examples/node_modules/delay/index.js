'use strict';
const defer = require('p-defer');

class CancelError extends Error {
	constructor(message) {
		super(message);
		this.name = 'CancelError';
	}
}

const generate = willResolve => function (ms, value) {
	ms = ms || 0;
	const useValue = (arguments.length > 1);
	let result = value;

	const delaying = defer();
	const promise = delaying.promise;

	let timeout = setTimeout(() => {
		const settle = willResolve ? delaying.resolve : delaying.reject;
		settle(result);
	}, ms);

	const thunk = thunkResult => {
		if (!useValue) {
			result = thunkResult;
		}
		return promise;
	};

	thunk.then = promise.then.bind(promise);
	thunk.catch = promise.catch.bind(promise);
	thunk._actualPromise = promise;

	thunk.cancel = () => {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
			delaying.reject(new CancelError('Delay canceled'));
		}
	};

	return thunk;
};

module.exports = generate(true);
module.exports.reject = generate(false);
module.exports.CancelError = CancelError;
