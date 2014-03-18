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
    if not @text then return ''
    
    str = ''
    channel = @_client.getChannelGroupOrDMByID @channel
    if channel then str += channel.name + ' > '

    user = @_client.getUserByID @user
    if user
      str += user.name + ': '
    else if @username
      str += @username + ': '

    # TODO: bots here

    str += @text

    # TODO: attachments here

    str

module.exports = Message