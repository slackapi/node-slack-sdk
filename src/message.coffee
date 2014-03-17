class Message
  constructor: (@client, data = {}) ->
    for k of (data or {})
      if k == 'client' then continue
      @[k] = data[k]

module.exports = Message