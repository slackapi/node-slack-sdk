https       = require 'https'
querystring = require 'querystring'

class Client

  host: 'api.slack.com'

  constructor: (@token) ->

  login: ->
    @_apiCall 'users.login', {token: @token, agent: 'node-slack'}, @onLogin

  onLogin: (data) ->
    if data
      if not data.ok
        console.error 'Cannot login: '+data.error
      else
        console.log 'Logged in to '+data.team.name+' as '+data.self.name


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
            callback(null)

    req.write('' + post_data)
    req.end()

module.exports = Client