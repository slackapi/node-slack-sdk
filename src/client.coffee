https       = require 'https'
querystring = require 'querystring'
WebSocket   = require 'ws'
Log            = require 'log'
{EventEmitter} = require 'events'

User = require './user'
Team = require './team'
Channel = require './channel'
Group = require './group'
DM = require './dm'
Message = require './message'
Bot = require './bot'
HttpsProxyAgent = require 'https-proxy-agent'

class Client extends EventEmitter

  host: 'api.slack.com'

  constructor: (@token, @autoReconnect=true, @autoMark=false, @proxyUrl=null) ->
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

    @_connAttempts  = 0

    @logger         = new Log process.env.SLACK_LOG_LEVEL or 'info'

  #
  # Logging in and connection management functions
  #

  login: ->
    @logger.info 'Connecting...'
    @_apiCall 'rtm.start', {agent: 'node-slack'}, @_onLogin

  _onLogin: (data) =>
    if data
      if not data.ok
        @emit 'error', data.error
        @authenticated = false

        if @autoReconnect then @reconnect()
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
      @emit 'error', data
      @authenticated = false

      if @autoReconnect then @reconnect()

  connect: ->
    if not @socketUrl
      return false
    else
      options = { agent: new HttpsProxyAgent(@proxyUrl) } if @proxyUrl
      @ws = new WebSocket @socketUrl, options
      @ws.on 'open', =>
        @_connAttempts = 0
        @_lastPong = Date.now()

        # start pings
        @_pongTimeout = setInterval =>
          if not @connected then return

          @logger.debug 'ping'
          @_send {"type": "ping"}
          if @_lastPong? and Date.now() - @_lastPong > 10000
            @logger.error "Last pong is too old: %d", (Date.now() - @_lastPong) / 1000
            @authenticated = false
            @connected = false
            @reconnect()
        , 5000

      @ws.on 'message', (data, flags) =>
        # flags.binary will be set if a binary data is received
        # flags.masked will be set if the data was masked
        @onMessage JSON.parse(data)

      @ws.on 'error', (error) =>
        # TODO: Reconnect?
        @emit 'error', error

      @ws.on 'close', (code, message) =>
        @emit 'close', code, message
        @connected = false
        @socketUrl = null

      return true

  disconnect: ->
    if not @connected
      return false
    else
      @autoReconnect = false

      if @_pongTimeout
        clearInterval @_pongTimeout
        @_pongTimeout = null

      # We don't set any flags or anything here, since the event handling on the socket will do it
      @ws.close()
      return true

  reconnect: ->
    if @_pongTimeout
      clearInterval @_pongTimeout
      @_pongTimeout = null

    @authenticated = false
    
    # Test for a null value on ws to prevent system failure (e.g. if Bot is disabled)
    if @ws
      @ws.close()

    @_connAttempts++
    # TODO: Check max reconnecting attempts and/or set a ceiling on this timeout
    timeout = @_connAttempts * 1000
    @logger.info "Reconnecting in %dms", timeout
    setTimeout =>
      @logger.info 'Attempting reconnect'
      @login()
    , timeout

  joinChannel: (name, callback) ->
    params = {
      "name": name
    }

    @_apiCall 'channels.join', params, =>
      @_onJoinChannel arguments...
      callback? arguments...

  _onJoinChannel: (data) =>
    @logger.debug data

  openDM: (user_id, callback) ->
    params = {
      "user": user_id
    }

    @_apiCall 'im.open', params, =>
      @_onOpenDM arguments...
      callback? arguments...

  _onOpenDM: (data) =>
    @logger.debug data

  createGroup: (name, callback) ->
    params = {
      "name": name
    }

    @_apiCall 'groups.create', params, =>
      @_onCreateGroup arguments...
      callback? arguments...

  _onCreateGroup: (data) =>
    @logger.debug data

  setPresence: (presence, callback) ->
    if presence is not 'away' and presence is not 'active' then return null

    params = {
      "presence": presence
    }

    @_apiCall 'presence.set', params, =>
      @_onSetPresence arguments...
      callback? arguments...

  _onSetPresence: (data) =>
    @logger.debug data

  setActive: (callback) ->
    params = {}

    @_apiCall 'users.setActive', params, =>
      @_onSetActive arguments...
      callback? arguments...

  _onSetActive: (data) =>
    @logger.debug data

  setStatus: (status, callback) ->
    params = {
      "status": status
    }

    @_apiCall 'status.set', params, =>
      @_onSetStatus arguments...
      callback arguments...

  _onSetStatus: (data) =>
    @logger.debug data

  #
  # Utility functions
  #

  getUserByID: (id) ->
    @users[id]
    
  getUserByEmail: (email) ->
    for k of @users
      if @users[k].profile.email == email
        return @users[k]

  getUserByName: (name) ->
    for k of @users
      if @users[k].name == name
        return @users[k]

  getChannelByID: (id) ->
    @channels[id]

  getChannelByName: (name) ->
    name = name.replace /^#/, ''
    for k of @channels
      if @channels[k].name == name
        return @channels[k]

  getDMByID: (id) ->
    @dms[id]

  getDMByName: (name) ->
    for k of @dms
      if @dms[k].name == name
        return @dms[k]

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

  getChannelGroupOrDMByName: (name) ->
    channel = @getChannelByName name
    if not channel
      group = @getGroupByName name
      if not group
        return @getDMByName name
      else
        return group
    else
      return channel

  getUnreadCount: ->
    count = 0
    for id, channel of @channels
      if channel.unread_count? then count += channel.unread_count

    for id, dm of @dms
      if dm.unread_count? then count += dm.unread_count

    for id, group of @groups
      if group.unread_count? then count += group.unread_count

    count

  getChannelsWithUnreads: ->
    unreads = []
    for id, channel of @channels
      if channel.unread_count > 0 then unreads.push channel

    for id, dm of @dms
      if dm.unread_count > 0 then unreads.push dm

    for id, group of @groups
      if group.unread_count > 0 then unreads.push group

    unreads

   #
   # Stars handler callbacks and dispatches
   #

   onStarAdded: (data) ->
     @emit 'star_added', data

   onStarRemoved: (data) ->
     @emit 'star_removed', data

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
        @emit 'open'

      when "presence_change"
        # find user by id and change their presence
        u = @getUserByID(message.user)
        if u
          @emit 'presenceChange', u, message.presence
          u.presence = message.presence

      when "manual_presence_change"
        @self.presence = message.presence

      when "status_change"
        # find user by id and change their status
        u = @getUserByID(message.user)
        if u
          @emit 'statusChange', u, message.status
          u.status = message.status

      when "error"
        @emit 'error', message.error

      when "message"
        # is this the special message we get on reconnect?
        if message.reply_to
          if @_pending[message.reply_to]
            delete @_pending[message.reply_to]
          else
            return

        # find channel/group/dm and add it to history
        @logger.debug message
        m = new Message @, message
        @emit 'message', m

        channel = @getChannelGroupOrDMByID message.channel
        if channel
          channel.addMessage m

      when "channel_marked", "im_marked", "group_marked"
        channel = @getChannelGroupOrDMByID message.channel
        if channel
          # update last_read and calculate new unread_count
          channel.last_read = message.ts
          channel._recalcUnreads()

          # emit
          @emit 'channelMarked', channel, message.ts

      when "user_typing"
        user = @getUserByID message.user
        channel = @getChannelGroupOrDMByID message.channel
        if user and channel
          @emit 'userTyping', user, channel
          channel.startedTyping(user.id)
        else if channel
          @logger.error "Could not find user "+message.user+" for user_typing"
        else if user
          @logger.error "Could not find channel "+message.channel+" for user_typing"
        else
          @logger.error "Could not find channel/user "+message.channel+"/"+message.user+" for user_typing"

      when "team_join", "user_change"
        u = message.user
        @emit 'userChange', u
        @users[u.id] = new User @, u

      when "channel_joined"
        @channels[message.channel.id] = new Channel @, message.channel

      when "channel_left"
        if @channels[message.channel]
          for k of @channels[message.channel]
            if k not in ["id", "name", "created", "creator", "is_archived", "is_general"]
              delete @channels[message.channel][k]

            @channels[message.channel].is_member = false

      when "channel_created"
        @channels[message.channel.id] = new Channel @, message.channel

      when "channel_deleted"
        delete @channels[message.channel]

      when "channel_rename"
        @channels[message.channel.id] = new Channel @, message.channel

      when "channel_archive"
        if @channels[message.channel] then @channels[message.channel].is_archived = true

      when "channel_unarchive"
        if @channels[message.channel] then @channels[message.channel].is_archived = false

      when "im_created"
        @dms[message.channel.id] = new DM @, message.channel

      when "im_open"
        if @dms[message.channel] then @dms[message.channel].is_open = true

      when "im_close"
        if @dms[message.channel] then @dms[message.channel].is_open = false

      when "group_joined"
        @groups[message.channel.id] = new Group @, message.channel

      when "group_close"
        if @groups[message.channel] then @groups[message.channel].is_open = false

      when "group_open"
        if @groups[message.channel] then @groups[message.channel].is_open = true

      when "group_left", "group_deleted"
        delete @groups[message.channel]

      when "group_archive"
        if @groups[message.channel] then @groups[message.channel].is_archived = true

      when "group_unarchive"
        if @groups[message.channel] then @groups[message.channel].is_archived = false

      when "group_rename"
        @groups[message.channel.id] = new Channel @, message.channel

      when "pref_change"
        @self.prefs[message.name] = message.value

      when "team_pref_change"
        @team.prefs[message.name] = message.value

      when "team_rename"
        @team.name = message.name

      when "team_domain_change"
        @team.domain = message.domain

      when "bot_added", "bot_changed"
        @bots[message.bot.id] = new Bot @, message.bot

      when "bot_removed"
        if @bots[message.bot.id] then @emit 'botRemoved', @bots[message.bot.id]

      when 'star_added'
          @emit 'star_added', message
      
      when 'star_removed'
          @emit 'star_removed', message

      when 'team_migration_started'
        @reconnect()
        @emit 'team_migration_started', message

      else
        if message.reply_to
          if message.type == 'pong'
            @logger.debug 'pong'
            @_lastPong = Date.now()
            delete @_pending[message.reply_to]
          else if message.ok
            @logger.debug "Message "+message.reply_to+" was sent"
            if @_pending[message.reply_to]
              m = @_pending[message.reply_to]
              m._onMessageSent(message)
              channel = @getChannelGroupOrDMByID m
              if channel
                channel.addMessage m

              @emit 'messageSent', m
              delete @_pending[message.reply_to]
          else
            @emit 'error', if message.error? then message.error else message
            # TODO: resend?
        else
          if message.type not in ["file_created", "file_shared", "file_unshared", "file_comment", "file_public", "file_comment_edited", "file_comment_deleted", "file_change", "file_deleted", "star_added", "star_removed"]
            @logger.debug 'Unknown message type: '+message.type
            @logger.debug message

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
      # Send the message back to the sender
      return message

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

    if @proxyUrl
      options['agent'] = new HttpsProxyAgent(@proxyUrl)

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
            callback({'ok': false, 'error': 'API response: '+res.statusCode})

    req.on 'error', (error) =>
      if callback? then callback({'ok': false, 'error': error.errno})

    req.write('' + post_data)
    req.end()

module.exports = Client
