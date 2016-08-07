// promise-canceled-error.js
//
// Error types for cancellable promises.

const PROMISE_CANCELED_ERROR_NAME = 'PromiseCanceledError';

// Represent an error generated by promise cancelation.
class PromiseCanceledError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = PROMISE_CANCELED_ERROR_NAME;
  }
}

function isPromiseCanceledError(error) { return error.name === PROMISE_CANCELED_ERROR_NAME; }

// Handlers for use in `catch` handlers.
// Usage:
// ```
// promise.catch(handleCanceled(() => ...)).then(...)
// ```
function handleCanceled(handler) {
  return function(reason) {
    if (isPromiseCanceledError(reason)) handler(reason);
    else throw reason;
  };
}

function handleNotCanceled(handler) {
  return function(reason) {
    if (!isPromiseCanceledError(reason)) handler(reason);
    else throw reason;
  };
}

module.exports = {PromiseCanceledError, isPromiseCanceledError, handleCanceled, handleNotCanceled};