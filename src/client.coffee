https       = require 'https'
querystring = require 'querystring'
WebSocket   = require 'ws'

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
    @ws             = null

  #
  # Logging in and connection management functions
  #

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
        @self = new User @, data.self
        @team = new Team @, data.team.id, data.team.name, data.team.domain

        # Stash our websocket url away for later -- must be used within 30 seconds!
        @socketUrl = data.url

        # Stash our list of channels
        for k of data.channels
          c = data.channels[k]
          @channels[c.id] = new Channel @, c

        # Stash our list of dms
        for k of data.ims
          i = data.ims[k]
          @dms[i.id] = new DM @, i

        # Stash our list of private groups
        for k of data.groups
          g = data.groups[k]
          @groups[g.id] = new Group @, g

        # Stash our list of other users
        for k of data.users
          u = data.users[k]
          @users[u.id] = new User @, u

        # TODO: Process bots

        console.log 'Logged in to '+@team.name+' as '+@self.name
        @connect()
    else
      console.error 'Invalid login response received (network down?)'

  connect: ->
    if not @socketUrl
      console.error 'Cannot connect without a url. Login first?'
    else
      @ws = new WebSocket @socketUrl
      @ws.on 'open', =>
        console.log 'Websocket connected!'
        @connected = true

      @ws.on 'message', (data, flags) =>
        # flags.binary will be set if a binary data is received
        # flags.masked will be set if the data was masked
        @onMessage JSON.parse(data)

      @ws.on 'error', =>
        console.error 'Websocket error!'

      @ws.on 'close', =>
        console.log 'Websocket disconnected!'
        @connected = false
        @socketUrl = null

      @ws.on 'ping', (data, flags) =>
        @ws.pong

  disconnect: ->
    if not @connected
      console.error 'Cannot disconnect, since not connected'
    else
      # We don't set any flags or anything here, since the event handling on the socket will do it
      @ws.close()

  #
  # Utility functions
  #

  getUserByID: (id) ->
    @users[id]

  getUserByName: (name) ->
    for k of @users
      if @users[k].name == name
        return @users[k]

  getChannelByID: (id) ->
    @channels[id]

  getChannelByName: (name) ->
    for k of @channels
      if @channels[k].name == name
        return @channels[k]

  getDMByID: (id) ->
    @dms[id]

  getGroupByID: (id) ->
    @groups[id]

  getGroupByName: (name) ->
    for k of @groups
      if @groups[k].name == name
        return @groups[k]

  getChannelGroupOrDMByID: (id) ->
    if id[0] == 'C'
      return @getChannelByID id
    else
      if id[0] == 'G'
        return @getGroupByID id
      else
        return @getDMByID id

  #
  # Message handler callback and dispatch
  #

  onMessage: (message) ->
    # TODO: we should probably emit an event here for all messages

    # Internal handling
    switch message.type
      when "hello"
        # connected really really
        @connected = true

      when "presence_change"
        # find user by id and change their presence
        u = @getUserByID(message.user)
        if u
          u.presence = message.presence

      when "error"
        console.error 'Server error: '+message.error

      when "message"
        # find channel/group/dm and add it to history
        m = new Message @, message

        channel = @getChannelGroupOrDMByID message.channel
        if channel
          console.log "Adding message "+m.ts+" to "+channel.name
          channel.addMessage m
        else
          console.warn "Could not find channel "+message.channel+" for message"

      when "channel_marked"
        channel = @getChannelGroupOrDMByID message.channel
        if channel
          console.log "Moved cursor to "+message.ts+" in "+channel.name
          channel.last_read = message.ts
        else
          console.warn "Could not find channel "+message.channel+" for channel_marked"

      when "user_typing"
        user = @getUserByID message.user
        channel = @getChannelGroupOrDMByID message.channel
        if user and channel
          console.log user.name+" is typing in "+channel.name
          channel.startedTyping(user.id)
        else if channel
          console.warn "Could not find user "+message.user+" for user_typing"
        else if user
          console.warn "Could not find channel "+message.channel+" for user_typing"
        else
          console.warn "Could not find channel/user "+message.channel+"/"+message.user+" for user_typing"

      else
        console.warn 'Unknown message type: '+message.type
        console.log message

  #
  # Private functions
  #

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