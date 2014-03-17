class Message
  constructor: (@_client, data = {}) ->
    for k of (data or {})
      @[k] = data[k]

module.exports = Message