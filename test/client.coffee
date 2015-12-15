###################################################################
# Setup the tests
###################################################################
should = require 'should'
sinon = require 'sinon'
Client = require '../src/client'
Message = require '../src/message'

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

  describe '#onMessage', ->

    describe 'type: team_migration_started', ->
      beforeEach ->
        sinon.stub(client, 'reconnect')
        client.onMessage {
          "type": "team_migration_started"
        }
      
      afterEach ->
        client.reconnect.restore()

      it 'should call reconnect', ->
        client.reconnect.called.should.equal true

    describe 'type: reaction_added', ->
      message = {
        "type": "reaction_added"
      }

      beforeEach ->
        sinon.stub(client, 'emit')
        client.onMessage message
      
      afterEach ->
        client.emit.restore()

      it 'should emit a reaction_added Message', ->
        client.emit.calledTwice.should.equal true
        client.emit.args[0].should.eql ['raw_message', message]

        args = client.emit.args[1]
        args[0].should.eql 'reaction_added'
        args[1].type.should.eql message.type
