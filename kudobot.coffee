https       = require 'https'
Slack = require './'

token = process.env.KUDOBOT_TOKEN # Add a bot at https://my.slack.com/services/new/bot and copy the token here.
autoReconnect = true
autoMark = true

potluck_id = process.env.POTLUCK_ID
jamila_id = process.env.JAMILA_ID

jamila_dm = null
potluck_dm = null
team_channel = null

awards =
  credit: "Do the Extra Credit"
  vibes: "Bring Good Vibes"
  student: "Always a Student"
  group: "Clever is a Group Project"
  classroom: "Leave the Classroom Better than you Found it"
  textbook: "Don't Trust the Textbook"
  security: "Data Defender + Security"
  cleaver: "Cleaver Prize"

# award => id of holder
current_holders = 
  "credit": jamila_id
  "vibes": jamila_id
  "student": jamila_id
  "group": jamila_id
  "classroom": jamila_id
  "textbook": jamila_id
  "security": jamila_id
  "cleaver": jamila_id

# YES, I KNOW THAT THESE DICTIONARIES ARE NAMED BACKWARDS
# id => username
user_ids = {}
# username => id
usernames = {}


slack = new Slack(token, autoReconnect, autoMark)


set_holder = (holder, award, channel) ->
  response = "OK, set "+user_ids[holder]+" as current holder of "+awards[award]+"\n"
  current_holders[award] = holder
  response += "current holders are: \n"
  for awrd of current_holders
    response += "" + awrd + ": @"
    response += user_ids[current_holders[awrd]] + "\n"
    channel.send response

bad_set = (channel) ->
  response = "Usage: `set [award holder] [award]`\n"
  response += "'award holder' should be the slack username, prepended by @\n"
  response += "`award` should be one of: `credit`, `vibes`, `student`, `group`, `classroom`, `textbook`, `cleaver` or `security`"
  channel.send response

team_notif = (award) ->
  team_msg = "Someone just made a nomination for "+awards[award]+"!\n"
  team_msg += "You can make a nomination by DMing kudobot: `nominate [nominee] [award] [reason]`"
  team_channel.send team_msg

holder_notif = (words, userName) ->
  award = words[2]
  holder_msg = "Hey! "+ userName+" made a nomination!\n"
  holder_msg += words[1] + " has been nominated for " + award
  holder_msg += " For " + words.slice(3).join(' ') + "\n"

  holder_id = current_holders[award]

  slack.openDM holder_id, (value) ->
  holder_dm_id = value.channel.id
  holder_dm = slack.getDMByID(holder_dm_id)
  holder_dm.send holder_msg

jam_pot_notif = (words, userName) ->
  award = words[2]
  jamila_msg = "Hey Jamila/Potluck, "+ userName+" made a nomination!\n"
  jamila_msg += words[1] + " has been nominated for " + award
  jamila_msg += " for " + words.slice(3).join(' ') + "\n"
  jamila_dm.send jamila_msg
  potluck_dm.send jamila_msg

bad_nomination = (channel) ->
  response = "Usage: `nominate [nominee] [award] [reason]`\n"
  response += "`nominee` should be a single word name\n"
  response += "`award` should be one of: `credit`, `vibes`, `student`, `group`, `classroom`, `textbook`, `cleaver` or `security`"
  response += "`reason` can be as long as you want"
  channel.send response


slack.on 'open', ->
  channels = []
  groups = []
  users = slack.users
  unreads = slack.getUnreadCount()

  # Get all the channels that bot is a member of
  channels = ("##{channel.name}" for id, channel of slack.channels when channel.is_member)
  team_channel = slack.getChannelByName("#team")

  # Get all groups that are open and not archived 
  groups = (group.name for id, group of slack.groups when group.is_open and not group.is_archived)

  #console.log "Yo! Welcome to Slack. You are @#{slack.self.name} of #{slack.team.name}"
  #console.log 'You are in: ' + channels.join(', ')

  # get the DM id to message jamila and potluck
  slack.openDM jamila_id, (value) ->
    jamila_dm_id = value.channel.id
    jamila_dm = slack.getDMByID(jamila_dm_id)
  slack.openDM potluck_id, (value) ->
    potluck_dm_id = value.channel.id
    potluck_dm = slack.getDMByID(potluck_dm_id)

  # set the reverse dicts
  for user of users
    user_ids[user] = users[user]['name']
    usernames[users[user]['name']] = user
  

slack.on 'message', (message) ->
  channel = slack.getChannelGroupOrDMByID(message.channel)

  user = slack.getUserByID(message.user)
  response = ''

  {type, ts, text} = message

  channelName = if channel?.is_channel then '#' else ''
  channelName = channelName + if channel then channel.name else 'UNKNOWN_CHANNEL'

  userName = if user?.name? then "@#{user.name}" else "UNKNOWN_USER"

  console.log """
    Just Received: #{type} #{channelName} #{userName} #{ts} "#{text}"
  """

  if type is 'message' and text? and not channel.is_channel
    words = text.split(' ')
    if words.length > 2 and userName is "@p" and words[0] is "set" # TODO: change from @p to @jam
      holder = words[1]
      award = words[2]

      if holder[1] is "@"
        # to get the raw user ID
        holder = holder.slice(2, holder.length - 1)
      if (user_ids[holder]?) and (awards[award]?)
        set_holder holder, award, channel

      else
        bad_set channel
    else if words[0] is "set"
      bad_set channel
    else if text.indexOf("nominate") is 0
      award = words[2]
      if not awards[award]?
        bad_nomination channel
      else
        jam_pot_notif words, userName
        holder_notif words, userName
        team_notif award

    else
      bad_nomination channel
 
  else
    typeError = if type isnt 'message' then "unexpected type #{type}." else null
    textError = if not text? then 'text was undefined.' else null
    channelError = if not channel? then 'channel was undefined.' else null

    errors = [typeError, textError, channelError].filter((element) -> element isnt null).join ' '

    console.log """
      @#{slack.self.name} could not respond. #{errors}
    """


slack.on 'error', (error) -> console.error "Error: #{error}"


slack.login()


