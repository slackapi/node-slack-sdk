class Message
  constructor: (@_client, data = {}) ->
    for k of (data or {})
      @[k] = data[k]

  toJSON: ->
    m = {}
    m['id'] = if @id then @id else 1
    m['type'] = if @type then @type else 'message'
    m['channel'] = @channel
    m['text'] = @text # TODO: Good place to do escaping, etc

    return m

  getBody: ->
    txt = ""
    if @text then txt += @text
    
    if @attachments
      if @text then txt += "\n"
      for k, attach of @attachments
        if k > 0 then txt += "\n"
        txt += attach.fallback

    txt

  toString: ->
    if @hidden then return ''
    if not @text and not @attachments then return ''

    str = ""
    # TODO: Date
    
    channel = @_client.getChannelGroupOrDMByID @channel
    if channel then str += channel.name + ' > '

    user = @_client.getUserByID @user
    if user
      str += user.name + ': '
    else if @username
      str += @username
      if @_client.getUserByName @username
        str += ' (bot): '
      else
        str += ': '
    
    # TODO: bots here

    body = @getBody()
    if body then str += body

    str

  getChannelType: ->
    channel = @_client.getChannelGroupOrDMByID @channel
    if not channel then return ''

    return channel.getType()

  updateMessage: (new_text) =>
    params = {
      "ts": @ts,
      "channel": @channel,
      "text": new_text
    }
    if @ts
      @_client.logger.debug "Sending message change request"
      @_client.logger.debug params
      @_client._apiCall "chat.update", params, @_onUpdateMessage

  _onUpdateMessage: (data) =>
    @_client.logger.debug data

  deleteMessage: =>
    params = {
      "ts": @ts,
      "channel": @channel,
    }
    if @ts
      @_client.logger.debug "Sending message delete request"
      @_client.logger.debug params
      @_client._apiCall "chat.delete", params, @_onDeleteMessage

  _onDeleteMessage: (data) =>
    @_client.logger.debug data

  _onMessageSent: (data) ->
    @ts = data.ts

module.exports = Message
