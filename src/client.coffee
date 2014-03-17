https       = require 'https'
querystring = require 'querystring'

User = require './user'
Team = require './team'
Channel = require './channel'
Group = require './group'
DM = require './dm'
Message = require './message'
Bot = require './bot'

class Client

  host: 'api.slack.com'

  constructor: (@token) ->
    @authenticated  = false
    @connected      = false

    @self           = null
    @team           = null

    @channels       = {}
    @dms            = {}
    @groups         = {}
    @users          = {}
    @bots           = {}

    @socketUrl      = null

  login: ->
    @_apiCall 'users.login', {token: @token, agent: 'node-slack'}, @onLogin

  onLogin: (data) =>
    if data
      if not data.ok
        console.error 'Cannot login: '+data.error
        @authenticated = false
      else
        @authenticated = true

        # Important information about ourselves
        @self = new User data.self.id, data.self
        @team = new Team data.team.id, data.team.name, data.team.domain

        # Stash our websocket url away for later -- must be used within 30 seconds!
        @socketUrl = data.url

        # Stash our list of channels
        for k of data.channels
          c = data.channels[k]
          @channels[c.id] = new Channel c.id, c

        # Stash our list of dms
        for k of data.ims
          i = data.ims[k]
          @dms[i.id] = new DM i.id, i

        # Stash our list of private groups
        for k of data.groups
          g = data.groups[k]
          @groups[g.id] = new Group g.id, g

        # Stash our list of other users
        for k of data.users
          u = data.users[k]
          @users[u.id] = new User u.id, u

        # TODO: Process bots

        console.log 'Logged in to '+@team.name+' as '+@self.name
    else
      console.error 'Invalid login response received (network down?)'

  connect: ->
    if not @socketUrl
      console.error 'Cannot connect without a url. Login first?'
    else
      console.log 'We would connect here'

  _apiCall: (method, params, callback) ->
    params['token'] = @token

    post_data = querystring.stringify(params)

    options = 
      hostname: @host,
      method: 'POST',
      path: '/api/' + method,
      headers:
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length

    req = https.request(options)

    req.on 'response', (res) =>
      buffer = ''
      res.on 'data', (chunk) ->
        buffer += chunk
      res.on 'end', =>
        if callback?
          if res.statusCode is 200
            value = JSON.parse(buffer)
            callback(value)
          else
            callback(null)

    req.write('' + post_data)
    req.end()

module.exports = Client