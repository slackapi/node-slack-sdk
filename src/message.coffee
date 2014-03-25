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

  toString: ->
    if @hidden then return ''
    if not @text and not @attachments then return ''
    
    str = ''
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

    if @text then str += @text

    if @attachments
      if @text then str += "\n"
      for k of @attachments
        if k > 0 then str += "\n"
        str += @attachments[k].fallback

    str

module.exports = Message