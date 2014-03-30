Message = require './message'

class Channel
  constructor: (@_client, data = {}) ->
    @_typing = {}
    @_history = {}

    for k of (data or {})
      @[k] = data[k]

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
        console.log "Unknown message subtype: %s", message.subtype
        @_history[message.ts] = message

    if message.ts and @latest? and @latest.ts? and message.ts > @latest.ts
      @latest = message

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

  sendMessage: (message) ->
    message.channel = @id
    @_client._send(message)

  fetchHistory: (latest, oldest) ->
    params = {
      "channel": @id
    }

    if latest? then params.latest = latest
    if oldest? then params.oldest = oldest

    @_client._apiCall 'channels.history', params, @_onFetchHistory

  _onFetchHistory: (data) =>
    console.log data

  mark: (ts) ->
    params = {
      "channel": @id,
      "ts": ts
    }

    @_client._apiCall 'channels.mark', params, @_onMark

  _onMark: (data) =>
    console.log data

  leave: ->
    params = {
      "channel": @id
    }

    @_client._apiCall 'channels.leave', params, @_onLeave

  _onLeave: (data) =>
    console.log data

  setTopic: (topic) ->
    params = {
      "channel": @id,
      "topic": topic
    }

    @_client._apiCall 'channels.setTopic', params, @_onSetTopic

  _onSetTopic: (data) =>
    console.log data

  setPurpose: (purpose) ->
    params = {
      "channel": @id,
      "purpose": purpose
    }

    @_client._apiCall 'channels.setPurpose', params, @_onSetPurpose

  _onSetPurpose: (data) =>
    console.log data

  rename: (name) ->
    params = {
      "channel": @id,
      "name": name
    }

    @_client._apiCall 'channels.rename', params, @_onRename

  _onRename: (data) =>
    console.log data

  invite: (user_id) ->
    params = {
      "channel": @id,
      "user": user_id
    }

    @_client._apiCall 'channels.invite', params, @_onInvite

  _onInvite: (data) =>
    console.log data

module.exports = Channel