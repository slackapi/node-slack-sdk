class DM
  constructor: (@client, data = {}) ->
    @history = {}

    for k of (data or {})
      if k == 'client' || k =='history' then continue
      @[k] = data[k]

  addMessage: (message) ->
    @history[message.ts] = message

  getHistory: ->
    @history

module.exports = DM