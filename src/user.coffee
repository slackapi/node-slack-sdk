class User
  constructor: (@_client, data = {}) ->
    for k of (data or {})
      @[k] = data[k]

module.exports = User