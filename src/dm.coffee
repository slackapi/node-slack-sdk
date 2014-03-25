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

module.exports = DM