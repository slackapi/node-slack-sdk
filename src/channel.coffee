Message = require './message'

class Channel
  constructor: (@_client, data = {}) ->
    @_typing = {}
    @_history = {}

    for k of (data or {})
      @[k] = data[k]

    # TODO: Emit event for unread history

  getType: ->
    return @constructor.name

  addMessage: (message) ->
    switch message.subtype
      when undefined, "channel_archive", "channel_unarchive", "group_archive", "group_unarchive"
        @_history[message.ts] = message

      when "message_changed"
        @_history[message.message.ts] = message.message

      when "message_deleted"
        delete @_history[message.deleted_ts]

      when "channel_topic", "group_topic"
        @topic.value = message.topic
        @topic.creator = message.user
        @topic.last_set = message.ts

        @_history[message.ts] = message

      when "channel_purpose", "group_purpose"
        @purpose.value = message.purpose
        @purpose.creator = message.user
        @purpose.last_set = message.ts

        @_history[message.ts] = message

      when "channel_name", "group_name"
        @name = message.name
        @_history[message.ts] = message

      when "bot_message"
        # TODO: Make a new message type before storing
        @_history[message.ts] = message

      when "channel_join", "group_join"
        @members.push message.user
        @_history[message.ts] = message

      when "channel_leave", "group_leave"
        index = @members.indexOf message.user
        if index isnt -1
          @members.splice index

        @_history[message.ts] = message

      else
        @_client.logger.debug "Unknown message subtype: %s", message.subtype
        @_history[message.ts] = message

    if message.ts and not message.hidden and @latest? and @latest.ts? and message.ts > @latest.ts
      @unread_count++
      @latest = message

    if @_client.autoMark then @mark message.ts

  getHistory: ->
    @_history

  startedTyping: (user_id) ->
    # Start timer to clear this
    if @_typing[user_id] then clearTimeout @_typing[user_id]
    @_typing[user_id] = setTimeout @_typingTimeout, 5000, user_id

  _typingTimeout: (user_id) =>
    delete @_typing[user_id]

  getTyping: ->
    for k of @_typing
      k

  send: (text) ->
    m = new Message @_client, {text: text}
    @sendMessage m

  postMessage: (data) ->
    params = data
    params.channel = @id
    if data.attachments
      params.attachments = JSON.stringify(data.attachments)

    @_client.logger.debug data
    @_client.logger.debug params
    @_client._apiCall "chat.postMessage", params, @_onPostMessage

  _onPostMessage: (data) =>
    @_client.logger.debug data

  sendMessage: (message) ->
    message.channel = @id
    @_client._send(message)

  fetchHistory: (latest, oldest) ->
    params = {
      "channel": @id
    }

    if latest? then params.latest = latest
    if oldest? then params.oldest = oldest

    method = 'channels.history'
    if @getType() == 'Group' then method = 'groups.history'
    if @getType() == 'DM' then method = 'im.history'

    @_client._apiCall method, params, @_onFetchHistory

  _onFetchHistory: (data) =>
    @_client.logger.debug data

  mark: (ts) ->
    params = {
      "channel": @id,
      "ts": ts
    }

    method = 'channels.mark'
    if @getType() == 'Group' then method = 'groups.mark'
    if @getType() == 'DM' then method = 'im.mark'

    @_client._apiCall method, params, @_onMark

  _onMark: (data) =>
    @_client.logger.debug data
    # TODO: Update @unread_count based on ts

  leave: ->
    if @getType() == 'DM' then return null

    params = {
      "channel": @id
    }

    method = 'channels.leave'
    if @getType() == 'Group' then method = 'groups.leave'

    @_client._apiCall method, params, @_onLeave

  _onLeave: (data) =>
    @_client.logger.debug data

  setTopic: (topic) ->
    if @getType() == 'DM' then return null

    params = {
      "channel": @id,
      "topic": topic
    }

    method = 'channels.setTopic'
    if @getType() == 'Group' then method = 'groups.setTopic'

    @_client._apiCall method, params, @_onSetTopic

  _onSetTopic: (data) =>
    @_client.logger.debug data

  setPurpose: (purpose) ->
    if @getType() == 'DM' then return null

    params = {
      "channel": @id,
      "purpose": purpose
    }

    method = 'channels.setPurpose'
    if @getType() == 'Group' then method = 'groups.setPurpose'

    @_client._apiCall method, params, @_onSetPurpose

  _onSetPurpose: (data) =>
    @_client.logger.debug data

  rename: (name) ->
    if @getType() == 'DM' then return null

    params = {
      "channel": @id,
      "name": name
    }

    method = 'channels.rename'
    if @getType() == 'Group' then method = 'groups.rename'

    @_client._apiCall method, params, @_onRename

  _onRename: (data) =>
    @_client.logger.debug data

  invite: (user_id) ->
    if @getType() == 'DM' then return null

    params = {
      "channel": @id,
      "user": user_id
    }

    method = 'channels.invite'
    if @getType() == 'Group' then method = 'groups.invite'

    @_client._apiCall method, params, @_onInvite

  _onInvite: (data) =>
    @_client.logger.debug data

  _recalcUnreads: ->
    unreads = 0

    # Iterate through history and count messages greater than last_read
    for ts of @history
      if ts > @last_read then unreads++

    @unread_count = unreads


module.exports = Channel