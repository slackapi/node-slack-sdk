https       = require 'https'
querystring = require 'querystring'
WebSocket   = require 'ws'
{EventEmitter} = require 'events'

User = require './user'
Team = require './team'
Channel = require './channel'
Group = require './group'
DM = require './dm'
Message = require './message'
Bot = require './bot'

class Client extends EventEmitter

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
    @_messageID     = 0
    @_pending       = {}

  #
  # Logging in and connection management functions
  #

  login: ->
    @_apiCall 'users.login', {token: @token, agent: 'node-slack'}, @onLogin

  onLogin: (data) =>
    if data
      if not data.ok
        @emit 'error', data.error
        @authenticated = false
      else
        @authenticated = true

        # Important information about ourselves
        @self = new User @, data.self
        @team = new Team @, data.team.id, data.team.name, data.team.domain

        # Stash our websocket url away for later -- must be used within 30 seconds!
        @socketUrl = data.url

        # Stash our list of other users (DO THIS FIRST)
        for k of data.users
          u = data.users[k]
          @users[u.id] = new User @, u

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

        # TODO: Process bots

        @emit 'loggedIn', @self, @team
        @connect()
    else
      @emit 'error'

  connect: ->
    if not @socketUrl
      return false
    else
      @ws = new WebSocket @socketUrl
      @ws.on 'open', =>
        @emit 'open'
        @connected = true

      @ws.on 'message', (data, flags) =>
        # flags.binary will be set if a binary data is received
        # flags.masked will be set if the data was masked
        @onMessage JSON.parse(data)

      @ws.on 'error', =>
        @emit 'error'

      @ws.on 'close', =>
        @emit 'close'
        @connected = false
        @socketUrl = null

      @ws.on 'ping', (data, flags) =>
        @ws.pong

      return true

  disconnect: ->
    if not @connected
      return false
    else
      # We don't set any flags or anything here, since the event handling on the socket will do it
      @ws.close()
      return true

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
    @emit 'raw_message', message

    # Internal handling
    switch message.type
      when "hello"
        # connected really really
        @connected = true

      when "presence_change"
        # find user by id and change their presence
        u = @getUserByID(message.user)
        if u
          @emit 'presenceChange', u, message.presence
          u.presence = message.presence

      when "error"
        @emit 'error', message.error

      when "message"
        # find channel/group/dm and add it to history
        m = new Message @, message
        @emit 'message', m

        channel = @getChannelGroupOrDMByID message.channel
        if channel
          channel.addMessage m

      when "channel_marked", "im_marked"
        channel = @getChannelGroupOrDMByID message.channel
        if channel
          @emit 'channelMarked', channel, message.ts
          channel.last_read = message.ts

      when "user_typing"
        user = @getUserByID message.user
        channel = @getChannelGroupOrDMByID message.channel
        if user and channel
          @emit 'userTyping', user, channel
          channel.startedTyping(user.id)
        else if channel
          console.warn "Could not find user "+message.user+" for user_typing"
        else if user
          console.warn "Could not find channel "+message.channel+" for user_typing"
        else
          console.warn "Could not find channel/user "+message.channel+"/"+message.user+" for user_typing"

      else
        if message.reply_to
          if message.ok
            console.log "Message "+message.reply_to+" was sent"
            if @_pending[message.reply_to]
              m = @_pending[message.reply_to]
              channel = @getChannelGroupOrDMByID m
              if channel
                channel.addMessage m

              @emit 'messageSent', m
              delete @_pending[message.reply_to]
          else
            @emit 'error', message.error
            # TODO: resend?
        else
          console.warn 'Unknown message type: '+message.type
          console.log message

  #
  # Private functions
  #

  _send: (message) ->
    if not @connected
      return false
    else
      message.id = ++@_messageID
      @_pending[message.id] = message
      @ws.send JSON.stringify(message)

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