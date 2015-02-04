###################################################################
# Setup the tests
###################################################################
should = require 'should'

Client = require '../src/client'

# Generate a new instance for each test.
client = null

beforeEach ->
  client = new Client

###################################################################
# Start the tests
###################################################################

describe 'Client', ->

  describe '#getChannelByName', ->
    beforeEach ->
      client.channels =
        chan1:
          name: "achan"
        chan2:
          name: "bchan"

    it 'should return a named channel', ->
      chan = client.getChannelByName 'achan'
      chan.name.should.equal 'achan'

    it 'should strip hashes from the channel name', ->
      chan = client.getChannelByName '#bchan'
      chan.name.should.equal 'bchan'
