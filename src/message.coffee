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

module.exports = Message