# This is a simple example of how to use the slack-client module in CoffeeScript. It creates a
# bot that responds to all messages in all channels it is in with a reversed
# string of the text received.
#
# To run, copy your token below, then, from the project root directory:
#
# To run the script directly
#    npm install
#    node_modules/coffee-script/bin/coffee examples/simple_reverse.coffee 
#
# If you want to look at / run / modify the compiled javascript
#    npm install
#    node_modules/coffee-script/bin/coffee -c examples/simple_reverse.coffee 
#    cd examples
#    node simple_reverse.js
#

Slack = require '..'

token = 'xoxb-YOUR-TOKEN-HERE' # Add a bot at https://my.slack.com/services/new/bot and copy the token here.
autoReconnect = true
autoMark = true

slack = new Slack(token, autoReconnect, autoMark)

slack.on 'open', ->
  channels = []
  groups = []
  unreads = slack.getUnreadCount()

  # Get all the channels that bot is a member of
  channels = ("##{value.name}" for key, value of slack.channels when slack.channels[key].is_member)
  # Get all groups that are open and not archived 
  groups = (for key, value of slack.groups
    if slack.groups[key].is_open and not slack.groups[key].is_archived
      value.name)
  

  console.log "Welcome to Slack. You are @#{slack.self.name} of #{slack.team.name}"
  console.log 'You are in: ' + channels.join(', ')
  console.log 'As well as: ' + groups.join(', ')

  messages = if unreads is 1 then 'message' else 'messages'

  console.log "You have #{unreads} unread #{messages}"


slack.on 'message', (message) ->
  channel = slack.getChannelGroupOrDMByID(message.channel)
  user = slack.getUserByID(message.user)
  response = ''

  {type, ts, text} = message

  channelName = if channel.is_channel then '#' else ''
  channelName += channel.name

  console.log """
    Received: #{type} #{channelName} @#{user.name} #{ts} "#{text}"
  """

  # Respond to messages with the reverse of the text received.

  if type is 'message'
    response = text.split('').reverse().join('')
    channel.send response
    console.log """
      @#{slack.self.name} responded with "#{response}"
    """


slack.on 'error', (error) ->
  console.error "Error: #{error}"


slack.login()
