Client = require './src/client'

module.exports = {
  Client
}

module.exports.SlackClient = (token) ->
  new Client token
