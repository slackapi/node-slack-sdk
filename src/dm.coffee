Message = require './message'
Channel = require './channel'

class DM extends Channel
  constructor: (@_client, data = {}) ->
    super @_client, data

    # Set a name on this channel for consistency
    if @user
      u = @_client.getUserByID @user
      if u
        @name = u.name

  close: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'im.close', params, @_onClose

  _onClose: (data) =>
    console.log data

module.exports = DM