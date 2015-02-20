#!/usr/bin/env coffee
# This is a simple example of how to use the slack-client module in CoffeeScript. It creates a
# bot that responds to all messages in all channels it is in with a reversed
# string of the text received.
#
# To run, copy your token below, then:
#  npm install
#   cd examples
#   coffee simple_reverse.coffeescript

Slack = require '..'

token = 'xoxb-YOUR-TOKEN-HERE' # Add a bot at https://my.slack.com/services/new/bot and copy the token here.
autoReconnect = true
autoMark = true

slack = new Slack(token, autoReconnect, autoMark)

slack.on 'open', ->
  channels = []
  groups = []
  unreads = slack.getUnreadCount()
  key

  # Get all the channels that bot is a member of
  channels = ("##{value.name}" for key, value of slack.channels when slack.channels[key].is_member)
  # Get all groups that are open and not archived 
  groups = (value.name for key, value of slack.groups when slack.groups[key].is_open and not slack.groups[key].is_archived)
  

  console.log 'Welcome to Slack. You are @%s of %s', slack.self.name, slack.team.name
  console.log 'You are in: %s', channels.join(', ')
  console.log 'As well as: %s', groups.join(', ')

  messages = 
    if unreads is 1
      'message'
    else
      'messages'

  console.log "You have #{unreads} unread #{messages}"


slack.on 'message', (message) ->
  type = message.type
  channel = slack.getChannelGroupOrDMByID(message.channel)
  user = slack.getUserByID(message.user)
  time = message.ts
  text = message.text
  response = ''

  channelName =
    if channel.is_channel
      "#"
    else
      ""
  channelName += channel.name

  console.log "Received: #{type} #{channelName} @#{user.name} #{time} \"#{text}\""

  # Respond to messages with the reverse of the text received.

  if type is 'message'
    response = text.split('').reverse().join('')
    channel.send response
    console.log "@#{slack.self.name} responded with \"#{response}\""


slack.on 'error', (error) ->
  console.error "Error: #{error}"


slack.login()
