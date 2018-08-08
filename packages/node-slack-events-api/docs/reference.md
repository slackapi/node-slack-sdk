# Reference Documentation

#### createSlackEventAdapter(_signingSecret_, [_options_])

A factory method for creating a new `SlackEventAdapter` instance.

The `signingSecret` is a required string parameter which you can find in your Slack app's Basic
Information.

If `options.waitForResponse` is truthy then your SlackEventAdapter will emit a callback function
with each event so you can control more details about the HTTP response sent back to Slack. See
SlackEventAdapter for more details.

If `options.includeBody` is truthy, then the SlackEventAdapter will emit an additional argument
with the event that has the entire parsed body of the HTTP request. See SlackEventAdapter for
more details.

If `options.includeHeaders` is truthy, then the SlackEventAdapter will emit an additional argument
with the event that has the parsed headers of the HTTP request. See SlackEventAdapter for more
details.

### SlackEventAdapter

This object is responsible for consuming HTTP requests from the Slack Events API (via a request handler or
by creating its own HTTP Server) and emitting events to your application. It inherits from
[`EventEmitter`](https://nodejs.org/dist/latest-v4.x/docs/api/events.html#events_class_eventemitter),
whose methods are used for managing listeners. You can also rely on it to verify request signatures
and other less interesting tasks so you can just focus on handling the events.

As with any EventEmitter, you should attach a handler for the `'error'` event in order to be
notified of errors.

All other events come from the Slack Events API [Event Types](https://api.slack.com/events/api).
The signature for your event handler would be `handler(event, [body, ] [headers, ] [respond])`.
The first argument your handler receives is the event object as described in documentation linked.
If you initialized the adapter using the `includeBody` option, then next argument will be the entire
parsed body of the HTTP request. This can be useful to get additional context such as `team_id`,
`api_app_id`, and more. Similarly, if you initialized the adapter using the `includeHeaders` option,
the next argument will be an object with key-value pairs for the headers in the HTTP request.

If you initialize the adapter using the `waitForResponse` option, an additional callback argument,
`respond()`, will be emitted with your events. When using this option, the adapter will not respond
to HTTP requests until you have invoked the callback. The callback has a signature of
`respond(error, responseOptions)`. If you want to respond with a general failure, you should set the
`error` parameter to a truthy value. If you want to respond with a failure and also indicate
that Slack should not retry that request, you should set `responseOptions.failWithNoRetry` to a
truthy value. If you want Slack to send the request to a different URL, you should set the
value of `responseOptions.redirectLocation` to the URL you want. Lastly, if you'd like to
set the body of the response, you should set the `responseOptions.content` value to a string of
body content. EventEmitters allow you to add many handlers, but it's recommended when using the
`waitForResponse` option that you only have one handler on each event type. It's your application's
responsibility to make sure that the `respond()` callback is invoked exactly once.  You should always
handle the `error` event too - otherwise unhandled errors will crash your app.

#### requestListener()

This method returns a function that can be attached to the
[`request` event of an `http.Server`](https://nodejs.org/dist/latest/docs/api/http.html#http_event_request)
instance. The function also works as the `requestListener` parameter of
[`http.createServer()`](https://nodejs.org/dist/latest/docs/api/http.html#http_http_createserver_options_requestlistener). This
function is the primary way to plug the adapter into your own HTTP server, no matter which framework (or not)
you choose.

#### expressMiddleware()

This method returns a middleware function that can be mounted into your own Express application.
Remember to mount it at a path that would resolve to your Slack App's Request URL setting.

If a request is recieved with a body that has already been parsed, this middleware will forward
an error to the next middleware in the express app. The error will have its `code` property set
to the value `errorCodes.BODY_PARSER_NOT_PERMITTED`.

#### start(_port_)

This method is a convenience API that will create an HTTP server, set it up to receive requests
from the Slack Events API at the default path of `/slack/events`, and start listening on a port. It
returns a Promise that resolves when the server is listening.

#### createServer([_path_])

This method returns a Promise for an
[`http.Server`](https://nodejs.org/dist/latest-v4.x/docs/api/http.html#http_class_http_server). The
server will already be setup to receive requests from the Slack Events API at the default path of
`/slack/events`. A specific path can be set using the `path` argument. You can start it by calling
the `listen()` method on the server.

### errorCodes

A dictionary of values that this package assigns to the `code` property if errors.

*  `errorCodes.BODY_PARSER_NOT_PERMITTED`: An incoming request's body had already been parsed before
   the adapter's express middleware was able to process it. You should remove the `body-parser` middleware from
   the app or router.
